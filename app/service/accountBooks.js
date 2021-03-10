'use strict';

const Service = require('egg').Service;

class AccountBookService extends Service {
  async index(payload) {
    const { ctx } = this;
    console.log(payload);
    const data = await ctx.model.AccountBooks.find();
    // console.log(data)
    return { data };
  }
  async create(payload) {
    const { ctx } = this;
    const userId = ctx.state.user.data._id;
    const data = {
      ...payload,
      userId,
    };
    // console.log(data)
    const res = await ctx.model.AccountBooks.create(data);
    return res;
  }
  async update(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.AccountBooks.findByIdAndUpdate(id, payload);

    return res;
  }
  async destroy(id) {
    const { ctx } = this;
    const res = await ctx.model.AccountBooks.findByIdAndDelete(id);

    return res;
  }
}

module.exports = AccountBookService;
