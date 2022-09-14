import { $ } from 'zx'
import kill from 'kill-port'
import autocannon from 'autocannon'

const frameworks = [
  {
    name: 'express',
    port: 3001,
  },
  {
    name: 'fastify',
    port: 3002,
  },
  {
    name: 'hono',
    port: 3003,
  },
]

async function killPorts() {
  try {
    for await (const fw of frameworks) {
      await kill(fw.port)
    }
  } catch (e) {}
}
await killPorts()

try {
  for await (const fw of frameworks) {
    $`PORT=${fw.port} node src/${fw.name}.mjs`
  }
} catch (e) {
  console.error(e)
}

const connections = 50
const duration = 10

console.log({ connections, duration })

const results = []
try {
  for await (const fw of frameworks) {
    const result = await autocannon({
      url: `http://127.0.0.1:${fw.port}`,
      connections,
      duration,
    })

    results.push({
      name: fw.name,
      reqSec: result.requests.average,
      latency: result.latency.average,
      throughput: result.throughput.average,
    })
  }
} catch (e) {
  console.error(e)
}

console.log('')

for (const result of results) {
  console.log(
    result.name.padEnd(
      frameworks.reduce((c, f) => (f.name.length > c ? f.name.length : c), 0),
      ' '
    ),
    Math.round(result.reqSec).toLocaleString('en').padStart(12, ' '),
    'req/seq'
  )
}

setImmediate(() => {
  killPorts()
})

process.exit()
