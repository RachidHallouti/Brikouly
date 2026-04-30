import React from "react"
import NavButton from "./animatedElements/navbutton"
import {
  CirclePlus,
  CircleUser,
  Heart,
  Home,
  MessageCircle,
} from "lucide-react"
import { motion } from "motion/react"
import { useSelector } from "react-redux"

export default function Footer(props) {
  const color = "#ff6900"
  const { token } = useSelector((state) => state.auth)

  return (
    <motion.footer
      animate={{
        y: props.isScrolling ? "100%" : 0,
        opacity: props.isScrolling ? 0.6 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8,
      }}
      className="fixed sm:hidden flex z-50 bottom-0 w-full ml-auto justify-around rounded-t-2xl text-white p-4 pt-4.5 bg-orange-500 items-center backdrop-blur-md shadow-[0_-10px_30px] shadow-orange-500/30"
    >
      <NavButton color={color} pages={["/"]}>
        <Home size={24} />
      </NavButton>
      {token && (
        <NavButton color={color} pages={["/favoris"]}>
          <Heart size={24} />
        </NavButton>
      )}
      <NavButton color={color} pages={["/ajouter-annonce"]}>
        <CirclePlus size={26} />
      </NavButton>
      {token && (
        <NavButton color={color} pages={["/messages"]}>
          <MessageCircle size={24} />
        </NavButton>
      )}
      <NavButton color={color} pages={["/profile", "/login", "/register"]}>
        <CircleUser size={24} />
      </NavButton>
    </motion.footer>
  )
}
