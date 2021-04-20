import { Context } from 'koa';
import { addOrder } from '../../service/orderService';

export default async (ctx: Context) => {
  // 拿到参数;
  const params = ctx.request.body;
  try {
    const data = await addOrder(params);
    ctx.sendResult(data, 200, '添加成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
