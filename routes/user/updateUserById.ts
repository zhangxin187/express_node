import { Context } from 'koa';
import userService from '../../service/userService'

export default async (ctx:Context)=>{
  // 路由参数id
  const {id} = ctx.params;
  // put参数
  const body =ctx.request.body;
  
  try {
    const data = await userService.updateUserById(id,body);
    ctx.sendResult(data, 200, '获取成功');
    
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
}