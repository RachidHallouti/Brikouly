import { useEffect, useRef, useState } from "react"
import { serviceCategories } from "../../assets/categorie"
import { motion } from "motion/react"
import axios from "axios"
import AnnonceCard from "./AnnonceCard"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  StepBack,
  StepForward,
} from "lucide-react"
import AnnoncesShower from "./AnnoncesShower"
import { Link } from "react-router-dom"

const BrowseCategories = (props) => {
  const categories = serviceCategories
  const [catAnnonces, setCatAnnonces] = useState([])
  useEffect(() => {
    const fetchAnnonces = async () => {
      const res = await axios.get(`http://localhost:8000/api/annonces`, {
        params: { categorie: props.categorie },
      })
      setCatAnnonces(res.data)
    }
    props.categorie && fetchAnnonces()
    setCatAnnonces([])
  }, [props.categorie])
  const categoriesScroll = useRef()
  const scroll = (d) => {
    if (categoriesScroll.current) {
      const { clientWidth } = categoriesScroll.current
      categoriesScroll.current.scrollBy({
        left: d === "right" ? clientWidth : -clientWidth,
        behavior: "smooth",
      })
    }
  }
  return (
    <>
      <div
        ref={props.ref}
        className="my-5 bg-orange-100 p-8 py-12 rounded-2xl "
      >
        <h1 className="text-slate-950 mb-3 text-4xl font-semibold">
          Recherche par catégorie
        </h1>
        <div className="w-full  items-center gap-3 flex">
          <button
            className="rounded-full sm:block hidden cursor-pointer p-3 hover:bg-gray-300/50"
            onClick={() => scroll("left")}
          >
            <ChevronLeft strokeWidth={3} />
          </button>
          <div className="overflow-hidden flex items-center w-full relative">
            <div className="bg-linear-to-r z-20 absolute -left-1 to-orange-100/0 from-orange-100 h-38 w-10"></div>

            <motion.div
              ref={categoriesScroll}
              className="flex p-3 overflow-scroll sm:overflow-hidden relative px-8 gap-3 font-outfit"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.name}
                  whileHover={{
                    scale: 1.07,
                    borderRadius: "3px",
                  }}
                  whileTap={{
                    scale: 0.95,
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    props.setCategorie(cat.name)
                  }}
                  className={`${cat.color} ${cat.accent} shrink-0 h-24 w-24 sm:h-36 sm:w-36 hover:shadow-lg cursor-pointer shadow-md flex flex-col p-6 rounded-xl gap-2 justify-center items-center`}
                >
                  <cat.icon className="h-12 w-12 sm:block hidden" />
                  <p className="text-sm">{cat.name}</p>
                </motion.button>
              ))}
            </motion.div>
            <div className="bg-linear-to-l z-20 absolute -right-1 to-orange-100/0 from-orange-100 h-38 w-10"></div>
          </div>
          <button
            className="rounded-full sm:block hidden cursor-pointer p-3 hover:bg-gray-300/50"
            onClick={() => scroll("right")}
          >
            <ChevronRight strokeWidth={3} />
          </button>
        </div>
      </div>
      {catAnnonces.length > 0 && (
        <AnnoncesShower annonces={catAnnonces}>
          <h1 className="text-slate-950 text-4xl  my-2.5 font-semibold">
            {props.categorie}
          </h1>
          <div className="w-full flex font-space text-[15.5px] mb-2 font-semibold justify-between">
            <h2 className="text-gray-500 ">
              les annonces les plus proches à {props.cities[0]}
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
    </>
  )
}
export default BrowseCategories
