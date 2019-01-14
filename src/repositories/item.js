require('../db');
const Item = require('../models/item');
const Location = require('../models/location');

function getItemsList() {
  return Item.query();
}

function getItemsListByGeo(geo) {
  return Location.query()
    .eager('deliveries.[items]')
    .omit(['login'])
    .where('iso', '=', geo)
    .first();
}

function getItemById(id) {
  return Item.query().findById(id);
}

module.exports = { getItemById, getItemsList, getItemsListByGeo };
