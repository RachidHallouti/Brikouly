import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Header from "../header"
import { useSelector } from "react-redux"

export default function GuestLayout() {
  const token = useSelector((state) => state.auth.token)

  if (token) return <Navigate to="/profile" />
  return <Outlet />
}
