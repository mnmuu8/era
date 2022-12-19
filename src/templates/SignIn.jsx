import React from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>サインイン</h2>
      <button onClick={() => dispatch(push("/"))}>HOMEへ戻る</button>
    </div>
  )
}

export default SignIn
