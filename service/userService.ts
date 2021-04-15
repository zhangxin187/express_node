import UserDao from '../dao/UserDao';
// 加密模块
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { ParsedUrlQuery } from 'node:querystring';
import { AddUserData, UserData, UserFields } from '../types/user';

/**
 * 获取用户列表
 * @param params query参数
 */
function getUsers(params: ParsedUrlQuery) {
  return new Promise(async (resolve, reject) => {
    const data = await UserDao.getUsers(params);
    if (data) {
      resolve(data);
    } else {
      reject('获取用户列表失败');
    }
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
  return new Promise(async (resolve, reject) => {
    const data = await UserDao.updateUserById(id, params);
    if (data) {
      resolve(data);
    } else {
      reject('更新失败');
    }
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
      reject('该手机号已被注册');
    }
    // 对密码进行加密
    const { password } = params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // 加密后的密码替换原密码
    params.password = hash;

    const data = await UserDao.addUser(params);
    if (data) {
      // 排除password字段
      // mongoose返回的不是JS对象,不能对对象进行操作
      const result = JSON.parse(JSON.stringify(data));
      const res = _.omit(result, 'password');
      resolve(res);
    } else {
      reject('添加失败');
    }
  });
}

/**
 * 删除用户
 * @param params id
 */
function deleteUserById(params: string) {
  return new Promise<UserData>(async (resolve, reject) => {
    const data = await UserDao.deleteUserById(params);
    if (data) {
      resolve(data);
    } else {
      reject('删除失败');
    }
  });
}

/**
 * 根据id查询用户
 * @param params {_id:xx}
 */
function findUserById(params: UserFields) {
  return new Promise(async (resolve, reject) => {
    const data = await UserDao.findUser(params);
    if (data) {
      // 排除password字段
      const result = JSON.parse(JSON.stringify(data));
      const res = _.omit(result, ['password', 'createTime']);
      resolve(res);
    } else {
      reject('该用户不存在');
    }
  });
}

export default {
  getUsers,
  updateUserById,
  addUser,
  deleteUserById,
  findUserById,
};
