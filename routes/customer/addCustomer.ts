import { Context } from 'koa';
import { addCustomer } from '../../service/customerService';

export default async (ctx: Context) => {
  // 拿到参数;
  const params = ctx.request.body;
  try {
    const data = await addCustomer(params);
    ctx.sendResult(data, 200, '添加成功');
  } catch (error) {
    ctx.sendResult(null, 401, error);
  }
};
