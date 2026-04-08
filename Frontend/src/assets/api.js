import axios from "axios"
import url from "./url"

const api = axios.create({
  baseURL: url,
  headers: { "ngrok-skip-browser-warning": "true" },
})
export default api
