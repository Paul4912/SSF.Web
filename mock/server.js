const jsonServer = require('json-server')
const data = require('./data')
const routesPost = require('./routesPost')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3008

routesPost(server)

server.use(jsonServer.router(data))
server.use(middlewares)
server.listen(port)