const repository = require('../repositories/delivery');

async function createDelivery(data) {
  return repository.createDelivery(data);
}

function findById(id) {
  return repository.getDeliveryById(id);
}

function findByLogin(login) {
  return repository.getDeliveryByLogin(login);
}

function setRefreshToken(id, token) {
  return repository.setRefreshToken(id, token);
}

function getDeliveriesList() {
  return repository.getDeliveriesList();
}

function updateLocations(id, locations = []) {
  if (!id) {
    throw new Error('Delivery id is required');
  }

  if (!locations.length) {
    throw new Error('Delivery locations id is required');
  }

  return repository.updateLocations(id, locations);
}

module.exports = {
  findById,
  findByLogin,
  createDelivery,
  setRefreshToken,
  getDeliveriesList,
  updateLocations,
};
