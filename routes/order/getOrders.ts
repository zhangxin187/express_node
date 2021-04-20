import { Context } from 'koa';
import { getOrders } from '../../service/orderService';
export default async (ctx: Context) => {
  // 拿到参数
  const query = ctx.query;
  try {
    const data = await getOrders(query);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
