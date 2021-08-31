import React from 'react';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import './index.less';

class Layouts extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zh_CN} autoInsertSpaceInButton={false}>
        {this.props.children}
      </ConfigProvider>
    );
  }
}
export default Layouts;
