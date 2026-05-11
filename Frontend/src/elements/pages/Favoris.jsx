import React, { use, useEffect, useState } from "react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import { set } from "zod"
import axios from "axios"
import { useSelector } from "react-redux"
import api from "../../assets/api"

export default function Favoris() {
  const [favoris, setFavoris] = useState([])
  const user = useSelector((state) => state.auth.user)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchFavoris = async () => {
      setLoading(true)
      try {
        const res = await api.get(`api/favoris`)
        setFavoris(res.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchFavoris()
  }, [])

  return (
    <main className="flex flex-col gap-5">
      <AnnoncesShower
        annonces={favoris}
        loading={loading}
        title="Annonces enregistrées"
        subTitle={
          favoris
            ? `Vous avez ${favoris.length} annonces enregistrées`
            : "Vous n'avez aucune annonce enregistrée"
        }
      />
    </main>
  )
}
