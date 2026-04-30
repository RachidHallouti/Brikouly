import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, color, motion } from "motion/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slice"
export default function NavButton(props) {
  const location = useLocation().pathname
  const isActive = props.pages.includes(location)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navButton = {
    rest: { backgroundColor: "rgba(255, 255, 255, 0)" },
    active: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      color: props.color,
      y: -4,
    },
  }
  return (
    <div className="relative">
      <motion.button
        className={`relative z-20 text-white ${isActive && "shadow-md"} cursor-pointer p-2 rounded-xl`}
        variants={navButton}
        animate={isActive ? "active" : "rest"}
        whileHover="active"
        whileTap={{ scale: 0.9 }}
        transition={{
          default: { duration: 0.25 },
          scale: { type: "spring", stiffness: 300 },
        }}
        onClick={() => navigate(props.pages[0])}
      >
        {props.children}
        <motion.span
          className="pointer-events-none absolute left-1/2 bg-white opacity-0 h-1.5 w-4.5 rounded-full"
          style={{ x: "-50%" }}
          animate={
            isActive ? { y: 13, opacity: 1, scaleX: 1 } : { y: 22, opacity: 0 }
          }
        ></motion.span>
      </motion.button>
    </div>
  )
}
