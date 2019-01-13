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

router.post('/items', ctx => {
  ctx.status = 201;
  ctx.body = 'updated items';
});

router.post('/geo', ctx => {
  ctx.status = 201;
  ctx.body = 'updated geo';
});

module.exports = router;
