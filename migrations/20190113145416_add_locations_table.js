exports.up = knex =>
  knex.schema.createTable('locations', async t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('iso')
      .unique()
      .notNullable();
    t.string('country')
      .unique()
      .notNullable();
  });

exports.down = knex => knex.schema.dropTable('locations');
