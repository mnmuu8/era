import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { db } from '../firebase';
import { getUserId } from '../reducks/users/selectors';
// import { push } from 'connected-react-router'
import { saveProfile } from '../reducks/users/operations';

const MyPageEdit = () => {

  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const [username, setUsername] = useState("")
  const [tell, setTell] = useState("")
  const [zipCord, setZipCord] = useState("")
  const [address, setAddress] = useState("")

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername]) 
  const inputTell = useCallback((e) => {
    setTell(e.target.value)
  }, [setTell]) 
  const inputZipCord = useCallback((e) => {
    setZipCord(e.target.value)
  }, [setZipCord]) 
  const inputAddress = useCallback((e) => {
    setAddress(e.target.value)
  }, [setAddress]) 

  useEffect(() => {
    db.collection("users").doc(uid).get()
    .then(doc => {
      const profile = doc.data();
      setUsername(profile.username)
      setTell(profile.tell)
      setZipCord(profile.zipCord)
      setAddress(profile.address)
    }) 
  }, [])

  return ( 
    <section className='t-auth'>
      <div className='inner'>
        <h2 className='s__head'>プロフィール編集</h2>
        <TextInput 
          fullWidth={true} label={"お名前"} multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername}
        />
        <TextInput 
          fullWidth={true} label={"電話番号"} multiline={false} required={true}
          rows={1} value={tell} type={"number"} onChange={inputTell}
        />
        <TextInput 
          fullWidth={true} label={"郵便番号"} multiline={false} required={true}
          rows={1} value={zipCord} type={"number"} onChange={inputZipCord}
        />
        <TextInput 
          fullWidth={true} label={"住所"} multiline={false} required={true}
          rows={1} value={address} type={"text"} onChange={inputAddress}
        />
        <PrimaryButton label={"登録"} onClick={() => dispatch(saveProfile(username, tell, zipCord, address))} />
      </div>
    </section>
  )
}

export default MyPageEdit
