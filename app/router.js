'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/api/', jwt, controller.home.index);

  router.post('/api/createuser', controller.user.create)
  router.post('/api/login', controller.user.login)
};
