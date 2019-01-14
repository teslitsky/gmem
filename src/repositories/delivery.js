const { transaction } = require('objection');
require('../db');
const Delivery = require('../models/delivery');

function getDeliveriesList() {
  return Delivery.query().eager('[locations]');
}

function getDeliveryById(id) {
  return Delivery.query()
    .eager('[locations]')
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

function updateLocations(id, locations) {
  const knex = Delivery.knex();

  return transaction(knex, async trx => {
    await knex('delivery_locations')
      .transacting(trx)
      .where({ delivery_id: id })
      .del();

    const items = locations.map(l => ({ delivery_id: id, location_id: l }));

    return knex('delivery_locations')
      .transacting(trx)
      .insert(items);
  });
}

module.exports = {
  getDeliveriesList,
  getDeliveryById,
  getDeliveryByLogin,
  createDelivery,
  setRefreshToken,
  updateLocations,
};
