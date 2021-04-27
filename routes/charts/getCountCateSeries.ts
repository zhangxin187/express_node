// 获取统计订单分类的数据,以时间为坐标轴,获取多段统计数据,如获取最近七天的数据,返回七段数据,每天为一个节点
import { Context } from 'koa';
import { countCateSeries } from '../../service/chatsService';
export default async (ctx: Context) => {
  // 时间范围
  const {start,end} = ctx.query;
  try {
    const data = await countCateSeries(start,end);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
