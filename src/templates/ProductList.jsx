import React, { useEffect } from 'react'
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';
import AddIcon from '@material-ui/icons/Add';
import { push } from 'connected-react-router';
import { getUserId, getUserRole } from '../reducks/users/selectors';

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector)
  console.log(uid)
  const products = getProducts(selector)

  const query = selector.router.location.search;
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
  const search = /^\?search=/.test(query) ? query.split('?search=')[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(category, search))
  }, [query])
  
  return (
    <section className='t-product-list'>
      <div className='inner'>
        <div className='search__result'>
          {search !== "" && (
            <p>「{decodeURI(search)}」の検索結果: {products.length}件</p>
          )}
        </div>
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
        {/* <div className='add-btn' onClick={() => dispatch(push('/product/edit'))}>
          <AddIcon className="icon" />
        </div> */}
      </div>
    </section>
  )
}

export default ProductList
