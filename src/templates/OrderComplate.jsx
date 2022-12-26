import React from 'react'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../components/UIkit'
import { push } from 'connected-react-router'

const OrderComplate = () => {

  const dispatch = useDispatch();

  return (
    <section className='t-order-complate'>
      <div className='inner'>
        <h2 className='s__head'>注文ありがとうございました</h2>
        <div className='s__body'>
          <p>
            ただいま、ご注文の確認メールをお送りさせていただきました。<br />
            万一、ご確認メールが届かない場合は、<br/>迷惑メールフォルダに入っている可能性がございますのでご確認ください。<br />
            今後ともよろしくお願いいたします。
          </p>
          <PrimaryButton label={"トップページへ戻る"} onClick={() => dispatch(push("/"))} />
        </div>
      </div>
    </section>
  )
}

export default OrderComplate
