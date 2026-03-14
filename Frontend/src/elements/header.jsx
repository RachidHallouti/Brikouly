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
  Search,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
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
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, "change", (e) => {
    e > 0 ? setScrolled(true) : setScrolled(false)
  })

  return (
    <>
      <motion.header
        className="flex z-50 sticky h-22 justify-between text-white p-6 sm:px-10 bg-linear-to-tr from-orange-500 to-orange-500 items-center backdrop-blur-md shadow-xl shadow-orange-400/40"
        variants={{
          scrolled: {
            marginLeft: 70,
            marginRight: 70,
            borderRadius: 20,
            top: 20,
          },
          unscrolled: {
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 0,
            top: 0,
          },
        }}
        animate={scrolled ? "scrolled" : "unscrolled"}
      >
        <div className="flex gap-5 items-center">
          <Link
            to="/"
            className=" text-2xl sm:text-4xl font-outfit font-extrabold"
          >
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
        <div className="flex gap-10 h-full">
          <AnimatePresence>
            {!barInview && (
              <motion.div
                initial={{ opacity: 0, width: "200px" }}
                exit={{ opacity: 0, width: "200px" }}
                animate={{ opacity: 1, width: "100%" }}
                className="relative hidden md:flex items-center text-black justify-center max-w-full "
              >
                <motion.input
                  type="text"
                  className="bg-gray-50 font-outfit focus:shadow-lg pl-3 text-lg w-70 lg:w-100 h-12 rounded-xl shadow-sm"
                  placeholder=" Rechercher des annonces"
                  whileFocus={{
                    width: "550px",
                  }}
                />
                <motion.button
                  className="absolute hover:shadow-md cursor-pointer right-2 rounded-xl bg-orange-500 p-1.5 text-white"
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="hidden sm:h-9 sm:flex h-full gap-3 pb-10">
            <NavButton color={color} pages={["/"]}>
              <Home size={27} />
            </NavButton>
            {token && (
              <NavButton color={color} pages={["/favoris"]}>
                <Heart size={27} />
              </NavButton>
            )}
            {token && (
              <NavButton color={color} pages={["/messages"]}>
                <MessageCircle size={27} />
              </NavButton>
            )}
            <NavButton
              color={color}
              drop={true}
              pages={["/profile", "/login", "/register"]}
            >
              <CircleUser size={27} />
            </NavButton>
          </nav>
        </div>
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
      </motion.header>
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
