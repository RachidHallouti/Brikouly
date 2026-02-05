import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, color, motion } from "motion/react"
import { useState } from "react"
export default function NavButton(props) {
  const [show, setShow] = useState(false)
  const location = useLocation().pathname
  const isActive = props.pages.includes(location)
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
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="relative z-20 text-white cursor-pointer p-2 rounded-xl"
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
          className="pointer-events-none absolute left-1/2 bg-white opacity-0 h-2 w-6 rounded-full"
          style={{ x: "-50%" }}
          animate={
            isActive ? { y: 14, opacity: 1, scaleX: 1 } : { y: 22, opacity: 0 }
          }
        ></motion.span>
      </motion.button>
      <AnimatePresence>
        {" "}
        {props.drop && show && (
          <motion.div className="absolute -translate-x-2/6 w-20 pt-10 top-0 flex flex-col items-center">
            <motion.div
              className=" translate-x-[10.85px]  h-10 w-16"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            />

            <motion.div
              className="shadow-lg  bg-white flex gap-2 flex-col top-1 p-4 rounded-2xl"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <motion.button
                onClick={() => navigate("/login")}
                className="p-3 cursor-pointer w-30 rounded-2xl font-bebas"
                initial={{
                  backgroundColor: "rgba(255,135,51,0)",
                  color: "rgba(255,135,51,1)",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,135,51,1)",
                  color: "rgba(255, 255, 255, 1)",
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.95, y: 5 }}
                transition={{
                  y: { type: "spring", stiffness: 120 },
                  scale: { type: "spring", stiffness: 120 },
                }}
              >
                Se connecter
              </motion.button>
              <motion.button
                onClick={() => navigate("/register")}
                className="p-3 cursor-pointer w-30 rounded-2xl font-bebas"
                initial={{
                  backgroundColor: "rgba(255,135,51,0)",
                  color: "rgba(255,135,51,1)",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,135,51,1)",
                  color: "rgba(255, 255, 255, 1)",
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.95, y: 5 }}
                transition={{
                  y: { type: "spring", stiffness: 120 },
                  scale: { type: "spring", stiffness: 120 },
                }}
              >
                S'inscrire
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
