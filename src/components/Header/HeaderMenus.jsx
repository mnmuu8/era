import React, { useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux'
import { getProductsInCart } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import { getUserId } from '../../reducks/users/selectors'
import { fetchProductsInCart } from '../../reducks/users/operations'
import { push } from 'connected-react-router'


const HeaderMenus = (props) => {

  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const dispatch = useDispatch();
  let productsInCart = getProductsInCart(selector)

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

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary" overlap="rectangular" onClick={() => dispatch(push("/cart"))}>
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
