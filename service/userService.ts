import UserDao from '../dao/UserDao';
// 加密模块
import bcrypt from 'bcryptjs';
import _, { reject } from 'lodash';
import { ParsedUrlQuery } from 'node:querystring';
import { AddUserData, UserData, UserFields } from '../types/user';

/**
 * 获取用户列表
 * @param params query参数
 */
function getUsers(params: ParsedUrlQuery) {
  return new Promise((resolve, reject) => {
    UserDao.getUsers(params).then(
      (data) => {
        resolve(data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 更新用户
 * @param id 用户id
 * @param params 修改的字段对象
 */
function updateUserById(id: string, params: UserFields) {
  // 判断修改的字段是否有密码,有密码进行加密
  if (params.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
    params.password = hash;
  }
  return new Promise((resolve, reject) => {
    UserDao.updateUserById(id, params).then(
      (data) => {
        resolve(data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 添加用户
 * @param params
 * @returns
 */
function addUser(params: AddUserData) {
  return new Promise(async (resolve, reject) => {
    
    // 验证手机号码是否重复
    const user = await UserDao.findUser({ phone: params.phone });
    if (user) {
      // 账号重复
      return reject('该手机号已被注册');
    }
    // 对密码进行加密
    const { password } = params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // 加密后的密码替换原密码
    params.password = hash;
    UserDao.addUser(params).then(
      (data) => {
        // 排除password字段
        // mongoose返回的不是JS对象,不能对对象进行操作
        const result = JSON.parse(JSON.stringify(data));
        const res = _.omit(result, 'password');
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 删除用户
 * @param params id
 */
function deleteUserById(params: string) {
  return new Promise<UserData>((resolve, reject) => {
    UserDao.deleteUserById(params).then(
      (data) => {
        resolve(data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 根据id查询用户
 * @param params {_id:xx}
 */
function findUserById(params: UserFields) {
  return new Promise((resolve, reject) => {
    UserDao.findUser(params).then(
      (data) => {
        // 排除password字段
        const result = JSON.parse(JSON.stringify(data));
        const res = _.omit(result, ['password', 'createTime']);
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export default {
  getUsers,
  updateUserById,
  addUser,
  deleteUserById,
  findUserById,
};
