const jwt = require('jsonwebtoken');
const { uid } = require('rand-token');

const secret = process.env.JWT_SECRET;

function sign(data) {
  return jwt.sign(data, secret, { expiresIn: '10m' });
}

function signTokens(data, audience = 'client') {
  const refreshToken = uid(16);

  return {
    type: 'Bearer',
    access_token: sign({ ...data, aud: audience }),
    refresh_token: refreshToken,
  };
}

function verifyAccessToken(token) {
  return jwt.verify(token, secret, {
    ignoreExpiration: true,
  });
}

module.exports = { secret, signTokens, verifyAccessToken };
