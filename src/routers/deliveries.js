const Router = require('koa-router');
const delivery = require('../services/delivery');
const passport = require('../services/auth/passport/delivery');
const jwt = require('../services/auth/jwt');
const guard = require('../guards/jwt');

const router = new Router();

router.use(passport.initialize());

// @TODO: Maybe abstract and move to /auth endpoint
router.post('/signup', passport.authenticate('local'), ctx => {
  ctx.status = 201;
  ctx.body = jwt.signTokens(ctx.state.user, 'delivery');
});

router.post('/token/refresh', async ctx => {
  try {
    const { access_token, refresh_token } = ctx.request.body;
    const decoded = jwt.verifyAccessToken(access_token);

    const account = await delivery.findById(decoded.id);
    if (!account) {
      ctx.throw(403, new Error(`No delivery with id ${decoded.id}`));
    }

    if (refresh_token !== account.refresh_token) {
      ctx.throw(403, new Error('Incorrect refresh_token'));
    }

    const tokens = jwt.signTokens({ id: account.id }, 'delivery');

    await delivery.setRefreshToken(account.id, tokens.refresh_token);

    ctx.status = 201;
    ctx.body = tokens;
  } catch (err) {
    ctx.throw(403, err);
  }
});

router.use(guard('delivery'));

router.get('/', async ctx => {
  ctx.body = await delivery.getDeliveriesList();
});

router.get('/:id', async ctx => {
  try {
    ctx.body = await delivery.findById(ctx.params.id);
  } catch (err) {
    ctx.throw(404, err);
  }
});

router.post('/:id/locations', async ctx => {
  try {
    await delivery.updateLocations(ctx.params.id, ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.throw(400, err);
  }
});

router.post('/:id/items', async ctx => {
  try {
    await delivery.updateItemTypes(ctx.params.id, ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.throw(400, err);
  }
});

module.exports = router;
