import { createSlice } from '@reduxjs/toolkit'

export const localSlice = createSlice({
  name: 'locals',
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

export const { incremented, decremented } = localSlice.actions




