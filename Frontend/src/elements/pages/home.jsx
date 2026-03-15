import { useEffect, useRef, useState } from "react"
import getNearestCities from "../hooks/nearestCities"
import useNearestCities from "../hooks/useNearestCities"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import axios, { Axios } from "axios"
import { ArrowRight, Loader, LoaderCircle, SquarePlus } from "lucide-react"
import { setBar } from "../../redux/sliceElements"
import { Link, useNavigate } from "react-router-dom"
import Hero from "../Hero"
import AnnonceCard from "../animatedElements/AnnonceCard"
import BrowseCategories from "../animatedElements/browseCategorises"
import AnnoncesShower from "../animatedElements/AnnoncesShower"

export default function Home() {
  const cities = useNearestCities().map((c) => c.name)
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
      const res = await axios.post(
        "http://localhost:8000/api/nearest-annonces",
        {
          cities: cities,
        },
      )
      console.log(res)

      setLoading(false)
      setAnnonces(res.data)
    }
    cities.length > 0 && fetchAnnonces()
  }, [JSON.stringify(cities)])
  const setCategorieSearch = (cat) => {
    setCategorie(cat)
    categorySearch.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <main className="flex flex-col  gap-5">
      <Hero />
      {cities.length > 0 && (
        <AnnoncesShower
          annonces={annonces}
          setCategorieSearch={setCategorieSearch}
          loadingAnnonces={loadingAnnonces}
        >
          <h1 className="text-slate-950 text-4xl mt-10 mb-2.5 font-semibold">
            Annonces près de vous
          </h1>
          <div className="w-full flex font-space text-[15.5px] mb-2 font-semibold justify-between">
            <h2 className="text-gray-500 ">
              les annonces les plus proches à {cities[0]}
            </h2>
            <Link>
              <motion.div
                whileHover={{
                  gap: "16px",
                  padding: "0px",
                }}
                className="flex gap-2 pr-2 items-center text-orange-500"
              >
                <h2 className=" font-bold">Voir plus</h2>
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </div>
        </AnnoncesShower>
      )}
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
            {cities.length > 0 && cities[0]}
          </div>
          <div className="flex flex-col items-center bg-orange-500/70 rounded-2xl text-2xl p-7 px-32 text-white font-bebas">
            {cities &&
              cities
                .filter((e) => e != cities[0])
                .map((e, index) => (
                  <h4 key={index}>
                    {index + 2} {e}
                  </h4>
                ))}
          </div>
        </motion.div>
      )}
    </main>
  )
}
