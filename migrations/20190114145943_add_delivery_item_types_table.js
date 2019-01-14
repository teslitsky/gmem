exports.up = knex =>
  knex.schema.createTable('delivery_item_types', async t => {
    t.integer('delivery_id').notNullable();
    t.string('type').notNullable();
  });

exports.down = knex => knex.schema.dropTable('delivery_item_types');
