import React, { useEffect } from 'react'
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';


const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const products = getProducts(selector)

  const query = selector.router.location.search;
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
  const search = /^\?search=/.test(query) ? query.split('?search=')[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(category, search))
  }, [query])
  
  return (
    <section className='t-product-list'>
      {search !== "" && (
        <p>「{decodeURI(search)}」の検索結果: {products.length}件</p>
      )}
      <div className='product__all'>
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))
        ) : (
          <p>商品がありません</p>
        )}
      </div>
    </section>
  )
}

export default ProductList
