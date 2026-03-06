import { Outlet } from "react-router-dom"
import Header from "../header"

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <main className="w-9/10 mx-auto p-7 pt-11 min-h-[calc(100vh-88px)] ">
        <Outlet />
      </main>
    </>
  )
}
