import React from 'react'
import List from '@material-ui/core/List'
import { getFavoriteList } from '../reducks/users/selectors'
import { useSelector } from 'react-redux'
import { FavoriteListItem } from '../components/Products'

const FavoriteList = () => {
  const selector = useSelector(state => state)
  const productsFavorite = getFavoriteList(selector)

  return (
    <section className='t-favorite-list'>
      <div className='inner'>
        <h2 className='s__head'>お気に入り</h2>
        <div className='s__body'>
          {productsFavorite.length > 0 ? (
            <List className='product__all'>
              {productsFavorite.map(product => <FavoriteListItem product={product} key={product.favoriteId} />)}
            </List>
          ) : (
            <p>お気に入りに商品がありません。</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default FavoriteList
