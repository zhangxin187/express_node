import { Context } from 'koa';
import { updateOrderById } from '../../service/orderService';

export default async (ctx: Context) => {
  // 拿到参数;
  const { id } = ctx.params;
  const fields = ctx.request.body;
  try {
    const data = await updateOrderById(id, fields);
    ctx.sendResult(data, 200, '修改成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
