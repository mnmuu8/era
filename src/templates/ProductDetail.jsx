import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase';
import HTMLReactParser from "html-react-parser"
import { ImageSwiper } from '../components/Products';

const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}  

const ProductDetail = () => {
  const selector = useSelector(state => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1]

  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection("products").doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data)
      })
  }, [])

  return (
    <div>
      {product && (
        <div>
          <ImageSwiper images={product.images} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
          <p>{returnCodeToBr(product.description)}</p>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
