import { AnimatePresence, motion } from "motion/react"
import { IdCard, IdCardLanyard, Lock, Plus, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice"
import { moroccanCities } from "../../assets/cities"
import useNearestCities from "../hooks/useNearestCities"
import api from "../../assets/api"
export default function Register() {
  const [form, setForm] = useState({})
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cities = useNearestCities()
  const [conti, setConti] = useState(false)
  const [preview, setPreview] = useState(null)
  const parentVariant = {
    hidden: {
      opacity: 0,
      y: "-50%",
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
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
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
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }
  const registerUser = async () => {
    if (
      form.nom &&
      photo &&
      form.prenom &&
      form.email &&
      form.password &&
      form.password == form.password_confirmation
    ) {
      const formData = new FormData()
      formData.append("nom", form.nom)
      formData.append("prenom", form.prenom)
      formData.append("email", form.email)
      formData.append("password", form.password)
      formData.append("password_confirmation", form.password_confirmation)
      formData.append("photo", photo)
      form.bio && formData.append("bio", form.bio)
      form.ville && formData.append("ville", form.ville)

      try {
        const reponse = await api.post("api/register", formData)
        dispatch(login(reponse.data.userData))
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // This grabs the specific error messages from Laravel
          const errors = error.response.data.errors
          console.log("Validation Failed:", errors)

          // Show the first error message to the user
          alert(Object.values(errors)[0][0])
        } else {
          console.error("Registration failed")
        }
      }
    } else {
      alert("erreur remplire")
    }
  }
  const photoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setPhoto(file)
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
      <motion.div className="flex items-center  rounded-2xl overflow-hidden  w-full lg:w-4/5 md:w-5/6 xl:w-3/4  2xl:w-2/3 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
        <motion.div
          initial={{
            opacity: 0,
            x: "-100%",
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 },
          }}
          className="min-h-155 text-white w-2/5 items-center justify-center hidden p-10 xl:flex flex-col bg-linear-to-tr rounded-r-4xl from-orange-400/70 to-orange-600/70 shadow-[5px_0_30px_rgba(0,0,0,0.25)]"
        >
          <h1 className="font-space font-bold text-3xl">
            Rejoignez Brikouly !
          </h1>
          <motion.p className="2xl:mt-6 mt-3 hidden xl:flex text-xl font-outfit">
            Créez votre compte pour trouver des services près de vous ou
            proposer vos compétences à la communauté.
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
            className="text-md 2xl:mt-5 mt-2 font-outfit flex flex-col w-full"
          >
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <IdCard className="h-40 w-40" />
              Utilisez vos vraies informations pour construire un profil fiable
              et inspirer confiance aux autres membres.
            </motion.p>
            <motion.p
              variants={childVariantP}
              className="flex items-center gap-5"
            >
              <Lock className="h-40 w-40" />
              Choisissez un mot de passe sécurisé et assurez-vous que vos
              informations sont correctes avant de continuer.
            </motion.p>
          </motion.div>
        </motion.div>
        <div className="flex w-full xl:w-3/5 items-center justify-center">
          <AnimatePresence mode="wait">
            {!conti ? (
              <motion.div
                key={1}
                variants={parentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full p-6 px-12 flex flex-col items-center h-full gap-2"
              >
                <motion.div variants={childVariant}>
                  <User className="h-28 w-28 text-zinc-800 " />
                </motion.div>
                <motion.h1
                  variants={childVariant}
                  className="font-bebas mb-4 text-[40px] text-zinc-800"
                >
                  S'inscrire
                </motion.h1>
                <motion.div
                  variants={childVariant}
                  whileHover={{ scale: 1.08 }}
                  className="relative"
                >
                  <label
                    htmlFor="file"
                    className="cursor-pointer overflow-hidden h-40 w-40 flex justify-center items-center bg-gray-300/60 rounded-xl"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    ) : (
                      <Plus className="" />
                    )}
                    <input
                      className="hidden"
                      onChange={photoChange}
                      type="file"
                      id="file"
                    />
                  </label>
                </motion.div>

                <motion.input
                  variants={childVariant}
                  className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
                  type="text"
                  placeholder=" Nom"
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
                <motion.input
                  variants={childVariant}
                  className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
                  type="text"
                  placeholder=" Prenom"
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                />
                <motion.button
                  variants={childVariant}
                  className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{
                    duration: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onClick={(e) => setConti(true)}
                >
                  Continuer
                </motion.button>
                <motion.button
                  onClick={() => navigate("/")}
                  variants={childVariant}
                  className="h-11 w-full cursor-pointer text-orange-500 border-3 rounded-2xl text-lg font-inter font-semibold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{
                    duration: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  annuler
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={2}
                variants={parentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full  p-6 px-12 flex flex-col items-center h-full gap-4"
              >
                <motion.textarea
                  variants={childVariant}
                  className="min-h-20 w-full px-4 pt-2 bg-gray-300/60 rounded-xl"
                  placeholder=" bio (optionnel)"
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />

                <motion.select
                  variants={childVariant}
                  className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
                  value={form && form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                >
                  <option value="">pas specifié</option>
                  {cities.map((e, index) => (
                    <option key={index} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </motion.select>
                <motion.input
                  variants={childVariant}
                  className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
                  type="email"
                  placeholder=" Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <motion.input
                  variants={childVariant}
                  className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
                  type="password"
                  placeholder=" Mot de passe"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <motion.input
                  variants={childVariant}
                  className="h-11 w-full pl-4 bg-gray-300/60 rounded-xl"
                  type="password"
                  placeholder=" Confirmer mot de passe"
                  onChange={(e) =>
                    setForm({ ...form, password_confirmation: e.target.value })
                  }
                />
                <motion.button
                  variants={childVariant}
                  className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{
                    duration: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onClick={registerUser}
                >
                  S'inscrire
                </motion.button>
                <motion.button
                  onClick={() => setConti(false)}
                  variants={childVariant}
                  className="h-11 w-full cursor-pointer text-orange-500 border-3 rounded-2xl text-lg font-inter font-semibold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{
                    duration: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  retourner
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.main>
  )
}
