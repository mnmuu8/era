import React, { useCallback } from 'react'
import List from '@material-ui/core/List'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/Products';
import { PrimaryButton } from '../components/UIkit';
import { push } from 'connected-react-router';

const CartList = () => {
  const selector = useSelector(state => state)
  const productsInCart = getProductsInCart(selector)
  const dispatch = useDispatch();

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"))
  }, [])

  // const backToHome = useCallback(() => {
  //   dispatch(push("/"))
  // }, [])

  return (
    <section className='t-cart-list'>
      <div className='inner'>
        <h2 className='s__head'>ショッピングカート</h2>
        <div className='s__body'>
          <List className='product__all'>
            {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
            )}
          </List>
          <PrimaryButton label={"レジへ進む"} onClick={() => {goToOrder()}} />
        </div>
      </div>
    </section>
  )
}

export default CartList
