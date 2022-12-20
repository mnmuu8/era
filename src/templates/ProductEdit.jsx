import React, { useState, useCallback } from 'react'
import { PrimaryButton, TextInput } from '../components/UIkit'

const ProductEdit = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const inputName = useCallback((e) => {
    setName(e.target.value);
  }, [setName])
  const inputDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription])
  const inputPrice = useCallback((e) => {
    setPrice(e.target.value);
  }, [setPrice])

  return (
    <div>
      <h2>商品の登録・編集</h2>
      <TextInput 
        fullWidth={true} label={"商品名"} multiline={false} required={true}
        minRows={1} value={name} type={"text"} onChange={inputName}
      />
      <TextInput 
        fullWidth={true} label={"商品説明"} multiline={true} required={true}
        minRows={5} value={description} type={"text"} onChange={inputDescription}
      />
      <TextInput 
        fullWidth={true} label={"価格"} multiline={false} required={true}
        minRows={1} value={price} type={"number"} onChange={inputPrice}
      />
      <PrimaryButton label={"商品情報を登録"} onClick={() => console.log()} />
    </div>
  )
}

export default ProductEdit
