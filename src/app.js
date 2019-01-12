require('dotenv').config();
const Koa = require('koa');
const cors = require('kcors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const ordersRouter = require('./routers/orders');
const errors = require('./middlewares/errors');

const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser());
app.use(errors());

const router = new Router();
router.get('/_health', ctx => {
  ctx.body = 'OK';
});

router.use('/orders', ordersRouter.routes(), ordersRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(process.env.PORT);

module.exports = server;
