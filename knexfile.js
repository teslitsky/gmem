require('dotenv').config();

module.exports = {
  client: 'mysql2',
  connection: process.env.DB_CONNECTION_URL,
  debug: process.env.NODE_ENV === 'development',
};
