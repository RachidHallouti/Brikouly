import { motion } from "motion/react"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function Login() {
  const navigate = useNavigate()
  const parentVariant = {
    hidden: {
      opacity: 0,
      y: -150,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        type: "spring",
        stiffness: 150,
      },
    },
  }
  const childVariant = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        scale: { type: "spring", stiffness: 230 },
        y: { type: "spring", stiffness: 230 },
      },
    },
  }
  return (
    <main className=" flex justify-center items-center py-6">
      <motion.div
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        className="flex max-w-155 gap-4 flex-col items-center p-8 sm:p-16 rounded-2xl border-orange-500 w-4/5 sm:w-1/2 sm:min-w-lg shadow-xl shadow-orange-500/40"
      >
        <motion.div variants={childVariant}>
          <User className="h-28 w-28 text-zinc-800 " />
        </motion.div>
        <motion.h1
          variants={childVariant}
          className="font-bebas mb-4 text-[40px] text-zinc-800"
        >
          Se connecter
        </motion.h1>
        <motion.input
          variants={childVariant}
          className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
          type="text"
          placeholder=" Email"
        />
        <motion.input
          variants={childVariant}
          className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
          type="text"
          placeholder=" Mot de passe"
        />
        <motion.button
          variants={childVariant}
          className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          Se connecter
        </motion.button>
        <motion.button
          onClick={() => navigate("/register")}
          variants={childVariant}
          className="h-11 w-full cursor-pointer text-orange-500 border-3 rounded-2xl text-lg font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          S'inscrire
        </motion.button>
      </motion.div>
    </main>
  )
}
