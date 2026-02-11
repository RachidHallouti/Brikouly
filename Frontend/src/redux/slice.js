import { createSlice } from "@reduxjs/toolkit"

const tokenLocal = localStorage.getItem("token")
const userLocal = localStorage.getItem("user")

const initialState = {
  token: tokenLocal || null,
  user: userLocal ? JSON.parse(userLocal) : null,
  isAuth: tokenLocal ? true : false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuth = true
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
