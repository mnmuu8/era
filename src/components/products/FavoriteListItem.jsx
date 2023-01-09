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
  const color = props.product.accessory.color
  const type = props.product.accessory.type
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const removeProductFromFavorite = (id) => {
    const ret = window.confirm("この商品をお気に入りから削除しますか？")
    if (!ret) {
      return false
    } else {
      return db.collection("users").doc(uid).collection("favorite").doc(id).delete()
    }
  }

  return (
    <>
      <ListItem className='c-favorite-list-item'>
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
        {/* <PrimaryButton label={"商品詳細を見る"} onClick={() => dispatch(push("/product/" + props.product.productId))} /> */}
        <IconButton className='circle-icon' onClick={() => removeProductFromFavorite(props.product.favoriteId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default FavoriteListItem
