'use strict';

exports.success = ({ ctx, res = null, message = 'success' }) => {
  ctx.body = {
    code: 0,
    data: res,
    message,
  };
  ctx.status = 200;
};
exports.error = ({ ctx, error = null, status = 401, message = 'error' }) => {
  ctx.body = {
    code: 401,
    message,
    ...error,
  };
  ctx.status = status;
};

const checkType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

const deleteKeys = obj => {
  const res = {};
  Object.keys(obj).forEach(key => {
    if (checkType(obj[key]) === 'Object') {
      obj[key] = deleteKeys(obj[key]);
      if (!Object.keys(obj[key]).length) {
        obj[key] = undefined;
      }
    }
    if (obj[key] !== undefined) {
      res[key] = obj[key];
    }
  });
  return res;
};

exports.deleteKeys = deleteKeys;
