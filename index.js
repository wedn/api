const Koa = require('koa')
const config = require('./config')

const app = new Koa()

// x-response-time

app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response

app.use(ctx => {
  ctx.body = 'Hello World'
})

if (require.main !== module) {
  module.exports = app
} else {
  app.listen(config.server.port, err => {
    if (err) throw err
    console.log(`\n> Listening at http://localhost:${config.server.port}/\n`)
  })
}
