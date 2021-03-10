'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    const { noAuthRouter, jwt } = app.config;
    const { url } = ctx;
    const flag = noAuthRouter.includes(url);
    if (flag) {
      await next();
    } else {
      let token = ctx.get('Authorization');
      token = token.substring(7);
      try {
        ctx.state.user = await app.jwt.verify(token, jwt.secret);

        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: 'invalid token',
        };
      }
    }
  };
};
