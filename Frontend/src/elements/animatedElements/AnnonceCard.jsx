import { Heart, MapPin } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { serviceCategories } from "../../assets/categorie"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { set } from "zod"
import axios from "axios"

const AnnonceCard = ({ annonce, setCategorie }) => {
  const categorie = serviceCategories.find((e) => e.name == annonce.categorie)
  const { user } = useSelector((state) => state.auth)
  const [isFavored, setIsFavored] = useState(false)
  const checkIfFavored = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/favori/check", {
        annonce_id: annonce.id,
        user_id: user.id,
      })
      setIsFavored(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    checkIfFavored()
    console.log(isFavored)
  }, [isFavored])

  const favoritise = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/favori/toggle", {
        user_id: user.id,
        annonce_id: annonce.id,
      })
      checkIfFavored()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="relative">
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        className="relative "
      >
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{
            scale: 0.95,
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={favoritise}
          className="absolute z-20 cursor-pointer top-3 text-white right-3"
        >
          <Heart
            size={isFavored ? 32 : 28}
            fill={isFavored ? "red" : "rgba(0,0,0,0.5)"}
            strokeWidth={isFavored ? 0 : 1.7}
          />
        </motion.button>
        <motion.div
          className="shadow-[0_0_15px] hover:shadow-[0_0_30px] shadow-black/20 rounded-2xl cursor-pointer w-57 h-85 font-outfit overflow-hidden"
          whileTap={{
            scale: 0.95,
          }}
        >
          <motion.div className="h-1/2 w-full bg-white ">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:8000/storage/${annonce.photo}`}
              alt=""
            />
          </motion.div>
          <div className="flex flex-col bg-linear-to-tr from-white to-gray-300/50 items-start p-4 h-1/2 w-full  gap-1 relative">
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                scale: 1.05,
              }}
              onClick={() => setCategorie && setCategorie(categorie.name)}
              className={`p-1 px-1.5 ${categorie?.color ?? ""} cursor-pointer rounded-lg ${categorie?.accent} shadow-sm hover:shadow-md text-[13px]`}
            >
              {categorie.name}
            </motion.button>
            <h2 className="font-semibold text-md w-full line-clamp-2 leading-snug wrap-break-word">
              {annonce.titre}
            </h2>
            <div className="flex gap-1 text-sm">
              <h3>{annonce.prix} </h3>
              <h3>{annonce.prix_par}</h3>
            </div>
            <div className="flex mt-auto gap-2 border-t text-sm border-slate-700/30 w-full pt-1.5 items-center text-slate-700">
              <MapPin size={16} />
              {annonce.ville}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
export default AnnonceCard
