'use strict';

const http = require('http');
const router = require('./router.js');
const requestParse = require('./request-parse.js');
const uuid = require('uuid');
const storage = require('../model/storage.js');
const Article = require('../models/article.js');

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

router.get('/api/article', (req, res) => {
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
router.put('/api/articles', (req, res) => {
  let body = req.body;
  if(!body || !body.title || !body.author){
    res.write(400);
    res.end();
    return;
  }
  res.writeHead(202, {
    'Content-type' : 'application/json',
  });
  storage[req.url.query.id].title = req.body.title;
  storage[req.url.query.id].author = req.body.author;
  res.writeHead(JSON.stringify(storage[req.url.query.id]));
  res.end();
  return;
});
router.delete('/api/article', (req, res) => {
  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.write('invalid id');

    res.end();
    return;
  }
  delete storage[req.url.query.id];
  res.writeHead(204, {
    'Content-type' : 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});
const server = module.exports = http.createServer(router.route);
