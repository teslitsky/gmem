exports.seed = async knex =>
  knex('delivery_locations')
    .del()
    .then(() =>
      knex('delivery_locations').insert([
        {
          delivery_id: 1,
          location_id: 3,
        },
        {
          delivery_id: 1,
          location_id: 2,
        },
        {
          delivery_id: 2,
          location_id: 1,
        },
        {
          delivery_id: 3,
          location_id: 1,
        },
        {
          delivery_id: 3,
          location_id: 3,
        },
      ]),
    );
