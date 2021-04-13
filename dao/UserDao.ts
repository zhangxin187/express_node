import { truncate } from 'fs/promises';
import { PaginateOptions, PaginateResult } from 'mongoose';
import User from '../model/User';
import { PaginationData } from '../types/pagination';
import { UserData, AddUserData, UserFields } from '../types/user';
/**
 * 查询单个用户
 * @param condition 查询条件
 * @returns 返回的是对象形式的用户数据
 */
function findUser(condition: UserFields) {
  return new Promise(async (resolve, reject) => {
    //查询数据
    const data = await User.findOne(condition);

    if (!data) {
      reject('查询不到');
    } else {
      resolve(data);
    }
  });
}

/**
 * 根据条件获取用户列表
 * @param condition 查询条件
 * @returns 以数组的形式返回用户数据
 */
function getUsers(condition: any) {
  // query可以为空
  let { query = {}, pagesize, pagenum } = condition;
  // query可能是对象字符串
  if (typeof query === 'string') {
    query = JSON.parse(query);
  }
  // 模糊查询-借助正则
  for (let key in query) {
    // 创建正则表达式 /张鑫/gi
    const regex = new RegExp(query[key], 'gi');
    // {name:/张鑫/gi}
    query[key] = regex;
  }
  // 分页配置项
  const option: PaginateOptions = {
    page: pagenum,
    limit: pagesize,
    select: '_id name phone role status createTime', // 挑选查询的字段,不查询密码
    sort: 'role', //排序,根据字段值升序排列
  };

  return new Promise(async (resolve, reject) => {
    try {
      const data: PaginateResult<PaginationData> = await User.paginate(
        query,
        option
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 根据id修改用户
 * @param id 用户id
 * @param changedFields 修改的字段对象
 * @returns
 */
function updateUserById(id: any, changedFields: any) {
  return new Promise(async (resolve, reject) => {
    const data = await User.findByIdAndUpdate(id, changedFields, {
      new: true, // 返回更新后的文档
      fields: '-password', // 不查询密码字段
    });
    if (data) {
      resolve(data);
    } else {
      reject('未查询到该用户');
    }
  });
}

/**
 * 添加用户
 * @returns
 * @param doc  添加的用户文档对象
 * @returns  该用户文档对象
 */
function addUser(doc: AddUserData) {
  return new Promise<UserData>(async (resolve, reject) => {
    try {
      const data = await User.create(doc);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 根据ID删除用户
 * @param id  用户id
 * @returns 被删除的该用户
 */
function deleteUserById(id: string) {
  return new Promise<UserData>(async (resolve, reject) => {
    const data = await User.findByIdAndDelete(id);
    if (data) {
      resolve(data);
    } else {
      reject('未查询到该用户');
    }
  });
}

export default {
  findUser,
  getUsers,
  updateUserById,
  addUser,
  deleteUserById,
};
