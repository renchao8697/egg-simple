'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = 'egg';
    ctx.helper.success({ ctx, res });
  }
}

module.exports = HomeController;
