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
  const color = props.product.accessory.color
  const type = props.product.accessory.type
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const removeProductFromCart = (id) => {
    const ret = window.confirm("この商品をカートから削除しますか？")
    if (!ret) {
      return false
    } else {
      return db.collection("users").doc(uid).collection("cart").doc(id).delete()
    }
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
            secondary={`Color: ${color} / Type: ${type} / Size: ${size}`}
          />
          <ListItemText 
            className='price'
            primary={"¥" + price}
          />
        </div>
        <IconButton className='circle-icon' onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default CartListItem
