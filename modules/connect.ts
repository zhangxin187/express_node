//连接数据库
import mongoose from 'mongoose';
//导入配置项
import { db_config } from '../config/default.json';
const { database, user, password, host } = db_config;

mongoose
  .connect(`mongodb://${user}:${password}@${host}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log('数据库连接成功');
    },
    () => {
      console.log('数据库连接失败');
    }
  );
