const Router = require('koa-router');
const item = require('../services/item');
const guard = require('../guards/jwt');

const router = new Router();

router.use(guard('client'));

router.get('/', async ctx => {
  ctx.body = await item.getItemsList(ctx.query.geo);
});

router.get('/:id', async ctx => {
  try {
    ctx.body = await item.getItemById(ctx.params.id);
  } catch (err) {
    ctx.throw(404, err);
  }
});

module.exports = router;
