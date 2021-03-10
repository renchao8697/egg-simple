'use strict';

exports.success = ({ ctx, res = null, message = 'success' }) => {
  ctx.body = {
    code: 0,
    data: res,
    message,
  };
  ctx.status = 200;
};
