import { motion } from "motion/react"
import { CirclePlus, User } from "lucide-react"
import { serviceCategories } from "../../assets/categorie"
import { moroccanCities } from "../../assets/cities"
import useNearestCities from "../hooks/useNearestCities"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"

export default function AjouterAnnonce() {
  const categories = serviceCategories
  const cities = useNearestCities()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { getValues, setValue, register, handleSubmit } = useForm()
  useEffect(() => {
    cities.length > 0 &&
      getValues("ville") == "" &&
      setValue("ville", cities[0].name)
  }, [cities])
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
  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("titre", data.titre)
      formData.append("description", data.description)
      formData.append("categorie", data.categorie)
      formData.append("ville", data.ville)
      formData.append("prix", data.prix)
      formData.append("prix_par", data.prix_par)
      formData.append("photo", data.photo[0])
      formData.append("user_id", user.id)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/annonces",
        formData,
      )
      navigate("/")
    } catch (error) {}
  }
  return (
    <main className=" flex justify-center items-center py-6">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        className="flex gap-4 flex-col items-center p-8 sm:p-16 rounded-2xl border-orange-500 w-4/5 sm:w-3/5 sm:min-w-2xl shadow-xl shadow-orange-500/40"
      >
        <h1>{user.id}</h1>
        <motion.h1
          variants={childVariant}
          className="font-bebas mb-4 text-[40px] text-zinc-800"
        >
          Ajouter une annonce
        </motion.h1>
        <motion.div
          variants={childVariant}
          className="w-full pb-2 flex gap-3 overflow-x-auto justify-center overflow-y-hidden"
        >
          <label
            htmlFor="image"
            className="h-40 w-40 bg-gray-300/60 flex justify-center cursor-pointer items-center rounded-2xl"
          >
            <input
              type="file"
              className="hidden"
              id="image"
              {...register("photo")}
            />
            <CirclePlus size={35} />
          </label>
        </motion.div>
        <motion.input
          variants={childVariant}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
          type="text"
          placeholder=" Titre"
          {...register("titre")}
        />
        <motion.textarea
          variants={childVariant}
          className="min-h-30 w-full px-4 pt-2 bg-gray-300/60 rounded-xl"
          placeholder=" Description"
          {...register("description")}
        />
        <motion.select
          variants={childVariant}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
          {...register("categorie")}
        >
          {categories.map((e, index) => (
            <option key={index} value={e.name}>
              {e.name}
            </option>
          ))}
        </motion.select>
        <motion.select
          variants={childVariant}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
          {...register("ville")}
        >
          <option value="">Toute ville</option>
          {cities.map((e, index) => (
            <option key={index} value={e.name}>
              {e.name}
            </option>
          ))}
        </motion.select>

        <motion.div variants={childVariant} className="flex w-full gap-2">
          <motion.input
            className="h-11 w-[60%] px-4 bg-gray-300/60 rounded-xl"
            type="number"
            step={10}
            placeholder=" Prix"
            {...register("prix")}
          />
          <select
            className="h-11 w-[40%] px-2 bg-gray-300/60 rounded-xl cursor-pointer"
            name=""
            {...register("prix_par")}
          >
            <option value="dh">DH</option>
            <option value="dh/jour">DH/Jour</option>
            <option value="dh/semaine">DH/Semaine</option>
            <option value="dh/mois">DH/Mois</option>
          </select>
        </motion.div>
        <motion.button
          variants={childVariant}
          className="h-11 w-full cursor-pointer bg-orange-500/80 text-white text-xl rounded-xl font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          Ajouter
        </motion.button>
        <motion.button
          variants={childVariant}
          className="h-11 w-full cursor-pointer text-orange-500/80 border-3 rounded-2xl text-lg font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
          type="button"
          onClick={() => navigate("/")}
        >
          Annuler
        </motion.button>
      </motion.form>
    </main>
  )
}
