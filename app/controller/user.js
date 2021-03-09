'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async login() {
    const { ctx, service } = this
    const payload = ctx.request.body ?? {}
    
    const res = await service.user.login(payload)
    console.log(ctx.helper.success)
    ctx.helper.success({ctx, res})
  }

  async create() {
    const { ctx, service } = this
    const payload = ctx.request.body ?? {}
    const res = await service.user.create(payload)
    
    ctx.helper.success({ctx, res})
  }
}

module.exports = UserController 