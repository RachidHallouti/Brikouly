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
        setFavoris(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFavoris()
  }, [])

  return (
    <>
      <AnnoncesShower annonces={favoris} />
    </>
  )
}
