'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('server');

describe('testing routes', (){
  before((done) => {
    server.listen(3000, () => {
      console.log('server is up for testing');
      done();
    });
  });
  after((done) => {
    server.close(() => {
      console.log('testing finished');
      done();
    })
  })
}
