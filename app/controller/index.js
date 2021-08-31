/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/controller/index.js
 * @Date: 2021-08-29 18:42:44
 * @LastEditTime: 2021-08-31 00:45:02
 */
'use strict';
const Controller = require('egg').Controller;

module.exports = class IndexPage extends Controller {
  async IndexHtml() {
    const dataView = {
      SYSTEM_CONFIG: JSON.stringify({
        routerList: [{ a: '1' }],
        productList: [],
        userInfo: {},
      }),
    };
    await this.ctx.render('index.html', dataView);
  }
};
