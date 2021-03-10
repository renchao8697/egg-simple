'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/', controller.home.index);

  router.post('/api/createuser', controller.user.create);
  router.post('/api/login', controller.user.login);
};
