import React, { useEffect, useState, useCallback } from 'react'
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { TextInput } from '../components/UIkit';
import { push } from 'connected-react-router';

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const products = getProducts(selector)

  const query = selector.router.location.search;
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
  const search = /^\?search=/.test(query) ? query.split('?search=')[1] : "";
  const [keyword, setKeyword] = useState("")

  console.log(decodeURI(search))

  const inputKeyword = useCallback((e) => {
    setKeyword(e.target.value)
  }, [setKeyword])

  const searchKeyword = (e, path) => {
    dispatch(push(`?search=${path}`))
  }

  useEffect(() => {
    dispatch(fetchProducts(category, search))
  }, [query])
  
  return (
    <section className='t-product-list'>
      <div className='inner'>
        <div className='search__box'>
          <div className='search__field'>
            <TextInput 
              fullWidth={false} label={"キーワードを入力"} multiline={false}
              onChange={inputKeyword} required={false} minRows={1} value={keyword} type={"text"}
            />
            <IconButton onClick={(e) => searchKeyword(e, keyword)} className="circle-icon">
              <SearchIcon />
            </IconButton>
          </div>
          <div className='search__result'>
            {search !== "" && (
              <p>「{decodeURI(search)}」の検索結果: {products.length}件</p>
            )}
          </div>
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
      </div>
    </section>
  )
}

export default ProductList
