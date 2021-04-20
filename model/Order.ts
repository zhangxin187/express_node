import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import pagination from 'mongoose-paginate-v2';

// 创建规则
const OrderSchema = new Schema(
  {
    // 订单编号
    order_No: {
      type: String,
      require: true,
    },
    // 货品
    goods: {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
    },
    // 重量
    weight: {
      type: Number,
    },
    // 寄件人
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    // 下单时间
    createTime: {
      type: Date,
      default: Date.now,
    },
    // 送达时间
    arriveTime: {
      type: Date,
      default: null,
    },
    // 是否送达
    isArrive: {
      type: Boolean,
      default: false,
    },
    // 收获地址
    arrive_Address: {
      type: Array,
      require: true,
    },
  },
  { versionKey: false }
);

// 使用分页插件
OrderSchema.plugin(pagination);

//创建集合
const Order = model('orders', OrderSchema);

export default Order;
