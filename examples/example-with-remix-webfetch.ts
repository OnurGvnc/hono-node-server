import { serve } from '../src/server-with-remix-webfetch' // Write above `Hono`
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hono meets Node.js'))

const port = 3010
serve({
  fetch: app.fetch,
  port,
})

console.log(`🏁 http://localhost:${port}`)
