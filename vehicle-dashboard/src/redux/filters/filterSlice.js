// src/redux/filters/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    duration: {
      'Last month': false,
      'This month': false,
    },
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDurationFilter(state, action) {
      const { label, value } = action.payload;
      // Update the filter value based on the checkbox interaction
      if (state.filters.duration.hasOwnProperty(label)) {
        state.filters.duration[label] = value;
      }
    },
    resetFilters(state) {
      // Reset all filters to their initial state
      state.filters = {
        duration: {
          'Last month': false,
          'This month': false,
        },
      };
    },
  },
});

export const { setDurationFilter, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
