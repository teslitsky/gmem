const OLD_ENV = process.env;
const SECRET = 'secret';
process.env.JWT_SECRET = SECRET;

const jsonwebtoken = require('jsonwebtoken');
const jwt = require('../../src/services/auth/jwt');

describe('JWT service', () => {
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('Get secret from process.env', () => {
    expect(jwt.secret).toEqual(SECRET);
  });

  it('Correct sign tokens', () => {
    const data = { foo: 'bar', baz: 1 };
    const { type, access_token, refresh_token } = jwt.signTokens(data);
    const parsedToken = jsonwebtoken.verify(access_token, SECRET, {
      ignoreExpiration: true,
    });

    expect(type).toEqual('Bearer');
    expect(parsedToken).toMatchObject(data);
    expect(refresh_token).toHaveLength(16);
  });

  it('Correct verify tokens', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJiYXoiOjEsImlhdCI6MTU0MzI1NTg1NywiZXhwIjoxNTQzMjU2NDU3fQ.ngc9H8DHKWWRVUvi9SJHj7iB-K_TP2oROJacEtVY_6Y';
    const data = { foo: 'bar', baz: 1 };
    const decoded = jwt.verifyAccessToken(token);

    expect(decoded).toMatchObject(data);
  });
});
