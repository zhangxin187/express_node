import { Context } from 'koa';
import {getMenus} from '../../service/otherService';

export default async (ctx: Context): Promise<void> => {
  try {
    const data = await getMenus();
    ctx.sendResult(data, 200, '登录成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
