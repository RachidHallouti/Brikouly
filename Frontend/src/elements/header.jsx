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
import { useDispatch, useSelector } from "react-redux"
import { setToaster } from "../redux/sliceElements"
const color = "#ff6900"

export default function Header(props) {
  const { token } = useSelector((state) => state.auth)
  const barInview = useSelector((state) => state.elements.barInView)
  const disp = useDispatch()
  const navigate = useNavigate()
  const isMobile = window.innerWidth < 770
  const location = useLocation().pathname
  const scrolled = props.scrolled

  return (
    <motion.header
      className="flex z-50  w-full  m-0 ml-auto h-22 justify-between text-white p-6 sm:px-10 bg-orange-500 items-center backdrop-blur-md shadow-lg shadow-orange-500/30"
      variants={{
        scrolled: {
          borderRadius: 20,
        },
        unscrolled: {
          borderRadius: 0,
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
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hidden md:flex  shadow-sm hover:shadow-md text-xl p-3 rounded-xl h-12 text-orange-500 font-outfit font-bold gap-2 items-center cursor-pointer "
              onClick={() => navigate("/ajouter-annonce")}
            >
              <SquarePlus strokeWidth={2.3} />
              Publiez une annonce
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-10 h-full">
        <AnimatePresence>
          {(!barInview || isMobile || location != "/") && (
            <motion.div
              initial={{ opacity: 0, width: "200px" }}
              exit={{ opacity: 0, width: "200px" }}
              animate={{ opacity: 1, width: "100%" }}
              className="relative flex items-center text-black justify-center max-w-full "
            >
              <motion.input
                type="text"
                className="bg-gray-50 font-outfit pr-13 focus:shadow-lg pl-3 text-lg  w-74 lg:w-100 h-12 rounded-xl shadow-sm"
                placeholder="Rechercher des annonces"
                whileFocus={{
                  width: isMobile ? "" : "550px",
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
    </motion.header>
  )
}
