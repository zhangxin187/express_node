import { Context } from 'koa';
import { getCategories } from '../../service/categoryService';

export default async (ctx: Context) => {
  // 拿到参数
  const { type, pagesize=100, pagenum=1 } = ctx.query;
  const params = { pagenum, pagesize };

  try {
    const data = await getCategories(type as string,params);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
