const model = require('../models/codes');
const Router = require('koa-router');
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const prefix = '/api/v1/codes';
const router = Router({prefix: prefix});
const request = require('request');

router.get('/', getAll);
router.get('/:id([A-Za-z-0-9]{1,})', getByCode)
router.put('/gen', generateCode);

async function getByCode(ctx) {
 console.log("getByCode");
  let id = ctx.params.id;
  let code = await model.getByCode(id);
  if (code.length) {
    ctx.body = code[0]
  }
}

async function getAll(ctx) {
let codes = await model.getAll();
 console.log("getAll");
  if (codes.length) {
    ctx.body = codes
  }
}


async function generateCode(ctx){
  let codes = await model.generateCode();
   if (codes.length) {
    ctx.body = codes
  }
}

module.exports = router;