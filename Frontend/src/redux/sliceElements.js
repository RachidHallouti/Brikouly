import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  barInView: false,
  toaster: {},
}

const elSilce = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setBar: (state, action) => {
      state.barInView = action.payload
    },
    setToaster: (state, action) => {
      state.toaster = action.payload
    },
  },
})
export const { setBar, setToaster } = elSilce.actions
export default elSilce.reducer
