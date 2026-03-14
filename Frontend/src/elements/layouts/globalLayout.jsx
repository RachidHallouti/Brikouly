import { Outlet } from "react-router-dom"
import Header from "../header"

export default function GlobalLayout() {
  return (
    <div className="bg-[#f8f7f5] ">
      <Header />
      <main className="sm:w-9/10 mx-auto font-outfit p-2 sm:p-7 pt-11 min-h-[calc(100vh-88px)] ">
        <Outlet />
      </main>
    </div>
  )
}
