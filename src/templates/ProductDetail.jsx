import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase';
import HTMLReactParser from "html-react-parser"
import { ImageSwiper } from '../components/Products';
// import { IconButton } from '@material-ui/core';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccessoryTable from '../components/Products/AccessoryTable';

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
    <section className='t-product-detail'>
      {product && (
        <div className='inner'>
          <div className='p__slide'>
            <ImageSwiper images={product.images} />
          </div>
          <div className='p__detail'>
            <h2 className='p__name'>{product.name}</h2>
            <p className='p__description'>{returnCodeToBr(product.description)}</p>
            {/* <div className='p__quantity'>
              <p>{"残り" + product.quantity + "つ"}</p>
              <div className='icons'>
                <IconButton>
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </div>
            </div> */}
            <AccessoryTable accessories={product.accessories} />
            <p className='p__price'>{"¥" + product.price}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
