import Goods from '../model/Goods';
import Category from '../model/Category';
import { PaginateOptions } from 'mongoose';

/**
 * 获取物品列表
 * @param pagenum 当前页
 * @param pagesize 每页显示条数
 * @param condition 查询条件
 */
async function getGoods(pagenum: number, pagesize: number, condition: any) {
  // 分页配置项
  const option: PaginateOptions = {
    page: pagenum,
    limit: pagesize,
    populate: { path: 'category', model: Category },
    sort:'category'
  };
  const data = await Goods.paginate(condition, option);
  return data;
}

/**
 * 根据id修改物品数据
 * @param id 物品id
 * @param fields 更改的字段对象
 * @returns 修改后的物品数据
 */
async function updateGoodsById(id: string, fields: any) {
  const data = await Goods.findByIdAndUpdate(id, fields, { new: true });
  return data;
}

/**
 * 根据id删除物品
 * @param id 物品id
 * @returns 删除的物品数据
 */
async function deleteGoodsById(id: string) {
  const data = await Goods.findByIdAndDelete(id);
  return data;
}

/**
 * 添加物品
 * @param doc 物品文档对象
 * @returns 添加的该物品对象
 */
 async function addGoods(doc:any) {
  const data = await Goods.create(doc)
  return data;
}


export default {
  getGoods,
  updateGoodsById,
  deleteGoodsById,
  addGoods
};
