import './listenAjax';
import ReactDOM from 'react-dom';
import { isInIcestark, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import { productCode } from '../package.json';
import { store } from '@ice/stark-data';
import { message } from 'antd';

// 设置最多能出现的节点数
message.config({
  maxCount: 1,
});

let rootElement = 'root';
let activePath = '';
// 微前端环境添加productCode重置子路由
export function patchRoutes({ routes }) {
  if (isInIcestark()) {
    let component;
    routes[0].routes.forEach((item) => {
      item.path = `/${productCode}${item.path}`;
      if (activePath && activePath === item.path) {
        component = item.component;
      }
    });
    try {
      const path = window.location.hash.split('#')[1]?.split('?')[0];
      if (activePath) {
        routes.unshift({
          path,
          exact: true,
          component,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// 在微前端里动态修改渲染根节点：
export function modifyClientRenderOpts(memo) {
  return {
    ...memo,
    rootElement,
  };
}

export function render(oldRender) {
  // 在icestark 环境下注册对应的生命周期
  if (isInIcestark()) {
    registerAppEnter((e) => {
      rootElement = e.customProps?.root || 'sub-root';
      activePath = e.customProps?.activePath || '';
      store.set('sys-data', e.customProps);
      oldRender();
    });
    registerAppLeave(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById(rootElement));
    });
  } else {
    oldRender();
  }
}
