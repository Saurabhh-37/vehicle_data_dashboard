// src/redux/actions/filterActions.js
export const setVehicleMakeFilter = (make, isChecked) => ({
    type: 'SET_VEHICLE_MAKE_FILTER',
    payload: { make, isChecked },
  });
  
  export const setDurationFilter = (duration, isChecked) => ({
    type: 'SET_DURATION_FILTER',
    payload: { duration, isChecked },
  });
  
  export const resetFilters = () => ({
    type: 'RESET_FILTERS',
  });
  