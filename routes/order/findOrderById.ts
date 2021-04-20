import { Context } from 'koa';
import { findOrderById } from '../../service/orderService';

export default async (ctx: Context) => {
  // 拿到参数;
  const { id } = ctx.params;
  try {
    const data = await findOrderById(id);
    ctx.sendResult(data, 200, '查询成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
