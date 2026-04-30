import React, { useEffect, useState } from "react"
import AnnoncesShower from "./AnnoncesShower"
import api from "../../assets/api"
import { Link, useNavigate } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useSelector } from "react-redux"
import Loader from "./Loader"

export default function NearestAnnonces({
  cities,
  setCategorieSearch,
  children,
}) {
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.get("api/annonces", {
        params: { cities: cities, limit: 5, user_id: user?.id },
      })
      setLoading(false)
      setAnnonces(res.data)
    }
    cities.length > 0 && fetchAnnonces()
  }, [JSON.stringify(cities)])
  const searchHandle = () => {
    const params = new URLSearchParams()
    params.set("ville", cities[0])
    navigate(`/search?${params.toString()}`)
  }
  return (
    <AnnoncesShower
      annonces={annonces}
      setCategorieSearch={setCategorieSearch}
      loading={loading}
    >
      <h1 className="text-slate-950 flex gap-2 items-center text-4xl my-2.5 font-semibold">
        Annonces près de {children ? children : "vous"}
        {loading && (
          <motion.div
            animate={{
              rotate: [0, 360],
              transition: { repeat: Infinity, ease: "linear" },
            }}
            className="mt-1"
          >
            <LoaderCircle size={30} />
          </motion.div>
        )}
      </h1>
      <div className="w-full flex font-space text-[15.5px] mb-7 font-semibold justify-between">
        <h2 className="text-gray-500 ">
          les annonces les plus proches à {cities[0]}
        </h2>
        <motion.div
          onClick={searchHandle}
          whileHover={{
            gap: "16px",
            padding: "0px",
          }}
          className="flex cursor-pointer gap-2 pr-2 items-center text-orange-500"
        >
          <h2 className=" font-bold">Voir plus</h2>
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </AnnoncesShower>
  )
}
