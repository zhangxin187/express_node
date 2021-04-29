import OrderDao from '../dao/OrderDao';
import CategoryDao from '../dao/CategoryDao';
import _ from 'lodash';
import moment from 'moment';

/**
 * 获取订单物品分类的统计数据
 * @param start 起始日期,默认为0的时间戳
 * @param start 截至日期,默认为2080年的时间戳
 * @returns     返回规定日期范围内订单分类的个数和总重量
 */
export async function countCate(start: any = 0, end: any = 3471292800000) {
  const { docs: orders } = await OrderDao.getOrders(1, 10000, {});
  const data = selectOrderByDate(orders, start, end);
  return countOrder(data).countCate;
}

/**
 * 获取订单物品的统计数据
 * @param start 起始日期,默认为0的时间戳
 * @param start 截至日期,默认为2080年的时间戳
 * @returns     返回规定日期范围内订单各物品的个数和总重量
 */
export async function countGoods(start: any = 0, end: any = 3471292800000) {
  const { docs: orders } = await OrderDao.getOrders(1, 10000, {});
  const data = selectOrderByDate(orders, +start, +end);
  return countOrder(data).countGoods;
}

/**
 * 根据日期范围筛选出订单
 * @param start 起始日期
 * @param end  截至日期
 */
function selectOrderByDate(orders: any, start: any, end: any) {
  return orders.filter((item: any) => {
    return (
      item.createTime.valueOf() >= start && item.createTime.valueOf() < end
    );
  });
}

/**
 * 统计订单
 * @param orders 订单数据列表
 * @returns 返回统计的物品、分类数据
 */
function countOrder(orders: any) {
  // countCate：统计订单分类的个数/重量
  // 数据格式：{name:'蔬果',count:5,weight:56}
  const countCate: any[] = [];
  // countCate：统计订单货品的个数/重量
  // 数据格式：{name:'大米',count:5,weight:56}
  const countGoods: any[] = [];

  orders.forEach((item1: any) => {
    const flag1 = countCate.some((item2: any) => {
      if (item1.goods.category.cat_Name == item2.name) {
        item2.count++;
        item2.weight += item1.weight;
        // 终止循环
        return true;
      }
    });
    // countCate中没有该项,手动添加
    if (!flag1) {
      countCate.push({
        name: item1.goods.category.cat_Name,
        count: 1,
        weight: item1.weight,
      });
    }

    const flag2 = countGoods.some((item2: any) => {
      if (item1.goods.goods_Name == item2.name) {
        item2.count++;
        item2.weight += item1.weight;
        // 终止循环
        return true;
      }
    });
    // countCate中没有该项,手动添加
    if (!flag2) {
      countGoods.push({
        name: item1.goods.goods_Name,
        count: 1,
        weight: item1.weight,
      });
    }
  });

  return { countCate, countGoods };
}

/**
 * 获取订单物品分类的一系列统计数据,以时间为点获取一系列数据
 * @param start 起始日期,时间戳
 * @param end   终止日期,时间戳
 * @param cut   要将日期分为多少段
 * @returns     返回一段连续日期的订单分类的个数和总重量
 */
export async function countCateSeries(
  start: any = new Date().getTime() - 6 * 24 * 60 * 60 * 1000,
  end: any = new Date().getTime(),
  cut: any = 7
) {
  const { docs: orders } = await OrderDao.getOrders(1, 10000000, {});
  // 将时间戳处理为moment对象形式
  // 转为当天的00:00
  const momentStart = moment(start, 'x').startOf('day');
  // 转为当天的23：59
  const momentEnd = moment(end, 'x').endOf('day');
  // 计算出时间跨度范围
  const range = momentEnd.diff(momentStart, 'days') + 1;
  // 将moment对象转为时间戳
  const startX = momentStart.format('x');
  const endX = momentEnd.format('x');
  // 筛选出时间范围内的订单,缩小订单的范围,提高性能
  const data = selectOrderByDate(orders, startX, endX);
  const { data: cutOrders, lable } = cutAndCountOrder(
    data,
    +startX,
    +endX,
    range,
    cut
  );
  const resolvedOrders = await resolveCateSeriesToLine(cutOrders);
  return { data: resolvedOrders, lable };
}

/**
 * 对时间进行切割,并返回对应时间段的一系列订单统计数据
 * @param orders 订单
 * @param start 起始日期,时间戳
 * @param end   终止日期,时间戳
 * @param range 时间跨度
 * @param cut   要将日期分为多少段
 */
function cutAndCountOrder(
  orders: any,
  start: any,
  end: any,
  range: any,
  cut: any
) {
  // 计算出每段时间的长度,四舍五入,单位是天
  const per = Math.ceil(range / cut);
  // 第一段时间的起始和结束
  let perStart: any = moment(start); // 00:00
  let perEnd: any = moment(perStart).add(per, 'day').subtract(1, 'seconds'); // 23:59
  // 返回的数据
   const data = [];
  // 时间点，折线图X轴,初始值为坐标轴起点
  const lable = [];
  while (perEnd.format('x') <= end) {
    // 转为时间戳
    const perStartX = perStart.format('x');
    let perEndX = perEnd.format('x');
    // 筛选出订单
    const selectedOrder = selectOrderByDate(orders, perStartX, perEndX);
    // 调用统计方法
    const res = countOrder(selectedOrder);
    data.push(res);

    // 根据时间间隔不同,采用不同的日期lable
    per === 1
      ? lable.push(perStart.format('YYYY-MM-DD'))
      : lable.push(
          perStart.format('MM.DD') + '~' + perEnd.format('MM.DD')
        );

    // 计算下一段时间的起始和结束,每段时间的开始是上一段时间的结尾加1s,指向第二天的00：00
    perStart = moment(perEnd).add(1,'seconds');
    perEnd = moment(perStart).add(per, 'day').subtract(1, 'seconds');;

    // 如果下一段时间起始和结束中间包括了end,则直接让下段的结束时间置为end
    if (perEnd.format('x') > end && perStart.format('x') <  end) {
      perEnd = moment(end);
    }
  }

  return { data, lable };
}

/**
 * 将数据处理为前端echarts折线图图所要求的
 * @param orders 订单
 * @returns 
 */
async function resolveCateSeriesToLine(orders: any) {
  // 处理为 [[name:xxx, data:[]]]
  // 获取分类数据
  const categoryList = await CategoryDao.getCategories();
  const baseCateName: any[] = [];
  (categoryList as any[]).forEach((item: any) => {
    if (item.cat_Level === 1) {
      baseCateName.push(item.cat_Name);
    }
  });
  const result: any[] = [];
  // 填充数据，以0进行填充占位
  // 数据处理为 [[name:xx,count:[0,0,0,0,0],weight:[0,0,0,0,0]]]的形式
  baseCateName.forEach((item) => {
    result.push({
      name: item,
      count: new Array(orders.length).fill(0),
      weight: new Array(orders.length).fill(0),
    });
  });

  // 将订单的数据填充到0占位处
  result.forEach((item1: any, index1: any) => {
    orders.forEach((item2: any, index2: any) => {
      item2.countCate.forEach((item3: any) => {
        if (item1.name == item3.name) {
          item1.count[index2] += item3.count;
          item1.weight[index2] += item3.weight;
        }
      });
    });
  });

  // 剔除掉全0项,count/weight数组全是0,渲染到折线图没意义
  const res: any[] = [];
  result.forEach((item: any) => {
    // [0,0,0,0] => '0000' == 0
    if (item.count.join('') != 0) {
      res.push(item);
    }
  });
  return res;
}
