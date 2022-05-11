
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const prefix = '/api/v1/codes';
const router = Router({prefix: prefix});
const model = require('../models/inviteCode')
const request = require('request')

router.get('/)', getAll)
router.get('/:id([0-9][A-Za-z]{,20})', getByCode)


async function getByCode(ctx) {
  print()
  let id = ctx.params.id
  let code = await model.getByCode(id)
  if (code.length) {
    ctx.body = code[0]
  }
}

async function getAll(ctx) {
let codes = await model.getAll(20,1)
  if (codes.length) {
    ctx.body = codes
  }
}

module.exports = router;