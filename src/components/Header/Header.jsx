import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selectors'
import HeaderMenus from './HeaderMenus'
import { push } from 'connected-react-router'

const Header = () => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const isSignedIn = getIsSignedIn(selector)
  
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <h1 onClick={() => dispatch(push("/"))}>ロゴ</h1>
        {isSignedIn && (
          <div>
            <HeaderMenus />
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
