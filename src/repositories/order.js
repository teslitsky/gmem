const orders = [
  {
    id: 1,
    client_id: 1,
    location_id: 'KAZ',
    products: [
      {
        id: 1,
        title: 'foo',
        type: 'foo',
      },
      {
        id: 2,
        title: 'bar',
        type: 'bar',
      },
    ],
  },
];

function getOrdersList() {
  return [...orders];
}

function getOrderById(id) {
  return orders.find(o => o.id === Number(id));
}

function createOrder(order) {
  return orders.push(order);
}

module.exports = { getOrdersList, getOrderById, createOrder };
