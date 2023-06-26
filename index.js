const app = require('./app')
const connectToDB = require('./server')

const port = 3000;

(async () => {
  connectToDB();
  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();