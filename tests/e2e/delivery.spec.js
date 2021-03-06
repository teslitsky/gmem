const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/db');
const deliveryService = require('../../src/services/delivery');
const { deliveryToken, deliveryRefreshToken } = require('../tokens');

const bearer = `Bearer ${deliveryToken}`;
const DELIVERY_TOKEN_ID = 3;

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
    // https://github.com/tgriesser/knex/issues/2967
    await knex.destroy();
  });

  it('Get code 401 without token', async () => {
    const response = await request(app).get('/deliveries');
    expect(response.statusCode).toBe(401);
  });

  it('Get deliveries list', async () => {
    const response = await request(app)
      .get('/deliveries')
      .set('Authorization', bearer);
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(3);
  });

  it('Get delivery by id', async () => {
    const response = await request(app)
      .get('/deliveries/1')
      .set('Authorization', bearer);
    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.title).toEqual('KazExpress');
  });

  it('Filter password and refresh token in delivery', async () => {
    const response = await request(app)
      .get('/deliveries/1')
      .set('Authorization', bearer);
    expect(response.body.password).toBeUndefined();
    expect(response.body.refresh_token).toBeUndefined();
  });

  it('Update product types list', async () => {
    const id = 1;
    const deliveryTypes = ['clothes', 'electronics'];

    const response = await request(app)
      .post(`/deliveries/${id}/items`)
      .set('Authorization', bearer)
      .send(deliveryTypes);
    expect(response.statusCode).toEqual(201);

    const types = await deliveryService.getAvailableItemTypes(id);
    expect(types).toEqual(deliveryTypes);
  });

  it('Update delivery geo locations', async () => {
    const id = 1;
    const locationIds = [1, 2];
    const response = await request(app)
      .post(`/deliveries/${id}/locations`)
      .set('Authorization', bearer)
      .send(locationIds);
    expect(response.statusCode).toEqual(201);

    const { locations } = await deliveryService.findById(id);
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toEqual(2);

    const savedLocations = locations.filter(l => locationIds.includes(l.id));
    expect(savedLocations.length).toEqual(2);
  });

  it('Do not update empty locations', async () => {
    const id = 1;
    const locationIds = [];
    const response = await request(app)
      .post(`/deliveries/${id}/locations`)
      .set('Authorization', bearer)
      .send(locationIds);
    expect(response.statusCode).toEqual(400);
  });

  it('Create new delivery at signup', async () => {
    const response = await request(app)
      .post('/deliveries/signup')
      .send({
        login: 'notexisted',
        password: 'password',
        title: 'New Delivery',
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
  });

  it('Get code 401 with incorrect password', async () => {
    const response = await request(app)
      .post('/deliveries/signup')
      .send({
        login: 'kazexp',
        password: 'wrongpassword',
        title: 'New Delivery',
      });
    expect(response.statusCode).toEqual(401);
  });

  it('Generate new tokens if delivery already existed at signup', async () => {
    const response = await request(app)
      .post('/deliveries/signup')
      .send({
        login: 'kazexp',
        password: 'password',
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
  });

  it('Refresh token with valid tokens', async () => {
    const response = await request(app)
      .post('/deliveries/token/refresh')
      .send({
        access_token: deliveryToken,
        refresh_token: deliveryRefreshToken,
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body.type).toEqual('Bearer');
    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
    expect(response.body.refresh_token.length).toEqual(16);

    // test token signed for delivery with id 3
    const delivery = await deliveryService.findById(DELIVERY_TOKEN_ID);
    expect(delivery.refresh_token !== deliveryRefreshToken).toEqual(true);
    expect(delivery.refresh_token.length).toEqual(16);
  });

  it('Get code 403 without tokens', async () => {
    const response = await request(app)
      .post('/deliveries/token/refresh')
      .send({});
    expect(response.statusCode).toEqual(403);
    expect(response.body.access_token).toBeUndefined();
    expect(response.body.refresh_token).toBeUndefined();

    const delivery = await deliveryService.findById(DELIVERY_TOKEN_ID);
    expect(delivery.refresh_token === deliveryRefreshToken).toEqual(true);
  });

  it('Get code 403 with invalid access_token', async () => {
    const response = await request(app)
      .post('/deliveries/token/refresh')
      .send({
        access_token: 'invalid',
        refresh_token: 'invalid',
      });
    expect(response.statusCode).toEqual(403);
    expect(response.body.access_token).toBeUndefined();
    expect(response.body.refresh_token).toBeUndefined();

    const delivery = await deliveryService.findById(DELIVERY_TOKEN_ID);
    expect(delivery.refresh_token === deliveryRefreshToken).toEqual(true);
  });

  it('Get code 403 with invalid refresh_token', async () => {
    const response = await request(app)
      .post('/deliveries/token/refresh')
      .send({
        access_token: deliveryToken,
        refresh_token: 'invalid',
      });
    expect(response.statusCode).toEqual(403);
    expect(response.body.access_token).toBeUndefined();
    expect(response.body.refresh_token).toBeUndefined();

    const delivery = await deliveryService.findById(DELIVERY_TOKEN_ID);
    expect(delivery.refresh_token === deliveryRefreshToken).toEqual(true);
  });
});
