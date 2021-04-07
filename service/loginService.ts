// 登录登出相关逻辑处理
import UserDao from '../dao/UserDao';
// 加密模块
import bcrypt from 'bcryptjs';
// 生成token
import jwt from 'jsonwebtoken';
import { jwt_config } from '../config/default.json';

import { Data } from '../types/login';

// 导入接口interface,约束对象类型
import { LoginParams } from '../types/login';
import { method } from 'lodash';

/**
 * 登录逻辑
 * @param params post请求参数
 * 
 */

function login(params: LoginParams): Promise<void> {
  const { phone, password } = params;

  return new Promise((resolve, reject) => {
    UserDao.findUser({ phone }).then(
      (data: any) => {
        // 比对密码
        const flag = bcrypt.compareSync(password, data.password);

        if (flag) {
          // 登录成功, 生成token
          const { secret, expiresIn } = jwt_config;
          const token: string = jwt.sign({ phone }, secret, {
            expiresIn,
          });
          // data是查询数据库返回的,并不是一个严格的对象，不能追加属性
          let result: Data = JSON.parse(JSON.stringify(data));
          result.token = 'Bearer' + token;

          resolve(result);
        } else {
          // promise中thorw 在后面的catch中可以拿到错误信息
          reject('登录失败,账号或密码错误');
        }
      },
      () => {
        reject('登录失败,账号或密码错误');
      }
    );
  });
}
export default {
  login,
};
