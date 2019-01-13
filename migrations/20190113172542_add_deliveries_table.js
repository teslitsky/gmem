exports.up = knex =>
  knex.schema.createTable('deliveries', async t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('title').notNullable();
    t.string('login')
      .unique()
      .notNullable();
    t.string('password').notNullable();
    t.string('refresh_token');
    t.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('deliveries');
