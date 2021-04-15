import { Context } from 'koa';
import userService from '../../service/userService';

export default async (ctx: Context) => {
  // {_id:xxx}
  const params = ctx.params;
  try {
    const data = await userService.findUserById(params);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
