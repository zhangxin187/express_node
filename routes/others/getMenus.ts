import { Context } from 'koa';
import otherService from '../../service/otherService';

export default async (ctx: Context): Promise<void> => {
  try {
    const data = await otherService.getMenus();
    ctx.sendResult(data, 200, '登录成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
