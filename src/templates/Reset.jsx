import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { resetPassword } from '../reducks/users/operations'
import { push } from 'connected-react-router'

const Reset = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("")

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]) 
  
  return (
    <div>
      <h2>パスワードのリセット</h2>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <PrimaryButton label={"パスワードをリセットする"} onClick={() => dispatch(resetPassword(email))} />
      <p onClick={() => dispatch(push("/signin"))}>サインイン画面に戻る</p>
    </div>
  )
}

export default Reset