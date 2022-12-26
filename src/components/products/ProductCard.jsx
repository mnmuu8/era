import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { MenuItem } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { MoreVert } from '@material-ui/icons';
import NoImage from "../../assets/img/no_image.png"
import { deleteProduct } from '../../reducks/products/operations';

const ProductCard = (props) => {

  const dispatch = useDispatch();
  const price = props.price.toLocaleString();
  const images = (props.images.length > 0 ? props.images : [{path: NoImage}])
  
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className='c-product-card'>
      <CardMedia
        className="card__media"
        image={images[0].path} 
        onClick={() => dispatch(push("product/" + props.id))}
      />
      <CardContent className='card__contents'>
        <div onClick={() => dispatch(push("products/" + props.id))}>
          <Typography color="textSecondary" componentcc="p" className='card__name'>{props.name}</Typography>
          <Typography component="p" className='card__price'>¥{price}</Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => {
              dispatch(push("/product/edit/" + props.id ))
              handleClose()
            }}
          >
            編集する
          </MenuItem>
          <MenuItem 
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard
