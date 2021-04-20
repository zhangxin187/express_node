import { Context } from 'koa';
import { getGoodsWithCate } from '../../service/goodsService';
export default async (ctx: Context) => {
  try {
    const data = await getGoodsWithCate();
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
