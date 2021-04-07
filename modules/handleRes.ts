import { Context, Next } from "koa";
import { Result } from '../types/response';
// 统一返回固定格式的数据
export default async (ctx:Context, next:Next) => {
  ctx.sendResult = (data: Result, status: number, message: string) => {
    ctx.body = {
      data,
      meta: {
        msg: message,
        status,
      },
    };
  };
  await next();
};
