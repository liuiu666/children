/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/app/extend/helper.js
 * @Date: 2021-08-29 18:46:41
 * @LastEditTime: 2021-08-29 23:08:20
 */
'use strict';
module.exports = {
  /**
   * 数据类型转换
   * @param {string} string 数据类型转换
   * @return {Number} number
   */
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  /**
   * 页面响应返回 - 失败
   * @param {object} args 入参数
   * @return {object} 成功
   */
  responseError(args) {
    const { code = 500, success = false, data = null, message = '请求异常' } = args;
    return (this.ctx.body = Object.assign(args, {
      code,
      success,
      data,
      message,
      requestId: this.ctx.requestId,
    }));
  },
  /**
   * 页面响应返回 - 成功
   * @param {object} args
   */
  responseSuccess(args) {
    const { code = 200, success = true, data = null, message = '请求&操作成功!' } = args;
    return (this.ctx.body = Object.assign(args, {
      code,
      success,
      data,
      message,
      requestId: this.ctx.requestId,
    }));
  },

  /**
   * 搜索列表的字段
   * @param {string} keyWord 搜索列表的字段
   * @param {Array} likeKeys 搜索列表的字段
   * @return {object} 搜索列表的字段
   */
  formatKeyWord(keyWord, likeKeys = []) {
    const { Op } = this.app.Sequelize;
    if (!keyWord) {
      return [{ id: { [Op.not]: null } }];
    }
    keyWord = keyWord.replace(/[\r\s\n]+/gi, '');
    const value = keyWord.length ? { [Op.like]: `%${keyWord}%` } : { [Op.not]: null };
    return likeKeys.map((key) => {
      return { [key]: value };
    });
  },
};
