const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const KoaParameter = require('koa-parameter');

const router = require('../router')
const errorHandle = require('../middleware/errorHandle')

const app = new Koa();

app.use(KoaBody({
  multipart: true,
  formidable: {
    //不要使用相对路径， 因为相对路径是相对于当前进程的路径process.cwd()
    uploadDir: path.join(__dirname, '../upload'), 
    keepExtensions: true,
  }
}));
app.use(KoaStatic(path.join(__dirname, '../upload'))) // 将upload作为静态资源的路径
app.use(KoaParameter(app)) // 需要在router注册前注册
app.use(router.routes());
// app.use(router.allowedMethods());

// 统一的错误处理
app.on('error', errorHandle)

module.exports = app;
