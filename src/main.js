const {APP_PORT} = require('./config/config.base')

const app = require('./init');

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})