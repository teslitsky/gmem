require('../db');
const Client = require('../models/client');

function getClientByLogin(login) {
  return Client.query()
    .where('login', '=', login)
    .first();
}

function createClient(data) {
  return Client.query().insert(data);
}

function setRefreshToken(id, token) {
  return Client.query()
    .patch({ refresh_token: token })
    .where('id', '=', id);
}

module.exports = {
  getClientByLogin,
  createClient,
  setRefreshToken,
};
