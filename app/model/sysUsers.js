/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysUsers.js
 * @Date: 2021-08-29 17:55:40
 * @LastEditTime: 2021-08-29 23:01:31
 */
'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const sysUsers = app.model.define(
    'sys_users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userCode: { type: STRING(250), allowNull: false, comment: '用户账号' }, // 用户账号
      userName: { type: STRING(250), allowNull: false, comment: '用户账号' }, // 用户账号
      nickName: { type: STRING(250), allowNull: true, comment: '用户昵称' }, // 用户昵称
      email: { type: STRING(250), allowNull: true, comment: '邮箱' }, // 邮箱
      phone: { type: STRING(15), allowNull: true, comment: '电话号码' }, // 电话号码
      passWord: { type: STRING(200), allowNull: true, comment: '密码' }, // 密码
      avatar: { type: STRING(250), allowNull: true, comment: '头像地址' }, // 头像地址
      appName: { type: STRING(4), allowNull: true, comment: '所属应用' }, // 所属应用
      payload: { type: TEXT('long'), allowNull: true, comment: '扩展信息，用于存储客户系统冗余信息' }, // 扩展信息，用于存储客户系统冗余信息
      isExt: { type: INTEGER(4), defaultValue: 0, allowNull: true, comment: '是否是第三方扩展，是:1，否:0' }, // 是否是第三方扩展，是:1，否:0
      extName: { type: STRING(50), allowNull: true, comment: '第三方登录系统名称' }, // 第三方登录系统名称
      status: { type: INTEGER(4), defaultValue: 0, allowNull: true, comment: '账号状态，正常：0' }, // 账号状态
      isSysAdmin: { type: INTEGER(4), defaultValue: 0, allowNull: false, comment: '是否是超级管理员，是:1，否:0' }, // 是否是超级管理员，是:1，否:0
      createdAt: DATE, // 创建时间
      updatedAt: DATE, // 更新时间
      deletedAt: DATE, // 删除时间
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
      },
    }
  );

  return sysUsers;
};
