import GoodsDao from '../dao/GoodsDao';
import { getCategories } from './categoryService';
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

/**
 * 获取带分类的物品数据,即树状分类数据下有物品数据
 */
export function getGoodsWithCate() {
  return new Promise(async (resolve, reject) => {
    // 参数是分页和查询字段相关条件,此处获取全部不分页的数据
    const data = await GoodsDao.getGoods(1, 10000, {});
    // 树状分类数据
    const categoryTree = await getCategories('tree', {});
    // 拼接数据,mongoose返回的文档对象不是真正的JS对象,不能对属性进行操作,故转换为JS对象
    const res = joinGoodsWithCate(JSON.parse(JSON.stringify(data.docs)), JSON.parse(JSON.stringify(categoryTree)));
    resolve(res);
  });
}

/**
 * 将物品数据和树状分类数据进行拼接
 */
function joinGoodsWithCate(goods: any, category: any) {
  category.forEach((item1: any) => {
    // 若item1有children,说明它不是基础分类,则还要往里面进行查找
    if (item1.children) {
      // 递归
      joinGoodsWithCate(goods, item1.children);
    } else {
      item1.children = goods.filter((item2: any) => {
        // 为goods设置cat_Name字段,级联选择器只能指定一个字段为label,故要和分类进行统一
         item2.cat_Name=item2.goods_Name;
        return (item1._id == item2.category._id);
      });
    }
  });
  return category;
}
