/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/router.js
 * @Date: 2021-08-29 15:58:41
 * @LastEditTime: 2021-08-29 22:23:28
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require('./router/systemRouter')(app, '/api');

  app.get(/^(?!(\/api\/)).*/gi, app.controller.index.IndexHtml);
};
