const repository = require('../repositories/item');

function getItemsList() {
  return repository.getItemsList();
}

async function getItemById(id) {
  if (!id) {
    throw new Error('Item id is required');
  }

  const order = await repository.getItemById(id);
  if (!order) {
    throw new Error(`No item with id ${id}`);
  }

  return order;
}

module.exports = { getItemsList, getItemById };
