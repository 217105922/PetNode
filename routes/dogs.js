const {validatedogs} = require('../controllers/validation');
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const model = require('../models/articles')
const likes = require('../models/likes');
const prefix = '/api/v1/dogs';
const router = Router({prefix: prefix});
const request = require('request')



const can = require('../permissions/users');



router.get('/', getAll)
router.post('/', bodyParser(),auth, createDog)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})',bodyParser(),auth,updateDog)
router.del('/:id([0-9]{1,})',auth, deleteDog)
router.get('/:id([0-9]{1,})/likes', likesCount);
router.get('/like/:id([0-9]{1,})',findUserLike);
router.post('/:id([0-9]{1,})/likes/lc', likesCheck);
router.post('/:id([0-9]{1,})/likes', auth, likePost);
router.del('/:id([0-9]{1,})/likes', auth, dislikePost);


async function getAll(ctx) {

  const {page=1, limit=100, order="dateCreated", direction='ASC'} = ctx.request.query;
  const result = await model.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(post => {
      // extract the post fields we want to send back (summary details)
      const {id, title, imageurl, summary,  authorid} = post;
      // add links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
       likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
       self: `https://${ctx.host}${prefix}/${post.id}`
        
      }
      return {id, title,imageurl, summary,  authorid, links};
    });
    ctx.body = body;
    
  }
}


async function getById(ctx) {
  
  let id = ctx.params.id
  let article = await model.getById(id)
  if (article.length) {
       const body = article.map(post => {
      // extract the post fields we want to send back (summary details)
      const {id, title, imageurl, summary,  authorid} = post;
      // add links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
       likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
       self: `https://${ctx.host}${prefix}/${post.id}`
        
      }
      return {id, title,imageurl, summary,  authorid, links};
    });
    ctx.body = body;
  }
  
}

async function createDog(ctx) {
 const permission = can.staff(ctx.state.user)
   if (!permission.granted) {
    ctx.status = 403;
  } else {

     
  const body = ctx.request.body
    
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
   }
  

}


async function updateDog(ctx) {
  // TODO edit an existing article

 const permission = can.staff(ctx.state.user)
   if (!permission.granted) {
    ctx.status = 403;
  } else {

   const body = ctx.request.body
   let id = ctx.params.id
 // console.log("route-article " , body)
 // console.log("route-id ",id)
  let result = await model.update(body,id)
  if (result) {
    ctx.status = 201
    ctx.body = `${JSON.stringify(body)}` 
  } 
   }
  

}

async function deleteDog(ctx) {
  // TODO delete an existing article

  
 const permission = can.staff(ctx.state.user)
   if (!permission.granted) {
    ctx.status = 403;
  } else {
   let id = ctx.params.id
  let article = await model.deleteById(id)
  ctx.status=201
    ctx.body = `Article with id ${id} deleted`
}
}


async function likesCount(ctx) {
  // For you TODO: add error handling and error response code
  const id = ctx.params.id;
  const result = await likes.count(id);
  ctx.body = result ? result : 0;
}

async function likesCheck(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.findLikeCheck(id,uid);
  ctx.body = result.exisiting ? {message: "exit"} : {message: "error"};
}
async function likePost(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.like(id, uid);
  console.log(result);
  ctx.body = result.affectedRows ? {message: "liked"} : {message: "error"};
}

async function dislikePost(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.dislike(id, uid);
  console.log(result);
  ctx.body = result.affectedRows ? {message: "disliked"} : {message: "error"};
}

async function findUserLike(ctx){

  const uid = parseInt(ctx.params.id);
  const result = await likes.findUserLike(uid);
   ctx.body = result;
}

module.exports = router;