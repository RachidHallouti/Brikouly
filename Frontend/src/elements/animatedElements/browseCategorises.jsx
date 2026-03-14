import { useEffect, useRef, useState } from "react"
import { serviceCategories } from "../../assets/categorie"
import { motion } from "motion/react"
import axios from "axios"
import AnnonceCard from "./AnnonceCard"
import { ChevronLeft, ChevronRight, StepBack, StepForward } from "lucide-react"

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
    <div ref={props.ref} className="my-10 ">
      <h1 className="text-orange-500 font-space text-2xl font-extrabold mb-8">
        Recherche par categorie :
      </h1>
      <div className="w-full  items-center gap-3 flex">
        <button
          className="rounded-full cursor-pointer p-3 hover:bg-gray-300/50"
          onClick={() => scroll("left")}
        >
          <ChevronLeft strokeWidth={3} />
        </button>
        <div className="overflow-hidden flex items-center w-full relative">
          <motion.div
            ref={categoriesScroll}
            className="flex p-3 overflow-hidden gap-3 font-outfit"
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
                className={`${cat.color} ${cat.accent} shrink-0 h-36 w-36 hover:shadow-lg cursor-pointer shadow-md flex flex-col p-6 rounded-xl gap-2 justify-center items-center`}
              >
                <cat.icon className="h-12 w-12" />
                <p className="text-sm">{cat.name}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <button
          className="rounded-full cursor-pointer p-3 hover:bg-gray-300/50"
          onClick={() => scroll("right")}
        >
          <ChevronRight strokeWidth={3} />
        </button>
      </div>
      {props.categorie && catAnnonces.length > 0 && (
        <div className=" flex flex-col w-9/10 min-h-100 mt-8">
          <h1 className="text-orange-500 font-outfit font-bold text-3xl">
            {props.categorie}
          </h1>

          <div className="flex flex-wrap gap-5 mt-5 w-full">
            {catAnnonces.length > 0 &&
              catAnnonces.map((annonce, index) => (
                <AnnonceCard key={index} annonce={annonce} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default BrowseCategories
