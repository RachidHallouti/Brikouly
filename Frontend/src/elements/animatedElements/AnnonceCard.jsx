import { Heart, MapPin } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { serviceCategories } from "../../assets/categorie"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import api from "../../assets/api"

const AnnonceCard = ({ annonce, setCategorie }) => {
  const categorie = serviceCategories.find((e) => e.name == annonce.categorie)
  const [isSaved, setIsSaved] = useState(annonce.isSaved)
  const { user } = useSelector((state) => state.auth)

  const favoritise = async () => {
    if (user) {
      try {
        setIsSaved(!isSaved)

        const res = await api.post("api/favori/toggle", {
          user_id: user.id,
          annonce_id: annonce.id,
        })
      } catch (error) {
        console.log(error)
        setIsSaved(!isSaved)
      }
    }
  }
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        className="relative  h-64 @lg:h-84"
      >
        {user && (
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
              size={30}
              fill={isSaved ? "red" : "rgba(0,0,0,0.5)"}
              strokeWidth={isSaved ? 0 : 1.7}
            />
          </motion.button>
        )}
        <motion.div
          className="shadow-[0_0_4px]  hover:shadow-[0_0_10px] shadow-black/5 hover:shadow-black/10 rounded-2xl cursor-pointer w-full h-full font-outfit overflow-hidden relative"
          whileTap={{
            scale: 0.96,
          }}
        >
          <motion.div className="h-1/2 relative w-full bg-white ">
            <img
              className="w-full h-full object-cover"
              src={
                annonce?.photo?.includes("http")
                  ? annonce?.photo
                  : `/storage/${annonce?.photo}`
              }
              alt=""
            />
            <div className="absolute bottom-2.5 bg-orange-500 p-1 px-1.5 rounded-xl text-white right-2.5 flex gap-1 text-xs @lg:text-[13px]">
              <h3>{annonce?.prix} </h3>
              <h3>{annonce?.prix_par}</h3>
            </div>
          </motion.div>
          <div className="flex flex-col bg-white/50 items-start p-3.5 pb-3 h-1/2 w-full  gap-1 relative">
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                scale: 1.05,
              }}
              onClick={() => setCategorie && setCategorie(categorie.name)}
              className={`@lg:p-1 @lg:px-1.5 p-0.75 px-1 ${categorie?.color ?? ""} cursor-pointer rounded-lg ${categorie?.accent} shadow-[0_0_4px] shadow-black/10 hover:shadow-[0_0_10px] text-[11px] @lg:text-xs font-semibold`}
            >
              {categorie?.name}
            </motion.button>
            <h2 className="font-medium pb-4 @lg:text-base text-sm w-full line-clamp-1 @lg:line-clamp-2 @lg:leading-snug leading-none wrap-break-word">
              {annonce?.titre}
            </h2>

            <div className="mt-auto w-full">
              <div className="flex  gap-1.5 text-xs @lg:text-[13px] w-full items-center text-slate-700">
                <MapPin size={13} />
                {annonce?.ville}
              </div>
              <div className="flex gap-1.5  @lg:gap-2.5 border-t @lg:mt-1 mt-0.5 text-xs @lg:text-sm border-slate-700/30 w-full @lg:pt-2 pt-1.25 items-center text-slate-700">
                <img
                  src={
                    annonce?.user?.photo?.includes("http")
                      ? annonce?.user?.photo
                      : `/storage/${annonce?.user?.photo}`
                  }
                  className="@lg:h-7 h-6  aspect-square object-cover rounded-full"
                />
                <h3 className="text-gray-800 font-space font-semibold">
                  {annonce?.user?.prenom[0]?.toUpperCase() +
                    annonce?.user?.prenom?.slice(1)}{" "}
                  {annonce?.user?.nom[0]?.toUpperCase() +
                    annonce?.user?.nom?.slice(1)}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="shadow-[0_0_4px] hidden  p-3 gap-4   hover:shadow-[0_0_10px] shadow-black/5 bg-white hover:shadow-black/10 rounded-2xl cursor-pointer w-full h-40 font-outfit overflow-hidden relative">
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{
            scale: 0.95,
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={favoritise}
          className="absolute z-20 cursor-pointer top-2 text-white right-2"
        >
          <Heart
            size={26}
            fill={isSaved ? "red" : "rgba(0,0,0,0.5)"}
            strokeWidth={isSaved ? 0 : 1.7}
          />
        </motion.button>
        <div className="min-h-30 shrink-0 h-full w-36 rounded-xl overflow-hidden">
          <img
            src={
              annonce?.photo?.includes("http")
                ? annonce?.photo
                : `/storage/${annonce?.photo}`
            }
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.05,
            }}
            onClick={() => setCategorie && setCategorie(categorie.name)}
            className={`p-1 px-1.5 ${categorie?.color ?? ""} cursor-pointer rounded-lg ${categorie?.accent} shadow-[0_0_4px] shadow-black/10 hover:shadow-[0_0_10px] text-xs font-semibold`}
          >
            {categorie?.name}
          </motion.button>
          <h2 className="font-medium text-lg mt-2 w-full line-clamp-2 leading-snug wrap-break-word">
            {annonce?.titre}
          </h2>
          <div className="flex  gap-1.5  w-full items-center text-slate-700">
            <MapPin size={13} />
            {annonce?.ville}
          </div>
          <div className="flex gap-2.5 mt-auto text-sm border-slate-700/30 w-full items-center text-slate-700">
            <img
              src={
                annonce?.user?.photo?.includes("http")
                  ? annonce?.user?.photo
                  : `/storage/${annonce?.user?.photo}`
              }
              className="h-7 w-7 object-cover rounded-full"
            />
            <h3 className="text-gray-800 font-space font-semibold">
              {annonce?.user?.prenom[0]?.toUpperCase() +
                annonce?.user?.prenom?.slice(1)}{" "}
              {annonce?.user?.nom[0]?.toUpperCase() +
                annonce?.user?.nom?.slice(1)}
            </h3>
          </div>
        </div>
      </motion.div>
    </>
  )
}
export default AnnonceCard
