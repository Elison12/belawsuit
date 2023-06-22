const mongooseHelpers = require('./Helpers/mongooseHelper');

async function connectToDB() {
  await mongooseHelpers
    .connectDatabase()
    .then(info => {
      console.log(
        `Database connected to ${info.host}:${info.port}/${info.name}`,
      );
    })
    .catch(error => {
      console.log(error);
      console.error('Unable to connect to database');
      process.exit(1);
    });
}

module.exports = connectToDB;