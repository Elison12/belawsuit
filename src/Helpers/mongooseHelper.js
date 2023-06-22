require('dotenv').config()
const mongoose = require('mogoose');
const database = require('../Database');

function connectDataBase() {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .once('open', () => resolve(mongoose.connection[0]));

        mongoose.connect(database.db.connection, database.options);
    });
}

function closeDatabase() {
    mongoose.connection.close();
}

module.exports = {
    connectDataBase,
    closeDatabase,
};