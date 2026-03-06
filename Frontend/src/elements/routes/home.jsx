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
import AnnoncesShower from "../animatedElements/AnnoncesShower"

export default function Home() {
  const cities = useNearestCities()
  const [annonces, setAnnonces] = useState([])
  const ajouter = useRef()
  const categorySearch = useRef()
  const [categorie, setCategorie] = useState("")
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
  const setCategorieSearch = (cat) => {
    setCategorie(cat)
    categorySearch.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <main className="flex flex-col gap-5">
      <Hero />
      <AnnoncesShower
        annonces={annonces}
        setCategorieSearch={setCategorieSearch}
        loadingAnnonces={loadingAnnonces}
      >
        <h1 className="text-orange-500 font-space text-2xl font-extrabold">
          Annonces :
        </h1>
      </AnnoncesShower>
      <BrowseCategories
        setCategorie={setCategorieSearch}
        categorie={categorie}
        ref={categorySearch}
      />
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
