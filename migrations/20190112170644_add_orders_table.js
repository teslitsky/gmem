exports.up = knex =>
  knex.schema.createTable('orders', async t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.integer('client_id').notNullable();
    t.string('location').notNullable();
    t.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('orders');
