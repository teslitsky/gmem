exports.seed = knex =>
  knex('items')
    .del()
    .then(() =>
      knex('items').insert([
        { id: 1, title: 'T-shirt', type: 'clothes' },
        { id: 2, title: 'Keyboard', type: 'electronics' },
        { id: 3, title: 'Pants', type: 'clothes' },
        { id: 4, title: 'Mouse', type: 'electronics' },
        { id: 5, title: 'IDE', type: 'software' },
      ]),
    );
