import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPropertiesRequest: (state) => {
      state.loading = true;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPropertyDetailRequest: (state) => {
      state.loading = true;
    },
    fetchPropertyDetailSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPropertyDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUsersPropertiesRequest: (state) => {
      state.loading = true;
    },
    fetchUsersPropertiesSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchUsersPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
     // Actions for creating a post (POST)
     addNewPropertyRequest: (state) => {
        state.loading = true;
      },
      addNewPropertyRequestSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
      addNewPropertyRequestFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    // other actions like addPostRequest, addPostSuccess, etc.
  },
});

export const {
    fetchPropertiesRequest,
    fetchPropertiesSuccess,
    fetchPropertiesFailure,
    fetchUsersPropertiesRequest,
    fetchUsersPropertiesFailure,
    fetchUsersPropertiesSuccess,
    fetchPropertyDetailRequest,
    fetchPropertyDetailSuccess,
    fetchPropertyDetailFailure,
    addNewPropertyRequest,
    addNewPropertyRequestFailure,
    addNewPropertyRequestSuccess
} = propertySlice.actions;

export default propertySlice.reducer;
