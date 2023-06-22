const User = require('../Model/index');
const Procurador = require('../Model/procurador');
const Acessor = require('../Model/acessor');

async function create(req, res, next) {
    const { username, email, password } = req.body;

    const validUsername = await User.find({ username: username });

    if (validUsername.lenght == 0) {
    } else {
        return res
            .status(400)
            .json({ message: `O nome de usuario ${username} já está em uso!` });
    }

    if (req.emailInuse) {
        return res
            .status(400)
            .json({ message: `O email ${req.body.email} já está em uso!` })
    }

    const user = await User.create({
        username,
        email,
        password
    });

    user.password = null;

    return res.status(200).send('Usuario criado!');
}

async function readOne(req, res) {
    try {
        const { _id } = req.paramns;

        const user = await User.findById({ _id }).select({
            password: 0,
            _id: 0,
            __v: 0,
            createdAt: 0,
            updateAt: 0,
        });
        if (!user) {
            return res.status(404).send({ message: 'usuário não foi encontrado!' });
        }

        return res.status(200).send(user);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function remove(req, res) {
    try {
        const _id = req.userId;

        const user = await User.findByIdAndDelete({ _id });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Esse usuário não foi encontrado!' });
        }

        return res.status(200).send({ message: 'Usuário deletado' });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function isAcessor(req, res) {
    try {
        const _id = req.body;
        const cpf = req.body.cpf;
        const email = req.body.email;
        const telefone = req.body.telefone;

        var acessor = await Acessor.findOne({ cpf: cpf })

        if (!acessor) {
            acessor = await Acessor.create({
                cpf,
                email,
                telefone
            })
        } else {
            return res
                .status(409)
                .json({ message: 'Esse acessor ja esta cadastrado!' });
        }


        const user = await User.findById(_id);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Esse usuário não foi encontrado!' });
        }

        user.acessor = acessor._id

        await user.save();
        await acessor.save();

        return res.status(200).json({ message: 'Usuário atualizado' });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function isProcurador(req, res) {
    try {
        const _id = req.body;
        const cpf = req.body.cpf;
        const email = req.body.email;
        const telefone = req.body.telefone;

        var procurador = await Procurador.findOne({ cpf: cpf })

        if (!procurador) {
            procurador = await Procurador.create({
                cpf,
                email,
                telefone
            })
        } else {
            return res
                .status(409)
                .json({ message: 'Esse procurador ja esta cadastrado!' });
        }


        const user = await User.findById(_id);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Esse usuário não foi encontrado!' });
        }

        user.procurador = procurador._id

        await user.save();
        await acessor.save();

        return res.status(200).json({ message: 'Usuário atualizado' });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

module.exports = {
    create,
    readOne,
    isAcessor,
    isProcurador
};