import { motion } from "motion/react"
import { Bell, Megaphone, MessageCircle, Star, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice"
import api from "../../assets/api"
import { setToaster } from "../../redux/sliceElements"
export default function Login() {
  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({})
  const dispatch = useDispatch()
  const parentVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }
  const childVariant = {
    hidden: {
      opacity: 0,
      y: 70,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
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
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  }
  const loginUser = async () => {
    try {
      const res = await api.post("api/login", userLogin)
      dispatch(login(res.data.userData))
      dispatch(
        setToaster({
          message: res.data.message,
          sub: "Vous êtes maintenant connecté à Brikouly.",
        }),
      )
    } catch (error) {
      dispatch(
        setToaster({
          message:
            error?.response?.status === 401
              ? "erreur de connection"
              : "un erreur est survenue",
          sub:
            error?.response?.status === 401
              ? error?.response?.data?.message
              : null,
          type: "x",
        }),
      )
    }
  }
  return (
    <motion.main
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,

        transition: { duration: 0.2 },
      }}
      exit={{
        opacity: 0,
      }}
      className=" flex justify-center h-[calc(100vh-88*2px-(14*4px))] w-full items-center"
    >
      <div className="flex justify-center w-full lg:w-4/5 md:w-5/6 xl:w-3/4  2xl:w-2/3 shadow-[0_0_40px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden">
        <motion.div
          variants={parentVariant}
          initial="hidden"
          animate="visible"
          className="flex xl:px-20  gap-4 flex-col items-center p-8 sm:p-16 border-orange-500 w-full xl:w-3/5"
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
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
          />
          <motion.input
            variants={childVariant}
            type="password"
            placeholder=" Mot de passe"
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
          />

          <motion.button
            variants={childVariant}
            className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97, y: 1 }}
            onClick={loginUser}
          >
            Se connecter
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            variants={childVariant}
            className="h-11 w-full cursor-pointer text-orange-500 border-3 rounded-2xl text-lg font-inter font-semibold shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97, y: 1 }}
          >
            S'inscrire
          </motion.button>
        </motion.div>

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
          className="h-145 text-white w-2/5 items-center justify-center hidden p-10 xl:flex flex-col bg-linear-to-tr rounded-l-4xl from-orange-400/70 to-orange-600/70 shadow-[-5px_0_30px_rgba(0,0,0,0.25)]"
        >
          <h1 className="font-space font-bold text-3xl">
            Bienvenue sur Brikouly !
          </h1>
          <motion.p className="2xl:mt-6 mt-3 hidden xl:flex text-xl font-outfit">
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
            className="text-md 2xl:mt-10 mt-2 font-outfit flex flex-col w-full gap-4"
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
    </motion.main>
  )
}
