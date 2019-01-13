exports.up = knex =>
  knex.schema.createTable('delivery_locations', async t => {
    t.integer('delivery_id').notNullable();
    t.integer('location_id').notNullable();
  });

exports.down = knex => knex.schema.dropTable('delivery_locations');
