require('../db');
const Item = require('../models/item');

function getItemsList() {
  return Item.query();
}

function getItemById(id) {
  return Item.query().findById(id);
}

module.exports = { getItemsList, getItemById };
