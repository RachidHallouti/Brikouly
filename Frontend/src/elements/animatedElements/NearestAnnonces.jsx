import React, { useEffect, useState } from "react"
import AnnoncesShower from "./AnnoncesShower"
import api from "../../assets/api"
import { Link } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useSelector } from "react-redux"

export default function NearestAnnonces({
  cities,
  setCategorieSearch,
  children,
}) {
  const [annonces, setAnnonces] = useState([])
  const [loadingAnnonces, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.post("api/nearest-annonces", {
        cities: cities,
        user_id: user?.id,
      })
      setLoading(false)
      setAnnonces(res.data)
    }
    cities.length > 0 && fetchAnnonces()
  }, [JSON.stringify(cities)])
  return (
    <AnnoncesShower
      annonces={annonces}
      setCategorieSearch={setCategorieSearch}
      loadingAnnonces={loadingAnnonces}
    >
      <h1 className="text-slate-950 text-4xl my-2.5 font-semibold">
        Annonces près de {children ? children : "vous"}
      </h1>
      <div className="w-full flex font-space text-[15.5px] mb-7 font-semibold justify-between">
        <h2 className="text-gray-500 ">
          les annonces les plus proches à {cities[0]}
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
  )
}
