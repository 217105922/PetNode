const Koa = require('koa')
const static = require('koa-static-router')
const app = new Koa()

const special = require('./routes/special')
const dogs = require('./routes/dogs')
const uploads= require('./routes/uploads')
const users = require('./routes/users')
const cors = require('@koa/cors');
const code = require('./routes/codes')

app.use(cors());
app.use(special.routes())
app.use(dogs.routes())
app.use(users.routes())
app.use(uploads.routes())
app.use(code.routes())
app.use(static({dir:'docs', router: '/doc/'}))

let port = process.env.PORT || 10888;

app.listen(port)
console.log('API is ready', port)