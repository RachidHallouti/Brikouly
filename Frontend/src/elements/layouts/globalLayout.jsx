import { Outlet, useLocation } from "react-router-dom"
import Header from "../header"
import Toaster from "../animatedElements/Toaster"
import Footer from "../Footer"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function GlobalLayout() {
  const target = useRef()
  const isMobile = window.innerWidth < 770
  const timeoutRef = useRef()
  const { scrollY } = useScroll({ container: target })
  const [scrolled, setScrolled] = useState(false)
  const [scrolling, setIsScrolling] = useState(false)
  useMotionValueEvent(scrollY, "change", (e) => {
    setScrolled(e > 50 && !isMobile)
    if (e > 0) {
      setIsScrolling(true)

      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }
  })
  const { pathname } = useLocation()

  useEffect(() => {
    if (target.current) {
      target.current.scrollTop = 0
    }
  }, [pathname])

  return (
    <div className="bg-[#f8f7f5] items-center flex flex-col overflow-hidden h-screen font-outfit relative w-full">
      <motion.header
        variants={{
          scrolled: {
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 24,
            borderRadius: 20,
          },
          unscrolled: {
            padding: 0,
          },
        }}
        animate={scrolled && !isMobile ? "scrolled" : "unscrolled"}
        className="w-full fixed z-50"
      >
        <Header scrolled={scrolled} />
      </motion.header>
      <Toaster />
      <main
        ref={target}
        id="container-scroll"
        className=" w-full  mx-auto overflow-y-auto p-2 sm:px-10 md:px-15 lg:px-20 xl:px-25 py-30 flex-1  "
      >
        <Outlet />
      </main>
      <Footer isScrolling={scrolling} />
    </div>
  )
}
