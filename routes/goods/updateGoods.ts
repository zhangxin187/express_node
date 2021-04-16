import { Context } from 'koa';
import { updateGoodsById } from '../../service/goodsService';

export default async (ctx: Context) => {
  // 拿到参数;
  const { id } = ctx.params;
  const fields = ctx.request.body;
  try {
    const data = await updateGoodsById(id, fields);
    ctx.sendResult(data, 200, '修改成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
