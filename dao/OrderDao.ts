import Order from '../model/Order';
import Customer from '../model/Customer';
import Goods from '../model/Goods';
import { PaginateOptions } from 'mongoose';
import Category from '../model/Category';

/**
 * 获取订单列表
 * @param pagenum 当前页
 * @param pagesize 每页显示条数
 * @param condition 查询条件
 */
async function getOrders(pagenum: number, pagesize: number, condition: any) {
  // 分页配置项
  const option: PaginateOptions = {
    page: pagenum,
    limit: pagesize,
    populate: [
      { path: 'goods', model: Goods ,populate: { path: 'category', model: Category }},
      { path: 'sender', model: Customer },
    ],
    // sort:'category'
  };
  const data = await Order.paginate(condition, option);
  return data;
}

/**
 * 根据id修改订单数据
 * @param id 物品id
 * @param fields 更改的字段对象
 * @returns 修改后的物品数据
 */
async function updateOrderById(id: string, fields: any) {
  const data = await Order.findByIdAndUpdate(id, fields, { new: true });
  return data;
}

/**
 * 根据id获取订单数据
 * @param id 订单id
 */
async function findOrderById(id: string) {
  const data = await Order.findById(id).populate([
    { path: 'goods', model: Goods },
    { path: 'sender', model: Customer },
  ]);
  return data;
}

/**
 * 根据id删除物品
 * @param id 订单id
 * @returns 删除的订单数据
 */
async function deleteOrderById(id: string) {
  const data = await Order.findByIdAndDelete(id);
  return data;
}

/**
 * 添加订单
 * @param doc 文档对象
 * @returns 添加的该订单对象
 */
 async function addOrder(doc:any) {
  const data = await Order.create(doc)
  return data;
}

export default {
  getOrders,
  updateOrderById,
  findOrderById,
  deleteOrderById,
  addOrder
};
