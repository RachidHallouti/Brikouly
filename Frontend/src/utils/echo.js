import Echo from "laravel-echo"
import Pusher from "pusher-js"

window.Pusher = Pusher

export const echo = new Echo({
  broadcaster: "reverb",
  key: "crkcvirbohgucbp7x5q6",

  wsHost: "127.0.0.1",
  wsPort: 8080,

  forceTLS: false,

  enabledTransports: ["ws", "wss"],

  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",

  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  },
})
