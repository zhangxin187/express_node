import { Context } from 'koa';
import userService from '../../service/userService'

export default async (ctx:Context)=>{
  // 拿到参数
  const query = ctx.query;
  try {
    const data = await userService.getUsers(query);
    ctx.sendResult(data, 200, '获取成功');
  } catch (error) {
    ctx.sendResult(null, 401, '获取失败');
  }
}