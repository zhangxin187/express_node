import CustomerDao from '../dao/CustomerDao';
import _ from 'lodash';

/**
 * 获取客户列表
 * @param query get参数
 */
export function getCustomers(query: any) {
  const { pagenum = 1, pagesize = 1000000 } = query;
  const condition = _.omit(query, ['pagenum', 'pagesize']);
  // 模糊查询
  for (let key in condition) {
    // 创建正则表达式
    const regex = new RegExp(condition[key], 'gi');
    condition[key] = regex;
  }

  return new Promise(async (resolve, reject) => {
    const data = await CustomerDao.getCustomers(pagenum, pagesize, condition);
    if (data) {
      resolve(data);
    } else {
      reject('获取失败');
    }
  });
}

/**
 * 添加客户
 * @param params post参数
 */
export function addCustomer(params: any) {
  return new Promise(async (resolve, reject) => {
    const data = await CustomerDao.addCustomer(params);
    resolve(data);
  });
}

/**
 * 根据id删除客户
 * @param id  客户id
 */
 export function deleteCustomerById(id: string) {
  return new Promise(async (resolve, reject) => {
    const data = await CustomerDao.deleteCustomerById(id);
    if (data) {
      resolve(data);
    } else {
      reject('未查询到该客户');
    }
  });
}

/**
 * 根据id修改客户
 * @param id  客户id
 * @param query  更改的字段对象
 */
 export function updateCustomerById(id: string, query: any) {
  return new Promise(async (resolve, reject) => {
    const data = await CustomerDao.updateCustomerById(id, query);
    resolve(data);
  });
}