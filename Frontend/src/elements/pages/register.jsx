import { AnimatePresence, motion } from "motion/react"
import {
  CloudUpload,
  IdCard,
  IdCardLanyard,
  Lock,
  Pen,
  Plus,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice"
import { moroccanCities } from "../../assets/cities"
import useNearestCities from "../hooks/useNearestCities"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import api from "../../assets/api"
import { useForm } from "react-hook-form"
import { setToaster } from "../../redux/sliceElements"
export default function Register() {
  const navigate = useNavigate()
  const disp = useDispatch()
  const cities = useNearestCities() || moroccanCities
  const [conti, setConti] = useState(false)
  const [preview, setPreview] = useState(null)
  const registerSchema = Yup.object().shape({
    nom: Yup.string()
      .required("Le nom est obligatoire")
      .min(2, "Le nom doit faire au moins 2 caractères")
      .max(20, "Le nom ne doit pas dépasser 20 caractères"),
    prenom: Yup.string()
      .required("Le prenom est obligatoire")
      .min(2, "Le prenom doit faire au moins 2 caractères")
      .max(20, "Le prenom ne doit pas dépasser 20 caractères"),
    bio: Yup.string()
      .nullable()
      .max(550, "Le bio est trop longue (550 caractères max)"),
    password: Yup.string()
      .required("Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit faire au moins 8 caractères"),
    password_confirmation: Yup.string()
      .required("Veuillez confirmer votre mot de passe")
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
    email: Yup.string()
      .required("L'email est obligatoire")
      .email("Veuillez saisir une adresse email valide"),
    photo: Yup.mixed().required("La photo de profil est obligatoire"),
  })
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
  })
  useEffect(() => {
    const ville = watch("ville")
    cities.length > 0 && !ville && setValue("ville", cities[0])
  }, [cities])
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
  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      const registerKeys = [
        "nom",
        "prenom",
        "email",
        "password",
        "password_confirmation",
        "photo",
        "bio",
        "ville",
      ]
      registerKeys.forEach((k) => data[k] && formData.append(k, data[k]))
      const reponse = await api.post("api/register", formData)
      disp(login(reponse.data.userData))
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors
        console.log("Validation Failed:", errors)

        alert(Object.values(errors)[0][0])
      } else {
        console.error("Registration failed")
      }
    }
  }
  const onError = (errors) => {
    const allErrors = Object.keys(errors)
    if (allErrors.length > 0) {
      disp(setToaster({ message: errors[allErrors[0]].message, type: "x" }))
    }
  }
  const handleNext = async () => {
    const isValid = await trigger(["nom", "prenom", "photo"])
    if (isValid) {
      setConti(true)
    } else {
      const allErrors = Object.keys(errors)
      disp(setToaster({ message: errors[allErrors[0]].message, type: "x" }))
    }
  }
  const photoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2048 * 1024) {
        disp(setToaster({ message: "La photo ne doit pas dépasse 2 Mo" }))
        return
      }
      setPreview(URL.createObjectURL(file))
      setValue("photo", file)
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
      className=" flex justify-center md:h-full w-full md:items-center"
    >
      <motion.div className="flex items-center  rounded-2xl overflow-hidden  w-full lg:w-4/5 md:w-5/6 xl:w-3/4  2xl:w-2/3 md:bg-white md:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
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
          className="min-h-155 text-white w-2/5 items-center justify-center hidden p-10 xl:flex flex-col bg-linear-to-tr rounded-r-4xl from-orange-400/70 to-orange-600/70 shadow-[5px_0_15px_rgba(0,0,0,0.15)]"
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
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex w-full xl:w-3/5 items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {!conti ? (
              <motion.div
                key={1}
                variants={parentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full p-6 xl:pl-12 flex flex-col items-center h-full gap-2"
              >
                <motion.h1
                  variants={childVariant}
                  className="font-bebas flex items-center gap-2 text-[40px] text-zinc-800"
                >
                  S'inscrire
                </motion.h1>

                <motion.label
                  variants={childVariant}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  htmlFor="photo"
                  className=" relative overflow-hidden w-70 border-dashed border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-70"
                >
                  <input
                    type="file"
                    id="photo"
                    className="hidden"
                    onChange={photoChange}
                  />
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="hover:opacity-100 opacity-0 flex absolute z-40 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                        <Pen size={40} />
                        Photo Profile
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-1 font-medium items-center flex-col justify-center">
                      <CloudUpload size={40} />
                      Photo Profile
                    </div>
                  )}
                </motion.label>
                <motion.input
                  variants={childVariant}
                  type="text"
                  placeholder="Prenom"
                  {...register("prenom")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
                />
                <motion.input
                  variants={childVariant}
                  type="text"
                  placeholder="Nom"
                  {...register("nom")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
                />

                <motion.button
                  type="button"
                  variants={childVariant}
                  className="h-11 w-full cursor-pointer bg-orange-500 text-white text-xl rounded-xl font-inter font-semibold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{
                    duration: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onClick={handleNext}
                >
                  Continuer
                </motion.button>
                <motion.button
                  type="button"
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
                className="w-full  p-6 xl:pl-12 flex flex-col items-center h-full gap-4"
              >
                <motion.textarea
                  type="text"
                  variants={childVariant}
                  {...register("bio")}
                  placeholder="Bio"
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 min-h-50 max-h-100 h-50 border-gray-300 pl-3"
                />

                <motion.select
                  name="ville"
                  variants={childVariant}
                  className="bg-gray-100 border-2 h-12 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 border-gray-300 pl-3"
                  {...register("ville")}
                >
                  <option value="">Pas spécifique</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </motion.select>
                <motion.input
                  variants={childVariant}
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
                />
                <motion.input
                  variants={childVariant}
                  type="password"
                  placeholder="Mot de passe"
                  {...register("password")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
                />
                <motion.input
                  variants={childVariant}
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  {...register("password_confirmation")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2  border-gray-300 pl-3"
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
                  type="submit"
                >
                  S'inscrire
                </motion.button>
                <motion.button
                  type="button"
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
        </form>
      </motion.div>
    </motion.main>
  )
}
