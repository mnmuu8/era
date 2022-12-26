import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvater from '@material-ui/core/ListItemAvatar'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import { PrimaryButton } from '../UIkit'
import { push } from 'connected-react-router'

const FavoriteListItem = (props) => {
  const name = props.product.name
  const image = props.product.images[0].path
  const price = props.product.price.toLocaleString();
  const size = props.product.size
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const removeProductFromFavorite = (id) => {
    return db.collection("users").doc(uid).collection("favorite").doc(id).delete()
  }

  return (
    <div>
      <ListItem className='c-cart-list-item'>
        <ListItemAvater className='avater'>
          <img src={image} alt="商品画像" />
        </ListItemAvater>
        <div className='detail'>
          <ListItemText 
            primary={name}
            secondary={"サイズ：" + size}
          />
          <ListItemText 
            primary={"¥" + price}
          />
        </div>
        <PrimaryButton label={"商品詳細"} onClick={() => dispatch(push("/product/" + props.product.productId))} />
        <IconButton className='delete-btn' onClick={() => removeProductFromFavorite(props.product.favoriteId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </div>
  )
}

export default FavoriteListItem