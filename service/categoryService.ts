import CategoryDao from '../dao/CategoryDao';
import { CateData, CateDataTree } from '../types/category';

/**
 * 获取分类数据
 * @param type 获取的数据类型,列表和树状
 * @returns    列表或树状分类数据
 */
export function getCategories(type: string = 'list', params: any) {
  return new Promise(async (resolve, reject) => {
    if (type === 'list') {
      const data = await CategoryDao.getCategories(params);
      resolve(data);
    } else if (type === 'tree') {
      // 不进行分页,查询全部数据列表
      const data = await CategoryDao.getCategories();
      // 转为js对象,便于后续方法比对id
      let dataObj = JSON.parse(JSON.stringify(data));
      // 将列表数据转为树状数据,父子分类嵌套的格式
      // 获取父节点数据列表
      const parents: any[] = [];
      // 获取所有子节点数据列表
      const children: any[] = [];
      dataObj.forEach((item: CateData) => {
        if (item.cat_Pid) {
          children.push(item);
        } else {
          parents.push(item);
        }
      });
      const result = transformDataToTree(parents, children);
      resolve(result);
    } else {
      reject('请传入正确的type参数');
    }
  });
}

/**
 * 将列表数据转为树状结构,父子嵌套形式
 * @param parents 父节点列表
 * @param list    子节点列表
 * @returns       处理好的树状列表
 */
function transformDataToTree(parents: CateDataTree[], list: CateData[]) {
  parents.forEach((node) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      if (node._id == list[i].cat_Pid) {
        arr.push(list[i]);
        // 将插入的节点从数组移出,减少后面遍历次数
        list.splice(i, 1);
        // 数组向前移一位,故索引也要向前(左)移一个
        i--;
      }
    }
    // 查找到当前父节点的子节点,则加chidren属性
    if (arr.length !== 0) {
      node.children = arr;
    }
    // 如果父节点里面有子节点且外面的待插入的子节点数组不为空，则进行递归,为子节点插入子节点
    if (node.children && list.length !== 0) {
      transformDataToTree(node.children, list);
    }
  });
  return parents;
}

/**
 * 根据id修改分类
 * @param id  分类id
 * @param query  更改的字段对象
 */
export function updateCategoryById(id: string, query: any) {
  return new Promise(async (resolve, reject) => {
    const data = await CategoryDao.updateCategoryById(id, query);
    resolve(data);
  });
}

/**
 * 根据id删除分类
 * @param id  分类id
 */
export function deleteCategoryById(id: string) {
  return new Promise(async (resolve, reject) => {
    const data = await CategoryDao.deleteCategoryById(id);
    if (data) {
      resolve(data);
    } else {
      reject('为查询到该分类');
    }
  });
}

/**
 * 添加分类
 * @param params
 */
export function addCategory(params: any) {
  return new Promise(async (resolve, reject) => {
    const data = await CategoryDao.addCategory(params);
    resolve(data);
  });
}
