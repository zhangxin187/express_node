// 获取统计订单分类的数据
import { Context } from 'koa';
import { countGoods } from '../../service/chatsService';
export default async (ctx: Context) => {
  // 参数是日期范围,参数可传可不传,不传则是获取所有的数据
  const {start,end} = ctx.query;
  try {
    const data = await countGoods(start,end);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
