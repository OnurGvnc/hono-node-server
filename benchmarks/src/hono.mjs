import { serve } from '@honojs/node-server'
// import { serve } from '../../dist/server.js'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.json({ hello: 'world' }))

const port = process.env.PORT

serve({
  fetch: app.fetch,
  port,
})

console.log(`🏁 http://127.0.0.1:${port} hono`)
