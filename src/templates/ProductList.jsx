import React, { useEffect } from 'react'
import { ProductCard } from '../components/products';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';


const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const products = getProducts(selector)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  console.log(products)

  return (
    <div>
      <div>
        {products.length > 0 && (
          products.map(product => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ProductList
