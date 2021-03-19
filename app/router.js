'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/', controller.home.index);

  router.post('/api/register', controller.user.create);
  router.post('/api/login', controller.user.login);

  router.resources('accounts', '/api/accounts', app.controller.accounts);
};
