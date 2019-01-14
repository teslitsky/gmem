const jwt = require('koa-jwt');
const { secret } = require('../services/auth/jwt');

// Middleware check auth with passed audience 'client' or 'delivery'
function guard(audience) {
  return jwt({ secret, audience });
}

module.exports = guard;
