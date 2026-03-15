import React from "react"
import { motion } from "motion/react"
import { LoaderCircle } from "lucide-react"
import AnnonceCard from "./AnnonceCard"

export default function AnnoncesShower({
  children,
  annonces,
  setCategorieSearch,
  loadingAnnonces,
}) {
  return (
    <div className=" flex flex-col w-full min-h-100">
      {children}
      {loadingAnnonces && (
        <div className="w-full my-auto  flex text-black items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              transition: { repeat: Infinity, ease: "linear" },
            }}
          >
            <LoaderCircle size={50} />
          </motion.div>
        </div>
      )}
      <div className="flex gap-y-3 flex-wrap mt-5 w-full">
        {annonces?.length > 0 &&
          annonces.map((annonce, index) => (
            <AnnonceCard
              key={index}
              annonce={annonce}
              setCategorie={setCategorieSearch}
            />
          ))}
      </div>
    </div>
  )
}
