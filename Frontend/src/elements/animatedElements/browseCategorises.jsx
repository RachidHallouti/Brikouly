import { useEffect, useState } from "react"
import { serviceCategories } from "../../assets/categorie"
import { motion } from "motion/react"
import axios from "axios"
import AnnonceCard from "./AnnonceCard"

const BrowseCategories = (props) => {
  const categories = serviceCategories
  const [catAnnonces, setCatAnnonces] = useState([])
  useEffect(() => {
    const fetchAnnonces = async () => {
      await axios
        .get(`http://localhost:8000/api/categories/${props.categorie}`)
        .then((res) => setCatAnnonces(res.data))
    }
    props.categorie && fetchAnnonces()
    setCatAnnonces([])
  }, [props.categorie])
  return (
    <div ref={props.ref} className="w-9/10 my-10 ">
      <h1 className="text-orange-500 font-space text-2xl font-extrabold mb-8">
        Recherche par categorie :
      </h1>
      <div className="flex w-full flex-wrap gap-3 font-outfit">
        {categories.map((cat) => (
          <motion.button
            whileHover={{
              scale: 1.07,
              borderRadius: "7px",
            }}
            whileTap={{
              scale: 0.95,
              borderRadius: "0px",
            }}
            onClick={() => {
              props.setCategorie(cat.name)
            }}
            className={`${cat.color} ${cat.accent} h-36 w-36 hover:shadow-lg cursor-pointer shadow-md flex flex-col p-6 rounded-2xl gap-2 justify-center items-center`}
          >
            <cat.icon className="h-12 w-12" />
            <p className="text-sm">{cat.name}</p>
          </motion.button>
        ))}
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
