/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-param-names */
'use strict';

module.exports = (app) => {
  /**
   * 通用增删改查接口
   */
  return class CommonRequest extends app.Service {
    /**
     * 通用列表接口
     * @param {object} module 数据模型
     * @param {number} pageNumber 单前页数
     * @param {number} pageSize 每页显示多少
     * @param {string} keyWord 模糊搜索的内容
     * @param {object} query 自定义query和默认的做merge
     * @param {Array} likeKeys 要模糊查询的字段
     * @return {object} count[数量], rows[数据列表], totalPage[总页数], currentPage[单前页]
     */
    async list({ module, pageNumber, pageSize, keyWord, query = {}, likeKeys = [] }) {
      try {
        const { Op } = app.Sequelize;
        pageNumber = this.ctx.helper.parseInt(pageNumber || 1);
        pageSize = this.ctx.helper.parseInt(pageSize || 10);
        const baseLikeWhere = this.ctx.helper.formatKeyWord(keyWord, likeKeys);
        const defaultQuery = {
          raw: true,
          limit: pageSize,
          offset: (pageNumber - 1) * pageSize,
          order: [['id', 'DESC']],
          // paranoid: false, // 是否查询全部数据包括删除的
          where: {
            [Op.or]: baseLikeWhere,
          },
        };
        query.where = Object.assign(defaultQuery.where, query.where);

        const response = await module.findAndCountAll(Object.assign(defaultQuery, query));
        response.totalPage = Math.ceil(response.count / pageSize);
        response.currentPage = pageNumber;

        return {
          success: true,
          response,
        };
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    }

    /**
     * 通用查询单条数据接口
     * @param {object} module 数据模型
     * @param {number} id 数据id
     * @returns
     */
    async listItem({ module, id }) {
      return await module.findByPk(id);
    }

    /**
     * 通用列编辑接口
     * @param {object} module 数据模型
     * @param {object} params 要更新的数据对象
     * @param {string} checkAlikeCode 校验除了主键id外相同的字段
     * @returns
     */
    async update({ module, params, checkAlikeCode, query }) {
      try {
        const { Op } = app.Sequelize;
        const updateItemModule = await module.findByPk(params.id);
        if (!updateItemModule) {
          return {
            success: false,
            message: '编辑失败！',
          };
        }
        // 是否要校验其他字段重复
        if (checkAlikeCode && checkAlikeCode.code) {
          const checkAlike = await module.findOne({
            where: {
              id: {
                [Op.ne]: params.id,
              },
              [checkAlikeCode.code]: checkAlikeCode.value,
            },
          });
          if (checkAlike) {
            return {
              success: false,
              message: checkAlikeCode.message,
            };
          }
        }
        return {
          success: true,
          response: await updateItemModule.update(params, query),
          message: '编辑成功',
        };
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    }

    /**
     * 通用添加接口
     * @param module 数据模型
     * @param params 要添加的数据对象
     * @param checkAlikeCode 校验除了主键id外相同的字段
     * @returns
     */

    async add({ module, params, checkAlikeCode, query }) {
      try {
        // 是否要校验其他字段重复
        if (checkAlikeCode && checkAlikeCode.code) {
          const checkAlike = await module.findOne({
            where: {
              [checkAlikeCode.code]: checkAlikeCode.value,
            },
          });
          if (checkAlike) {
            return {
              success: false,
              message: checkAlikeCode.message,
            };
          }
        }
        return {
          success: true,
          response: await module.create(params, query),
          message: '添加成功',
        };
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    }

    /**
     * 通用删除接口
     * @param {object} module 数据模型
     * @param {number} id 要删除的id
     * @returns
     */
    async delete({ module, id }) {
      try {
        const deleteItemModule = await module.findByPk(id);
        if (!deleteItemModule) {
          return {
            success: false,
            message: '删除失败！',
          };
        }
        return {
          success: true,
          response: await deleteItemModule.destroy(),
          message: '删除成功',
        };
      } catch (error) {
        return {
          success: false,
          message: error,
        };
      }
    }
  };
};
