const OLD_ENV = process.env;
process.env.JWT_SECRET = 'secret';

const Koa = require('koa');
const request = require('supertest');
const guard = require('../../src/guards/jwt');
const { clientToken, deliveryToken } = require('../tokens');

const clientBearer = `Bearer ${clientToken}`;
const deliveryBearer = `Bearer ${deliveryToken}`;

describe('JWT guard middleware', () => {
  let app = null;

  beforeEach(() => {
    app = new Koa();
    app.use(guard('delivery'));
    app.use(ctx => {
      ctx.status = 200;
    });
  });

  afterAll(() => {
    app = undefined;
    process.env = OLD_ENV;
  });

  it('Do not allow access without token', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.statusCode).toEqual(401);
  });

  it('Do not allow access with incorrect audience type', async () => {
    const response = await request(app.callback())
      .get('/')
      .set('Authorization', clientBearer);
    expect(response.statusCode).toEqual(401);
  });

  it('Allow access with right audience type', async () => {
    const response = await request(app.callback())
      .get('/')
      .set('Authorization', deliveryBearer);
    expect(response.statusCode).toEqual(200);
  });
});
