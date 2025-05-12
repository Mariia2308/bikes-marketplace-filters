import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database'; 
import { db } from '../../firebase';


export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const dbRef = ref(db, 'bikes'); 
  const snapshot = await get(dbRef); 
  console.log(snapshot.val()); 
  if (snapshot.exists()) {
   
    return Object.entries(snapshot.val()).map(([id, bike]) => ({ id, ...bike }));
  } else {
    return []; 
  }
});

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: {
    list: [],  
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; 
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  }
});

export default bikeSlice.reducer;
