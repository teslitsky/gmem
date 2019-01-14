const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/db');
const { clientToken } = require('../tokens');

const bearer = `Bearer ${clientToken}`;

describe('Items endpoints', () => {
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

  it('Get items list', async () => {
    const response = await request(app)
      .get('/items')
      .set('Authorization', bearer);
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeTruthy();
  });

  it('Get item by id', async () => {
    const id = 1;
    const response = await request(app)
      .get(`/items/${id}`)
      .set('Authorization', bearer);
    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toEqual(id);
    expect(response.body.title).toEqual('T-shirt');
  });

  it('Return 404 for not existed item', async () => {
    const response = await request(app)
      .get('/items/0')
      .set('Authorization', bearer);
    expect(response.statusCode).toEqual(404);
  });
});
