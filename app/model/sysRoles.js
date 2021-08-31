/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysRoles.js
 * @Date: 2021-08-29 18:02:07
 * @LastEditTime: 2021-08-29 23:01:24
 */

'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const sysRoles = app.model.define(
    'sys_roles',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      roleName: { type: STRING(50), allowNull: false }, // 角色名称
      roleCode: { type: STRING(50), allowNull: false }, // 角色code
      tenantCode: { type: STRING(50), allowNull: true }, // 租户code
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
