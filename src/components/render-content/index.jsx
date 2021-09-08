import React from 'react'
import { Button, Input } from 'antd'
import classnames from 'classnames'
import './index.less'


const { Search } = Input;
const RenderContent = ({ children, className, renderLeft = [], rightOption = null }) => {
  return (
    <main className={classnames({
      'common-content': true,
      [className]: className
    })}>
      {
        renderLeft && renderLeft.length || rightOption ? <header>
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
        </header> : null
      }

      {
        children
      }
    </main>
  )
}
export default RenderContent
