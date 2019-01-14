const Router = require('koa-router');
const client = require('../services/client');
const passport = require('../services/auth/passport/client');
const jwt = require('../services/auth/jwt');

const router = new Router();

router.use(passport.initialize());

// @TODO: Maybe abstract and move to /auth endpoint
router.post('/signup', passport.authenticate('client'), ctx => {
  ctx.status = 201;
  ctx.body = jwt.signTokens(ctx.state.user, 'client');
});

router.post('/token/refresh', async ctx => {
  try {
    const { access_token, refresh_token } = ctx.request.body;
    const decoded = jwt.verifyAccessToken(access_token);

    const account = await client.findById(decoded.id);
    if (!account) {
      ctx.throw(403, new Error(`No client with id ${decoded.id}`));
    }

    if (refresh_token !== account.refresh_token) {
      ctx.throw(403, new Error('Incorrect refresh_token'));
    }

    const tokens = jwt.signTokens({ id: account.id }, 'client');

    await client.setRefreshToken(account.id, tokens.refresh_token);

    ctx.status = 201;
    ctx.body = tokens;
  } catch (err) {
    ctx.throw(403, err);
  }
});

module.exports = router;
