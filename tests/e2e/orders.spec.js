const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/db');
const { clientToken } = require('../tokens');

const bearer = `Bearer ${clientToken}`;

describe('Orders endpoints', () => {
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

  it('Get orders list', async () => {
    const response = await request(app)
      .get('/orders')
      .set('Authorization', bearer);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeTruthy();
  });

  it('Get order by id', async () => {
    const response = await request(app)
      .get('/orders/1')
      .set('Authorization', bearer);
    expect(response.statusCode).toBe(200);
  });

  it('Return 404 for not existed order', async () => {
    const response = await request(app)
      .get('/orders/0')
      .set('Authorization', bearer);
    expect(response.statusCode).toBe(404);
  });

  it('Create order', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', bearer)
      .send({ items: [1, 2], geo: 'UKR' });
    expect(response.statusCode).toBe(201);
  });

  it('Not create order with invalid params', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', bearer)
      .send({});
    expect(response.statusCode).toBe(400);
  });
});
