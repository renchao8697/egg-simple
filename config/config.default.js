/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_18645008305';

  // add your middleware config here
  config.middleware = [
    'errorHandler'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: true,
      ignoreJSON: true
    },
    // 添加白名单
    domainWhiteList: ['http://localhost:8000']
  }

  config.jwt = {
    secret: 'renchao',
    // enable: true,
    // match: /^\/api/
  }

  config.mongoose = {
    url: 'mongodb://localhost:27017/egg_simple',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }

  config.onerror = {
    all(err, ctx) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志 
      ctx.app.emit('error', err, this)
      const status = err.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息 
      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: status,
        // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误 533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码 
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = 200
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
