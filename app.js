const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');

const userRoutes =  require('./Modules/User/Routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(errors());


app.use(userRoutes);
module.exports = app;
