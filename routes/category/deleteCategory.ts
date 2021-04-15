import { Context } from 'koa';
import { deleteCategoryById } from '../../service/categoryService';

export default async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const data = await deleteCategoryById(id);
    ctx.sendResult(data, 200, '删除成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
