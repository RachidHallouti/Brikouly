import { Search, SquarePlus } from "lucide-react"
import {
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setBar } from "../redux/sliceElements"
import { useNavigate } from "react-router-dom"
import AnnoncesShower from "./animatedElements/AnnoncesShower"
import axios from "axios"

const Hero = () => {
  const hero = useRef()
  const heroInView = useInView(hero)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState(null)
  const [annonces, setAnnonces] = useState([])
  const [found, setFound] = useState(false)
  useEffect(() => {
    dispatch(setBar(heroInView))
  }, [heroInView])
  useEffect(() => {
    const searchAnnonces = async () => {
      const res = await axios
        .get(`http://localhost:8000/api/annonces/search/${search}`)
        .then((res) => {
          setFound(res.data.success)
          found && setAnnonces(res.data?.data)
        })
      // .then((res) => found && setAnnonces(res.data?.data))
    }
    if (search) {
      try {
        searchAnnonces()
      } catch (error) {
        console.log(error)
      }
    }
  }, [search])
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
        ref={hero}
        className="to-orange-200/50 from-gray-300/50 bg-linear-to-tr min-w-lg sm:p-10 shadow-md rounded-2xl p-5 flex-col w-full gap-3 flex items-center  "
      >
        <h1 className="font-space text-5xl mb-2 text-gray-800 font-semibold">
          Avez-vous un besoin ?
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-white my-2 shadow-md hover:shadow-xl text-xl p-3 rounded-xl h-12 bg-orange-500 font-outfit font-semibold flex gap-2 items-center cursor-pointer "
          onClick={() => navigate("/ajouter-annonce")}
        >
          <SquarePlus />
          Publiez une annonce
        </motion.button>
        <h2 className="font-space text-xl my-2 text-gray-800 font-semibold">
          Ou
        </h2>
        <div className="relative flex items-center justify-center max-w-full ">
          <motion.input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-gray-50 font-outfit focus:shadow-lg pl-3 text-lg w-100 h-12 rounded-xl shadow-sm"
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
          >
            <Search />
          </motion.button>
        </div>
      </motion.div>
      {annonces.length > 0 && found && (
        <AnnoncesShower annonces={annonces}></AnnoncesShower>
      )}
    </div>
  )
}
export default Hero
