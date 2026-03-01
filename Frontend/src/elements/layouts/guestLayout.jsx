import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../header"
import { useSelector } from "react-redux"
import { AnimatePresence } from "motion/react"

export default function GuestLayout() {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  if (token) return <Navigate to="/profile" />
  return (
    <AnimatePresence mode="wait">
      <Outlet key={location.pathname} />
    </AnimatePresence>
  )
}
