/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/model/sysResource.js
 * @Date: 2021-08-29 18:07:55
 * @LastEditTime: 2021-08-29 23:01:21
 */
'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const sysResource = app.model.define(
    'sys_resource',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      productCode: { field: 'product_code', type: STRING }, // 产品code
      resourceType: { field: 'resource_type', type: STRING, allowNull: false }, // 默认菜单menuConfig 菜单类型menu  接口资源api 静态资源resource  自定义custom
      resourceName: { field: 'resource_name', type: STRING }, // 资源名称
      resourceMenuPath: { field: 'resource_menu_path', type: STRING }, // 资源菜单路径
      hideHeaderPath: { field: 'hide_header_path', type: STRING }, // 设置不显示头部导航的菜单
      hideSidePath: { field: 'hide_side_path', type: STRING }, // 设置不显示左导航的菜单
      parentId: { field: 'parent_id', type: STRING }, // 设置父菜单
      resourceApiPath: { field: 'resource_api_path', type: STRING }, // api接口路径
      apiTargetDomain: { field: 'api_target_domain', type: STRING }, // api转发目前域名
      apiType: { field: 'api_type', type: STRING }, // api类型(查询，更新，新增，删除)
      productType: { field: 'product_type', type: STRING }, // 资源所属的产品类型，多个使用英文逗号,分割，目前有frontWeb,userConsole,adminConsole这3种
      requestType: { field: 'request_type', type: STRING }, // get post delete put
      tenantCode: { field: 'tenant_code', type: STRING }, // 租户code
      resourceMenuPathType: { field: 'resource_menu_path_type', type: STRING }, // 当资源类型为menu菜单时，此字段用于区别左侧还是顶部菜单
      resourceMenuSortId: {
        field: 'resource_menu_sort_id',
        type: INTEGER,
        defaultValue: 1,
        allowNull: false,
      }, // 当资源类型为menu菜单时，此字段用于标志菜单的顺序
      resourceMenuIcon: { field: 'resource_menu_icon', type: STRING }, // 当资源类型为menu菜单时，保存菜单的icon
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
  return sysResource;
};
