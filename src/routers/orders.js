const Router = require('koa-router');
const order = require('../services/order');
const guard = require('../guards/jwt');

const router = new Router();

router.use(guard());

router.get('/', async ctx => {
  try {
    ctx.body = await order.getOrdersList();
  } catch (err) {
    ctx.throw(400, err);
  }
});

router.get('/:id', async ctx => {
  try {
    ctx.body = await order.getOrderById(ctx.params.id);
  } catch (err) {
    ctx.throw(404, err);
  }
});

router.post('/', async ctx => {
  try {
    await order.createOrder({
      data: ctx.request.body,
      clientId: ctx.state.user.id,
    });
    ctx.status = 201;
  } catch (err) {
    ctx.throw(400, err);
  }
});

module.exports = router;
