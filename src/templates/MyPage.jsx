import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '../components/UIkit'
import { push } from 'connected-react-router'
import { db } from '../firebase'
import { getUserId } from '../reducks/users/selectors'

const MyPage = () => {

  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector)

  const [profile, setProfile] = useState("")
  
  useEffect(() => {
    db.collection("users").doc(uid).get()
      .then(doc => {
        const data = doc.data();
        setProfile(data)
      })
  }, [])

  return (
    <section className='t-mypage'>
      <div className='inner'>
        <h2 className='s__head'>プロフィール</h2>
        <div className='s__body'>
          <div className='row'>
            <h4>お名前</h4>
            <p>{profile.username}</p>
          </div>
          <div className='row'>
            <h4>電話番号</h4>
            <p>{profile.tell}</p>
          </div>
          <div className='row'>
            <h4>郵便番号</h4>
            <p>{profile.zipCord}</p>
          </div>
          <div className='row'>
            <h4>住所</h4>
            <p>{profile.address}</p>
          </div>
          <PrimaryButton label={"編集"} onClick={() => dispatch(push("/user/mypage/edit"))} />
        </div>
      </div>
    </section>
  )
}

export default MyPage
