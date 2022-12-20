import React from 'react'
import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu';

const HeaderMenus = () => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary" overlap="rectangular">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus
