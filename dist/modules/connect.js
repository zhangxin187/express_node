"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
mongoose_1.default.connect('mongodb://express:123456@localhost/express').then(() => {
    console.log('数据库连接成功');
}, () => {
    console.log('数据库连接失败');
});
