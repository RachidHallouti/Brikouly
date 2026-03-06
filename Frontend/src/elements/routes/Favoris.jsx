import React, { use, useEffect, useState } from "react"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import { set } from "zod"
import axios from "axios"
import { useSelector } from "react-redux"

export default function Favoris() {
  const [favoris, setFavoris] = useState([])
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/${user.id}/favoris`,
        )
        setFavoris(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFavoris()
  }, [])

  return (
    <main className="flex flex-col gap-5">
      {favoris && favoris.length > 0 && (
        <AnnoncesShower annonces={favoris}>
          <h2 className="text-orange-500 font-space font-bold text-3xl">
            Mes favoris
          </h2>
        </AnnoncesShower>
      )}
    </main>
  )
}
