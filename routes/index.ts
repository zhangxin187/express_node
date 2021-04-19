import { Context } from 'koa';
import koaRouter from 'koa-router';
const router = new koaRouter();

// 其他功能
// 登录路由
import login from './others/login';
router.post('/login', login);
// 获取左侧菜单信息列表
import getMenus from './others/getMenus';
router.get('/menus', getMenus);

// 用户模块相关路由
// 获取用户列表
import getUser from './user/getUsers';
router.get('/users', getUser);
// 修改用户
import updateUser from './user/updateUserById';
router.put('/users/:id', updateUser);
// 添加用户
import addUser from './user/addUser';
router.post('/users', addUser);
// 删除用户
import deleteUser from './user/deleteUserById';
router.delete('/users/:id', deleteUser);
// 根据id查询用户
import findUser from './user/findUserById';
router.get('/users/:_id', findUser);

// 分类category相关路由
// 获取分类列表数据
import getCategories from './category/getCategories';
router.get('/categories', getCategories);
// 修改分类
import updateCategory from './category/updateCategory';
router.put('/categories/:id', updateCategory);
// 删除分类
import deleteCategory from './category/deleteCategory';
router.delete('/categories/:id', deleteCategory);
// 添加分类
import addCategory from './category/addCategory';
router.post('/categories', addCategory);

// 物品Goods相关路由
// 获取物品列表
import getGoods from './goods/getGoods';
router.get('/goods', getGoods);
// 更新物品
import updateGoods from './goods/updateGoods';
router.put('/goods/:id', updateGoods);
// 删除物品
import deleteGoods from './goods/deleteGoods';
router.delete('/goods/:id', deleteGoods);
// 添加物品
import addGoods from './goods/addGoods';
router.post('/goods', addGoods);

// 客户Customer相关路由
// 获取客户列表
import getCustomer from './customer/getCustomer';
router.get('/customers', getCustomer);
// 删除客户
import addCustomer from './customer/addCustomer';
router.post('/customers', addCustomer);
// 删除客户
import deleteCustomer from './customer/deleteCustomer';
router.delete('/customers/:id', deleteCustomer);
// 更新客户
import updateCustomer from './customer/updateCustomer';
router.put('/customers/:id', updateCustomer);

export default router;
