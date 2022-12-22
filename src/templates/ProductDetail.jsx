import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, FirebaseTimestamp } from '../firebase';
import HTMLReactParser from "html-react-parser"
import { ImageSwiper } from '../components/Products';
import AccessoryTable from '../components/Products/AccessoryTable';
import { addProductToCart, addProductToFavoriteList } from '../reducks/users/operations';

const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}  

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1]

  const [product, setProduct] = useState(null)

  const addProduct = useCallback((selectedColor) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToCart({
      added_at: timestamp,
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      size: product.size,
      accessory: selectedColor,
      productId: product.id,
      quantity: 1,
    }))
  }, [product])

  const addFavorite = useCallback((selectedColor) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToFavoriteList({
      added_at: timestamp,
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      size: product.size,
      accessory: selectedColor,
      productId: product.id,
      quantity: 1,
    }))
  }, [product])

  useEffect(() => {
    db.collection("products").doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)
      })
  }, [])

  return (
    <section className='t-product-detail'>
      {product && (
        <div className='inner'>
          <div className='p__slide'>
            <ImageSwiper images={product.images} />
          </div>
          <div className='p__detail'>
            <h2 className='p__name'>{product.name}</h2>
            <p className='p__description'>{returnCodeToBr(product.description)}</p>
            <AccessoryTable addFavorite={addFavorite} addProduct={addProduct} accessories={product.accessories} />
            <p className='p__price'>{"¥" + product.price}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
