import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import pagination from 'mongoose-paginate-v2';

// import bcrypt from 'bcryptjs';

// 创建规则
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlenth: 10,
    },

    password: {
      type: String,
      require: true,
      minlength: 6,
    },

    phone: {
      type: String,
      require: true,
      unique:true
    },

    role: {
      type: String,
      default: 'normal',
      enum: ['admin', 'normal'],
    },

    // 创建时间
    createTime: {
      type: Date,
      default: Date.now,
    },

    // 状态
    status: {
      // 0 未激活 1 激活
      type: Number,
      required: true,
      default: 1,
    },

    // 头像
    // 存储的是静态资源路径
    avatar:''
  },
  { versionKey: false }
);

// 使用分页插件
UserSchema.plugin(pagination);

//创建集合
const User = model('users', UserSchema);

//存储一个账号
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync('123456',salt);
// User.create({name:'张鑫',password:hash,phone:'15191525755'})

export default User;
