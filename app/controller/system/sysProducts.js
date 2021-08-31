/* eslint-disable no-trailing-spaces */
/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/controller/system/sysProducts.js
 * @Date: 2021-08-29 18:42:44
 * @LastEditTime: 2021-08-29 22:45:35
 */
'use strict';
const Controller = require('egg').Controller;

module.exports = class Products extends Controller {
  constructor(props) {
    super(props);
    this.Module = this.app.model.SysProducts;
  }
  /**
   * 产品列表
   */
  async list() {
    try {
      const { keyWord = null, pageSize = 10, pageNum = 1 } = this.ctx.query || {};
      const { success, message, response } = await this.ctx.service.system.commonRequest.list({
        pageNumber: pageNum,
        pageSize,
        keyWord,
        module: this.Module,
        likeKeys: ['productName', 'productCode', 'productType'],
      });
      if (!success) {
        return this.ctx.helper.responseError({
          code: 500,
          message,
        });
      }
      const { count, rows, totalPage, currentPage } = response;
      this.ctx.helper.responseSuccess({
        data: {
          dataList: rows,
          count,
          totalPage,
          currentPage,
        },
      });
    } catch (error) {
      console.error('\x1B[31m%s\x1B[0m', error);
      return this.ctx.helper.responseError({
        code: 500,
        message: error,
      });
    }
  }

  /**
   * 编辑产品
   */
  async edit() {
    const { id } = this.ctx.request.body;
    //  编辑 / 添加
    if (id) {
      return await this.commonAddUpdate('update');
    }
    return await this.commonAddUpdate('add');
  }

  /**
   *
   * @param {string} requestType  add 添加接口 / update 编辑接口
   * @return {object} 返回成功/失败
   */
  async commonAddUpdate(requestType) {
    try {
      const request = this.ctx.request.body;
      const { success, message, response } = await this.ctx.service.system.commonRequest[requestType]({
        module: this.Module,
        params: request,
        checkAlikeCode: {
          code: 'productCode',
          value: request.productCode,
          message: '产品名称重复！',
        },
      });
      if (!success) {
        return this.ctx.helper.responseError({
          message,
        });
      }
      this.ctx.helper.responseSuccess({
        data: response,
        message,
      });
    } catch (error) {
      return this.ctx.helper.responseError({
        message: error,
      });
    }
  }

  /**
   * 删除产品
   */
  async delete() {
    try {
      console.log(this.ctx.request.body, 'this.ctx.request.body');
      let id = this.ctx.helper.parseInt(this.ctx.params.id);
      if (!id) {
        id = this.ctx.helper.parseInt(this.ctx.request.body.id);
      }
      const { success, message, response } = await this.ctx.service.system.commonRequest.delete({
        module: this.Module,
        id,
      });
      if (!success) {
        return this.ctx.helper.responseError({
          code: 500,
          data: response,
          message,
        });
      }
      this.ctx.helper.responseSuccess({
        data: response,
        message,
      });
    } catch (error) {
      return this.ctx.helper.responseError({
        message: error,
      });
    }
  }
};
