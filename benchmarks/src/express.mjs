// https://github.com/fastify/benchmarks/blob/master/benchmarks/express.js

import express from 'express'

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.get('/', function (req, res) {
  res.json({ hello: 'world' })
})

const port = process.env.PORT

app.listen(port)

console.log(`🏁 http://127.0.0.1:${port} express`)
