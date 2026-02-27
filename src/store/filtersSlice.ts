import { createSlice } from '@reduxjs/toolkit';

type FiltersState = {
  category: string;
  priority: string;
  type: string;
};

const initialState: FiltersState = {
  category: 'none',
  priority: 'none',
  type: 'none',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { setCategory, setPriority, setType } = filtersSlice.actions;
export default filtersSlice.reducer;
