import { 
  IconButton,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui//icons/CheckCircle';
import React, { useState, useCallback, useMemo } from 'react'
import { TextInput } from '../UIkit';


const SetAccessoryType = (props) => {

  const [index, setIndex] = useState(0)
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0)

  const inputColor = useCallback((e) => {
    setColor(e.target.value)
  }, [setColor])
  const inputType = useCallback((e) => {
    setType(e.target.value)
  }, [setType])
  const inputQuantity = useCallback((e) => {
    setQuantity(e.target.value)
  }, [setQuantity])

  const addAccessory = (index, color, type, quantity) => {

    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N=16;
    const accessoryId = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

    if (color === "" || type === "" || quantity === "") {
      return false
    } else {
      if (index === props.accessories.length) {
        props.setAccessories(prevState => [...prevState, {id: accessoryId, color: color, type: type, quantity: quantity}])
        setIndex(index + 1)
        setColor("")
        setType("")
        setQuantity(0)
      } else {
        const newAccessories = props.accessories
        newAccessories[index] = {id: accessoryId, color: color, type: type, quantity: quantity}
        props.setAccessories(newAccessories)
        setIndex(newAccessories.length)
        setColor("")
        setType("")
        setQuantity(0)
      }
    }
  }

  const editAccessory = (index, color, type, quantity) => {
    setIndex(index)
    setColor(color)
    setType(type)
    setQuantity(quantity)
  }

  const deleteAccessory = (deleteIndex) => {
    const ret = window.confirm(`このアクセサリーを商品から削除しますか？`)
    if (!ret) {
      return false
    } else {
      const newAccessories = props.accessories.filter((accessory, i) => i !== deleteIndex)
      props.setAccessories(newAccessories)
    }
  }

  // const memoIndex = useMemo(() => {
  //   setIndex(props.accessories.length)
  // }, [props.accessories.length])

  return (
    <div className='c-accessory-type'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>カラー</TableCell>
              <TableCell>タイプ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.accessories.length > 0 && (
              props.accessories.map((accessory, i) => (
                <TableRow key={accessory.color}>
                  <TableCell>{accessory.color}</TableCell>
                  <TableCell>{accessory.type}</TableCell>
                  <TableCell>{accessory.quantity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editAccessory(i, accessory.color, accessory.type, accessory.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteAccessory(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className='input__area'>
          <TextInput 
            fullWidth={false} label={"カラー"} multiline={false} required={true}
            onChange={inputColor} minRows={1} value={color} type={"text"}
          />
          <TextInput 
            fullWidth={false} label={"タイプ"} multiline={false} required={true}
            onChange={inputType} minRows={1} value={type} type={"text"}
          />
          <TextInput 
            fullWidth={false} label={"数量"} multiline={false} required={true}
            onChange={inputQuantity} minRows={1} value={quantity} type={"number"}
          />
        </div>
        <IconButton className='submit__btn' onClick={() => addAccessory(index, color, type, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetAccessoryType
