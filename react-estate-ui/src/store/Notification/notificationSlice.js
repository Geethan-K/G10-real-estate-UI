import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchNotificationRequest: (state) => {
      state.loading = true;
    },
    fetchNotificationSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchNotificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postNotificationRequest: (state) => {
        state.loading = true;
      },
      postNotificationSuccess: (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new post to the list
      },
      postNotificationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const {
    fetchNotificationRequest,
    fetchNotificationSuccess,
    fetchNotificationFailure,
    postNotificationRequest,
    postNotificationSuccess,
    postNotificationFailure
} = notificationSlice.actions;

export default notificationSlice.reducer;
