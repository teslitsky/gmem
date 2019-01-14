const repository = require('../repositories/order');

function getOrdersList() {
  return repository.getOrdersList();
}

async function getOrderById(id) {
  if (!id) {
    throw new Error('Order id is required');
  }

  const order = await repository.getOrderById(id);
  if (!order) {
    throw new Error(`No order with id ${id}`);
  }

  return order;
}

async function createOrder({ data, clientId }) {
  if (!data) {
    throw new Error('Empty order data');
  }

  const { geo, items = [] } = data;
  if (!geo) {
    throw new Error('Order geo location is required');
  }

  if (!items.length) {
    throw new Error('Order items is required');
  }

  if (!clientId) {
    throw new Error('ClientId is required');
  }

  return repository.createOrder({ geo, clientId, items });
}

module.exports = { getOrdersList, getOrderById, createOrder };
