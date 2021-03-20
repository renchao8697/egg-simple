'use strict';

const { Service } = require('egg');

const tagList = [
  'morning',
  'listen',
  'English',
  'algorithm',
  'interview',
  'code',
  'read',
  'sport',
];

class CalendarService extends Service {
  async index(payload) {
    const { ctx } = this;
    const { date } = payload;
    const month = date.slice(0, -2);
    const userId = ctx.state.user.data._id;
    const reg = new RegExp(month);
    const coniditions = {
      userId,
      date: reg,
    };

    const list = await ctx.model.Calendars.find(coniditions);
    const data = {};
    if (list.length) {
      list.forEach(item => {
        const tagData = tagList.map(tag => {
          return {
            type: tag,
            checked: item[tag],
          };
        });
        data[item.date] = tagData;
      });
    }
    return data;
  }
  async create(payload) {
    const { ctx } = this;
    const userId = ctx.state.user.data._id;
    const { date, tagData } = payload;
    const data = {
      userId,
      date,
    };
    tagData.forEach(tag => {
      data[tag.type] = tag.checked;
    });
    const list = await ctx.model.Calendars.find({ userId, date });
    let res = null;
    if (list.length) {
      const { _id } = list[0];
      res = await ctx.model.Calendars.findByIdAndUpdate(_id, data);
    } else {
      res = await ctx.model.Calendars.create(data);
    }

    return res;
  }
}

module.exports = CalendarService;
