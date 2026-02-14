import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  barInView: false,
}

const elSilce = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setBar: (state, action) => {
      state.barInView = action.payload
    },
  },
})
export const { setBar } = elSilce.actions
export default elSilce.reducer
