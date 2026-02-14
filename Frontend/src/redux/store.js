import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slice"
import ElReducer from "./sliceElements"
const store = configureStore({
  reducer: {
    auth: authReducer,
    elements: ElReducer,
  },
})
export default store
