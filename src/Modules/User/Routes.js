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


module.exports = routes;