/*
 * @Author: linshenglong
 * @email: 798970799@qq.com
 * @FilePath: /managementSystem/config/config.prod.js
 * @Date: 2021-08-29 18:40:00
 * @LastEditTime: 2021-08-29 22:55:43
 */
'use strict';

module.exports = () => {
  const config = (exports = {});
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: true,
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      // ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
    },
    ssrf: {
      ipBlackList: [
        '10.0.0.0/8', // 支持 IP 网段
        '0.0.0.0/32',
        '127.0.0.1', // 支持指定 IP 地址
      ],
      // 配置了 checkAddress 时，ipBlackList 不会生效
      checkAddress(ip) {
        return ip !== '127.0.0.1';
      },
    },
    // 允许访问接口的白名单
    // domainWhiteList: ["http://localhost:7001"],
  };
  return {
    ...config,
  };
};
