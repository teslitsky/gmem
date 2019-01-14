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

function updateItemTypes(id, types) {
  const knex = Delivery.knex();

  return transaction(knex, async trx => {
    await knex('delivery_item_types')
      .transacting(trx)
      .where({ delivery_id: id })
      .del();

    const items = types.map(type => ({ delivery_id: id, type }));

    return knex('delivery_item_types')
      .transacting(trx)
      .insert(items);
  });
}

function getAvailableItemTypes(id) {
  const knex = Delivery.knex();

  return knex('delivery_item_types')
    .distinct('type')
    .pluck('type')
    .select()
    .where({ delivery_id: id });
}

module.exports = {
  getDeliveriesList,
  getDeliveryById,
  getDeliveryByLogin,
  createDelivery,
  setRefreshToken,
  updateLocations,
  updateItemTypes,
  getAvailableItemTypes,
};
