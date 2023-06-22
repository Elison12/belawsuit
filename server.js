const app = require('./app');
const connectToDB = require('./server');

const port = process.env.PORT;

(async () => {
    connectToDB();
    await app.listen(port);
    console.log(`Server started on port ${port}`);
  })();