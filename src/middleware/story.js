const {
  paramsError
} = require('../constants/errorType')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      title: {type: 'string', require: true},
      desc: {type: 'string', require: true},
      filename: {type: 'string', require: true}
    })
  } catch(err) {
    console.error(err)
    return ctx.app.emit('error', paramsError, ctx)
  }

  await next();
}




module.exports = {
  validator
}