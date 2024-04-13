import { createSlice } from '@reduxjs/toolkit'

export const rentSlice = createSlice({
  name: 'rentModal',
  initialState: {
    value: false
  },
  reducers: {
    elevateModal: state => {
      state.value = !state.value;
    },

  }
})

export const { elevateModal } = rentSlice.actions




