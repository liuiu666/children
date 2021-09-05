import React from 'react'
import { Button, Input } from 'antd'
import './index.less'


const { Search } = Input;
const RenderContent = ({ children, renderLeft = [], rightOption = null }) => {
  return (
    <main className='common-content'>
      <header>
        <div className='left'>
          {
            renderLeft.map((item, index) => <Button className='content-btn' type="primary" {...item}>{item.title}</Button>)
          }
        </div>
        <div className='right'>
          {
            rightOption ? <Search
              className='right-search'
              allowClear
              enterButton="搜索"
              {...rightOption}
            /> : null
          }
        </div>
      </header>
      {
        children
      }
    </main>
  )
}
export default RenderContent
