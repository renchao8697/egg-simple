'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(ctx.state.user)
    const res = 'egg'
    ctx.helper.success({ctx, res})
  }
}

module.exports = HomeController;
