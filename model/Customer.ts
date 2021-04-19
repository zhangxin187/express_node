import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import pagination from 'mongoose-paginate-v2';

// 创建规则
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlenth: 10,
    },

    phone: {
      type: String,
      require: true
    },

   address: {
      type: Array,
      require: true
    },
    
  },
  { versionKey: false }
);

// 使用分页插件
CustomerSchema.plugin(pagination);

//创建集合
const Customer = model('customers',CustomerSchema);

export default Customer;
