import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { PrimaryButton, TextInput } from '../components/UIkit'
import { db } from '../firebase';
import { saveProduct } from '../reducks/products/operations';
import { SetAccessoryType } from '../components/Products';

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("product/edit")[1];
  if( id !== "" ) {
    id = id.split("/")[1];
  } 

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const inputName = useCallback((e) => {
    setName(e.target.value);
  }, [setName])
  const inputDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription])
  const inputPrice = useCallback((e) => {
    setPrice(e.target.value);
  }, [setPrice])
  const inputSize = useCallback((e) => {
    setSize(e.target.value);
  }, [setSize])

  useEffect(() => {
    if (id !== "") {
      db.collection("products").doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        setImages(data.images)
        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
        setSize(data.size)
        setAccessories(data.accessories)
      })
    }
  }, [id])

  return (
    <section className='section t-product-edit'>
      <div className='section__inner'>
        <h2 className='s__head'>商品の登録・編集</h2>
        <div className='section__body'>
          <ImageArea images={images} setImages={setImages} />
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
          <TextInput 
            fullWidth={true} label={"サイズ"} multiline={false} required={true}
            minRows={1} value={size} type={"text"} onChange={inputSize}
          />
          <SetAccessoryType accessories={accessories} setAccessories={setAccessories} />
          <PrimaryButton label={"商品情報を登録"} onClick={() => dispatch(saveProduct(id, name, description, price, images, size, accessories))} />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
