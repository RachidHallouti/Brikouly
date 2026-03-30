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
import api from "../../assets/api"
import NearestAnnonces from "../animatedElements/NearestAnnonces"

export default function Home() {
  const user = useSelector((state) => state.auth.user)
  const cities = useNearestCities().map((c) => c.name)
  const userCity = user?.ville && cities[0] !== user.ville ? user.ville : null
  const citiesToProfile = useNearestCities(userCity).map((c) => c.name)
  const ajouter = useRef()
  const categorySearch = useRef()
  const [categorie, setCategorie] = useState("")
  const ajouterInView = useInView(ajouter)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setBar(ajouterInView))
  }, [ajouterInView])

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
        <NearestAnnonces
          setCategorieSearch={setCategorieSearch}
          cities={cities}
        />
      )}
      {userCity && (
        <NearestAnnonces
          setCategorieSearch={setCategorieSearch}
          cities={citiesToProfile}
        >
          {user.ville}
        </NearestAnnonces>
      )}
      <BrowseCategories
        setCategorie={setCategorieSearch}
        categorie={categorie}
        ref={categorySearch}
        cities={cities}
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
