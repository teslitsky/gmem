exports.up = knex =>
  knex.schema.table('orders', async t => {
    t.integer('delivery_id')
      .unsigned()
      .notNullable();
    // @TODO: add foreign key
  });

exports.down = knex =>
  knex.schema.table('orders', async t => {
    t.dropColumn('delivery_id');
  });
