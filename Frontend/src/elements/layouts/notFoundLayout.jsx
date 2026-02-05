import { Home } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFoundLayout() {
  const [showHome, setShowHome] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <motion.h1
        initial={{ opacity: 0, y: -100, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "circIn" }}
        className="text-orange-500 text-3xl font-bungee"
      >
        404 - Page not found
      </motion.h1>
      <AnimatePresence>
        <motion.button
          onMouseEnter={() => setShowHome(true)}
          onMouseLeave={() => setShowHome(false)}
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          layout
          className="flex h-16 items-center gap-4 bg-orange-500 cursor-pointer font-bungee text-2xl text-white rounded-xl px-6 py-4 overflow-hidden"
        >
          {showHome && (
            <AnimatePresence>
              <motion.div
                key="home-icon"
                initial={{ opacity: 0, x: -90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="flex items-center"
              >
                <Home size={40} />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Text automatically shifts as icon appears */}
          <motion.span layout className="text-white">
            Back Home
          </motion.span>
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
