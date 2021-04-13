import { Context } from 'koa';
import userService from '../../service/userService'

export default async (ctx:Context)=>{
  // resful参数
  const {id} = ctx.params;
  
  try {
    const data = await userService.deleteUserById(id);
    ctx.sendResult(data, 200, '删除成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
}