'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body ?? {};

    const res = await service.user.login(payload);

    if (res.success === false) {
      ctx.helper.error({ ctx, error: res });
    } else {
      ctx.helper.success({ ctx, res });
    }
  }

  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body ?? {};
    const res = await service.user.create(payload);

    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
