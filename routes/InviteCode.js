
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const prefix = '/api/v1/codes';
const router = Router({prefix: prefix});
const model = require('../models/InviteCode')
const request = require('request')


router.get('/:id([0-9][A-Za-z]{1,})', getByCode)
router.get('/)', getAll)

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