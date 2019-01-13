exports.seed = knex =>
  knex('locations')
    .del()
    .then(() =>
      knex('locations').insert([
        { id: 1, iso: 'UKR', country: 'Ukraine' },
        { id: 2, iso: 'NGA', country: 'Nigeria' },
        { id: 3, iso: 'KAZ', country: 'Kazakhstan' },
      ]),
    );
