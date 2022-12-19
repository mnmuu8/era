import React from 'react'
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux'
import { getUserId } from '../reducks/users/selectors';

const SignIn = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  return (
    <div>
      <h2>サインイン</h2>
      <p>{uid}</p>
      <button onClick={() => dispatch(push("/"))}>HOMEへ戻る</button>
    </div>
  )
}

export default SignIn
