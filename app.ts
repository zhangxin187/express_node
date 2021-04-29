import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
// 验证token
import koajwt from 'koa-jwt';
import { jwt_config } from './config/default.json';
import path from 'path';
import koaStatic from 'koa-static';

const app = new Koa();

// 连接数据库
import './modules/connect';

//配置跨域
app.use(cors());
// 处理静态资源访问
app.use(koaStatic(__dirname));

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
    // 响应文件上传大于限制的错误
    if (err.message.includes('maxFileSize exceeded')) {
      ctx.sendResult(null, 401, '文件上传体积超出限制');
    }
  });
});

// 处理post请求参数及文件上传相关
// 由于要对其进行错误处理,故放在错误处理中间件的后面
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 上传文件存储目录
      uploadDir: path.join(__dirname, 'upload'),
      // 允许保留后缀名
      keepExtensions: true,
      // 设置上传文件大小最大限制，默认2M
      maxFileSize: 1024 * 1024 * 2,
    },
  })
);

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
