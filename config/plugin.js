/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/config/plugin.js
 * @Date: 2021-08-29 18:40:00
 * @LastEditTime: 2021-08-31 01:10:54
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: true,
  view: true,
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  // 数据库
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
};
