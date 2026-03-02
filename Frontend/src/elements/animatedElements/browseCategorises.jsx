import { serviceCategories } from "../../assets/categorie"
import { motion } from "motion/react"

const BrowseCategories = () => {
  const categories = serviceCategories
  return (
    <div className="w-9/10 my-10 ">
      <h1 className="text-orange-500 font-space text-2xl font-extrabold mb-8">
        Recherche par categorie :
      </h1>
      <div className="flex w-full flex-wrap gap-3 font-outfit">
        {categories.map((cat) => (
          <motion.div
            whileHover={{
              scale: 1.07,
              borderRadius: "7px",
            }}
            whileTap={{
              scale: 0.95,
              borderRadius: "0px",
            }}
            className={`${cat.color} ${cat.accent} h-36 w-36 hover:shadow-lg cursor-pointer shadow-md flex flex-col p-6 rounded-2xl gap-2 justify-center items-center`}
          >
            <cat.icon className="h-12 w-12" />
            <p className="text-sm">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
export default BrowseCategories
