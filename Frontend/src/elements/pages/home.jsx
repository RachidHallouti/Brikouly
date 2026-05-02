import { useEffect, useRef, useState } from "react"
import getNearestCities from "../hooks/nearestCities"
import useNearestCities from "../hooks/useNearestCities"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import axios, { Axios } from "axios"
import { ArrowRight, Loader, LoaderCircle, SquarePlus } from "lucide-react"
import { setBar } from "../../redux/sliceElements"
import { Link, useNavigate } from "react-router-dom"
import Hero from "../homeElements/Hero"
import AnnonceCard from "../animatedElements/AnnonceCard"
import BrowseCategories from "../homeElements/browseCategorises"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import api from "../../assets/api"
import NearestAnnonces from "../homeElements/NearestAnnonces"
import AnnoncesEnligne from "../homeElements/onlineAnnonces"
import LatestAnnonces from "../homeElements/LatestAnnonces"
import { serviceCategories } from "../../assets/categorie"
import SkeletonCard from "../animatedElements/SkeletonCard"
import PourquoiBrikouly from "../homeElements/PourquoiBrikouly"

export default function Home() {
  const user = useSelector((state) => state.auth.user)
  const cities = useNearestCities()
  const [randomPhotoUrl] = useState(() => Math.floor(Math.random() * 10) + 1)
  const userCity =
    !cities || cities.length === 0
      ? user?.ville
      : user?.ville && cities[0] !== user.ville
        ? user.ville
        : null
  const citiesToProfile = useNearestCities(userCity)
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
      {userCity && citiesToProfile && (
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
      <PourquoiBrikouly />
    </main>
  )
}
