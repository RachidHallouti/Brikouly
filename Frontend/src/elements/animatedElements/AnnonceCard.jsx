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
    if (user) {
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
  }
  useEffect(() => {
    checkIfFavored()
  }, [isFavored])

  const favoritise = async () => {
    if (user) {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/favori/toggle",
          {
            user_id: user.id,
            annonce_id: annonce.id,
          },
        )
        checkIfFavored()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="relative w-full px-3 sm:p-0 sm:w-55 h-80">
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
          className="shadow-[0_0_7px] hover:shadow-[0_0_15px] shadow-black/20 rounded-2xl cursor-pointer w-full h-80 font-outfit overflow-hidden relative"
          whileTap={{
            scale: 0.95,
          }}
        >
          <motion.div className="h-1/2 relative w-full bg-white ">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:8000/storage/${annonce.photo}`}
              alt=""
            />
            <div className="absolute bottom-2.5 bg-black/70 p-1 px-1.5 rounded-full text-white right-2.5 flex gap-1 text-[13px]">
              <h3>{annonce.prix} </h3>
              <h3>{annonce.prix_par}</h3>
            </div>
          </motion.div>
          <div className="flex flex-col bg-linear-to-tr from-white to-gray-300/50 items-start p-3.5 pb-3 h-1/2 w-full  gap-1 relative">
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                scale: 1.05,
              }}
              onClick={() => setCategorie && setCategorie(categorie.name)}
              className={`p-1 px-1.5 ${categorie?.color ?? ""} cursor-pointer rounded-lg ${categorie?.accent} shadow-sm hover:shadow-md text-[11px] font-semibold`}
            >
              {categorie.name}
            </motion.button>
            <h2 className="font-semibold text-md w-full leading-snug wrap-break-word">
              {annonce.titre}
            </h2>

            <div className="mt-auto absolute bottom-2 w-full">
              <div className="flex  gap-1.5 text-[13px] w-full pt-1.5 items-center text-slate-700">
                <MapPin size={13} />
                {annonce.ville}
              </div>
              <div className="flex gap-3 border-t mt-1 text-sm border-slate-700/30 w-full pt-2 items-center text-slate-700">
                <img
                  src={`http://localhost:8000/storage/${annonce.user.photo}`}
                  className="h-7 w-7 object-cover rounded-full"
                />
                <h3>
                  {annonce.user.nom} {annonce.user.prenom}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
export default AnnonceCard
