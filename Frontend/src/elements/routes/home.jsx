import { useEffect, useRef, useState } from "react"
import getNearestCities from "../hooks/nearestCities"
import useNearestCities from "../hooks/useNearestCities"
import { motion, useInView, useMotionValueEvent } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import axios, { Axios } from "axios"
import { SquarePlus } from "lucide-react"
import { setBar } from "../../redux/sliceElements"
import { useNavigate } from "react-router-dom"
import Hero from "../Hero"

export default function Home() {
  const cities = useNearestCities()
  const [name, setName] = useState([])
  const ajouter = useRef()
  const ajouterInView = useInView(ajouter)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setBar(ajouterInView))
  }, [ajouterInView])
  const getName = async () => {
    await axios
      .get("http://localhost:8000/api/annonces")
      .then((res) => setName(res.data))
  }

  return (
    <main className="flex flex-col gap-5 items-center justify-center p-7">
      <Hero />
      {cities.length > 0 && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col items-center bg-orange-500/70 rounded-2xl text-2xl p-7 px-32 text-white font-bebas">
            {cities.length > 0 && cities[0].name}
          </div>
          <div className="flex flex-col items-center bg-orange-500/70 rounded-2xl text-2xl p-7 px-32 text-white font-bebas">
            {cities &&
              cities
                .filter((e) => e.name != cities[0].name)
                .map((e, index) => (
                  <h4 key={index}>
                    {index + 2} {e.name}
                  </h4>
                ))}
          </div>
        </motion.div>
      )}
      <button onClick={getName}>get</button>
      {name && name.map((e, index) => <h1 key={index}>{e.user_id}</h1>)}
    </main>
  )
}
