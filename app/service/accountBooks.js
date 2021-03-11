"use strict";

const Service = require("egg").Service;

class AccountBookService extends Service {
  async index(payload) {
    const { ctx } = this;
    const userId = ctx.state.user.data._id
    let { current, pageSize, sorter, status, desc, startDate, endDate, createStart, createEnd } = payload;
    sorter = JSON.parse(sorter);
    let sort = {
      date: -1,
    };
    let sortKeys = Object.keys(sorter)
    if (sortKeys.length) {
      sort = {
        [sortKeys[0]]: sorter[sortKeys[0]] === 'descend' ? -1 : 1
      }
    }
    const conditions = {
      userId,
      status,
      desc: desc ? { $regex : new RegExp(desc)} : undefined,
      date: {
        '$gte': startDate ? new Date(startDate) : undefined,
        '$lte': endDate ? new Date(endDate) : undefined
      },
      createdAt: {
        '$gte': createStart ? new Date(createStart) : undefined,
        '$lte': createEnd ? new Date(createEnd) : undefined
      }
    }
    for (let key in conditions) {
      if (conditions[key] === undefined) {
        delete conditions[key]
      }
    }
    const queryConditions = ctx.helper.deleteKeys(conditions)
    
    const list = await ctx.model.AccountBooks.find(queryConditions)
      .limit(parseInt(pageSize))
      .skip((current - 1) * pageSize)
      .sort(sort);
    const total = await ctx.model.AccountBooks.count(conditions);
    const res = {
      list,
      current,
      pageSize,
      total,
    };
    return res;
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
