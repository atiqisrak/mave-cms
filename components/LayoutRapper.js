import React, { Children } from 'react'

const LayoutRapper = ({Children}) => {
  return (
    <div className="login-page">
        <div className="login-page-section">{Children}</div>
      
    </div>
  )
}

export default LayoutRapper