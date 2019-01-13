const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/db');

describe('Delivery endpoints', () => {
  beforeEach(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
    app.close();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('Update product types list', async () => {
    const response = await request(app)
      .post('/deliveries/1/items')
      .send(['foo', 'bar']);
    expect(response.statusCode).toBe(201);
  });

  it('Update geo locations', async () => {
    const response = await request(app)
      .post('/deliveries/1/items')
      .send(['foo', 'bar']);
    expect(response.statusCode).toBe(201);
  });
});
