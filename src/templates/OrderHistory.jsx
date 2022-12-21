import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/Products'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const orders = getOrdersHistory(selector)

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])

  return (
    <section className='t-order-history'>
      <div className='inner'>
        <h2 className='s__head'>注文履歴</h2>
        <List>
          {orders.length > 0 && (
            orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
          )}
        </List>
      </div>
    </section>
  )
}

export default OrderHistory
