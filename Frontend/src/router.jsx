import { createBrowserRouter } from "react-router-dom"
import Home from "./elements/pages/home"
import Profile from "./elements/pages/profile"
import AjouterAnnonce from "./elements/pages/ajouterAnnonce"
import PublicLayout from "./elements/layouts/publicLayout"
import AuthLayout from "./elements/layouts/authLayout"
import GlobalLayout from "./elements/layouts/globalLayout"
import Login from "./elements/pages/login"
import NotFoundLayout from "./elements/layouts/notFoundLayout"
import GuestLayout from "./elements/layouts/guestLayout"
import Register from "./elements/pages/register"
import { AnimatePresence } from "motion/react"
import Favoris from "./elements/pages/Favoris"
const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/",
        element: <GuestLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/ajouter-annonce",
            element: <AjouterAnnonce />,
          },
          {
            path: "/favoris",
            element: <Favoris />,
          },
          {
            path: "/messages",
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundLayout />,
  },
])
export default router
