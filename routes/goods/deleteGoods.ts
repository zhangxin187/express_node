import { Context } from 'koa';
import { deleteGoodsById } from '../../service/goodsService';

export default async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const data = await deleteGoodsById(id);
    ctx.sendResult(data, 200, '删除成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
