exports.seed = knex =>
  knex('order_items')
    .del()
    .then(() =>
      knex('order_items').insert([
        { order_id: 1, item_id: 1 },
        { order_id: 1, item_id: 2 },
      ]),
    );
