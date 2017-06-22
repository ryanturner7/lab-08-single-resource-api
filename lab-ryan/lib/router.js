'use strict';

const requestPars = require('./request-parse.js');

const routes = {
  GET: { },
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) {
  routes.GET[pathname] = callback;
};
router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};
router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};
router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};
router.route = (req, res) => {
  request.parse(req, err) => {
    if(err) {
      res.writeHead(4000);
      res.end();
      return;
    }
    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(400);
      res.end();
    }
  });
};
