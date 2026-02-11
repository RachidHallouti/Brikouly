import { motion } from "motion/react"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slice"
export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
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
        <motion.div
          variants={childVariant}
          className="font-bebas bg-gray-400 rounded-full h-40 w-40 overflow-hidden"
        >
          <img
            src={"http://127.0.0.1:8000/storage/" + user.photo}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.h1
          variants={childVariant}
          className="font-bebas text-[40px] text-zinc-800"
        >
          {user.prenom} {user.nom}
        </motion.h1>
        {user.bio && (
          <motion.h1
            variants={childVariant}
            className="font-bebas text-[40px] text-zinc-800"
          >
            {user.bio}
          </motion.h1>
        )}
        <motion.h1
          variants={childVariant}
          className="font-bebas text-[40px] text-zinc-800"
        >
          {user.ville}
        </motion.h1>

        <motion.button
          variants={childVariant}
          className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          Modifier
        </motion.button>
        <motion.button
          onClick={() => dispatch(logout())}
          variants={childVariant}
          className="h-11 w-full cursor-pointer text-red-500 border-3 rounded-2xl text-lg font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          Se deconnecter
        </motion.button>
      </motion.div>
    </main>
  )
}
