import data from '../config/menus.json';
function getMenus() {
  //
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

export default {
  getMenus,
};
