import React, { useEffect, useState } from "react"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setToaster } from "../../redux/sliceElements"

export default function Toaster() {
  const { toaster } = useSelector((state) => state.elements)
  const disp = useDispatch()
  useEffect(() => {
    if (toaster?.message) {
      const timer = setTimeout(() => {
        disp(setToaster({}))
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [toaster, disp])
  return (
    <AnimatePresence>
      {toaster?.message && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            y: 100,
            opacity: 0,
            scale: 0.9,
          }}
          className="fixed z-50 bottom-7 left-1/2 -translate-x-1/2 bg-linear-to-tr bg-white font-semibold border-2 border-gray-100  p-4 rounded-2xl shadow-[0_0_70px_rgba(0,0,0,0.2)] min-w-80 max-w-120  flex gap-4 items-center"
        >
          <button
            onClick={() => disp(setToaster({}))}
            className="absolute top-0 p-1 right-0 cursor-pointer text-gray-400/70"
          >
            <X size={20} />
          </button>
          <div className="p-2 bg-orange-500/50 text-white rounded-full ">
            <div className="p-1.5 bg-orange-500/90 text-white rounded-full ">
              {toaster?.type !== "x" ? (
                <Check strokeWidth={4} size={16} />
              ) : (
                <X strokeWidth={4} size={16} />
              )}
            </div>
          </div>
          <div className="pr-2">
            <h1 className="text-xl">{toaster.message}</h1>
            <h2 className="text-gray-600 text-sm font-medium">{toaster.sub}</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
