'use strict';

const uuid = require('uuid');

module.exports = function Article(title, author, publishedOn){
  this.title = title;
  this.author = author;
  this.publishedOn = publishedOn;
  this.id = uuid.v1();
};
