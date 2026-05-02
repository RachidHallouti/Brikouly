import React, { useEffect, useState } from "react"
import api from "../../assets/api"
import { Link, useNavigate } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useSelector } from "react-redux"
import AnnoncesShower from "../animatedElements/AnnoncesShower"

export default function LatestAnnonces({
  setCategorieSearch,
  children,
  limit = 5,
}) {
  const [annonces, setAnnonces] = useState([])
  const navigate = useNavigate()
  const [loadingAnnonces, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.get("api/annonces", {
        params: { limit: limit, user_id: user?.id },
      })
      setLoading(false)
      setAnnonces(res.data)
    }
    fetchAnnonces()
  }, [])
  const searchHandle = () => {
    navigate(`/search`)
  }
  return (
    <AnnoncesShower
      annonces={annonces}
      setCategorieSearch={setCategorieSearch}
      loading={loadingAnnonces}
      nbr={limit}
      title="Annonces récentes"
      subTitle="les dernieres annonces"
      searchHandle={searchHandle}
    />
  )
}
