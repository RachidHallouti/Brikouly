import { motion } from "motion/react"
import { Calendar, MapPin, Pin, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slice"
import { useEffect, useState } from "react"
import api from "../../assets/api"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import Loader from "../animatedElements/Loader"
export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useSelector((state) => state.auth.user)
  const [user, setUser] = useState()
  const [selection, setSelection] = useState("annonces")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get(`api/users/${id}`)
        console.log(res.data)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const direct = (s) => {
    setSelection(s)
  }
  const parentVariant = {
    hidden: {
      opacity: 0,
      y: -150,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        type: "spring",
        stiffness: 150,
      },
    },
  }
  const childVariant = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        scale: { type: "spring", stiffness: 230 },
        y: { type: "spring", stiffness: 230 },
      },
    },
  }
  return (
    <main className="">
      {!loading ? (
        <main>
          <div className="flex gap-10 py-7 mt-5 p-4 shadow-[0_0_2px_rgba(0,0,0,0.25)] rounded-4xl w-full border-gray-400 ">
            <div className="p-0.75 shrink-0 h-32 w-32 rounded-full bg-linear-to-tr from-orange-400 to-orange-500">
              <div className="p-0.5 shrink-0 h-full w-full rounded-full bg-white">
                <img
                  src={"/storage/" + user?.photo}
                  alt=""
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className=" w-fit h-full flex flex-col my-auto max-w-220">
              <h1 className="text-3xl font-semibold">
                {user?.prenom[0]?.toUpperCase() + user?.prenom?.slice(1)}{" "}
                {user?.nom[0]?.toUpperCase() + user?.nom?.slice(1)}
              </h1>
              <div className="my-2 flex flex-col gap-px">
                <div className="flex gap-1 text-sm w-full items-center text-gray-800">
                  <MapPin size={13} />
                  {user?.ville}
                </div>
                <div className="flex  gap-1 text-sm w-full items-center text-gray-800">
                  <Calendar size={13} />
                  <h1>Membre depuis {user?.created_at?.slice(0, 4)}</h1>
                </div>
              </div>

              <p className="text-gray-800">{user?.bio}</p>
              <div className="flex gap-5 py-4">
                <button
                  onClick={() => direct("avis")}
                  className="bg-gray-100 border-2 flex flex-col cursor-pointer items-center border-gray-200 text-gray-500 p-2.5 px-4.5 rounded-2xl"
                >
                  <h1 className="text-slate-800 text-xl font-bold">4.9</h1>
                  <h2 className="text-sm">Ratings</h2>
                </button>
                <button
                  onClick={() => direct("annonces")}
                  className="bg-gray-100 border-2 cursor-pointer flex flex-col items-center border-gray-200 text-gray-500 p-2.5 px-4.5 rounded-2xl"
                >
                  <h1 className="text-slate-800 text-xl font-bold">500</h1>
                  <h2 className="text-sm">Services completés</h2>
                </button>
              </div>
            </div>

            {/* <motion.button
          onClick={() => dispatch(logout())}
          variants={childVariant}
          className="h-11 w-full cursor-pointer text-red-500 border-3 rounded-2xl text-lg font-inter font-semibold"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 200 }}
        >
          Se deconnecter
        </motion.button> */}
          </div>

          <div className="flex mt-5 flex-col shadow-[0_0_2px_rgba(0,0,0,0.25)] rounded-4xl w-full border-gray-400 ">
            <div className="flex flex-col relative pt-1 w-full">
              <div className="flex w-full">
                <button
                  onClick={() => setSelection("annonces")}
                  className="w-1/2 text-center flex flex-col text-lg cursor-pointer"
                >
                  <motion.h1
                    whileHover={{
                      fontWeight: 700,
                    }}
                    animate={
                      selection === "annonces"
                        ? { fontWeight: 700 }
                        : { fontWeight: 300 }
                    }
                    className="p-2"
                  >
                    Annonces ({user.annonces_count})
                  </motion.h1>
                </button>
                <button
                  onClick={() => setSelection("avis")}
                  className="w-1/2 text-center flex flex-col text-lg cursor-pointer"
                >
                  <motion.h1
                    whileHover={{
                      fontWeight: 700,
                    }}
                    animate={
                      selection === "avis"
                        ? { fontWeight: 700 }
                        : { fontWeight: 300 }
                    }
                    className="p-2"
                  >
                    Avis
                  </motion.h1>
                </button>
              </div>
              <motion.div
                animate={{ x: selection === "annonces" ? "0%" : "100%" }}
                transition={{ type: "tween" }}
                className="w-1/2 flex justify-center"
              >
                <div className="bg-black bottom-0 rounded-full h-1 w-3/4" />
              </motion.div>
            </div>

            <div className="px-5 py-6">
              {selection === "annonces"
                ? user &&
                  user.annonces && <AnnoncesShower annonces={user?.annonces} />
                : "not found"}
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </main>
  )
}
