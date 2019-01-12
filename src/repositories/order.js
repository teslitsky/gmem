const { transaction } = require('objection');
require('../db');
const Order = require('../models/order');

function getOrdersList() {
  return Order.query().eager('items');
}

function getOrderById(id) {
  return Order.query()
    .eager('items')
    .findById(id);
}

function createOrder(data) {
  const knex = Order.knex();

  return transaction(knex, async trx => {
    const order = await Order.query(trx).insert(data);
    const items = data.items.map(id => ({ item_id: id, order_id: order.id }));

    return knex('order_items')
      .transacting(trx)
      .insert(items);
  });
}

module.exports = { getOrdersList, getOrderById, createOrder };
