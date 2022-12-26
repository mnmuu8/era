import React from 'react'
import { TextDetail } from '../UIkit'
import Divider from '@material-ui/core/Divider'
import OrderedProducts from './OrderedProducts'

const dateTimeToString = (date) => {
  return date.getFullYear() + "-"
        + ("00" + (date.getMonth()+1)).slice(-2) + "-"
        + ("00" + (date.getDate())).slice(-2) + "-"
        + ("00" + (date.getHours())).slice(-2) + ":"
        + ("00" + (date.getMinutes())).slice(-2) + ":"
        + ("00" + (date.getSeconds())).slice(-2)
}

const dateToString = (date) => {
  return date.getFullYear() + "-"
        + ("00" + (date.getMonth()+1)).slice(-2) + "-"
        + ("00" + (date.getDate())).slice(-2)
}

const OrderHistoryItem = (props) => {

  const order = props.order
  const orderedDatetime = dateTimeToString(order.updated_at.toDate())
  const amount = "¥" + order.amount.toLocaleString();
  const shippingDate = dateToString(order.shipping_date.toDate())

  return (
    <div className='c-order-history-item'>
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={orderedDatetime} />
      <TextDetail label={"発送予定日"} value={shippingDate} />
      <TextDetail label={"注文金額"} value={amount} />
      { order.products.length > 0 && (
        <OrderedProducts products={order.products} key={order.id} />
      )}
      <Divider />
    </div>
  )
}

export default OrderHistoryItem
