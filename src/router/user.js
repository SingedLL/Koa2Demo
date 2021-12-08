const Router = require('koa-router')
const {auth} = require('../middleware/auth')
const {
  userValidator, 
  verifyUser, 
  crptyPassword,
  verifyLogin,
} = require('../middleware/user')

const {
  register, 
  login, 
  getInfo,
  changePassword
} = require('../controller/user')

const router = new Router({prefix: '/user'})

// 注册用户
router.post('/register', userValidator, verifyUser, crptyPassword, register)

// 用户登录
router.post('/login', verifyLogin, login)

// 获取用户信息
router.get('/', getInfo)

// 修改密码
router.patch('/', auth, crptyPassword, changePassword)

module.exports = router