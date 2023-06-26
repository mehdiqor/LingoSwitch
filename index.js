const Application = require('./app/server.js');
const port = process.env.PORT;
const dbUri = process.env.DB_URI;

new Application(port, dbUri);
