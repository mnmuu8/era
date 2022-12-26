import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FlashMessage } from '../UIkit';
import AppContext from '../../context/AppContext';

const AccessoryTable = (props) => {
  const accessories = props.accessories;
  const appContext = useContext(AppContext);

  const [flash, setFlash] = useState()
  const flashChangeMessage = async (text) => {
    setFlash(text)
    return await appContext.handleClick()
  }

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {accessories.length > 0 && (
            accessories.map(accessory => (
              <TableRow key={accessory.color}>
                <TableCell component="th" scope="row">
                  {accessory.color}
                </TableCell>
                <TableCell component="th" scope="row">
                  {accessory.type}
                </TableCell>
                <TableCell>
                  残り{accessory.quantity}点
                </TableCell>
                <TableCell>
                  {accessory.quantity > 0 ? (
                    <IconButton 
                      style={{ padding: 0 }}
                      onClick={() => {
                        props.addProduct(accessory.color)
                        flashChangeMessage("cart")
                      }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <p>売り切れ</p>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton 
                    style={{ padding: 0 }}
                    onClick={() => {
                      props.addFavorite(accessory.color)
                      flashChangeMessage("favo")
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {flash === "cart" ? (
        <FlashMessage 
          open={appContext.open} 
          setOpen={appContext.setOpen} 
          handleClick={appContext.handleClick} 
          handleClose={appContext.handleClose} 
          label={"カートに商品を登録しました"}
        />
      ) : flash === "favo" ? (
        <FlashMessage 
          open={appContext.open} 
          setOpen={appContext.setOpen} 
          handleClick={appContext.handleClick} 
          handleClose={appContext.handleClose} 
          label={"お気に入りに商品を登録しました"}
        />
      ) : (
        <p></p>
      )}
    </TableContainer>
  )
}

export default AccessoryTable
