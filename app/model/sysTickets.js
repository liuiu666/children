/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysTickets.js
 * @Date: 2021-08-29 18:07:04
 * @LastEditTime: 2021-08-29 23:01:28
 */

'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const sysRoles = app.model.define(
    'sys_tickets',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      uid: { field: 'uid', type: INTEGER(20), allowNull: true }, // 用户id
      ticket: { field: 'ticket', type: STRING(50), allowNull: false }, // ticket
      expired: { field: 'expired', type: DATE, allowNull: true }, // 过期时间
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
  return sysRoles;
};
