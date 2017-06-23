'use strict';

const superagent = require('superagent');
const expect = require('expect');
const Article = require('../models/article.js')
const server = require('../lib/server.js');
let tempArticle;

describe('testing article routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });
  describe('testing POST /api/notes', () => {
    it('should respond with an article', (done) => {
      superagent.post('localhost:3000/api/articles')
        .send(JSON.stringify({title: 'The art of coding', author: 'Ryan Turner'}))
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.title).toEqual('The art of coding');
          expect(res.body.author).toEqual('Ryan Turner');
          tempArticle = res.body;
          done();
        });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/articles')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  // describe('testing GET /api/notes', () => {
  //   it('should respond with a note', (done) => {
  //     superagent.get(`localhost:3000/api/notes?id=${tempNote.id}`)
  //     .end((err, res) => {
  //       if (err) return done(err)
  //       expect(res.status).toEqual(200)
  //       expect(res.body.id).toEqual(tempNote.id)
  //       expect(res.body.content).toEqual('example data')
  //       tempNote = res.body;
  //       done()
  //     })
  //   })
  // });
});
