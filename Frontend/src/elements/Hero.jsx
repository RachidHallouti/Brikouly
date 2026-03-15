import { ClipboardList, Search, SquarePlus, Users } from "lucide-react"
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
import { serviceCategories } from "../assets/categorie"

const Hero = () => {
  const hero = useRef()
  const heroInView = useInView(hero)
  const categories = serviceCategories
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState(null)
  const [annonces, setAnnonces] = useState([])
  const [found, setFound] = useState(false)
  const [annoncesCount, setAnnoncesCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  useEffect(() => {
    dispatch(setBar(heroInView))
  }, [heroInView])
  useEffect(() => {
    const searchAnnonces = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/annonces/search/${search}`,
      )
      setUsersCount(res.data.usersCount)
      setAnnoncesCount(res.data.annoncesCount)
      // .then((res) => found && setAnnonces(res.data?.data))
    }
    searchAnnonces()
  }, [search])
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
        ref={hero}
        className="py-2 w-full gap-0 flex items-center"
      >
        <div className="flex-col sm:px-10 gap-4 p-3 xl:w-1/2 w-full to-orange-100/0 via-orange-100/20 from-orange-500/50 bg-radial flex items-center">
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
            >
              <Search />
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxq_qySTeGTuomdBzLZTUO-z-4RkA2B7pBtrsGSIBl6PZukB6PY7FRBBqBOnXI5HbH53Hgy7Tit0K3VYfLQf2ernDHHBsGxCsyygTzwZv6-qsshUV6F2Q3iL0UezFBdq2NnMcOQ7xDJCqn9dipbTgSKGerhy_1dLdAKNrjYRWJ6To04-ziuMTyP0gIrsFA_urhzzJGNOiN3ceVw0hXIn5ierC0NeJjpthTiH06lXR8OPduTdQopwAXUJc1nssNg6I1r31t8ZC9Llji"
              alt=""
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
      {annonces.length > 0 && found && (
        <AnnoncesShower annonces={annonces}></AnnoncesShower>
      )}
    </div>
  )
}
export default Hero
