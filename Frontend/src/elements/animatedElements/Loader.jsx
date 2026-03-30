import { LoaderCircle } from "lucide-react"
import React from "react"
import { motion } from "motion/react"

export default function Loader() {
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <motion.div
        animate={{
          rotate: [0, 360],
          transition: { repeat: Infinity, ease: "linear" },
        }}
      >
        <LoaderCircle size={50} />
      </motion.div>
    </div>
  )
}
