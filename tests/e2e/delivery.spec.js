const request = require('supertest');
const app = require('../../src/app');

describe('Delivery endpoints', () => {
  afterEach(() => {
    app.close();
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
