import { configureStore } from '@reduxjs/toolkit'
import loadsReducer from './slices/loads'; 
import trucksReducer from './slices/trucks'; 
import locationReducer from './slices/locations'; 
import subscriptionSlice from './slices/suscribed';


export const store = configureStore({
  reducer: {
   loads: loadsReducer,
   trucks: trucksReducer,
   location: locationReducer,
   subscribed: subscriptionSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch