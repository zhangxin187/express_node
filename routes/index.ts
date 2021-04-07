import { Context } from 'koa';
import koaRouter from 'koa-router';
const router = new koaRouter();



// 登录路由
import login from './others/login';
router.post('/login',login);


export default router;