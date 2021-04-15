import { Context } from 'koa';
import loginService from '../../service/loginService';

export default async (ctx: Context): Promise<void> => {
  // 拿到参数
  const { body } = ctx.request;
  // {phone:xxx , password:xxx}

  //调用service处理
  try {
    const data = await loginService.login(body);
    ctx.sendResult(data, 200, '登录成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
