import {
  CircleUser,
  Heart,
  Home,
  MessageCircle,
  User,
  Ellipsis,
  X,
  CirclePlus,
  SquarePlus,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import NavButton from "./animatedElements/navbutton"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const color = "#ff6900"

export default function Header() {
  const { token } = useSelector((state) => state.auth)
  const barInview = useSelector((state) => state.elements.barInView)
  const navigate = useNavigate()
  const location = useLocation().pathname
  const [menu, setMenu] = useState(false)

  return (
    <>
      <header className="flex z-50 top-0 sticky sm:top-4 justify-between p-6 sm:px-10 bg-orange-500 items-center sm:m-5 sm:rounded-2xl backdrop-blur-md shadow-xl shadow-orange-500/30">
        <div className="flex gap-5 items-center">
          <Link to="/" className="text-white text-2xl sm:text-4xl font-bungee">
            <motion.div whileHover={{ skewX: 10, rotateY: 30, scale: 0.95 }}>
              BRIKOULY
            </motion.div>
          </Link>
          <AnimatePresence>
            {location != "/ajouter-annonce" && !barInview && token && (
              <motion.button
                initial={{ scale: 0.5, opacity: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-xl p-2 rounded-xl text-orange-500 font-changa flex gap-2 items-center cursor-pointer"
                onClick={() => navigate("/ajouter-annonce")}
              >
                <SquarePlus />
                Ajouter Annonce
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <nav className="hidden sm:h-12 sm:flex gap-3">
          <NavButton color={color} pages={["/"]}>
            <Home className="h-8 w-8" />
          </NavButton>
          {token && (
            <NavButton color={color} pages={["/favoris"]}>
              <Heart className="h-8 w-8" />
            </NavButton>
          )}
          {token && (
            <NavButton color={color} pages={["/messages"]}>
              <MessageCircle className="h-8 w-8" />
            </NavButton>
          )}
          <NavButton
            color={color}
            drop={true}
            pages={["/profile", "/login", "/register"]}
          >
            <CircleUser className="h-8 w-8" />
          </NavButton>
        </nav>
        <nav className="flex sm:hidden gap-3">
          <button
            className="text-white cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            {!menu ? (
              <Ellipsis className="h-6 w-6" />
            ) : (
              <X className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>
      {menu && (
        <div className="h-screen flex sm:hidden flex-col w-full absolute top-0 pt-20 bg-orange-500/80">
          <motion.button
            className="flex gap-3 p-4 w-full items-center text-white"
            whileHover={{ backgroundColor: color }}
            whileTap={{ backgroundColor: color }}
            onClick={() => {
              navigate("/")
              setMenu(false)
            }}
          >
            <Home className="h-14 w-14" />
            <h1 className="font-bebas text-2xl">Home</h1>
          </motion.button>
          <motion.button
            className="flex gap-3 p-4 w-full items-center text-white"
            whileHover={{ backgroundColor: color }}
            whileTap={{ backgroundColor: color }}
            onClick={() => {
              navigate("/favoris")
              setMenu(false)
            }}
          >
            <Heart className="h-14 w-14" />
            <h1 className="font-bebas text-2xl">Favoris</h1>
          </motion.button>
          <motion.button
            className="flex gap-3 p-4 w-full items-center text-white"
            whileHover={{ backgroundColor: color }}
            whileTap={{ backgroundColor: color }}
            onClick={() => {
              navigate("/messages")
              setMenu(false)
            }}
          >
            <MessageCircle className="h-14 w-14" />
            <h1 className="font-bebas text-2xl">Messages</h1>
          </motion.button>
          <motion.button
            className="flex gap-3 p-4 w-full items-center text-white"
            whileHover={{ backgroundColor: color }}
            whileTap={{ backgroundColor: color }}
            onClick={() => {
              navigate("/profile")
              setMenu(false)
            }}
          >
            <CircleUser className="h-14 w-14" />
            <h1 className="font-bebas text-2xl">Profile</h1>
          </motion.button>
        </div>
      )}
    </>
  )
}
