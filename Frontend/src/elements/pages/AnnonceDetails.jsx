import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../assets/api"
import {
  Briefcase,
  CalendarSearch,
  ChevronRight,
  Coins,
  HandCoins,
  MapPin,
  MessageCircle,
  PartyPopper,
  Send,
  Star,
} from "lucide-react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import { motion } from "motion/react"
import { serviceCategories } from "../../assets/categorie"

export default function AnnonceDetails() {
  const annonceId = useParams().id
  const [loading, setLoading] = useState(false)
  const [annonce, setAnnonce] = useState({})
  const [annonces, setAnnonces] = useState([])
  const categories = serviceCategories
  const [bigPhoto, setBigPhoto] = useState(null)
  const [categorie, setCategorie] = useState({})
  const [offre, setOffre] = useState({})
  const [message, setMessage] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        setLoading(true)
        const res = await api.get(`api/annonces/${annonceId}`)
        const annonces = await api.get("api/annonces", {
          params: {
            categorie: res.data.categorie,
            limit: 4,
          },
        })
        setAnnonce(res.data)
        setBigPhoto(res.data.photo)
        setAnnonces(annonces.data)
        setOffre({ ...offre, prix_par: res.data.prix_par })
        setCategorie(categories.find((c) => c.name == res.data.categorie))
        console.log(res.data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchAnnonce()
  }, [annonceId])
  const searchHandle = () => {
    const params = new URLSearchParams()
    params.set("categorie", categorie.name)
    navigate(`/search?${params.toString()}`)
  }
  const envoyerMessage = async () => {
    try {
      await api.post("api/messages", {
        ...message,
        user_id: annonce?.user?.id,
        annonce_id: annonce.id,
      })
    } catch (error) {}
  }
  return (
    <main className="xl:px-10 xl:pt-4 grid  xl:grid-cols-10 gap-10  ">
      <section className="xl:col-span-7">
        <div className="flex flex-col gap-4">
          <div className="w-full relative xl:aspect-[2] aspect-[1.7] bg-gray-300 shadow-[0_0_3px_rgba(0,0,0,0.15)] overflow-hidden rounded-4xl">
            <motion.img
              key={bigPhoto}
              src={
                bigPhoto?.includes("http") ? bigPhoto : `/storage/${bigPhoto}`
              }
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="bg-orange-500 p-1 shadow-[0_0_5px_rgba(0,0,0,0.15)] px-3 text-lg text-white font-medium absolute bottom-6 left-6 rounded-full ">
              {annonce.type}
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 grid-cols-5  gap-2 xl:gap-4 py-2">
            {[
              annonce.photo,
              annonce.photo_2,
              annonce.photo_3,
              annonce.photo_4,
              annonce.photo_5,
            ].map(
              (p, i) =>
                p && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    key={i}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBigPhoto(p)}
                    className={` shrink aspect-square shadow-lg cursor-pointer rounded-xl xl:rounded-3xl overflow-hidden ${p == bigPhoto && "ring-4 ring-orange-500"}`}
                  >
                    <img
                      src={p.includes("http") ? p : `/storage/${p}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ),
            )}
          </div>
        </div>
        <div className="border-b pb-8 border-gray-300">
          <h1 className="text-5xl  font-medium my-6">{annonce.titre}</h1>
          <div className="flex flex-wrap gap-4 ">
            <h1
              className={`text-lg   ${categorie.color}  w-fit  font-semibold `}
            >
              {categorie.name}
            </h1>
            {annonce.ville && (
              <h1
                className={`text-lg flex gap-2 items-center   text-gray-600 w-fit   font-medium `}
              >
                <MapPin size={22} />
                {annonce?.ville}
              </h1>
            )}
          </div>
        </div>

        <h2 className="font-medium text-2xl my-3">A propos de ce service</h2>
        <p className=" text-gray text-lg">{annonce.description}</p>
      </section>
      <section className="xl:col-span-3 3xl:sticky 3xl:top-0 flex flex-col  gap-4">
        <div className="w-full bg-white rounded-4xl border-[1.5px] border-gray-400/30 p-6">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/profile/${user?.id}`)}
            className="flex w-full cursor-pointer p-4 items-center gap-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-orange-200 transition-colors group"
          >
            <div className="relative">
              <img
                src={
                  annonce?.user?.photo?.includes("http")
                    ? annonce?.user?.photo
                    : `/storage/${annonce?.user?.photo}`
                }
                alt={annonce?.user?.prenom + " " + annonce?.user?.nom}
                className="h-16 w-16 aspect-square rounded-full object-cover ring-2 ring-gray-50"
              />
            </div>

            <div className="flex flex-col items-start flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 truncate w-full text-left">
                {annonce?.user?.prenom} {annonce?.user?.nom}
              </h2>

              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="text-orange-500 fill-orange-500" size={14} />
                <span className="text-sm font-bold text-gray-700">
                  {annonce?.user?.avgNote || "N/A"}
                </span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-500">
                  Membre depuis {annonce?.user?.created_at?.slice(0, 4)}
                </span>
              </div>
            </div>
            <ChevronRight
              className="text-gray-400 group-hover:text-orange-500 transition-colors"
              size={20}
            />
          </motion.button>
          <div className="flex flex-col gap-2 mt-6">
            <h1 className="font-medium flex gap-3 items-center mx-auto text-4xl  text-orange-500 p-2 px-4 rounded-xl">
              <Coins size={36} />
              {annonce.prix} {annonce.prix_par}
            </h1>
            <div className="flex p-4 w-full items-center  text-orange-500 gap-2 font-semibold">
              <div className="h-0.75 rounded-full bg-orange-500 w-1/2" />
              Offre
              <div className="h-0.75 rounded-full bg-orange-500 w-1/2" />
            </div>
            <div className="grid font-medium text-lg  text-gray-500 grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Prix"
                className={`bg-gray-100 border-[1.5px] text-gray-800 font-medium text-lg h-12 rounded-2xl w-full p-3  border-gray-300 pl-3`}
              />
              <select
                value={offre.prix_par}
                onChange={(e) =>
                  setOffre({ ...offre, prix_par: e.target.value })
                }
                className={`bg-gray-100  border-[1.5px] text-gray-800 h-12 font-medium text-lg rounded-2xl w-full p-3  border-gray-300 pl-3`}
              >
                <option value="Dh">Dh</option>
                <option value="Dh/Heure">Dh/Heure</option>
                <option value="Dh/Jour">Dh/Jour</option>
                <option value="Dh/Mois">Dh/Mois</option>
              </select>
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="w-full gap-3 cursor-pointer col-span-2 font-semibold text-xl p-3  flex justify-center items-center bg-orange-500 rounded-2xl text-white"
              >
                <HandCoins />
                Envoyer un offre
              </motion.button>
            </div>
            <div className="flex p-4 w-full items-center text-orange-500 gap-2 font-semibold">
              <div className="h-0.75 rounded-full bg-orange-500 w-1/2" />
              Message
              <div className="h-0.75 rounded-full bg-orange-500 w-1/2" />
            </div>
            <textarea
              placeholder="Un message"
              onChange={(e) =>
                setMessage({ ...message, content: e.target.value })
              }
              className={`bg-gray-100 border-[1.5px] min-h-12 h-36 max-h-72 text-gray-800 font-medium text-lg rounded-2xl w-full p-3 border-gray-300 pl-3`}
            />
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={envoyerMessage}
              className="w-full gap-3 cursor-pointer col-span-2 font-semibold text-xl p-3  flex justify-center items-center bg-white rounded-2xl text-orange-500 border-orange-500 border-2"
            >
              <Send />
              Envoyer un message
            </motion.button>
            <div className="flex p-4 w-full items-center justify-center text-gray-500 gap-2 font-semibold">
              <div className="h-0.75 rounded-full bg-gray-500 w-1/4" />
              Ou
              <div className="h-0.75 rounded-full bg-gray-500 w-1/4" />
            </div>
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full gap-3 cursor-pointer col-span-2 font-semibold text-xl p-3  flex justify-center items-center bg-orange-500 rounded-2xl text-white"
            >
              <MessageCircle />
              Contacter {annonce?.user?.prenom}
            </motion.button>
          </div>
        </div>
      </section>
      <section className="xl:col-span-7">
        <AnnoncesShower
          annonces={annonces}
          title="Annonces similaires"
          subTitle={categorie.name}
          searchHandle={searchHandle}
        />
      </section>
    </main>
  )
}
