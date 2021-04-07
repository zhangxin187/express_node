"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = require("koa");
const koa_bodyparser_1 = require("koa-bodyparser");
const koa_router_1 = require("koa-router");
const router = new koa_router_1.default();
const cors_1 = require("@koa/cors");
const app = new koa_1.default();
require("./modules/connect");
app.use(cors_1.default());
app.use(koa_bodyparser_1.default());
router.get('/index', (ctx) => {
    ctx.body = '123456';
});
app.use(router.routes());
app.listen(3000, () => {
    console.log('服务器创建成功,监听接口3000');
});
