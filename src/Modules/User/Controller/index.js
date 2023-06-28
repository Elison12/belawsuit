const User = require('../Model/index');
const Entrada = require('../Model/entradamodel');
const Saida = require('../Model/saidamodel');
const Arquivados = require('../Model/arquivadosmodel');


async function create(req, res, next) {
    const { username, email, password, name, isProcurador } = req.body;

    const validUsername = await User.find({ username: username });

    if (validUsername.length == 0) {
        
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
        password,
        name,
        isProcurador
    });

    user.password = null;

    return res.status(200).send('Usuario criado!');
}

async function readOne(req, res) {
    try {
        const { _id } = req.params;

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

async function createArchiveEntrada(req, res) {
    try{
        const _id = req.userId;
        const {titulo} = req.body;
        const user = await User.findById({ _id });

        if(!user){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        const entrada = await Entrada.create({
            titulo
        });
        user.entrada.push(entrada._id)
        await user.save()
        return res.status(200).send({message: 'processo criado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}

async function deleteArchiveEntrada(req, res) {
    try{
        const _id = req.userId;
        const {entradaId} = req.params;
        const user = await User.findById({ _id });

        if(!user){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        if(user.isProcurador == false){
            return res
            .status(403)
            .json({ message: 'Esse usuário não tem permissão para realizar tal ação' });
        }

        const entrada = await Entrada.findByIdAndDelete({
            entradaId
        });

        return res.status(200).send({message: 'processo deletado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}


async function updateArchiveEntrada(req, res) {
    try{
        const _id = req.userId;
        const {entradaId} = req.params;
        const {titulo} = req.body;
        const user = await User.findById({ _id });

        if(!user){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        if(user.isProcurador == false){
            return res
            .status(403)
            .json({ message: 'Esse usuário não tem permissão para realizar tal ação' });
        }

        const entrada = await Entrada.findByIdAndUpdate(
            entradaId,
            {
                $set: {titulo:titulo}
            },
        );

        return res.status(200).send({message: 'processo atualizado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}


async function transferprocesso(req, res) {
    try{
        const _idEmissor = req.userId;
        const {entradaId, _idReceptor} = req.body;
        const destino = await User.findById({ _idReceptor });
        const origem = await User.findById({_idEmissor});

        if(!destino){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }
        if(!origem){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        const validEntrada =  origem.entrada.find(el => el._id == entradaId);
        if (validEntrada == undefined){
            return res
            .status(404)
            .json({ message: 'Essa entrada não foi encontrada!' });
        }

        await origem.entrada.pull(entradaId)
        await origem.saida.push(entradaId)

        await destino.entrada.push(entradaId);
        
        await origem.save();
        await destino.save();
        return res.status(200).send({message: 'processo enviado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}

async function entradatoarquivado(req, res) {
    try{
        const _idUser = req.userId;

        const {entradaId} = req.body;
        const user = await User.findById({ _idUser });


        if(!user){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        const validEntrada =  origem.entrada.find(el => el._id == entradaId);
        if (validEntrada == undefined){
            return res
            .status(404)
            .json({ message: 'Essa entrada não foi encontrada!' });
        }

        await user.entrada.pull(entradaId)
        await user.arquivados.push(entradaId)

        
        await user.save();

        return res.status(200).send({message: 'processo arquivado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}

async function saidatoarquivado(req, res) {
    try{
        const _idUser = req.userId;

        const {saidaId} = req.body;
        const user = await User.findById({ _idUser });


        if(!user){
            return res
            .status(404)
            .json({ message: 'Esse usuário não foi encontrado!' });
        }

        const validSaida =  origem.saida.find(el => el._id == saidaId);
        if (validSaida == undefined){
            return res
            .status(404)
            .json({ message: 'Essa saida não foi encontrada!' });
        }

        await user.saida.pull(saidaId)
        await user.arquivados.push(saidaId)

        
        await user.save();

        return res.status(200).send({message: 'processo arquivado'});

    } catch ({message}) {
        return res.status(500).json({message});
    }
}


module.exports = {
    saidatoarquivado,
    entradatoarquivado,
    createArchiveEntrada,
    transferprocesso,
    deleteArchiveEntrada,
    updateArchiveEntrada,
    create,
    readOne,
    remove,
};