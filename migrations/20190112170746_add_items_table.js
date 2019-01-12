exports.up = knex =>
  knex.schema.createTable('items', async t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('title').notNullable();
    t.string('type').notNullable();
    t.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('items');
