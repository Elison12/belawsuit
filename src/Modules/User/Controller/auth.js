const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model');

async function authenticate(req, res) {
  try {
    
    const username = req.body.username;
    const plainTextPassword = req.body.password;
    var user;

    user = await User.findOne({ username: username }).select('+password');

    if(!user){
      user = await User.findOne({ email: username }).select('+password');
    }

    if (!user) {
      return res.status(400).json({ message: 'Email ou usuario não cadastrado' });
    }

    if(user.verified == true){

    async function match(plainTextPassword, hashedPassword) {
      if (!plainTextPassword || !hashedPassword) {
        return false;
      }

      return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    const passwordMatch = await match(plainTextPassword, user?.password);

    if (!user || !passwordMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    user.password = undefined;
    const id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '90d' });

    return res.status(200).json({ token, _id: id, auth: true });
  }else{
    return res.status(403).json({ message: 'Email não verificado' });
  }
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function verifyToken(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }

    function wrongFormat(type, token) {
      if (!type || !token) {
        return true;
      }

      if (type !== 'Bearer') {
        return true;
      }

      return false;
    }

    const [type, token] = header.split(' ');

    if (wrongFormat(type, token)) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;

    return next();
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  authenticate,
  verifyToken,
};