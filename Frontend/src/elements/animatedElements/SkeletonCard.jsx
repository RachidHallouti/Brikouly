import { Heart, MapPin } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { serviceCategories } from "../../assets/categorie"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import api from "../../assets/api"

const SkeletonCard = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.8 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: Math.random(),
        }}
        className="relative cursor-default  h-64 @lg:h-84"
      >
        <motion.button className="absolute z-20 top-3 text-white right-3">
          <Heart size={30} strokeWidth={0} fill="#666" />
        </motion.button>
        <motion.div className="shadow-[0_0_4px]  shadow-black/5  rounded-2xl  w-full h-full font-outfit overflow-hidden relative">
          <motion.div className="h-1/2 relative w-full bg-white ">
            <div className="w-full bg-gray-light h-full object-cover" alt="" />
            <div className="absolute bottom-2.5 bg-gray text-gray p-1 px-1.5 rounded-xl  right-2.5 flex gap-1 text-xs @lg:text-[13px]">
              <h3>9999 </h3>
              <h3>Dh</h3>
            </div>
          </motion.div>
          <div className="flex flex-col bg-white items-start p-3.5 pb-3 h-1/2 w-full  gap-1 relative">
            <motion.button
              className={`@lg:p-1 @lg:px-1.5 p-0.75 px-1 bg-gray-light text-gray-light rounded-lg  shadow-[0_0_4px] shadow-black/10 text-[11px] @lg:text-xs font-semibold`}
            >
              Maison et bricolage
            </motion.button>
            <h2 className="font-medium bg-gray-light text-gray-light rounded-lg pb-4 @lg:text-base text-sm w-full line-clamp-1 @lg:line-clamp-2 @lg:leading-snug leading-none wrap-break-word">
              khasni hada o hada o hada
              sdfsdfsdfsdfsdfsdfsdsdfsdfdfdsfdsfsdfdssdfdsfsdfsdsdfsdfsdf
            </h2>

            <div className="mt-auto w-full">
              <div className="flex bg-gray-light text-gray-light  gap-1.5 text-xs @lg:text-[13px] rounded-lg items-center w-fit">
                <MapPin size={13} />
                Bouznika
              </div>
              <div className="flex gap-1.5  @lg:gap-2.5  @lg:mt-1 mt-0.5 text-xs @lg:text-sm border-slate-700/30 w-full @lg:pt-2 pt-1.25 items-center text-slate-700">
                <div className="@lg:h-7 h-6 bg-gray  aspect-square object-cover rounded-full" />
                <h3 className="bg-gray text-gray rounded-lg font-space font-semibold">
                  Rachid Hallouti
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="shadow-[0_0_4px] hidden  p-3 gap-4    shadow-black/5 bg-white  rounded-2xl cursor-pointer w-full h-40 font-outfit overflow-hidden relative">
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{
            scale: 0.95,
          }}
          className="absolute z-20 cursor-pointer top-2 text-white right-2"
        >
          <Heart size={26} />
        </motion.button>
        <div className="min-h-30 shrink-0 h-full w-36 rounded-xl overflow-hidden">
          <img className="w-full h-full object-cover" alt="" />
        </div>
        <div className="w-full h-full">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className={`p-1 px-1.5  cursor-pointer rounded-lg  shadow-[0_0_4px] shadow-black/10 hover:shadow-[0_0_10px] text-xs font-semibold`}
          >
            Maison et bricolage
          </motion.button>
          <h2 className="font-medium text-lg mt-2 w-full line-clamp-2 leading-snug wrap-break-word">
            khasni hada o hada o hada
          </h2>
          <div className="flex  gap-1.5  w-full items-center text-slate-700">
            <MapPin size={13} />
            Bouznika
          </div>
          <div className="flex gap-2.5 mt-auto text-sm border-slate-700/30 w-full items-center text-slate-700">
            <img className="h-7 w-7 object-cover rounded-full" />
            <h3 className="text-gray-800 font-space font-semibold">
              Rachid hallouti
            </h3>
          </div>
        </div>
      </motion.div>
    </>
  )
}
export default SkeletonCard
