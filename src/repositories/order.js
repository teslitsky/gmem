const { transaction } = require('objection');
require('../db');
const Order = require('../models/order');

function getOrdersList() {
  return Order.query().eager('[items, client]');
}

function getOrderById(id) {
  return Order.query()
    .eager('[items, client]')
    .findById(id);
}

async function createOrder({ geo, clientId, items }) {
  const knex = Order.knex();

  return transaction(knex, async trx => {
    const [deliveryId] = await knex
      .transacting(trx)
      .distinct('deliveries.id')
      .from('items')
      .leftJoin('delivery_item_types', 'items.type', 'delivery_item_types.type')
      .leftJoin(
        'deliveries',
        'deliveries.id',
        'delivery_item_types.delivery_id',
      )
      .leftJoin(
        'delivery_locations',
        'deliveries.id',
        'delivery_locations.delivery_id',
      )
      .leftJoin('locations', 'locations.id', 'delivery_locations.location_id')
      .whereIn('items.id', items)
      .andWhere('locations.iso', geo)
      .pluck('deliveries.id');

    if (!deliveryId) {
      throw new Error('Have no suitable delivery services');
    }

    const [orderId] = await knex('orders')
      .transacting(trx)
      .insert({
        location: geo,
        client_id: clientId,
        delivery_id: deliveryId,
      });

    const products = items.map(id => ({ item_id: id, order_id: orderId }));

    return knex('order_items')
      .transacting(trx)
      .insert(products);
  });
}

module.exports = { getOrdersList, getOrderById, createOrder };
