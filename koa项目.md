

### 一、项目初始化 (生成package.json)

​      npm init -y

### 二、git初始化

​      git init

​      生成.git隐藏文件夹， git的本地仓库 

###  三 、搭建项目

1. 安装Koa框架 

​       npm install koa

   2. 根目录下创建src目录，添加main.js

      ```const Koa = require('koa');
      const Koa = require('koa');
      
      const app = new Koa();
      app.use((ctx, next) => {
        ctx.body = 'hello api'
      })
      
      app.listen(6000, () => {
        console.log("server is running on http://localhost:6000")
      })
      ```

3. 在终端输入 node src/main.js启动项目

4. 自动重启服务

   a. 安装nodemon 执行  npm i nodemon

   b. 在package.json的scripts下添加  "start": "nodemon ./src/main.js,

   ​    然后执行 npm run start.

   > 以上是最基础的内容， 以下是对项目的一步步优化

   

5. 配置文件

   a. 安装dotenv,  读取跟目录的.env文件 ，将配置写入process.env中    

   ​    npm i dotenv

   b. 创建.env文件， 写入一些配置， 例如

   ​    APP_PORT = 6000

6. 更新main.js内容

   ```const Koa = require('koa');
   const Koa = require('koa');
   const {APP_PORT} = require('./config/config.base')
   
   const app = new Koa();
   
   app.use((ctx, next) => {
     ctx.body = 'hello word'
   })
   
   app.listen(APP_PORT, () => {
     console.log(`server is running on http://localhost:${APP_PORT}`)
   })
   ```

   

   

7. 添加路由

   a. 安装koa-router 

   ​    npm i koa-router

   b. 进行路由配置(src/router/user.js)

       ```
       const Router = require('koa-router')
       const router = new Router({prefix: '/user'})
       
       router.get('/', (ctx, next) => {
         ctx.body = 'hello user'
       })
       
       module.exports = router
       ```

   c. 在main.js中导入路由即可

8. 安装koa-body， 解析body

   npm i koa-body

9. Sequelize ORM数据库工具 (v6版本MySql最低支持版本为5.7)

   npm install --save sequelize

   npm install --save mysql2

10. 创建src/db/seq.js 

   > 查看是否安装了mysql, 在系统偏好设置可看到MySql,  如果没有则需要安装MySql

   ```
   const {Sequelize} = require('sequelize')
   const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB}  =  require('../config/config.base')
   const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
     hots: MYSQL_HOST,
     dialect: 'mysql'
   })
   
   seq.authenticate().then(() => {
     console.log("数据库连接成功")
   }).catch(err => {
     console.log("数据库连接失败", err)
   })
   ```

   执行node src/db.seq.js 

   若看到打印"数据库连接成功"， 则说明配置成功

11. 创建模型 src/model/user.js

    ```
    const {Sequelize, DataTypes} = require('sequelize');
    const sequelize = new Sequelize();
    
    // 创建模型
    const User = sequelize.define('User', {
      // id 会被sequelize自动创建
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, // 是否唯一
        comment: '用户名 不唯一'
      },
      password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
      },
    })
    // 强制同步数据库（创建数据表）
    User.sync({force: true})
    
    // sequelize.define 会返回模型
    console.log(User === sequelize.model.User);
    
    module.exports = User
    ```

12. 密码加密/解密 bcrypt.js

    npm i bcryptjs

    ```
    const crptyPassword = async (ctx, next) => {
      const {password} = ctx.request.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt); // 加密
      ctx.request.body.password = hash;
    
      await next()
    }
    ```
    
    ```
    // 验证密码
    if (!bcrypt.compareSync(password, res.password)) {
        ctx.app.emit('error', invalidPassword, ctx)
        return;
    }
    ```
    
    
    
12. 用户认证 （token）

    JWT:  JSON WEB TOKEN

    header: 头部

    payload: 载荷

    signature: 签名

    a. 安装jsonwebtoken

    ​    npm i jsonwebtoken

    b. 登录接口里返回token

        ```
        async login(ctx, next) {
            const {name, password} = ctx.request.body;
            try {
              const {password, ...res} = await getUserInfo({name})
        
              ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                  token: jwt.sign(res, JWT_SECRET, {expiresIn: '30d'})
                }
              }
            } catch(err) {
              console.error('用户登录失败', err)
            }
        }
        ```
    
    c. 其他接口需要先验证token
    
    ```
    const auth = async (ctx, next) => {
      const {authorization} = ctx.request.header;
      const token = authorization.replace('Bearer ', '')
      console.log("L__token", token)
      try {
        //user 中包含了payload的信息(id, name)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user;
      } catch(err) {
        switch(err.name) {
          case 'TokenExpiredError':
            console.error('Token过期了', err)
            return ctx.app.emit('error', tokenExpiredError, ctx)
          case 'JsonWebTokenError': 
            console.error('无效的Token', err)
            return ctx.app.emit('error', invalidError, ctx)
        }
      }
    
      await next();
    }
    ```
    
    
    
12. 

    

    

    

    

    

    

    

    

  