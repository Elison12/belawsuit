const User = require('../Modules/User/Model/index');

async function emailInUse(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });

        req.emailInUse = user !== null;

        return next();
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

module.exports = {
    emailInUse
};