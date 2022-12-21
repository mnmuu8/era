import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvater from '@material-ui/core/ListItemAvatar'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'

const CartListItem = (props) => {
  const name = props.product.name
  const image = props.product.images[0].path
  const price = props.product.price.toLocaleString();
  const size = props.product.size
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const removeProductFromCart = (id) => {
    return db.collection("users").doc(uid).collection("cart").doc(id).delete()
  }

  return (
    <>
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
        <IconButton className='delete-btn' onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default CartListItem
