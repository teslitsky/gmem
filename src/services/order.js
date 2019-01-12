const repository = require('../repositories/order');

function getOrdersList() {
  return repository.getOrdersList();
}

async function getOrderById(id) {
  if (!id) {
    throw new Error('Must use id for getting order');
  }

  const order = await repository.getOrderById(id);
  if (!order) {
    throw new Error(`No order with id ${id}`);
  }

  return order;
}

async function createOrder(order) {
  if (!order) {
    throw new Error('Empty order');
  }

  const { items = [], clientId, geo } = order;
  if (!items.length) {
    throw new Error('Empty order items');
  }

  if (!clientId) {
    throw new Error('No clientId param on order');
  }

  if (!geo) {
    throw new Error('No geo param on order');
  }

  return repository.createOrder(order);
}

module.exports = { getOrdersList, getOrderById, createOrder };
