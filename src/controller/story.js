
const path = require('path');

const {
  uploadFileError, 
  fileTypeError,
  createStoryError,
  invalidStoryId,
  updateStoryError,
} = require('../constants/errorType')
const {
  createStory,
  updateStory,
  removeStory
} = require('../service/story')

class StoryController {
  async uploadFile(ctx) {
    const {file} = ctx.request.files;
    const fileTypes = ['image/jpeg', 'image/png']
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', fileTypeError, ctx)
      }
      ctx.body = {
        code: 0,
          message: '上传文件成功',
          result: {
            img: path.basename(file.path)
          }
      }
    } else {
      ctx.app.emit('error', uploadFileError, ctx)
    }   
  }

  async createStory(ctx) {
    const {title, desc, filename} = ctx.request.body; 
    try {
      const res = await createStory(ctx.request.body); 
      ctx.body = {
        code: 0, 
        message: '上传故事成功',
        result: res
      }
    } catch(err) {
      console.error(err)
      return ctx.app.emit('error', createStoryError, ctx)
    }
  }

  async updateStory(ctx) {
    //const {title, desc, filename} = ctx.request.body; 
    try {
      const res = await updateStory(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0, 
          message: '更新故事成功',
          result: res
        }
      } else {
        return ctx.app.emit('error', invalidStoryId, ctx)
      }
    } catch(err) {
      console.error(err)
      return ctx.app.emit('error', updateStoryError, ctx)
    }
  }

  async removeStory(ctx) {
    try {
      const res = await removeStory(ctx.params.id)
      ctx.body = {
        code: 0, 
        message: '删除故事成功',
        result: ''
      }
    } catch(err) {

    }
  }
}

module.exports = new StoryController()