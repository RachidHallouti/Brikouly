import { Search, SquarePlus } from "lucide-react"
import {
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
} from "motion/react"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { setBar } from "../redux/sliceElements"

const Hero = () => {
  const hero = useRef()
  const heroInView = useInView(hero)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBar(heroInView))
  }, [heroInView])
  return (
    <>
      <motion.div
        initial={{ opacity: 0.3, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
        ref={hero}
        className="to-orange-200/50 from-gray-300/50 bg-linear-to-tr min-w-lg py-10 shadow-md p-5 rounded-2xl flex-col w-2/5 gap-3 flex items-center  "
      >
        <h2 className="font-space text-4xl mb-2 text-gray-800 font-semibold">
          Avez-vous un besoin ?
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-white my-2 shadow-md hover:shadow-xl text-xl p-3 rounded-xl h-12 bg-orange-500 font-outfit font-semibold flex gap-2 items-center cursor-pointer "
          onClick={() => navigate("/ajouter-annonce")}
        >
          <SquarePlus />
          Publiez une annonce
        </motion.button>
        <h2 className="font-space text-xl my-2 text-gray-800 font-semibold">
          Ou
        </h2>
        <div className="relative flex items-center justify-center max-w-full ">
          <motion.input
            type="text"
            className="bg-gray-50 font-outfit focus:shadow-lg pl-3 text-lg w-100 h-12 rounded-xl shadow-sm"
            placeholder=" Rechercher des annonces"
            whileFocus={{
              width: "550px",
            }}
          />
          <motion.button
            className="absolute hover:shadow-md cursor-pointer right-2 rounded-xl bg-orange-500 p-1.5 text-white"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Search />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
export default Hero
