import mongoose, { isValidObjectId } from 'mongoose';
const { Schema, model } = mongoose;
import pagination from 'mongoose-paginate-v2';

// 创建规则
const CategorySchema = new Schema(
  {
    // 类别名
    cat_Name: {
      type: String,
      require: true,
    },
    // 类别层级,一级分类、二级分类
    cat_Level: {
      type: Number,
      default: 0,
    },
    // 父分类id,上一级分类的id
    cat_Pid: {
      type: String,
      // 默认是一级分类,无父分类id,空字符串
      default: '',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    
    },
  },
  { versionKey: false }
);

// 使用分页插件
CategorySchema.plugin(pagination);

//创建集合
const Category = model('categories', CategorySchema);

export default Category;
