import { motion } from "motion/react"
import { CirclePlus, User } from "lucide-react"
import { serviceCategories } from "../../assets/categorie"
import { moroccanCities } from "../../assets/cities"
import useNearestCities from "../hooks/useNearestCities"
import { useEffect, useState } from "react"

export default function AjouterAnnonce() {
  const categories = serviceCategories
  const cities = useNearestCities()
  const [ville, setVille] = useState("")
  useEffect(() => {
    cities.length && ville == "" && setVille(cities[0].name)
  }, [cities, ville])
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
        className="flex gap-4 flex-col items-center p-8 sm:p-16 rounded-2xl border-orange-500 w-4/5 sm:w-1/2 sm:min-w-2xl shadow-xl shadow-orange-500/40"
      >
        <motion.h1
          variants={childVariant}
          className="font-bebas mb-4 text-[40px] text-zinc-800"
        >
          Ajouter une annonce
        </motion.h1>
        <motion.div
          variants={childVariant}
          className="w-full pb-2 flex gap-3 overflow-x-auto overflow-y-hidden"
        >
          {[...Array(5)].map((e, index) => (
            <motion.div
              key={index}
              className="bg-gray-300/60 shrink-0 h-40 w-40 rounded-2xl flex items-center justify-center"
            >
              <CirclePlus size={35} />
            </motion.div>
          ))}
        </motion.div>
        <motion.input
          variants={childVariant}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
          type="text"
          placeholder=" Titre"
        />
        <motion.textarea
          variants={childVariant}
          className="min-h-30 w-full px-4 pt-2 bg-gray-300/60 rounded-xl"
          placeholder=" Description"
        />
        <motion.select
          variants={childVariant}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
        >
          {categories.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </motion.select>
        <motion.select
          variants={childVariant}
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="h-11 w-full px-4 bg-gray-300/60 rounded-xl"
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
          />
          <select
            className="h-11 w-[40%] px-2 bg-gray-300/60 rounded-xl cursor-pointer"
            name=""
            id=""
          >
            <option value="">DH</option>
            <option value="">DH/Jour</option>
            <option value="">DH/Semaine</option>
            <option value="">DH/Mois</option>
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
        >
          Annuler
        </motion.button>
      </motion.div>
    </main>
  )
}
