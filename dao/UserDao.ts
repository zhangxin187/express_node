import { PaginateOptions, PaginateResult } from 'mongoose';
import User from '../model/User';
import { PaginationData } from '../types/pagination';
import { UserData, AddUserData, UserFields } from '../types/user';
/**
 * 查询单个用户
 * @param condition 查询条件
 * @returns 返回的是对象形式的用户数据
 */
async function findUser(condition: UserFields) {
  const data = await User.findOne(condition);
  return data;
}

/**
 * 根据条件获取用户列表
 * @param condition 查询条件
 * @returns 以数组的形式返回用户数据
 */
async function getUsers(condition: any) {
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
    select: '_id name phone role status createTime avatar', // 挑选查询的字段,不查询密码
    sort: 'role', //排序,根据字段值升序排列
  };
  const data: PaginateResult<PaginationData> = await User.paginate(
    query,
    option
  );
  return data;
}

/**
 * 根据id修改用户
 * @param id 用户id
 * @param changedFields 修改的字段对象
 * @returns
 */
async function updateUserById(id: any, changedFields: any) {
  const data = await User.findByIdAndUpdate(id, changedFields, {
    new: true, // 返回更新后的文档
    fields: '-password', // 不查询密码字段
  });
  return data;
}

/**
 * 添加用户
 * @returns
 * @param doc  添加的用户文档对象
 * @returns  该用户文档对象
 */
async function addUser(doc: AddUserData) {
  const data = await User.create(doc);
  return data;
}

/**
 * 根据ID删除用户
 * @param id  用户id
 * @returns 被删除的该用户
 */
async function deleteUserById(id: string) {
  const data = await User.findByIdAndDelete(id);
  return data;
}

export default {
  findUser,
  getUsers,
  updateUserById,
  addUser,
  deleteUserById,
};
