import React from 'react'
import List from '@material-ui/core/List'
import { getFavoriteList } from '../reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteListItem } from '../components/Products'

const FavoriteList = () => {
  const selector = useSelector(state => state)
  const productsFavorite = getFavoriteList(selector)

  return (
    <section className='t-favorite-list'>
      <div className='inner'>
        <h2 className='s__head'>お気に入り</h2>
        <List>
          {productsFavorite.length > 0 && (
            productsFavorite.map(product => <FavoriteListItem product={product} key={product.favoriteId} />)
          )}
        </List>
      </div>
    </section>
  )
}

export default FavoriteList
