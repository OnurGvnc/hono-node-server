# @honojs/node-server with [@remix-run/web-fetch](https://github.com/remix-run/web-std-io/blob/main/packages/fetch/Readme.md)

MacBookAir10,1 M1 16GB RAM 8 Core

|                           |               |
| ------------------------- | ------------: |
| with @remix-run/web-fetch | 43463 Req/Sec |
| with node-fetch           | 35352 Req/Sec |
| with undici               | 17131 Req/Sec |

### with undici

```sh
yarn tsx examples/example-with-undici.ts
yarn autocannon -c 50 -d 10 http://localhost:3010


Running 10s test @ http://localhost:3010
50 connections

┌─────────┬──────┬──────┬───────┬──────┬────────┬────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg    │ Stdev  │ Max   │
├─────────┼──────┼──────┼───────┼──────┼────────┼────────┼───────┤
│ Latency │ 2 ms │ 2 ms │ 5 ms  │ 6 ms │ 2.3 ms │ 0.9 ms │ 37 ms │
└─────────┴──────┴──────┴───────┴──────┴────────┴────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 13791   │ 13791   │ 17535   │ 17807   │ 17131.6 │ 1149.06 │ 13784   │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.51 MB │ 2.51 MB │ 3.19 MB │ 3.24 MB │ 3.12 MB │ 209 kB  │ 2.51 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

171k requests in 10.01s, 31.2 MB read
```

### with [@remix-run/web-fetch](https://github.com/remix-run/web-std-io/blob/main/packages/fetch/Readme.md)

```sh
yarn tsx examples/example-with-remix-webfetch.ts
yarn autocannon -c 50 -d 10 http://localhost:3010

Running 10s test @ http://localhost:3010
50 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 1 ms │ 2 ms  │ 2 ms │ 0.88 ms │ 0.45 ms │ 11 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼────────┼─────────┤
│ Req/Sec   │ 41855   │ 41855   │ 43807   │ 44799   │ 43463.28 │ 955.15 │ 41825   │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼────────┼─────────┤
│ Bytes/Sec │ 7.61 MB │ 7.61 MB │ 7.97 MB │ 8.15 MB │ 7.91 MB  │ 174 kB │ 7.61 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 11

478k requests in 11.01s, 87 MB read
```

### with [node-fetch](https://github.com/node-fetch/node-fetch)

```sh
yarn tsx examples/example-with-node-fetch.ts
yarn autocannon -c 50 -d 10 http://localhost:3010

Running 10s test @ http://localhost:3010
50 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 1 ms │ 1 ms │ 2 ms  │ 2 ms │ 1.04 ms │ 0.26 ms │ 10 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼────────┼─────────┤
│ Req/Sec   │ 33855   │ 33855   │ 35455   │ 36319   │ 35352.73 │ 643.79 │ 33850   │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼────────┼─────────┤
│ Bytes/Sec │ 6.16 MB │ 6.16 MB │ 6.45 MB │ 6.61 MB │ 6.43 MB  │ 116 kB │ 6.16 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 11

389k requests in 11.01s, 70.8 MB read
```
