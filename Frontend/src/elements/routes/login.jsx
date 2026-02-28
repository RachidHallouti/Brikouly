import { motion } from "motion/react"
import { Bell, Megaphone, MessageCircle, Star, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice"
export default function Login() {
  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({})
  const dispatch = useDispatch()
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
  const childVariantP = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }
  const loginUser = async () => {
    try {
      const reponse = await axios.post(
        "http://localhost:8000/api/login",
        userLogin,
      )
      dispatch(login(reponse.data.userData))
    } catch {}
  }
  return (
    <main className=" flex justify-around min-h-200 w-full items-center py-6">
      <div className="flex justify-center w-2/3">
        <motion.div
          variants={parentVariant}
          initial="hidden"
          animate="visible"
          className="flex max-w-155 gap-4 flex-col items-center p-8 sm:p-16 rounded-2xl border-orange-500 w-full sm:w-1/2 sm:min-w-lg shadow-xl shadow-orange-500/50"
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
            className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl shadow-md"
            type="text"
            placeholder=" Email"
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
          />
          <motion.input
            variants={childVariant}
            className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl shadow-md"
            type="password"
            placeholder=" Mot de passe"
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
          />
          <motion.button
            variants={childVariant}
            className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold shadow-md"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
            onClick={loginUser}
          >
            Se connecter
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            variants={childVariant}
            className="h-11 w-full cursor-pointer text-orange-500 border-3 rounded-2xl text-lg font-inter font-semibold shadow-md"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
          >
            S'inscrire
          </motion.button>
        </motion.div>
      </div>
      <div className="w-1/3 lg:flex justify-center h-165 items-center hidden overflow-hidden">
        <motion.div
          initial={{
            opacity: 0,
            x: "100%",
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 },
          }}
          className="h-145 text-white w-5/6 items-center p-10 flex flex-col bg-linear-to-tr rounded-4xl from-orange-400/70 to-orange-600/70 shadow-xl"
        >
          <h1 className="font-space font-bold text-4xl">BRIKOULY</h1>
          <motion.p className="mt-6 text-xl font-outfit">
            Brikouly est votre plateforme pour trouver et offrir des services
            rapidement.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="visible"
            className="text-md mt-10 font-outfit flex flex-col w-full gap-4"
          >
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <User className="h-6 w-6" />
              Connectez-vous ou créez un compte.
            </motion.p>
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <Megaphone className="h-6 w-6" />
              Publiez votre annonce en décrivant vos besoins ou services.
            </motion.p>
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <Bell className="h-6 w-6" />
              Recevez des propositions de prestataires ou clients proches de
              vous.
            </motion.p>
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <MessageCircle className="h-6 w-6" />
              Communiquez facilement via le système de messagerie intégré.
            </motion.p>
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <Star className="h-6 w-6" />
              Choisissez et évaluez le meilleur service pour vous.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
