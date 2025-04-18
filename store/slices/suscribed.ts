import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
 interface SubscriptionState {
   isSubscribed: boolean | null
 }
 const initialState: SubscriptionState = {
    isSubscribed: false,
 };

 // Crear el slice
 const subscriptionSlice = createSlice({
   name: 'suscriptionInfo',
   initialState,
   reducers: {
     setSubscritionInfo(state, action: PayloadAction<boolean>) {

       state.isSubscribed = action.payload;
     },
     clearLocation(state) {
       state.isSubscribed = false;
     }
   },
   
 });
 // Exportar acciones y reducer
 export const { setSubscritionInfo } = subscriptionSlice.actions;
 export default subscriptionSlice.reducer;
