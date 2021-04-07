import Koa from 'koa';
import Application, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import koaRouter from 'koa-router';
const router: Router = new koaRouter();
import cors from '@koa/cors';
const app: Application = new Koa();

//连接数据库
import './modules/connect';
//配置跨域
app.use(cors());

//处理post请求参数
app.use(bodyParser());

router.get('/index', (ctx: Context) => {
  ctx.body = '123456';
});

//启动路由
app.use(router.routes());

app.listen(3000, () => {
  console.log('服务器创建成功,监听接口3000');
});
