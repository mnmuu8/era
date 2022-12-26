import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selectors'
import HeaderMenus from './HeaderMenus'
import { push } from 'connected-react-router'
import ClosableDrawer from './ClosableDrawer'

const Header = () => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const isSignedIn = getIsSignedIn(selector)

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback((e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return
    }
    setOpen(!open)
  }, [setOpen, open])
  
  return (
    <>
      <header className='c-header'>
        <div className='inner'>
          <h1 className='logo' onClick={() => dispatch(push("/"))}>era</h1>
          {isSignedIn && (
            <div>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </div>
      </header>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </>
  )
}

export default Header
