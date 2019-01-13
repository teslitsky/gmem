require('../db');
const Delivery = require('../models/delivery');

function getDeliveriesList() {
  return Delivery.query().eager(['locations']);
}

function getDeliveryById(id) {
  return Delivery.query()
    .eager(['locations'])
    .findById(id);
}

function getDeliveryByLogin(login) {
  return Delivery.query()
    .where('login', '=', login)
    .first();
}

function createDelivery(data) {
  return Delivery.query().insert(data);
}

function setRefreshToken(id, token) {
  return Delivery.query()
    .patch({ refresh_token: token })
    .where('id', '=', id);
}

module.exports = {
  getDeliveriesList,
  getDeliveryById,
  getDeliveryByLogin,
  createDelivery,
  setRefreshToken,
};
