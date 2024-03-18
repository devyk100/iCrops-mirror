import { configureStore } from '@reduxjs/toolkit'
import dataFormReducer from '../features/DataCollectionSlice'
import LocationReducer from '../features/LocationSlice'

export default configureStore({
  reducer: {
    dataform: dataFormReducer,
    location: LocationReducer
  }
})