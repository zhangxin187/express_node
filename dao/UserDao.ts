import User from '../model/User';
import { LoginCondition } from '../types/login';

/**
 * 查询用户
 *
 * @param condition 查询条件
 */
function findUser(condition: LoginCondition) {
  return new Promise(async (resolve, reject) => {
    //查询数据
    let data = await User.findOne(condition);
    if (!data) {
      reject('查询不到');
    } else {
      resolve(data);
    }
  });
}

export default {
  findUser,
};
