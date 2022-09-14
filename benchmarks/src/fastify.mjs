// https://github.com/fastify/benchmarks/blob/master/benchmarks/fastify.js

import Fastify from 'fastify'

const fastify = Fastify()
const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string',
          },
        },
      },
    },
  },
}

fastify.get('/', schema, function (req, reply) {
  reply.send({ hello: 'world' })
})

const port = process.env.PORT

fastify.listen({ port, host: '127.0.0.1' })

console.log(`🏁 http://127.0.0.1:${port} fastify`)
