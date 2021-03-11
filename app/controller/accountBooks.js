'use strict';

const Controller = require('egg').Controller;

const createRule = {
  amount: 'int', 
  date: 'date',
  status: [ '1', '2', '3', '4', '5' ],
  desc: 'string?',
};

class AccountBookController extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.request.query;
    const res = await service.accountBooks.index(payload);

    ctx.helper.success({ ctx, res });
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    ctx.validate(createRule, payload);
    const res = await service.accountBooks.create(payload);

    ctx.helper.success({ ctx, res });
  }
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const payload = ctx.request.body;
    const res = await service.accountBooks.update(id, payload);

    ctx.helper.success({ ctx, res });
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.accountBooks.destroy(id);

    ctx.helper.success({ ctx, res });
  }
}

module.exports = AccountBookController;
