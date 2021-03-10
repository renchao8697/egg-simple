'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }

  async login(payload) {
    const { ctx } = this;

    const user = await ctx.model.User.findOne({ username: payload.username });

    if (!user) {
      return {
        success: false,
        message: '用户不存在',
      };
    }

    const verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      return {
        success: false,
        message: '密码错误',
      };
    }

    const token = await this.apply(user._id);

    return {
      username: user.username,
      id: user._id,
      token,
    };
  }

  async create(payload) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }
}

module.exports = UserService;
