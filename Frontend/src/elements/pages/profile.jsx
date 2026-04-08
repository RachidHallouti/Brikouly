import { motion } from "motion/react"
import {
  ArrowRight,
  Calendar,
  LogOut,
  MapPin,
  Package,
  Pen,
  Pencil,
  Pin,
  Send,
  Star,
  User,
  UserRoundPen,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slice"
import { useEffect, useState } from "react"
import api from "../../assets/api"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import Loader from "../animatedElements/Loader"
import { setToaster } from "../../redux/sliceElements"
export default function Profile() {
  const navigate = useNavigate()
  const disp = useDispatch()
  const { id } = useParams()
  const userId = useSelector((state) => state?.auth?.user?.id)
  const [user, setUser] = useState()
  const userProfile = userId == id || !id ? true : false
  const [selection, setSelection] = useState("annonces")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get(`api/users/${id || userId}`)
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
  const seDeconnecter = () => {
    disp(logout())
    disp(
      setToaster({
        message: "Vouz avez ete deconnecter",
      }),
    )
  }
  return (
    <main className="flex gap-4">
      <section className="w-1/3 flex flex-col h-fit items-center bg-white rounded-[40px] p-8 shadow-[0_0_5px_rgba(0,0,0,0.07)]">
        <div className="drop-shadow-md bg-white rounded-full p-3">
          <img
            src={`/storage/${user?.photo}`}
            alt=""
            className="h-28 w-28 object-cover rounded-full"
          />
        </div>
        <h1 className="font-semibold text-4xl mt-5">
          {user?.prenom[0].toUpperCase() + user?.prenom.slice(1)}{" "}
          {user?.nom[0].toUpperCase() + user?.nom.slice(1)}
        </h1>
        <h2 className="text-gray-600  flex gap-1.5 items-center mt-0.25">
          <MapPin size={16} strokeWidth={2.5} className="text-orange-500" />
          {user?.ville}
        </h2>
        <p className="mt-3 font-light text-gray-600">{user?.bio}</p>
        <div className="flex justify-between p-5 font-medium mt-6 bg-orange-100/60 w-full rounded-2xl">
          <h1 className="flex gap-3">
            <Calendar className="text-orange-500" strokeWidth={2.5} />
            Membre depuis
          </h1>
          <h1>{user?.created_at.slice(0, 4)}</h1>
        </div>
        <div className="flex justify-between p-5 font-medium mt-4 bg-orange-100/60 w-full rounded-2xl">
          <h1 className="flex gap-3">
            <Star className="text-orange-500" strokeWidth={2.5} />
            Notation
          </h1>
          <h1>4.9</h1>
        </div>
        <div className="flex justify-between p-5 font-medium mt-4 bg-orange-100/60 w-full rounded-2xl">
          <h1 className="flex gap-3">
            <Package className="text-orange-500" strokeWidth={2.5} />
            Annonces
          </h1>
          <h1>{user?.annonces.length}</h1>
        </div>
        {userProfile ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 3 }}
              className="text-white cursor-pointer flex gap-2 justify-center text-lg shadow-xl shadow-orange-500/20 bg-orange-500 p-4 items-center rounded-3xl mt-5 w-full"
            >
              <UserRoundPen />
              <h1>Modifier profile </h1>
            </motion.button>
            <motion.button
              onClick={seDeconnecter}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 3 }}
              className="cursor-pointer flex gap-2 justify-center text-lg  bg-white border-2 border-gray-400/30  p-4 items-center rounded-3xl mt-3 w-full"
            >
              <LogOut fill="white" />
              <h1>Se deconnecter</h1>
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 3 }}
              className="text-white cursor-pointer flex gap-2 justify-center text-lg shadow-xl shadow-orange-500/20 bg-orange-500 p-4 items-center rounded-3xl mt-5 w-full"
            >
              <Star fill="white" />
              <h1>
                Noter {user?.prenom[0].toUpperCase() + user?.prenom.slice(1)}
              </h1>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 3 }}
              className="cursor-pointer flex gap-2 justify-center text-lg  bg-white border-2 border-gray-400/30  p-4 items-center rounded-3xl mt-3 w-full"
            >
              <Send fill="white" />
              <h1>Envoyer un message</h1>
            </motion.button>
          </>
        )}
      </section>
      <section className="w-2/3 flex flex-col items-center py-5 p-10 ">
        <AnnoncesShower annonces={user?.annonces}>
          <h1 className="text-slate-950 text-4xl mb-2.5 font-semibold">
            {userProfile
              ? "Mes annonces"
              : "Annonces de " +
                user?.prenom[0].toUpperCase() +
                user?.prenom.slice(1)}
          </h1>
          <div className="w-full flex font-space text-[15.5px] mb-7 font-semibold justify-between">
            <h2 className="text-gray-500 ">les annonces les plus proches à</h2>
          </div>
        </AnnoncesShower>
      </section>
    </main>
  )
}
