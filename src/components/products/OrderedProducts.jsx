import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { PrimaryButton } from '../UIkit'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const OrderedProducts = (props) => {

  const dispatch = useDispatch();
  const products = props.products

  const goToProductDetail = useCallback((id) => {
    dispatch(push("/product/" + id))
  }, [])

  return (
    <List className='c-ordered-products'>
      {products.map(product => (
        <>
          <ListItem key={product.id}>
            <ListItemAvatar className='avater'>
              <img alt={"注文した画像"} src={product.images[0].path} />
            </ListItemAvatar>
            <div className='detail'>
              <ListItemText primary={product.name} secondary={`Color: ${product.accessory.color} / Type: ${product.accessory.type} / Size: ${product.size}`} />
              <ListItemText className='price' primary={"¥" + product.price.toLocaleString()} />
            </div>
            <PrimaryButton label={"注文詳細を見る"} onClick={() => goToProductDetail(product.id)} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  )
}

export default OrderedProducts
