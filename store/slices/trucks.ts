import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Load } from '@/common/interfaces/loadType';
import { fetchLoads } from '@/common/supabase/loads/fetchLoads';
import { Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Truck, TruckSupabaseResponse } from '@/common/interfaces/truckType';
import fetchTrucks, { addTruck, editTrucks } from '@/common/supabase/trucks/fetchTrucks';

interface TrucksState {
    trucks: Truck[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: boolean;
 
}

const initialState: TrucksState = {
    trucks: [],
    loading: 'idle',
    error: false,

};

//TRAER Cargas
 export const getTrucks = createAsyncThunk(
  'trucks/getTrucks',
  async ( _: string, { rejectWithValue }): Promise<Truck[] | []> => {
    try {
      const data = await fetchTrucks()
        if(data === undefined) return [];
        return data;
    } catch (error: any) {
      console.log('CatchGetTrucks')
        Alert.alert('Error', error.message);
        rejectWithValue(error);
      return [] 
    }
  }
);

 export const updateTruck = createAsyncThunk(
  'trucks/updateTruck',
  async (truck: TruckSupabaseResponse, { rejectWithValue, dispatch }) => {
    try {
      const isEdit = await editTrucks(truck);
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
    console.log('DESDESLICECREATEGRUCK',truck)
    try {
     const newTruck = await addTruck(truck)
     console.log('aqui')
     if (newTruck) {
        dispatch(getTrucks('')); // Refresca la lista tras editar
     } 
     
    } catch (error: any) {
      Alert.alert('Error Al Crear Camiones', error.message);
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
