exports.up = knex =>
  knex.schema.createTable('order_items', async t => {
    t.integer('order_id').notNullable();
    t.integer('item_id').notNullable();
  });

exports.down = knex => knex.schema.dropTable('order_items');
