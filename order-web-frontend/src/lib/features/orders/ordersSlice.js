import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = ordersSlice.actions




