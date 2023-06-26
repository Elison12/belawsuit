const mongooseHelpers = require('./src/Helpers/mongooseHelper');

async function connectToDB() {
  await mongooseHelpers
    .connectDataBase()
    .then(info => {
      console.log(
        `Banco de dados conectado`,
      );
    })
    .catch(error => {
      console.log(error);
      console.error('Nao é possivel conectar a banco de dados');
      process.exit(1);
    });
}

module.exports = connectToDB;