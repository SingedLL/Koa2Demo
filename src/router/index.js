
const fs = require('fs');
const Router = require('koa-router')

// const user = require('../router/user')
// const story = require('../router/story')

// const router = new Router()
//   .use('/user', user.routes())
//   .use('/story', story.routes())



const router = new Router()
fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})
module.exports = router