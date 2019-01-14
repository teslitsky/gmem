exports.seed = knex =>
  knex('orders')
    .del()
    .then(() =>
      knex('orders').insert([
        { id: 1, client_id: 1, delivery_id: 2, location: 'UKR' },
      ]),
    );
