import React, { useEffect, useState } from "react"
import AnnoncesShower from "./AnnoncesShower"
import api from "../../assets/api"
import { Link, useNavigate } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useSelector } from "react-redux"

export default function AnnoncesEnligne({ setCategorieSearch, children }) {
  const [annonces, setAnnonces] = useState([])
  const [loadingAnnonces, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.get("api/annonces", {
        params: { limit: 5, enligne: "oui", user_id: user?.id },
      })
      setLoading(false)
      setAnnonces(res.data)
    }
    fetchAnnonces()
  }, [])
  const searchHandle = () => {
    const params = new URLSearchParams()
    params.set("enligne", "oui")
    navigate(`/search?${params.toString()}`)
  }
  return (
    <AnnoncesShower
      annonces={annonces}
      setCategorieSearch={setCategorieSearch}
      loading={loadingAnnonces}
    >
      <h1 className="text-slate-950 text-4xl my-2.5 font-semibold">
        Annonces enlignes
      </h1>
      <div className="w-full flex font-space text-[15.5px] mb-7 font-semibold justify-between">
        <h2 className="text-gray-500 ">les dernieres annonces enlignes</h2>
        <motion.button
          onClick={searchHandle}
          whileHover={{
            gap: "16px",
            padding: "0px",
          }}
          className="flex cursor-pointer gap-2 pr-2 items-center text-orange-500"
        >
          <h2 className=" font-bold">Voir plus</h2>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </AnnoncesShower>
  )
}
