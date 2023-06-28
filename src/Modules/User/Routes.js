const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('./Controller/auth');
const EmailInUse = require('../../Middlewares/emailInUse');

routes
    .route('/user')
    .post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                name : Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required(),
                isProcurador: Joi.boolean().required()
            }),
        }),
        EmailInUse.emailInUse,
        Controller.create
    )
    .delete(UserAuth.verifyToken, Controller.remove);

routes.route('/login').post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    UserAuth.authenticate,
);

routes.route('/user/:_id').get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required(),
        }),
    }),
    Controller.readOne,
);

routes.route('/user/saidatoarquivado').put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            saidaId: Joi.string().required()
        })
    }),
    UserAuth.verifyToken,
    Controller.saidatoarquivado
)

routes.route('/user/entradatoarquivado').put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            entradaId: Joi.string().required()
        })
    }),
    UserAuth.verifyToken,
    Controller.entradatoarquivado
)

routes.route('/user/transferprocesso').put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            entradaId: Joi.string().required(),
            _idReceptor: Joi.string().required()
        })
    }),
    UserAuth.verifyToken,
    Controller.transferprocesso
)

routes.route('/user/createprocesso').post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo : Joi.string().required()
        })
    }),
    UserAuth.verifyToken,
    Controller.createArchiveEntrada
)


module.exports = routes;