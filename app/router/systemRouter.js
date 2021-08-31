/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/router/systemRouter.js
 * @Date: 2021-08-29 18:41:39
 * @LastEditTime: 2021-08-31 01:05:33
 */
'use strict';

module.exports = (app, prefix) => {
  // 产品列表增删改查
  app.get(`${prefix}/productManage/productManagement`, app.controller.system.sysProducts.list);
  app.post(`${prefix}/productManage/productManagement`, app.controller.system.sysProducts.edit);
  app.delete(`${prefix}/productManage/productManagement/:id`, app.controller.system.sysProducts.delete);

  // 第三方用户鉴权
  app.get(`${prefix}/login/oauth/authorize`, app.controller.system.oauth.authorize);
};
