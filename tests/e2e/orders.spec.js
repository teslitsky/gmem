const request = require('supertest');
const app = require('../../src/app');

describe('Orders endpoints', () => {
  afterEach(() => {
    app.close();
  });

  it('Get orders list', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeTruthy();
  });

  it('Get order by id', async () => {
    const response = await request(app).get('/orders/1');
    expect(response.statusCode).toBe(200);
  });

  it('Return 404 for not existed order', async () => {
    const response = await request(app).get('/orders/0');
    expect(response.statusCode).toBe(404);
  });

  it('Create order', async () => {
    const response = await request(app)
      .post('/orders')
      .send({ products: [1, 2], geo: 'KAZ' });
    expect(response.statusCode).toBe(201);
  });

  it('Not create order with invalid params', async () => {
    const response = await request(app)
      .post('/orders')
      .send({});
    expect(response.statusCode).toBe(400);
  });
});
