import React from 'react'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ImagePreview = (props) => {
  return (
    <div className='c-image-preview'>
      <img src={props.path} alt="商品画像" />
      <IconButton className='circle-icon' onClick={() => props.delete(props.id)}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default ImagePreview
