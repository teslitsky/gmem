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

  return repository.createOrder(order);
}

module.exports = { getOrdersList, getOrderById, createOrder };
