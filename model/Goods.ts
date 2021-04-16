import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import pagination from 'mongoose-paginate-v2';

// 创建规则
const GoodsSchema = new Schema(
  {
    // 类别名
    goods_Name: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      // 关联Categoty表
      ref: 'Category',
    },
  },
  { versionKey: false }
);

// 使用分页插件
GoodsSchema.plugin(pagination);

//创建集合
const Goods = model('goods', GoodsSchema);

export default Goods;
