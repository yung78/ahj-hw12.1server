const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const koaStatic = require('koa-static');
const slow = require('koa-slow');
const cors = require('@koa/cors');
const Router = require('koa-router');
const path = require('path');
const data = require('./db/db');

const app = new Koa();
const router = new Router();
const public =  path.join(__dirname, '/public');

app.use(slow({
  delay: 3000
}));


app.use(koaStatic(public));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(cors());

router.get('/', async (ctx) => {
  ctx.response.body = '/public/img/cache.jpg'

  console.log(ctx.response.body);
});


app.use(router.routes()).use(router.allowedMethods());

const port = 7070;
const server = http.createServer(app.callback());

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('WORK');
});

