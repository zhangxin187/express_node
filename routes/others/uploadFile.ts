import { Context } from 'koa';
import userService from '../../service/userService';

export default async (ctx: Context) => {
  // ctx.request.files获取上传文件信息
  const baseUrl = 'http://localhost:3000/upload/';
  const { path, name } = (ctx.request.files as any).file;
  // 拼接服务器静态资源访问路径
  const pathArr = path.split('\\upload\\');
  const imgPath = baseUrl + pathArr[1];

  // 获取post参数中的用户id
  const { _id } = ctx.request.body;
  console.log(_id);
  
  try {
   // 调用service层,根据id修改用户头像
  const data = await userService.updateUserById(_id, { avatar: imgPath });
  ctx.sendResult(data, 200, '上传成功');
  } catch (error) {
    ctx.sendResult(null, 401, '上传失败');
  }
};
