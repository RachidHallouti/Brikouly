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
  X,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slice"
import { useEffect, useState } from "react"
import api from "../../assets/api"
import AnnoncesShower from "../animatedElements/AnnoncesShower"
import Loader from "../animatedElements/Loader"
import { setToaster } from "../../redux/sliceElements"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
export default function Profile() {
  const navigate = useNavigate()
  const disp = useDispatch()
  const { id } = useParams()
  const userId = useSelector((state) => state?.auth?.user?.id)
  const [user, setUser] = useState()
  const userProfile = userId == id || !id ? true : false
  const [selection, setSelection] = useState("annonces")
  const [loading, setLoading] = useState(true)
  const [showReview, setShowReview] = useState(false)
  const evaluationSchema = Yup.object().shape({
    commentaire: Yup.string()
      .required("Un commentaire est obligatoire")
      .max(250),
    note: Yup.number("la note doit étre un nombre entre 0 et 5").max(5).min(0),
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(evaluationSchema),
  })
  const note = watch("note")
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`api/users/${id || userId}`)
      setUser(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
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
  const onReview = async (data) => {
    try {
      const res = await api.post("api/evaluations", {
        ...data,
        user_id: id,
      })
      fetchData()
      setShowReview(false)
    } catch (error) {}
  }
  const NoteModule = () => {
    return (
      <div className="fixed top-30 left-0 flex justify-center items-center  w-full h-full z-50">
        <form
          onSubmit={handleSubmit(onReview)}
          className="rounded-2xl w-3/5 p-6 bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] "
        >
          <div className="flex justify-between">
            <h1 className="flex font-semibold mb-4 items-center gap-3">
              Evaluez {user?.prenom + " " + user?.nom}
            </h1>
            <button
              onClick={() => setShowReview(false)}
              className="cursor-pointer"
            >
              <X />
            </button>
          </div>
          <label htmlFor="com" className="font-semibold text-sm text-gray-600">
            COMMENTAIRE
          </label>
          <textarea
            type="text"
            id="com"
            placeholder="Laissez un commentaire"
            {...register("commentaire")}
            className={`bg-gray-100 border-2 text-gray-800 font-medium h-24 min-h-12 max-h-96 text-lg rounded-2xl w-full p-2 mt-2 mb-2  border-gray-300 pl-3`}
          />
          <label
            htmlFor="note"
            className={`font-semibold text-sm text-gray-600 mt-10`}
          >
            NOTE
          </label>
          <div className="flex gap-4 mt-2">
            <div className="w-full flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer text-orange-500"
                  onClick={() => setValue("note", n)}
                >
                  <Star
                    size={40}
                    strokeWidth={1.4}
                    fill={note >= n ? "#ff6900" : "transparent"}
                  />
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="text-white cursor-pointer flex gap-2 justify-center text-lg bg-orange-500 p-4 h-full items-center rounded-2xl w-full"
            >
              <Star fill="white" />
              <h1>Noter</h1>
            </motion.button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <main className="relative w-full">
      {loading ? (
        <Loader />
      ) : (
        <>
          {showReview && <NoteModule />}
          <section className="w-full md:gap-10  flex flex-col items-center md:items-stretch md:flex-row  bg-white rounded-[40px] p-8 shadow-[0_0_5px_rgba(0,0,0,0.07)]">
            <div className="flex flex-col items-center shrink-0 w-full md:w-2/5 lg:w-2/7  max-w-lg  xl:w-1/5">
              <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] aspect-square w-2/3 border-7 border-white overflow-hidden   bg-white rounded-4xl">
                <img
                  src={
                    user?.photo?.includes("http")
                      ? user?.photo
                      : `/storage/${user?.photo}`
                  }
                  alt=""
                  className="h-full w-full aspect-square object-cover"
                />
              </div>
              <h1 className="font-semibold text-center text-3xl mt-5">
                {user?.prenom[0].toUpperCase() + user?.prenom.slice(1)}{" "}
                {user?.nom[0].toUpperCase() + user?.nom.slice(1)}
              </h1>
              <h2 className="text-gray-600  flex gap-1.5 items-center mt-px">
                <MapPin
                  size={16}
                  strokeWidth={2.5}
                  className="text-orange-500"
                />
                {user?.ville}
              </h2>
            </div>
            <div className="w-full flex flex-col gap-4">
              <p className="mt-3 w-ful text-lg text-gray-600">{user?.bio}</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-auto font-medium">
                <div className="flex gap-4 items-center p-5  ">
                  <div className="">
                    <Calendar
                      className="text-orange-500"
                      strokeWidth={2.5}
                      size={46}
                    />
                  </div>
                  <div>
                    <h1 className="text-gray-600">MEMBRE DEPUIS</h1>
                    <h1>{user?.created_at.slice(0, 4)}</h1>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-5  ">
                  <div className="">
                    <Star
                      className="text-orange-500"
                      strokeWidth={2.5}
                      size={46}
                    />
                  </div>
                  <div>
                    <h1 className="text-gray-600">NOTE</h1>
                    <h1>
                      {user?.avgNote} ({user?.evaluations?.length} avis)
                    </h1>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-5  ">
                  <div className="">
                    <Package
                      className="text-orange-500"
                      strokeWidth={2.5}
                      size={46}
                    />
                  </div>
                  <div>
                    <h1 className="text-gray-600">ANNONCES</h1>
                    <h1>{user?.annonces.length}</h1>
                  </div>
                </div>
                <div className="flex gap-2 col-span-2 2xl:col-span-1">
                  {userProfile ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95, y: 3 }}
                        className="text-white cursor-pointer flex gap-2 justify-center  shadow-xl shadow-orange-500/20 bg-orange-500 p-4 py-3 items-center rounded-3xl w-full"
                      >
                        <UserRoundPen />
                        <h1>Modifier profile </h1>
                      </motion.button>
                      <motion.button
                        onClick={seDeconnecter}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95, y: 3 }}
                        className="cursor-pointer flex gap-2 justify-center   bg-white border-2 border-gray-400/30 py-3  p-4 items-center rounded-3xl w-full"
                      >
                        <LogOut fill="white" />
                        <h1>Se deconnecter</h1>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => setShowReview(!showReview)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98, y: 2 }}
                        className="text-white cursor-pointer flex gap-2 justify-center  shadow-xl shadow-orange-500/20 bg-orange-500 p-4 py-3 items-center rounded-3xl w-full"
                      >
                        <Star fill="white" />
                        <h1>
                          Noter{" "}
                          {user?.prenom[0].toUpperCase() +
                            user?.prenom.slice(1)}
                        </h1>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98, y: 2 }}
                        className="cursor-pointer flex gap-2 justify-center   bg-white border-2 border-gray-400/30 py-3  p-4 items-center rounded-3xl w-full"
                      >
                        <Send fill="white" />
                        <h1>Contacter</h1>
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center py-5 mt-4 ">
            <AnnoncesShower
              annonces={user?.annonces}
              title={
                userProfile
                  ? "Mes annonces"
                  : "Annonces de " +
                    user?.prenom[0].toUpperCase() +
                    user?.prenom.slice(1)
              }
              subTitle={
                userProfile
                  ? `Tu as ${user?.annonces.length} annonces`
                  : `${user?.prenom[0].toUpperCase() + user?.prenom.slice(1)} a ${user?.annonces.length} annonces
                      `
              }
            />
          </section>
          <section className="mt-4 ">
            <h1 className="text-slate-950 text-4xl mb-2.5 font-semibold">
              {userProfile
                ? "Mes evaluations"
                : "Evaluations de " +
                  user?.prenom[0].toUpperCase() +
                  user?.prenom.slice(1)}
            </h1>
            <div className="w-full mt-8 flex flex-col gap-2.5">
              {user.evaluations.map((e) => (
                <div className="w-full gap-4 flex bg-white shadow-[0_0_5px_rgba(0,0,0,0.10)] p-5 rounded-2xl">
                  <button
                    onClick={() => navigate(`/profile/${e?.reviewer?.id}`)}
                    className="flex h-fit shrink-0 border-3 rounded-full border-white overflow-hidden shadow-[0_0_2px_rgba(0,0,0,0.1)] hover:shadow-[0_0_3px_rgba(0,0,0,0.2)] items-center cursor-pointer"
                  >
                    <img
                      src={`/storage/${e.reviewer.photo}`}
                      alt=""
                      className="w-13 aspect-square object-cover"
                    />
                  </button>
                  <div className="">
                    <div className="flex items-center">
                      <button
                        onClick={() => navigate(`/profile/${e?.reviewer?.id}`)}
                        className=" text-lg cursor-pointer font-medium hover:text-orange-500"
                      >
                        {e.reviewer?.prenom[0]?.toUpperCase() +
                          e.reviewer?.prenom?.slice(1)}{" "}
                        {e.reviewer?.nom[0]?.toUpperCase() +
                          e.reviewer?.nom?.slice(1)}
                      </button>
                      <div className="flex ml-4 bg-orange-500 text-white py-1 p-2 rounded-2xl items-center gap-1 font-semibold">
                        {[...Array(Math.floor(e.note))].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="white"
                            className="text-white"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-xl mt-1 text-gray-600 flex wrap-anywhere">
                      {e.commentaire}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
