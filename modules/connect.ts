//连接数据库
import mongoose from 'mongoose';
//导入配置项
import { db_config } from '../config/default.json';
const { database, user, password, host } = db_config;

mongoose
  .connect(`mongodb://${user}:${password}@${host}/${database}`, {
    // 去掉警告提示
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log('数据库连接成功');
    },
    () => {
      console.log('数据库连接失败');
    }
  );
