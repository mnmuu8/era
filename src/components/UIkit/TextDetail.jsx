import React from 'react'

const TextDetail = (props) => {
  return (
    <div className='c-text-detail'>
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
  )
}

export default TextDetail
