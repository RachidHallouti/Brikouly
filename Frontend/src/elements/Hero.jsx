import {
  ArrowRight,
  ClipboardList,
  Search,
  SquarePlus,
  Users,
} from "lucide-react"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setBar } from "../redux/sliceElements"
import { Link, useNavigate } from "react-router-dom"
import AnnoncesShower from "./animatedElements/AnnoncesShower"
import axios from "axios"
import { serviceCategories } from "../assets/categorie"
import api from "../assets/api"
import Loader from "./animatedElements/Loader"
import useNearestCities from "./hooks/useNearestCities"

const Hero = (props) => {
  const hero = useRef()
  const photo =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxq_qySTeGTuomdBzLZTUO-z-4RkA2B7pBtrsGSIBl6PZukB6PY7FRBBqBOnXI5HbH53Hgy7Tit0K3VYfLQf2ernDHHBsGxCsyygTzwZv6-qsshUV6F2Q3iL0UezFBdq2NnMcOQ7xDJCqn9dipbTgSKGerhy_1dLdAKNrjYRWJ6To04-ziuMTyP0gIrsFA_urhzzJGNOiN3ceVw0hXIn5ierC0NeJjpthTiH06lXR8OPduTdQopwAXUJc1nssNg6I1r31t8ZC9Llji"

  const cities = useNearestCities()
  const heroInView = useInView(hero)
  const categories = serviceCategories
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [annonces, setAnnonces] = useState([])
  const [found, setFound] = useState(false)
  const [annoncesCount, setAnnoncesCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [inFocus, setInFocus] = useState(false)
  useEffect(() => {
    dispatch(setBar(heroInView))
  }, [heroInView])
  useEffect(() => {
    const searchAnnonces = async () => {
      const res = await api.get("api/data/")
      setUsersCount(res.data.usersCount)
      setAnnoncesCount(res.data.annoncesCount)
    }
    searchAnnonces()
  }, [])
  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      try {
        const res = await api.get("api/annonces", {
          params: {
            search,
            limit: 6,
            cities,
          },
        })
        setAnnonces(res.data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    search && fetchAnnonces()
  }, [search])
  const searchHandle = () => {
    const params = new URLSearchParams()
    params.set("search", search)
    navigate(`/search?${params.toString()}`)
  }
  return (
    <div className="relative w-full flex justify-center mb-7 flex-col items-center">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
        ref={hero}
        className="py-2 w-full gap-0 flex items-center"
      >
        <div className=" flex-col sm:px-10 gap-4 p-3 xl:w-1/2 w-full to-orange-100/0 via-orange-100/20 from-orange-500/50 bg-radial flex items-center">
          <h1 className=" text-6xl text-gray-800 font-semibold">
            Besoin d’un service ?{" "}
            <span className="text-orange-500">Brikouly</span> est là pour vous.
          </h1>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white  shadow-md hover:shadow-xl text-xl p-3 rounded-xl h-12 bg-orange-500 font-outfit font-semibold flex gap-2 items-center cursor-pointer "
            onClick={() => navigate("/ajouter-annonce")}
          >
            <SquarePlus />
            Publiez une annonce
          </motion.button>
          <h2 className="font-space text-xl text-gray-800 font-semibold">Ou</h2>
          <div className="relative flex items-center justify-center max-w-full ">
            <motion.input
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setInFocus(true)}
              onBlur={() => setTimeout(() => setInFocus(false), 200)}
              type="text"
              className="bg-gray-50 font-outfit focus:shadow-lg pl-3 text-2xl w-120 h-15 rounded-xl shadow-sm"
              placeholder=" Rechercher des annonces"
              whileFocus={{
                width: "550px",
              }}
            />
            <motion.button
              className="absolute hover:shadow-md cursor-pointer right-2 rounded-xl bg-orange-500 p-1.5 text-white"
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={searchHandle}
            >
              <Search size={30} />
            </motion.button>
          </div>
        </div>
        <div className="xl:flex hidden px-10 w-1/2 justify-center">
          <motion.div
            className="w-full shadow-lg hover:shadow-2xl  rotate-0 relative h-120  rounded-3xl overflow-hidden"
            animate={{ rotate: -3 }}
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 0 }}
          >
            <img
              className="object-cover -z-20 absolute w-full h-full"
              src={`heroPhotos/${props.photo}.jpg` || photo}
              alt={photo}
            />
            <div className="p-5 bottom-0 absolute w-full gap-5 flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-2xl shadow-black/50 text-orange-500 flex gap-5 p-3 items-center w-1/2 h-24 rounded-2xl"
              >
                <ClipboardList size={45} />
                <div className="text-2xl font-bold flex flex-wrap gap-2 text-black">
                  <h1>+{annoncesCount}</h1>
                  <h2>Annonces</h2>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-2xl shadow-black/50 text-orange-500 flex gap-5 p-3 items-center w-1/2 h-24 rounded-2xl"
              >
                <Users size={45} />
                <div className="text-2xl font-bold flex flex-wrap gap-2 text-black">
                  <h1>+{usersCount}</h1>
                  <h2>Utilisateurs</h2>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {inFocus && search && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            exit={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-full xl:-mt-10  z-50 bg-white   w-full  shadow-[0_0_6px_rgba(0,0,0,0.10)] rounded-2xl p-7 "
          >
            {loading ? (
              <Loader />
            ) : annonces.length ? (
              <AnnoncesShower annonces={annonces}>
                <div className="w-full flex font-space mb-4 font-semibold justify-between">
                  <h2 className="text-lg">Annonces de "{search}"</h2>
                  <motion.button
                    onClick={searchHandle}
                    whileHover={{
                      gap: "16px",
                      padding: "0px",
                    }}
                    className="flex gap-2 pr-2 items-center text-orange-500"
                  >
                    <h2 className=" font-bold">Voir tous</h2>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </AnnoncesShower>
            ) : (
              <h1 className=" text-xl text-center">
                aucune annonce trouvée pour "{search}"
              </h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default Hero
