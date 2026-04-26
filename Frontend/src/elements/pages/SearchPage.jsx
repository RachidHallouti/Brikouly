import { useForm } from "react-hook-form"
import { serviceCategories } from "../../assets/categorie"
import useNearestCities from "../hooks/useNearestCities"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import api from "../../assets/api"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import { useSearchParams } from "react-router-dom"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import Loader from "../animatedElements/Loader"

export default function SearchPage() {
  const categories = serviceCategories
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [params] = useSearchParams()
  const urlData = Object.fromEntries(params.entries())
  const cities = useNearestCities()
  const { register, watch } = useForm({
    defaultValues: {
      ...urlData,
      type: urlData.type || "",
      enligne: urlData.enligne || "",
    },
  })
  const [annonces, setAnnonces] = useState([])
  const type = watch("type")
  const enligne = watch("enligne")
  const search = watch()
  const citiess = useNearestCities(search.ville).map((c) => c.name)
  const filters = watch("type", "enligne", "categorie", "min", "max", "ville")
  useEffect(() => {
    console.log(search.enligne)
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await api.get("api/annonces", {
          params: {
            ...search,
            cities: search.ville ? citiess : null,
            limit: 12,
          },
        })
        setAnnonces(res.data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [JSON.stringify(search), JSON.stringify(citiess)])
  return (
    <div className="-mx-10 mt-5 gap-10">
      <motion.section className="grid grid-cols-12 gap-3  w-full bg-white p-6 rounded-2xl  shadow-[0_0_2px_rgba(0,0,0,0.07)]">
        <div className="col-span-6">
          <label htmlFor="" className={`font-semibold text-orange-500`}>
            RECHERCHE
          </label>
          <input
            type="text"
            {...register("search")}
            placeholder="Titre de l'annonce"
            className={`bg-gray-100 border-2 text-gray-800 font-medium text-lg h-12 rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3`}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="" className={`font-semibold text-orange-500`}>
            CATEGORIE
          </label>
          <select
            name="categorie"
            {...register("categorie")}
            className="bg-gray-100 border-2 h-12 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
          >
            <option value="">Toutes</option>

            {categories.map((c) => (
              <option key={c?.name} value={c?.name}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label htmlFor="" className={`font-semibold text-orange-500`}>
            VILLE
          </label>
          <select
            name="ville"
            {...register("ville")}
            className="bg-gray-100 border-2 h-12 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
          >
            <option value="">Toutes</option>

            {cities.map((c) => (
              <option key={c?.name} value={c?.name}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label htmlFor="" className={`font-semibold text-orange-500`}>
            FILTRES
          </label>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full flex h-12 items-center justify-center gap-4 rounded-xl cursor-pointer ${showFilters ? "text-orange-500 bg-white" : "bg-orange-500 text-white"} shadow-[0_0_3px_rgba(0,0,0,0.15)] mt-2 p-5`}
          >
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ stiffness: 70 }}
            >
              <ChevronDown size={30} />
            </motion.div>
            <SlidersHorizontal size={30} />
          </motion.button>
        </div>
        {showFilters && (
          <>
            <div className="col-span-4">
              <label htmlFor="" className={`font-semibold text-orange-500`}>
                BUDGET(Dh)
              </label>
              <div className="flex items-center font-semibold text-gray gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  min={0}
                  {...register("min")}
                  className={`bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3`}
                />
                -
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  {...register("max")}
                  className={`bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3`}
                />
              </div>
            </div>
            <div className="col-span-4">
              <label htmlFor="" className={`font-semibold text-orange-500`}>
                TYPE
              </label>
              <div className="w-full relative flex font-medium text-gray-600 items-center h-12 mt-2 bg-gray-100 rounded-full">
                {[
                  { type: "Tous", value: "" },
                  { type: "Offres", value: "offre" },
                  { type: "Besoins", value: "besoin" },
                ].map((t) => (
                  <label
                    htmlFor={t.type}
                    className={`z-2 relative w-1/3 text-center  cursor-pointer ${type === t.value && "text-orange-500 font-semibold"}`}
                  >
                    <input
                      type="radio"
                      id={t.type}
                      className="hidden"
                      value={t.value}
                      {...register("type")}
                    />
                    {t.type}
                  </label>
                ))}
                <motion.div
                  animate={{
                    x: type === "" ? "0%" : type === "offre" ? "100%" : "200%",
                    scale:
                      type === ""
                        ? [1, 0, 1]
                        : type === "offre"
                          ? [1, 0, 1]
                          : [1, 0, 1],
                  }}
                  transition={{ stiffness: 200, damping: 21.5, type: "spring" }}
                  className="absolute  w-1/3 h-full p-1"
                >
                  <motion.div className="shadow-[0_0_2px_rgba(0,0,0,0.10)] rounded-full bg-white z-20 h-full w-full" />
                </motion.div>
              </div>
            </div>
            <div className="col-span-4">
              <label htmlFor="" className={`font-semibold text-orange-500`}>
                ENLIGNE
              </label>
              <div className="w-full relative flex font-medium text-gray-600 items-center h-12 mt-2 bg-gray-100 rounded-full">
                {[
                  { type: "Tous", value: "" },
                  { type: "Oui", value: "oui" },
                  { type: "Non", value: "non" },
                ].map((t) => (
                  <label
                    htmlFor={t.type + 1}
                    className={`z-2 relative w-1/3 text-center  cursor-pointer ${enligne === t.value && "text-orange-500 font-semibold"}`}
                  >
                    <input
                      type="radio"
                      id={t.type + 1}
                      className="hidden"
                      value={t.value}
                      {...register("enligne")}
                    />
                    {t.type}
                  </label>
                ))}
                <motion.div
                  animate={{
                    x:
                      enligne === ""
                        ? "0%"
                        : enligne === "oui"
                          ? "100%"
                          : "200%",
                  }}
                  transition={{ stiffness: 200, damping: 21.5, type: "spring" }}
                  className="absolute  w-1/3 h-full p-1"
                >
                  <motion.div className="shadow-[0_0_2px_rgba(0,0,0,0.1)] rounded-full bg-white z-20 h-full w-full" />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </motion.section>
      <section className=" w-full">
        <h1 className="mb-10 text-lg text-gray-400 mt-5 font-semibold">
          Filters :
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <AnnoncesShower annonces={annonces}></AnnoncesShower>
        )}
      </section>
    </div>
  )
}
