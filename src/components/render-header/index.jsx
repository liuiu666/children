import React from 'react'
import { RollbackOutlined } from '@ant-design/icons';
import './index.less'



const RenderHeader = ({ title = null, backUrl = null, center, right }) => {
  return (
    <header className='common-header'>
      <h2 >{backUrl ? <RollbackOutlined onClick={() => { window.location.hash = backUrl }} /> : null}{title}</h2>
      <div className='header-center'>{center}</div>
      <div className='header-right'>{right}</div>
    </header>
  )
}
export default RenderHeader
