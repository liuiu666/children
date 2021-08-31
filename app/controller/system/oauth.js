/* eslint-disable no-trailing-spaces */
/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/controller/system/oauth.js
 * @Date: 2021-08-29 18:42:44
 * @LastEditTime: 2021-08-31 01:19:04
 */
'use strict';
const Controller = require('egg').Controller;

module.exports = class Oauth extends Controller {
  constructor(props) {
    super(props);
    this.Module = this.app.model.SysProducts;
  }
  async authorize() {
    this.ctx.logger.info('some request data: %j', this.ctx.request.body);
  }
};
