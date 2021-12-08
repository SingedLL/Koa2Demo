const  bcrypt = require('bcryptjs');

const {getUserInfo} = require('../service/user')

const {
  userFormateError, 
  userAlreadyExisted,
  userRegisterError,
  userLoginError,
  invalidPassword
} = require('../constants/errorType')

const userValidator = async (ctx, next) => {
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    ctx.app.emit('error', userFormateError, ctx)
    return;
  }
  await next();
}

const verifyUser = async (ctx, next) => {
  const {name, password} = ctx.request.body;
  
  try {
    const res = await getUserInfo({name, password})
    if (res) {
      console.error('用户名已存在', name)
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return;
    }
  } catch (err) {
    ctx.app.emit('error', userRegisterError, ctx)
  }

  await next();
}

const crptyPassword = async (ctx, next) => {
  const {password} = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next()
}

const verifyLogin = async (ctx, next) => {
  const {name, password} = ctx.request.body;

  try {
    const res = await getUserInfo({name})
    console.log('res', res)
    if (!res) {
      console.error('用户不存在', {name})
      ctx.app.emit('error', userNotExist, ctx)
  
      return;
    }

    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return;
    }
  } catch(err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}


module.exports = {
  userValidator,
  verifyUser,
  crptyPassword,
  verifyLogin
}