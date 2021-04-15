import { Context } from 'koa';
import { addCategory } from '../../service/categoryService';

export default async (ctx: Context) => {
  // 拿到参数;
  const params = ctx.request.body;
  try {
    const data = await addCategory(params);
    ctx.sendResult(data, 200, '添加成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
