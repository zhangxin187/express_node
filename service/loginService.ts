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

/**
 * 登录逻辑
 * @param params {phone:xx,password:xx}
 *
 */

function login(params: LoginParams) {
  const { phone, password } = params;

  return new Promise(async (resolve, reject) => {
    const data = await UserDao.findUser({ phone });
    if (!data) {
      reject('登录失败,账号或密码错误');
    } else {
      // 比对密码
      const flag = bcrypt.compareSync(password, data.password);

      if (flag) {
        // 登录成功, 生成token
        const { secret, expiresIn } = jwt_config;
        const token: string = jwt.sign({ phone }, secret, {
          expiresIn,
        });
        //data是mongoose返回的,不是一个JS对象，不能对其操作,故需要转为JS对象
        let result: Data = JSON.parse(JSON.stringify(data));
        // Beaeer后一定要有一个空格
        result.token = 'Bearer ' + token;

        resolve(result);
      } else {
        // promise中thorw 在后面的catch中可以拿到错误信息
        reject('登录失败,账号或密码错误');
      }
    }
  });
}
export default {
  login,
};
