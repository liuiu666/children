import { productCode } from '../package.json';
import ajax from './utils/ajax';

// 设置csrftoken
ajax.defaults.headers.common['x-csrf-token'] = window?.SYSTEM_CONFIG?.['x-csrf-token'] || '';
// 设置项目id
ajax.defaults.headers.common['product-code'] = productCode;

// 添加请求拦截器
ajax.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

window.sysAjax = ajax;
