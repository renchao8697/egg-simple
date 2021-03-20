'use strict';

const { Controller } = require('egg');

const createRule = {
  date: 'string',
  tagData: 'array',
};

class CalendarController extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.request.query;
    const res = await service.calendars.index(payload);

    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    ctx.validate(createRule, payload);
    const res = await service.calendars.create(payload);

    ctx.helper.success({ ctx, res });
  }
}

module.exports = CalendarController;
