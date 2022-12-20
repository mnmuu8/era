import React from 'react'

const ImagePreview = (props) => {
  return (
    <div>
      <img src={props.path} alt="商品画像" onClick={() => props.delete(props.id)} />
    </div>
  )
}

export default ImagePreview