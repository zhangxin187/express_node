import Category from '../model/Category';
import { PaginateOptions } from 'mongoose';

/**
 * 获取分类列表
 * 如果传入params,则按分页查询
 * @param params {pagenum,pagesize} | null
 * @returns
 */
async function getCategories(params?: any) {
  if (params) {
    const { pagenum, pagesize } = params;
    // 分页配置项
    const option: PaginateOptions = {
      page: pagenum,
      limit: pagesize,
      sort: 'cat_Level',
    };
    const data = await Category.paginate({}, option);
    return data;
  } else {
    const data = await Category.find();
    return data;
  }
}

/**
 * 根据id修改分类数据
 * @param id 分类id
 * @param fields 更改的字段对象
 * @returns 修改后的分类数据
 */
async function updateCategoryById(id: string, fields: any) {
  const data = await Category.findByIdAndUpdate(id, fields, { new: true });
  return data;
}

/**
 * 根据id删除分类
 * @param id 分类id
 * @returns 删除的分类数据
 */
 async function deleteCategoryById(id: string) {
  const data = await Category.findByIdAndDelete(id)
  return data;
}

/**
 * 添加分类
 * @param doc 分类文档对象
 * @returns 添加的该分类对象
 */
 async function addCategory(doc:any) {
  const data = await Category.create(doc)
  return data;
}

export default {
  getCategories,
  updateCategoryById,
  deleteCategoryById,
  addCategory
};
