const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/config.base')
const {
  tokenExpiredError,
  jsonWebTokenError
} = require('../constants/errorType')

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

module.exports = {
  auth
}