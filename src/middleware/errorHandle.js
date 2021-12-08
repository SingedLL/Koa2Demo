module.exports = (err, ctx) => {
  let status = 500;
  switch(err.code) {
    case '10001':
      status = 400
      break;
    case '10002':
      status = 409
      break; 
    default:
      status = 500;
  }

  console.log('errInfo', err)
  ctx.status = status;
  ctx.body = {
    code: err.code || 500,
    message: err.message || ''
  }
  console.log(err)
}