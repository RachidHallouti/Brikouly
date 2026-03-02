import { useEffect, useRef, useState } from "react"
import getNearestCities from "../hooks/nearestCities"
import useNearestCities from "../hooks/useNearestCities"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import axios, { Axios } from "axios"
import { Loader, LoaderCircle, SquarePlus } from "lucide-react"
import { setBar } from "../../redux/sliceElements"
import { useNavigate } from "react-router-dom"
import Hero from "../Hero"
import AnnonceCard from "../animatedElements/AnnonceCard"
import BrowseCategories from "../animatedElements/browseCategorises"

export default function Home() {
  const cities = useNearestCities()
  const [annonces, setAnnonces] = useState([])
  const ajouter = useRef()
  const ajouterInView = useInView(ajouter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loadingAnnonces, setLoading] = useState(null)

  useEffect(() => {
    dispatch(setBar(ajouterInView))
  }, [ajouterInView])
  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      await axios
        .get("http://localhost:8000/api/annonces")
        .then((res) => setAnnonces(res.data))
      setLoading(false)
    }
    fetchAnnonces()
  }, [])

  return (
    <main className="flex flex-col gap-5 items-center justify-center p-7">
      <Hero />
      <BrowseCategories />
      <div className=" flex flex-col w-9/10 min-h-100">
        <h1 className="text-orange-500 font-outfit font-bold text-3xl">
          Annonces :
        </h1>
        {loadingAnnonces && (
          <div className="w-full my-auto flex text-black items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { repeat: Infinity, ease: "linear" },
              }}
            >
              <LoaderCircle size={50} />
            </motion.div>
          </div>
        )}
        <div className="flex flex-wrap gap-5 mt-5 w-full">
          {annonces.length > 0 &&
            annonces.map((annonce, index) => (
              <AnnonceCard key={index} annonce={annonce} />
            ))}
        </div>
      </div>
      {cities.length > 0 && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col items-center bg-orange-500/70 rounded-2xl text-2xl p-7 px-32 text-white font-bebas">
            {cities.length > 0 && cities[0].name}
          </div>
          <div className="flex flex-col items-center bg-orange-500/70 rounded-2xl text-2xl p-7 px-32 text-white font-bebas">
            {cities &&
              cities
                .filter((e) => e.name != cities[0].name)
                .map((e, index) => (
                  <h4 key={index}>
                    {index + 2} {e.name}
                  </h4>
                ))}
          </div>
        </motion.div>
      )}
    </main>
  )
}
