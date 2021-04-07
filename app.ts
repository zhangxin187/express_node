import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
// 验证token
import koajwt from 'koa-jwt';
import { jwt_config } from './config/default.json';

const app = new Koa();

// 连接数据库
import './modules/connect';

//配置跨域
app.use(cors());

// 处理post请求参数
app.use(bodyParser());

// 挂载统一返回固定格式数据的方法 ctx.sendResult
import handleRes from './modules/handleRes';
app.use(handleRes);

// 错误处理中间件
app.use((ctx, next) => {
  // 一定要加return
  return next().catch((err) => {
    // token验证失败
    if (err.status === 401) {
      ctx.sendResult(null, 401, '请求未授权');
    }
  });
});

// 对请求进行拦截，解析验证token
app.use(
  koajwt({
    secret: jwt_config.secret,
  }).unless({
    path: [/\/login/],
  })
);

//导入配置过的路由模块
import router from './routes/index';
//启动路由
app.use(router.routes());

app.listen(3000, () => {
  console.log('服务器创建成功,监听接口3000');
});
