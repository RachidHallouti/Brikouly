import { createBrowserRouter } from "react-router-dom"
import Home from "./elements/routes/home"
import Profile from "./elements/routes/profile"
import AjouterAnnonce from "./elements/routes/ajouterAnnonce"
import PublicLayout from "./elements/layouts/publicLayout"
import AuthLayout from "./elements/layouts/authLayout"
import GlobalLayout from "./elements/layouts/globalLayout"
import Login from "./elements/routes/login"
import NotFoundLayout from "./elements/layouts/notFoundLayout"
import GuestLayout from "./elements/layouts/guestLayout"
import Register from "./elements/routes/register"
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
