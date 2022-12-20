import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selectors'
import HeaderMenus from './HeaderMenus'
import { push } from 'connected-react-router'

const Header = () => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const isSignedIn = getIsSignedIn(selector)
  
  return (
    <header className='c-header'>
      <div className='inner'>
        <h1 onClick={() => dispatch(push("/"))}>ロゴ</h1>
        {isSignedIn && (
          <div>
            <HeaderMenus />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
