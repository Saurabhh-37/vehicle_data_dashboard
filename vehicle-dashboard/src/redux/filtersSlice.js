import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicleMake: {
    Ford: false,
    Cadillac: false,
    Jeep: false,
  },
  duration: {
    'Last month': false,
    'This month': false,
    'Last 3 Months': false,
    'Last 6 Months': false,
    'This Year': false,
    'Last Year': false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const { filterType, filterName, value } = action.payload;
      state[filterType][filterName] = value;
    },
    resetFilters: () => initialState,
  },
});

export const { toggleFilter, resetFilters } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
