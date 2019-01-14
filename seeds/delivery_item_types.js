exports.seed = async knex =>
  knex('delivery_item_types')
    .del()
    .then(() =>
      knex('delivery_item_types').insert([
        {
          delivery_id: 1,
          type: 'clothes',
        },
        {
          delivery_id: 2,
          type: 'clothes',
        },
        {
          delivery_id: 2,
          type: 'electronics',
        },
        {
          delivery_id: 3,
          type: 'software',
        },
      ]),
    );
