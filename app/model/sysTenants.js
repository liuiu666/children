/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysTenants.js
 * @Date: 2021-08-29 18:03:34
 * @LastEditTime: 2021-08-29 23:01:26
 */

'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const sysTenants = app.model.define(
    'sys_tenants',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      tenantCode: { field: 'tenant_code', type: STRING(50), allowNull: false, comment: '租户code' }, // 租户code
      tenantName: { field: 'tenant_name', type: STRING(225), allowNull: true, comment: '租户名称' }, // 角色名称
      isExt: {
        field: 'is_ext',
        type: INTEGER(4),
        defaultValue: 0,
        allowNull: false,
        comment: '是否是第三方扩展，是:1，否:0',
      }, // 是否是第三方扩展，是:1，否:0
      extName: {
        field: 'ext_name',
        type: STRING(50),
        allowNull: true,
        comment: '第三方登录扩展名',
      }, // 第三方登录扩展名
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
  return sysTenants;
};
