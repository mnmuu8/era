import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const AccessoryTable = (props) => {
  const accessories = props.accessories

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
                    <IconButton style={{ padding: 0 }}
                      // onClick={() => props.addProduct(accessory.size)}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <p>売り切れ</p>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton style={{ padding: 0 }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AccessoryTable
