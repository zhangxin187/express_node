import { Context } from 'koa';
import userService from '../../service/userService';
import { AddUserData } from '../../types/user';

export default async (ctx: Context) => {
  // 拿到参数
  const body: AddUserData = ctx.request.body;

  try {
    const data = await userService.addUser(body);
    ctx.sendResult(data, 200, '添加成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
