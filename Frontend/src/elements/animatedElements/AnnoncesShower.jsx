import React from "react"
import { motion } from "motion/react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import AnnonceCard from "./AnnonceCard"
import SkeletonCard from "./SkeletonCard"

export default function AnnoncesShower({
  children,
  annonces,
  setCategorieSearch,
  loading,
  nbr = 5,
  title,
  subTitle,
  searchHandle,
  arrowText = "Voir plus",
}) {
  return (
    <div className=" @container flex flex-col gap-1 w-full">
      {title && (
        <h1 className="text-slate-950 flex gap-2 items-center text-4xl mt-2 mb-1 font-semibold">
          {title}
        </h1>
      )}
      {subTitle && (
        <div className="w-full flex font-space text-[15.5px] mb-4 font-semibold justify-between">
          <h2 className="text-gray-500 ">{subTitle}</h2>
          {searchHandle && (
            <motion.div
              onClick={searchHandle}
              whileHover={{
                gap: "16px",
                padding: "0px",
              }}
              className="flex cursor-pointer gap-2 pr-2 items-center text-orange-500"
            >
              <h2 className=" font-bold">{arrowText}</h2>
              <ArrowRight size={20} />
            </motion.div>
          )}
        </div>
      )}
      {children}
      {annonces?.length > 0 && (
        <div className="grid gap-2 @lg:gap-3 @container grid-cols-2 @5xl:grid-cols-3 @6xl:grid-cols-4 @7xl:grid-cols-5 w-full">
          {annonces.map((annonce, index) => (
            <AnnonceCard
              key={index}
              annonce={annonce}
              setCategorie={setCategorieSearch}
            />
          ))}
        </div>
      )}
      {loading && (
        <div className="grid gap-2 @lg:gap-3 @container grid-cols-2 @5xl:grid-cols-3@6xl:grid-cols-4 @7xl:grid-cols-5 w-full">
          {" "}
          {[...Array(nbr)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
