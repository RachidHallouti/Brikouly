import React from "react"
import { motion } from "motion/react"
import { LoaderCircle } from "lucide-react"
import AnnonceCard from "./AnnonceCard"
import SkeletonCard from "./SkeletonCard"

export default function AnnoncesShower({
  children,
  annonces,
  setCategorieSearch,
  loading,
  nbr = 5,
}) {
  return (
    <div className=" @container flex flex-col gap-2 w-full">
      {children}

      <div className="grid gap-2 @lg:gap-3 @container grid-cols-2 @lg:grid-cols-2 @2xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4 @7xl:grid-cols-5 w-full">
        {annonces?.length > 0 &&
          annonces.map((annonce, index) => (
            <AnnonceCard
              key={index}
              annonce={annonce}
              setCategorie={setCategorieSearch}
            />
          ))}
      </div>
      {loading && (
        <div className="grid gap-2 @lg:gap-3 @container grid-cols-2 @lg:grid-cols-2 @2xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4 @7xl:grid-cols-5 w-full">
          {[...Array(nbr)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
