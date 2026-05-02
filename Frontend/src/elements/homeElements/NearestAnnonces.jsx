import React, { useEffect, useState } from "react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"

import api from "../../assets/api"
import { Link, useNavigate } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useSelector } from "react-redux"
import Loader from "../animatedElements/Loader"

export default function NearestAnnonces({
  cities,
  setCategorieSearch,
  children,
  limit = 5,
}) {
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.get("api/annonces", {
        params: { cities: cities, limit: limit, user_id: user?.id },
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
      nbr={limit}
      title={`Annonces près de ${children ? children : "vous"}`}
      subTitle={`les annonces les plus proches à ${cities[0]}`}
      searchHandle={searchHandle}
    />
  )
}
