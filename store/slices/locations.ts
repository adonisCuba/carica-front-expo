 import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
 interface LocationState {
   location: Location.LocationObject | null;
 }
 const initialState: LocationState = {
    location: null,
 };

 // Crear el slice
 const locationSlice = createSlice({
   name: 'location',
   initialState,
   reducers: {
     setLocation(state, action: PayloadAction<Location.LocationObject>) {
       state.location = action.payload;
     },
     clearLocation(state) {
       state.location = null;
     }
   },
   
 });
 // Exportar acciones y reducer
 export const { setLocation, clearLocation } = locationSlice.actions;
 export default locationSlice.reducer;
