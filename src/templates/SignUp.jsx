import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signUp } from '../reducks/users/operations'
import { push } from 'connected-react-router'

const SignUp = () => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPasswrod, setConfirmPassword] = useState("")

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername]) 
  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]) 
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]) 
  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  }, [setConfirmPassword]) 
  
  return (
    <div>
      <h2>アカウント登録</h2>
      <TextInput 
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true} label={"パスワード（確認用）"} multiline={false} required={true}
        rows={1} value={confirmPasswrod} type={"password"} onChange={inputConfirmPassword}
      />
      <PrimaryButton label={"アカウントを登録する"} onClick={() => dispatch(signUp(username, email, password, confirmPasswrod))} />
      <p onClick={() => dispatch(push("/signin"))}>アカウントをお持ちの方はこちら</p>
    </div>
  )
}

export default SignUp
