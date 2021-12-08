const Router = require('koa-router')
const {auth} = require('../middleware/auth')

const {
  validator
} = require('../middleware/story')

const {
  createStory,
  uploadFile,
  updateStory,
  removeStory
} = require('../controller/story')

const router = new Router({prefix: '/story'})

router.post('/uploadFile', auth, uploadFile)
router.post('/create', auth, validator, createStory)
router.put('/update/:id', auth, updateStory)
router.delete('/:id', auth, removeStory)

module.exports = router
