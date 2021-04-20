import OrderDao from '../dao/OrderDao';
import _ from 'lodash';

/**
 * 获取订单列表
 * @param query get参数
 */
export function getOrders(query: any) {
  const { pagenum = 1, pagesize = 100 } = query;
  const condition = _.omit(query, ['pagenum', 'pagesize']);
  // 模糊查询
  for (let key in condition) {
    // 创建正则表达式
    const regex = new RegExp(condition[key], 'gi');
    condition[key] = regex;
  }

  return new Promise(async (resolve, reject) => {
    const data = await OrderDao.getOrders(pagenum, pagesize, condition);
    if (data) {
      resolve(data);
    } else {
      reject('获取失败');
    }
  });
}

/**
 * 根据id修改订单
 * @param id  订单id
 * @param query  更改的字段对象
 */
 export function updateOrderById(id: string, query: any) {
  return new Promise(async (resolve, reject) => {
    const data = await OrderDao.updateOrderById(id, query);
    resolve(data);
  });
}

/**
 * 根据id查询订单
 * @param id  订单id
 */
 export function findOrderById(id: string) {
  return new Promise(async (resolve, reject) => {
    const data = await OrderDao.findOrderById(id);
    resolve(data);
  });
}

/**
 * 根据id删除订单
 * @param id  物品id
 */
 export function deleteOrderById(id: string) {
  return new Promise(async (resolve, reject) => {
    const data = await OrderDao.deleteOrderById(id);
    if (data) {
      resolve(data);
    } else {
      reject('未查询到该订单');
    }
  });
}

/**
 * 添加物品
 * @param params
 */
 export function addOrder(params: any) {
  return new Promise(async (resolve, reject) => {
    const data = await OrderDao.addOrder(params);
    resolve(data);
  });
}
