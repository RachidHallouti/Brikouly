import React, { useEffect, useState } from "react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"

import api from "../../assets/api"
import { Link, useNavigate } from "react-router-dom"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useSelector } from "react-redux"

export default function AnnoncesEnligne({
  setCategorieSearch,
  children,
  limit = 5,
}) {
  const [annonces, setAnnonces] = useState([])
  const [loadingAnnonces, setLoading] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true)
      const res = await api.get("api/annonces", {
        params: { limit: limit, enligne: "oui", user_id: user?.id },
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
      nbr={limit}
      title="Annonces enlignes"
      subTitle="les dernieres annonces enlignes"
      searchHandle={searchHandle}
    />
  )
}
