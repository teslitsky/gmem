const repository = require('../repositories/client');

function createClient(data) {
  return repository.createClient(data);
}

function findByLogin(login) {
  return repository.getClientByLogin(login);
}

function setRefreshToken(id, token) {
  return repository.setRefreshToken(id, token);
}

module.exports = {
  createClient,
  findByLogin,
  setRefreshToken,
};
