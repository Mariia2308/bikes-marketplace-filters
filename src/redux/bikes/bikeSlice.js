import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database'; // Підключення до Realtime Database
import { db } from '../../firebase';

// Асинхронне отримання велосипедів з Realtime Database
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const dbRef = ref(db, 'bikes'); // Вказуємо шлях до колекції "bikes" в базі даних
  const snapshot = await get(dbRef); // Отримуємо дані
  console.log(snapshot.val()); // Лог для перевірки отриманих даних
  if (snapshot.exists()) {
    // Якщо дані є, перетворюємо їх в масив
    return Object.entries(snapshot.val()).map(([id, bike]) => ({ id, ...bike }));
  } else {
    return []; // Якщо даних немає, повертаємо порожній масив
  }
});

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: {
    list: [],  // Назва зміщена з 'items' на 'list'
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
        state.list = action.payload; // Зберігаємо отримані байки в state
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Зберігаємо помилку, якщо вона є
      });
  }
});

export default bikeSlice.reducer;
