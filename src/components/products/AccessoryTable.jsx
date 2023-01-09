import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { AuthModal, FlashMessage } from '../UIkit';
import AppContext from '../../context/AppContext';
import { useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';

const AccessoryTable = (props) => {
  const accessories = props.accessories;
  const appContext = useContext(AppContext);
  const selector = useSelector(state => state)
  const isSignedIn = getIsSignedIn(selector)

  const [flash, setFlash] = useState()
  const flashChangeMessage = async (text) => {
    setFlash(text)
    return await appContext.handleClick()
  }

  const handleAddProduct = (accessory) => {
    if (!isSignedIn) {
      setAuthModal(true)
    } else {
      props.addProduct(accessory)
      flashChangeMessage("cart")
    }
  }

  const handleAddFavorite = (accessory) => {
    if (!isSignedIn) {
      setAuthModal(true)
    } else {
      props.addFavorite(accessory)
      flashChangeMessage("favo")
    }
  }

  const [authModal, setAuthModal] = useState(false);
  const handleModalOpen = () => setAuthModal(true);
  const handleModalClose = () => setAuthModal(false);

  return (
    <>
      <TableContainer className='c-accessory-table'>
        <Table>
          <TableBody>
            {accessories.length > 0 && (
              accessories.map(accessory => (
                <TableRow key={accessory.id}>
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
                          handleAddProduct(accessory)
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
                        handleAddFavorite(accessory)
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
      <AuthModal open={authModal} handleOpen={handleModalOpen} handleClose={handleModalClose} />
    </>
  )
}

export default AccessoryTable
