import { Context } from 'koa';
import { deleteOrderById } from '../../service/orderService';

export default async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const data = await deleteOrderById(id);
    ctx.sendResult(data, 200, '删除成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
