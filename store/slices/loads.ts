import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Load } from '@/common/interfaces/loadType';
import { fetchLoads, fetchLoadsByLocation } from '@/common/supabase/loads/fetchLoads';
import { Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { deleteLoads } from '../../common/supabase/loads/deleteLoads';
import { getLoadsByRadius, LoadByRadiusInterface } from '@/common/supabase/loads/getLoadsByRadius';
import { ServiceLocation } from '@/common/services/locationService';

interface LoadsState {
    loads: Load[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: boolean;
 
}

const initialState: LoadsState = {
    loads: [],
    loading: 'idle',
    error: false,

};

//TRAER Cargas
 export const getLoads = createAsyncThunk(
  'loads/getLoads',
  async ( isDriver: boolean, { rejectWithValue }): Promise<Load[] | []> => {
    try {
        const fetchUser = await supabase.auth.getUser();
        const role = fetchUser.data.user?.user_metadata?.rol_nombre;
        const isLoader = role === 'driver' ? false : true
        const data = await fetchLoads({isDriver});
        if(data === undefined) return [];
        return data;
    } catch (error: any) {
        Alert.alert('Error', error.message);
        rejectWithValue(error);
      return [] 
    }
  }
);

//Borrar Cargas
 export const deleteLoad = createAsyncThunk(
  'loads/deleteLoads',
  async ( load: Load, { dispatch,  rejectWithValue }) => {
    try {
       
        await deleteLoads(load.id);
        await dispatch(getLoads(false));
        
    } catch (error: any) {
        Alert.alert('Error', error.message);
        rejectWithValue(error);
    }
  }
);

export const getLoadsByLocation = createAsyncThunk(
  'loads/getLoadsByLocation',
  async (   {address, radius }:{address: string, radius: number}, { rejectWithValue }): Promise<Load[] | []> => {
    try {
        const coords = await ServiceLocation.getGoogleGeocodingLatLng(address);
        const {lat,lng} = coords.data;
        const data = await getLoadsByRadius( {lat,lng,radius} );
        if(data === undefined) return [];
        return data;
    } catch (error: any) {
        Alert.alert('Error', error.message);
        rejectWithValue(error);
      return [] 
    }
  }
)


const loadsSlice = createSlice({
  name: 'loads',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoads.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
      })
      .addCase(getLoads.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.loads = action.payload as Load[];
        state.error = false;
      })
      .addCase(getLoads.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = true;
        state.loads = [];
      })
      .addCase(getLoadsByLocation.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
      })
      .addCase(getLoadsByLocation.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.loads = action.payload as Load[];
        state.error = false;
      })
      .addCase(getLoadsByLocation.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = true;
        state.loads = [];
      })

  },
});

// Exportar acciones y reducer
//  export const { loads } = loadsSlice.actions;
export default loadsSlice.reducer;
