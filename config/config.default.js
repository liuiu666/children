/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/config/config.default.js
 * @Date: 2021-08-29 18:40:00
 * @LastEditTime: 2021-08-31 01:11:20
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.passportGithub = {
    enable: true,
    package: 'egg-passport-github',
    key: '41f03826df56d3175f58',
    secret: '58316516a7a1e6700ed0ed246cfaba9633804aea',
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    port: MYSQL_PORT || 3306,
    host: MYSQL_HOST || '8.136.234.245',
    username: MYSQL_USER || 'lsl',
    password: MYSQL_PASSWORD || 'sl123321',
    database: MYSQL_DATABASE || 'test',
    define: {
      // 添加createAt,updateAt,deleteAt时间戳
      timestamps: true,
      // 使用软删除，即仅更新 deleteAt 时间戳 而不删除数据
      paranoid: true,
      // 不允许修改表名
      freezeTableName: true,
      // 禁止驼峰式字段默认转为下划线
      underscored: true,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630223899920_6802';

  // add your middleware config here
  config.middleware = [];

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return {
    ...config,
  };
};
