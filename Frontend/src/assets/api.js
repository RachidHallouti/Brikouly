import axios from "axios"
import url from "./url"

const api = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
})

// Interceptor to get the LATEST token for every request
api.interceptors.request.use(
  (config) => {
    const freshToken = localStorage.getItem("token") // Look it up here
    if (freshToken) {
      config.headers.Authorization = `Bearer ${freshToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
