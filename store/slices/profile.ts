import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Alert } from 'react-native';
import { Truck, TruckSupabaseResponse } from '@/common/interfaces/truckType';
import fetchTrucks, { addTruck, editTrucks } from '@/common/supabase/trucks/fetchTrucks';
import { UserSupabaseResponse } from '@/common/interfaces/userType';
import { fetchProfile, updateProfile } from '@/common/supabase/users/fetchUser';

interface UserState {
    user: UserSupabaseResponse,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: boolean;
 
}

const initialState: UserState = {
    user: {} as UserSupabaseResponse,
    loading: 'idle',
    error: false,

};

//TRAER Cargas
 export const getTrucks = createAsyncThunk(
  'user/getUser',
  async ( _: string, { rejectWithValue }): Promise<Truck[] | []> => {
    try {
      const data = await fetchProfile()
        if(data === undefined) return [];
        return data;
    } catch (error: any) {
        Alert.alert('Error', error.message);
        rejectWithValue(error);
      return [] 
    }
  }
);
 export const updateTruck = createAsyncThunk(
  'user/updateUser',
  async (user: UserSupabaseResponse, { rejectWithValue, dispatch }) => {
    try {
      const isEdit = await updateProfile(user);
      if (isEdit) {
        dispatch(getTrucks('')); // Refresca la lista tras editar
      }
      return isEdit;
    } catch (error: any) {
      Alert.alert('Error', error.message);
      return rejectWithValue(error);
    }
  }
);
 export const createTruck = createAsyncThunk(
  'trucks/createTruck',
  async (truck: TruckSupabaseResponse, { rejectWithValue, dispatch }) => {
    try {
     const newTruck = await addTruck(truck)
     if (newTruck) {
        dispatch(getTrucks('')); // Refresca la lista tras editar
     } 
     
    } catch (error: any) {
      Alert.alert('Error', error.message);
      return rejectWithValue(error);
    }
  }
);


const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrucks.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
      })
      .addCase(getTrucks.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.trucks = action.payload as Truck[];
        state.error = false;
      })
      .addCase(getTrucks.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = true;
        state.trucks = [];
      })
      
  },
});

// Exportar acciones y reducer
//  export const { loads } = loadsSlice.actions;
export default trucksSlice.reducer;
