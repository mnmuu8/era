import React, {useCallback, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { getProductsInCart } from '../reducks/users/selectors';
import { CartListItem } from "../components/Products"
import { PrimaryButton, TextDetail } from '../components/UIkit';
// import { orderProduct } from '../redux/products/operations';

const OrderConfirm = () => {
  // const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const productsInCart = getProductsInCart(selector)

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart])

  const shippingFee = (subtotal >= 10000) ? 0 : 210;

  const tax = subtotal * 0.1

  const total = subtotal + shippingFee + tax

  return (
    <section className='t-order-confirm'>
      <div className='inner'>
        <h2 className='s__head'>注文の確認</h2>
        <div className='wrap'>
          <div className='product__detail'>
            <List>
              {productsInCart.length > 0 && (
                productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
              )}
            </List>
          </div>
          <div className='order__detail'>
              <TextDetail label="商品合計" value={subtotal.toLocaleString()} />
              <TextDetail label="消費税" value={"¥" + tax.toLocaleString()} />
              <TextDetail label="送料" value={"¥" + shippingFee.toLocaleString()} />
              <Divider />
              <TextDetail label="合計（税込）" value={"¥" + total} />
              <PrimaryButton label={"注文する"} 
                // onClick={() => order(productsInCart, total)}
              />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm
