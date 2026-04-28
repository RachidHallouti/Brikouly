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
import AnnoncesEnligne from "../animatedElements/onlineAnnonces"
import LatestAnnonces from "../animatedElements/LatestAnnonces"
import { serviceCategories } from "../../assets/categorie"

export default function Home() {
  const user = useSelector((state) => state.auth.user)
  const cities = useNearestCities()
  const [randomPhotoUrl] = useState(() => Math.floor(Math.random() * 10) + 1)
  const userCity = user?.ville && cities[0] !== user.ville ? user.ville : null
  const citiesToProfile = useNearestCities(userCity)?.map((c) => c.name)
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
      <Hero photo={randomPhotoUrl} />
      {cities?.length > 0 ? (
        <NearestAnnonces
          setCategorieSearch={setCategorieSearch}
          cities={cities}
        />
      ) : (
        <LatestAnnonces setCategorieSearch={setCategorieSearch} />
      )}
      {userCity && (
        <NearestAnnonces
          setCategorieSearch={setCategorieSearch}
          cities={citiesToProfile}
        >
          {user.ville}
        </NearestAnnonces>
      )}
      <AnnoncesEnligne setCategorieSearch={setCategorieSearch} />
      <BrowseCategories
        setCategorie={setCategorieSearch}
        categorie={categorie}
        ref={categorySearch}
        cities={cities}
      />
    </main>
  )
}
