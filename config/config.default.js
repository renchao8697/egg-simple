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

  config.noAuthRouter = ['/api/login']

  // add your middleware config here
  config.middleware = [
    'auth',
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
    secret: '_renchao',
    // enable: true,
    // ignore: '/api/login'
  }

  config.mongoose = {
    url: 'mongodb://localhost:27017/egg_simple',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
