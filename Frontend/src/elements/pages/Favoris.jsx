import React, { use, useEffect, useState } from "react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import { set } from "zod"
import axios from "axios"
import { useSelector } from "react-redux"
import api from "../../assets/api"

export default function Favoris() {
  const [favoris, setFavoris] = useState([])
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const res = await api.get(`api/users/${user.id}/favoris`)
        setFavoris(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFavoris()
  }, [])

  return (
    <main className="flex flex-col gap-5">
      <AnnoncesShower annonces={favoris}>
        <h1 className="text-slate-950 text-4xl my-2.5 font-semibold">
          Annonces enregistrées
        </h1>
        <div className="w-full flex font-space text-[15.5px] mb-7 font-semibold justify-between">
          <h2 className="text-gray-500 ">
            {favoris
              ? `Vous avez ${favoris.length} annonces enregistrées`
              : "Vous n'avez aucune annonce enregistrée"}
          </h2>
        </div>
      </AnnoncesShower>
    </main>
  )
}
