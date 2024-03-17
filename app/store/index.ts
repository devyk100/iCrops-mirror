import { configureStore } from '@reduxjs/toolkit'
import dataFormReducer from '../features/DataCollectionSlice'

export default configureStore({
  reducer: {
    dataform: dataFormReducer
  }
})