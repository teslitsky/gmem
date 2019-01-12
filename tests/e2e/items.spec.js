const request = require('supertest');
const app = require('../../src/app');

describe('Items endpoints', () => {
  afterEach(() => {
    app.close();
  });

  it('Get items list', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeTruthy();
  });

  it('Get item by id', async () => {
    const response = await request(app).get('/items/1');
    expect(response.statusCode).toBe(200);
  });

  it('Return 404 for not existed item', async () => {
    const response = await request(app).get('/items/0');
    expect(response.statusCode).toBe(404);
  });

  it('Create item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ title: 'Foo', type: 'bar' });
    expect(response.statusCode).toBe(201);
  });

  it('Not create order with invalid params', async () => {
    const response = await request(app)
      .post('/items')
      .send({});
    expect(response.statusCode).toBe(400);
  });
});
