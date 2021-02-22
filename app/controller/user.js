'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async login() {
    const { ctx, service } = this
    const payload = ctx.request.body ?? {}
    
    const res = await service.user.login(payload)

    ctx.body = res
  }

  async create() {
    const { ctx, service } = this
    const payload = ctx.request.body ?? {}
    const res = await service.user.create(payload)
    ctx.body = res
  }
}

module.exports = UserController 