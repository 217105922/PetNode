const model = require('../models/codes');
const Router = require('koa-router');
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const prefix = '/api/v1/codes';
const router = Router({ prefix: prefix });
const request = require('request');

router.get('/',auth, getAll);
router.get('/:id([A-Za-z-0-9]{1,})',auth, getByCode)
router.put('/gen',auth, generateCode);

async function getByCode(ctx) {
  const permission = can.staff(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    console.log("getByCode");
    let id = ctx.params.id;
    let code = await model.getByCode(id);
    if (code.length) {
      ctx.body = code[0]
    }

  }

}

async function getAll(ctx) {
  const permission = can.staff(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403;
  } else {

    let codes = await model.getAll();
    console.log("getAll");
    if (codes.length) {
      ctx.body = codes
    }
  }





}


async function generateCode(ctx) {
  const permission = can.staff(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let parm = (Math.random() + 1).toString(36).substring(7);
    if (parm.length) {
      let codes = await model.generateCode(parm);
      if (codes.length) {
        ctx.body = codes
      }
    }

  }



}

module.exports = router;