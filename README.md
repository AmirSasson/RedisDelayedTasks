# RedisDelayedTasks
## description:
nodejs based system 

```
                    +----------+                          +-----------+
                 +-----------+ |                       +------------+ |
                 |           | |                       |            | |
                 |           | |                       |            | |
post(msg,delay)  |           | |                       |            | |
  +------------> |    API    | |                       |   Worker   | |
                 |           | |                       |            | |
                 |           +-+                       |            +-+
                 |           |                         |            |
                 +----+------+                         +-----+------+
                      |                                      |
                      |            +-----------+             |
                      |            |           |             |
                      |            |           |             |
                      |            |           |             |
                      +----------->+  REDIS Q  +<------------+
                                   |           |
                                   |           |
                                   |           |
                                   |           |
                                   +-----------+

```

## Getting started:
### prerequisites:
* node v12 or above
* docker 
* redis docker image (`docker pull redis`)
* postman (optional)
### start
* `$ docker run -p 6379:6379 redis`
* `$ npm install`
* `$ npm run start:web`
* `$ npm run start:worker`
* optionally you can run a local client that generates messages: `$ npm run start:local-client`

