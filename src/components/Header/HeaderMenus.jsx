import React, { useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux'
import { getFavoriteList, getProductsInCart } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import { getUserId } from '../../reducks/users/selectors'
import { fetchProductsInCart, fetchProductsFavorite } from '../../reducks/users/operations'
import { push } from 'connected-react-router'


const HeaderMenus = (props) => {

  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const dispatch = useDispatch();
  let productsInCart = getProductsInCart(selector)
  let productsFavorite = getFavoriteList(selector)

  useEffect(() => {
    const unsubscribe = db.collection("users").doc(uid).collection("cart")
    .onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const product = change.doc.data();
        const changeType = change.type
        
        switch(changeType) {
          case "added":
            productsInCart.push(product)
            break;
          case "modified":
            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
            productsInCart[index] = product
            break;
          case 'removed':
            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
            break;
          default:
            break;
        }
      })
      dispatch(fetchProductsInCart(productsInCart))
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection("users").doc(uid).collection("favorite")
    .onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const product = change.doc.data();
        const changeType = change.type
        
        switch(changeType) {
          case "added":
            productsFavorite.push(product)
            break;
          case "modified":
            const index = productsFavorite.findIndex(product => product.favoriteId === change.doc.id)
            productsFavorite[index] = product
            break;
          case 'removed':
            productsFavorite = productsFavorite.filter(product => product.favoriteId !== change.doc.id);
            break;
          default:
            break;
        }
      })
      dispatch(fetchProductsFavorite(productsFavorite))
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary" overlap="rectangular" onClick={() => dispatch(push("/cart"))}>
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge badgeContent={productsFavorite.length} color="secondary" overlap="rectangular" onClick={() => dispatch(push("/favorite"))}>
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
