/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysProducts.js
 * @Date: 2021-08-29 17:31:19
 * @LastEditTime: 2021-08-29 23:01:15
 */
'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const sysProducts = app.model.define(
    'sys_products',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      productCode: {
        type: STRING(60),
        allowNull: false,
      }, // 产品code
      owner: STRING(80), // 用户id
      productName: STRING(120), // 产品名称
      productType: STRING(60), // 类型
      description: STRING(255), // 描述
      isDisabled: {
        type: INTEGER(2),
        defaultValue: 0,
      },
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

  return sysProducts;
};
