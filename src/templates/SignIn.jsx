import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signIn } from '../reducks/users/operations'

const SignIn = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]) 
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]) 
  
  return (
    <div>
      <h2>サインイン</h2>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <PrimaryButton label={"サインイン"} onClick={() => dispatch(signIn(email, password))} />
    </div>
  )
}

export default SignIn
