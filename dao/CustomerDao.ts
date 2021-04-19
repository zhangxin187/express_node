import Customer from '../model/Customer';
import { PaginateOptions } from 'mongoose';

/**
 * 获取客户列表
 * @param pagenum 当前页
 * @param pagesize 每页显示条数
 * @param condition 查询条件
 */
async function getCustomers(pagenum: number, pagesize: number, condition: any) {
  // 分页配置项
  const option: PaginateOptions = {
    page: pagenum,
    limit: pagesize,
  };
  const data = await Customer.paginate(condition, option);
  return data;
}

/**
 * 添加客户
 * @param doc 客户文档对象
 * @returns 添加的该客户对象
 */
 async function addCustomer(doc: any) {
  const data = await Customer.create(doc);
  return data;
}

/**
 * 根据id删除客户
 * @param id 客户id
 * @returns 删除的客户数据
 */
 async function deleteCustomerById(id: string) {
  const data = await Customer.findByIdAndDelete(id);
  return data;
}

/**
 * 根据id修改客户数据
 * @param id 客户id
 * @param fields 更改的字段对象
 * @returns 修改后的客户数据
 */
 async function updateCustomerById(id: string, fields: any) {
  const data = await Customer.findByIdAndUpdate(id, fields, { new: true });
  return data;
}


export default {
  getCustomers,
  addCustomer,
  deleteCustomerById,
  updateCustomerById
};
