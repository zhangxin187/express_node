# express_node
## 毕设物流管理系统node端

### 技术栈
* koa
* TS
* MongoDB
* Jwt

### 项目结构
|----`config`    配置文件目录，存储一些配置信息  
|----`dao`       数据访问层，存放对数据库的增删改查操作  
|----`models`    存放数据库模型  
|----`modules`   当前项目自定义模块  
|----`routes`    路由模块  
|----`services`  服务层，业务逻辑代码在这一层编写，将数据处理成前端需要的格式  
|----`logs`      日志目录  
|----`types`     定义变量类型  
|----`uploads`   上传文件存放目录  
|----`app.js`    项目入口文件

### 启动项目
`npm run dev`
