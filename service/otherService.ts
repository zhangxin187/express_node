import data from '../config/menus.json';

// 获取menus菜单数据
export function getMenus() {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

