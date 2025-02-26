import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './redux/favoriteSlice'

export default configureStore({
  reducer: {
    favorite: favoriteReducer
  }
})