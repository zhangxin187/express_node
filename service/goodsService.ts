import GoodsDao from '../dao/GoodsDao';
import _ from 'lodash';

/**
 * 获取物品列表
 * @param query get参数
 */
export function getGoods(query: any) {
  const { pagenum, pagesize } = query;
  const condition = _.omit(query, ['pagenum', 'pagesize']);
  // 模糊查询
  for (let key in condition) {
    // 创建正则表达式
    const regex = new RegExp(condition[key], 'gi');
    condition[key] = regex;
  }

  return new Promise(async (resolve, reject) => {
    const data = await GoodsDao.getGoods(pagenum, pagesize, condition);
    if (data) {
      resolve(data);
    } else {
      reject('获取失败');
    }
  });
}

/**
 * 根据id修改物品
 * @param id  物品id
 * @param query  更改的字段对象
 */
 export function updateGoodsById(id: string, query: any) {
  return new Promise(async (resolve, reject) => {
    const data = await GoodsDao.updateGoodsById(id, query);
    resolve(data);
  });
}

/**
 * 根据id删除物品
 * @param id  物品id
 */
 export function deleteGoodsById(id: string) {
  return new Promise(async (resolve, reject) => {
    const data = await GoodsDao.deleteGoodsById(id);
    if (data) {
      resolve(data);
    } else {
      reject('未查询到该物品');
    }
  });
}

/**
 * 添加物品
 * @param params
 */
 export function addGoods(params: any) {
  return new Promise(async (resolve, reject) => {
    const data = await GoodsDao.addGoods(params);
    resolve(data);
  });
}

