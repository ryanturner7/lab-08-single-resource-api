'use strict';

const http = require('http');
const router = require('./router.js');
const requestParse = require('./request-parse.js');
const Article = require('../models/article.js');

let storage = {};


router.post('/api/article', (req, res) => {
  console.log('hit /api/notes');
  if(!req.body){
    res.writeHead(400);
    res.end();
    return;
  }
  let newArticle = new Article (req.body.title, req.body.author);
  article.id = uuvd.v1();
  storage[newArticle.id] = newArticle;

  res.writeHead(201, {
    'Content-type' : 'application/json',
  });
  res.write(JSON.stringify(newArticle));
  res.end();
  return;
});

// uuid  generate a random string that will not likely conflict with a future random string
router.get('/api/articles', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('bad request');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return;
  }
  if(req.url.query.id){
    res.writeHead(200, {
      'Content-type' : 'application/json',
    });
    res.write(JSON.stringify(storage[req.url.query.id]));
    res.end();
  }
});

// 
//
// router.put('/api/notes', (req, res) => {
//   if(!req.url.query.id){
//     res.writeHead(400);
//     res.end();
//     return ;
//   }
//
//   if(!storage[req.url.query.id]){
//     res.writeHead(404);
//     res.end();
//     return ;
//   }
//
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//
//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
//
// });
//
// // create server
// const server = module.exports = http.createServer(router.route);


// how we did it first
//http.createServer((req, res) => {
  //router.route(req,res)
//})
