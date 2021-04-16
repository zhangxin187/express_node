import { Context } from 'koa';
import { getGoods } from '../../service/goodsService';
export default async (ctx: Context) => {
  // 拿到参数
  const query = ctx.query;
  try {
    const data = await getGoods(query);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
