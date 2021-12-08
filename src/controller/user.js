const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.base')
const {
  createUser, 
  getUserInfo,
  updateById
} = require('../service/user')
const {userRegisterError} = require('../constants/errorType')

class UserController {
  async register(ctx, next) {
    const {name, password} = ctx.request.body;
    // 操作数据库
    try {
      const res = await createUser(name, password)
    } catch(err) {
      ctx.app.emit('error', userRegisterError, ctx)
    }
   
    ctx.body = '用户注册成功'
  }

  async getInfo(ctx, next) {
    ctx.body = '您好， lemon'
  }

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

  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const {password} = ctx.request.body;
    if(await updateById({id, password})) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: ''
      }
    }
  }
}

module.exports = new UserController()