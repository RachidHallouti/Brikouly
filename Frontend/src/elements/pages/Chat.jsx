import React, { useEffect, useRef, useState } from "react"
import api from "../../assets/api"
import {
  Check,
  Divide,
  HandCoins,
  ImagePlus,
  ImageUp,
  Search,
  Send,
  X,
} from "lucide-react"
import { motion } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import { setToaster } from "../../redux/sliceElements"
import { echo } from "../../utils/echo"

export default function Chat() {
  const [convs, setConvs] = useState([])
  const [selectedConv, setSelectedConv] = useState(null)
  const [conv, setConv] = useState(null)
  const { id } = useSelector((state) => state.auth.user)
  const [message, setMessage] = useState({ content: "", type: "text" })
  const toScroll = useRef(null)
  const [loadingMsg, setLoadingMsg] = useState(false)
  const [open, setOpen] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [photos, setPhotos] = useState([])
  const [previews, setPreviews] = useState([])
  const disp = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (width > 1024) {
      setOpen(true)
    }
  }, [width])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("api/conversations")
        setConvs(res.data)
        setSelectedConv(res.data[0])
      } catch (error) {}
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (!selectedConv) return
    const fetchData = async () => {
      setLoadingMsg(true)
      try {
        const res = await api.get(`api/conversations/${selectedConv.id}`)
        setConv(res.data)
        setMessage({ content: "", type: "text" })
      } catch (error) {
      } finally {
        setLoadingMsg(false)
      }
    }
    fetchData()
    const channel = echo.private(`chat.${selectedConv.id}`)
    channel.listen("MessageSent", (e) => {
      if (e.message.user_id == id) return
      setConv((prevConv) => ({
        ...prevConv,
        messages: [...prevConv.messages, e.message],
      }))
    })
    return () => {
      echo.leave(`chat.${selectedConv.id}`)
    }
  }, [selectedConv])
  useEffect(() => {
    scrollToBottom()
  }, [conv])
  const scrollToBottom = () => {
    toScroll.current?.scrollIntoView()
  }
  const reponseOffre = async (o, r) => {
    if (!o || !r) return
    try {
      await api.post("api/messages", {
        type: "reponse_offre",
        status: r,
        reponse_a: o,
      })
    } catch (error) {}
  }
  const envoyerMessage = async (e) => {
    e.preventDefault()
    const isPhoto = message.type === "photo" && photos.length > 0
    const isOffre = message.type === "offre" && message.prix
    const isText = message.type === "text" && message.content.trim()

    if (!isPhoto && !isOffre && !isText) return

    try {
      if (isPhoto) {
        const socketId = window.Echo?.socketId()
        const uploadPromises = photos.map(async (p) => {
          const form = new FormData()
          form.append("type", "photo")
          form.append("content", p.photo)
          form.append("user_id", selectedConv.other_user.id)
          if (selectedConv.annonce_id) {
            form.append("annonce_id", selectedConv.annonce_id)
          }

          const res = await api.post("api/messages", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Socket-ID": socketId,
            },
          })
          return res.data
        })

        const newMessages = await Promise.all(uploadPromises)

        setConv((prev) => ({
          ...prev,
          messages: [...prev.messages, ...newMessages],
        }))

        photos.forEach((p) => URL.revokeObjectURL(p.preview))
        setPhotos([])
      }

      if (isText || isOffre) {
        const res = await api.post("api/messages", {
          ...message,
          user_id: selectedConv.other_user.id,
          annonce_id: selectedConv.annonce_id,
        })
        setConv({ ...conv, messages: [...conv.messages, res.data] })
      }

      setMessage({ content: "", type: "text" })
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    if (photos.length + files.length > 5) {
      disp(
        setToaster({
          message: "Limite de 5 photos atteinte pour Brikouly.",
          type: "x",
        }),
      )
      e.target.value = null
      return
    }

    const validPhotos = []
    let hasError = false

    files.forEach((file) => {
      if (file.size > 2048 * 1024) {
        hasError = true
      } else {
        validPhotos.push({
          photo: file,
          preview: URL.createObjectURL(file),
        })
      }
    })

    if (hasError) {
      disp(
        setToaster({
          message:
            files.length === 1
              ? "une photo ne doit pas depasse 2 Mo"
              : "Certaines photos dépassent 2 Mo et n'ont pas été ajoutées",
          type: "x",
        }),
      )
    }

    if (validPhotos.length > 0) {
      setMessage({ type: "photo" })
      setPhotos((prev) => [...prev, ...validPhotos])
    }
    e.target.value = null
  }
  return (
    <main className="flex h-full w-full relative ">
      <motion.section
        animate={{
          x: open ? 0 : "-100%",
        }}
        className="w-100 p-5 absolute flex flex-col md: lg:relative z-10 bg-white h-full border-r-[1.3px] border-gray-600/30"
      >
        <div className="flex justify-between">
          <h1 className="text-4xl font-medium">Messages</h1>

          <button
            className="cursor-pointer block lg:hidden "
            onClick={() => setOpen(false)}
          >
            close
          </button>
        </div>
        <div className="flex relative w-full  mt-4 items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Recherche une discussion..."
            className="bg-gray-300/60 w-full pl-12 text-lg  py-2 p-2.5 rounded-full"
          />
          <div className="absolute text-gray-600 left-3.5">
            <Search />
          </div>
        </div>
        <div className="mt-4 w-full overflow-y-scroll">
          {convs.length > 0 &&
            convs.map((c) => (
              <button
                onClick={() => {
                  setSelectedConv(c)
                  if (width < 786) {
                    setOpen(false)
                  }
                }}
                className={`grid grid-cols-5 items-center relative cursor-pointer ${selectedConv === c && "bg-orange-200/30"} hover:bg-orange-200/30  gap-10 w-full p-2.5 pl-4`}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    height: "0%",
                  }}
                  animate={{
                    opacity: selectedConv === c ? 1 : 0,
                    height: selectedConv === c ? "100%" : "0%",
                  }}
                  className="absolute h-full w-1.25 bg-orange-500 rounded-full left-0"
                />
                <div
                  className={`w-16 ${c.annonce ? "rounded-2xl relative" : "rounded-full"} shrink-0 overflow-hidden aspect-square`}
                >
                  <img
                    src={
                      c?.annonce
                        ? c?.annonce?.photo.includes("http")
                          ? c?.annonce.photo
                          : `/storage/${c?.annonce.photo}`
                        : c?.other_user?.photo.includes("http")
                          ? c?.other_user?.photo
                          : `/storage/${c?.other_user?.photo}`
                    }
                    className="w-full aspect-square object-cover"
                    alt=""
                  />
                  {c.annonce && (
                    <img
                      src={
                        c?.other_user?.photo.includes("http")
                          ? c?.other_user?.photo
                          : `/storage/${c?.other_user?.photo}`
                      }
                      className="z-50 w-8 ring-[1.7px] ring-gray-light aspect-square rounded-full object-cover absolute bottom-[5px] right-[5px]"
                    />
                  )}
                </div>
                <div className="col-span-4">
                  <h1 className="font-medium text-start w-full text-xl truncate">
                    {c.annonce
                      ? c.annonce.titre
                      : c.other_user.prenom[0].toUpperCase() +
                        c.other_user.prenom.slice(1) +
                        " " +
                        c.other_user.nom[0].toUpperCase() +
                        c.other_user.nom.slice(1)}
                  </h1>
                  {c.latest_message && (
                    <h2 className="w-full text-start truncate text-gray">
                      {c.latest_message?.user_id === id
                        ? "vous"
                        : c.other_user.prenom}
                      :{" "}
                      {c.latest_message.type === "photo"
                        ? "photo"
                        : c.latest_message.type === "offre"
                          ? "offre"
                          : c.latest_message.content}
                    </h2>
                  )}
                </div>
              </button>
            ))}
        </div>
      </motion.section>
      {conv && (
        <section className="flex-1 h-full overflow-hidden flex flex-col ">
          {conv && (
            <>
              <div className="w-full flex p-5 gap-4 border-b border-gray-600/30 bg-white">
                {!open && (
                  <button
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    close
                  </button>
                )}
                <div
                  className={`w-16 ${selectedConv?.annonce ? "rounded-2xl" : "rounded-full"} shrink-0 overflow-hidden aspect-square`}
                >
                  <img
                    src={
                      selectedConv?.annonce
                        ? selectedConv?.annonce?.photo.includes("http")
                          ? selectedConv?.annonce.photo
                          : `/storage/${selectedConv?.annonce.photo}`
                        : selectedConv?.other_user?.photo.includes("http")
                          ? selectedConv?.other_user?.photo
                          : `/storage/${selectedConv?.other_user?.photo}`
                    }
                    className="w-full aspect-square object-cover"
                    alt=""
                  />
                </div>
                <div className="col-span-4">
                  <h1 className="font-medium text-start w-full text-2xl truncate">
                    {selectedConv?.annonce
                      ? selectedConv.annonce.titre
                      : selectedConv?.other_user?.prenom[0].toUpperCase() +
                        selectedConv?.other_user?.prenom.slice(1) +
                        " " +
                        selectedConv?.other_user?.nom[0].toUpperCase() +
                        selectedConv?.other_user?.nom.slice(1)}
                  </h1>
                  {selectedConv.annonce && (
                    <h2 className="w-full flex items-center gap-2 text-start text-lg truncate text-gray">
                      <img
                        src={
                          selectedConv?.other_user?.photo.includes("http")
                            ? selectedConv?.other_user?.photo
                            : `/storage/${selectedConv?.other_user?.photo}`
                        }
                        alt=""
                        className="h-6  aspect-square rounded-full object-cover"
                      />
                      {selectedConv?.other_user?.prenom[0].toUpperCase() +
                        selectedConv?.other_user?.prenom.slice(1) +
                        " " +
                        selectedConv?.other_user?.nom[0].toUpperCase() +
                        selectedConv?.other_user?.nom.slice(1)}
                    </h2>
                  )}
                </div>
              </div>
              {!loadingMsg ? (
                <div className="flex w-full py-4  flex-col flex-1 overflow-y-scroll p-3 gap-2">
                  {conv.messages?.map((m) => {
                    const isMe = m.user_id === id
                    return m.type === "reponse_offre" ? (
                      <h2 className="p-4 text-center font-medium text-gray-600/80 text-xl">
                        {isMe ? "vous avez " : conv.other_user.nom + " a "}
                        {m.content} l'offre de {m.reponse_a.prix}{" "}
                        {m.reponse_a.prix_par}
                      </h2>
                    ) : (
                      <div
                        key={m.id}
                        className={`w-full flex  ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex flex-col ${m.type === "photo" ? "md:max-w-1/2 max-w-[80%]" : "max-w-[80%]"} w-fit rounded-2xl text-lg transition-all ${m.type === "offre" ? "p-5" : m.type === "text" ? "p-2 px-5" : "border-4 border-orange-500 overflow-hidden"} ${
                            isMe
                              ? "bg-orange-500 text-white rounded-br-none"
                              : "bg-white text-orange-500 border-[1.5px] border-gray-200 rounded-bl-none "
                          }`}
                        >
                          {m.type === "text" && (
                            <p className="break-words w-full leading-relaxed">
                              {m.content}
                            </p>
                          )}
                          {m.type === "photo" && (
                            <img src={`/storage/${m.content}`} />
                          )}

                          {m.type === "offre" && (
                            <div className="flex flex-col">
                              <h1
                                className={`text-xs uppercase tracking-wider font-bold mb-1 ${isMe ? "text-orange-100" : "text-gray-400"}`}
                              >
                                Offre
                              </h1>
                              <h1 className="pb-3 font-semibold text-3xl">
                                {m.prix} {m.prix_par}
                              </h1>

                              {!isMe && !m.status && (
                                <div className="flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() =>
                                      reponseOffre(m.id, "accepté")
                                    }
                                    className=" items-center justify-around flex p-3 font-semibold bg-orange-500 w-33 text-white rounded-xl cursor-pointer"
                                  >
                                    <Check size={28} strokeWidth={3} />
                                    Accepter
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => reponseOffre(m.id, "refusé")}
                                    className="items-center justify-around flex p-3 font-semibold bg-gray-200/80 w-33  text-gray-800 rounded-xl cursor-pointer "
                                  >
                                    <X size={28} strokeWidth={3} />
                                    Refuser
                                  </motion.button>
                                </div>
                              )}

                              {isMe && !m.status && (
                                <p className="text-sm italic text-orange-100/80">
                                  En attente de réponse...
                                </p>
                              )}
                              {m.status && (
                                <p
                                  className={`${m.status === "accepté" ? "text-green-500" : "text-red-500"} italic`}
                                >
                                  {m.status}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={toScroll}></div>
                </div>
              ) : (
                <div className="flex w-full py-4  flex-col flex-1 overflow-y-scroll p-3 gap-2">
                  {[...Array(10)].map((_, i) => {
                    const widths = [
                      "w-[20%]",
                      "w-[30%]",
                      "w-[40%]",
                      "w-[50%]",
                      "w-[60%]",
                    ]
                    const heights = ["h-12", "h-24", "h-36"]
                    const w = widths[Math.floor(Math.random() * widths.length)]
                    const h =
                      heights[Math.floor(Math.random() * heights.length)]
                    const r = Math.random()
                    return (
                      <div
                        key={i}
                        className={`flex w-full ${i % 2 === 0 ? "justify-end" : "justify-start"} `}
                      >
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ delay: Math.random() }}
                          className={` ${w + " " + h} rounded-2xl ${
                            i % 2 === 0
                              ? "bg-gray-300 rounded-br-xs"
                              : "bg-gray-200 rounded-bl-xs"
                          }`}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
              <form
                onSubmit={envoyerMessage}
                className="w-full items-end p-20 flex py-6 gap-8 border-t border-gray-600/30 bg-white"
              >
                <label
                  htmlFor="photo"
                  className="text-gray hover:text-orange-500 flex items-center h-14 cursor-pointer"
                >
                  <input
                    onChange={handlePhotoChange}
                    disabled={photos.length > 4}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    id="photo"
                  />
                  <ImageUp size={30} />
                </label>
                {conv.annonce && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessage({
                        content: "",
                        type: "offre",
                        prix: conv.annonce.prix,
                        prix_par: conv.annonce.prix_par,
                      })
                      setPhotos([])
                    }}
                    className="text-gray hover:text-orange-500 h-14 cursor-pointer"
                  >
                    <HandCoins size={30} />
                  </button>
                )}
                {(message.content || message.type != "text") && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessage({ content: "", type: "text" })
                      setPhotos([])
                    }}
                    className="text-gray hover:text-orange-500 h-14 cursor-pointer"
                  >
                    <X size={30} />
                  </button>
                )}
                {message.type === "photo" && (
                  <div className="grid grid-cols-5 gap-2">
                    {photos.map((p) => (
                      <img
                        src={p.preview}
                        className="aspect-square rounded-2xl object-cover"
                      />
                    ))}
                    {photos.length < 5 && (
                      <label
                        htmlFor="photo"
                        className="aspect-square bg-gray-200 text-gray-600 rounded-2xl cursor-pointer flex items-center justify-center"
                      >
                        <ImagePlus size={40} strokeWidth={2} />
                      </label>
                    )}
                  </div>
                )}
                {message.type === "text" && (
                  <input
                    value={message.content}
                    type="text"
                    onChange={(e) =>
                      setMessage({ content: e.target.value, type: "text" })
                    }
                    name=""
                    id=""
                    placeholder="Ecrivez votre message..."
                    className="bg-gray-300/60 flex-1 h-14 text-gray-700 border-2 border-gray-400/30 text-xl  py-3 p-6 rounded-2xl"
                  />
                )}
                {message.type === "offre" && (
                  <div className="flex-1 flex gap-2">
                    <input
                      value={message.prix}
                      type="number"
                      onChange={(e) =>
                        setMessage({ ...message, prix: e.target.value })
                      }
                      name=""
                      id=""
                      placeholder="Votre offre"
                      className="bg-gray-300/60 flex-1  text-gray-700 border-2 border-gray-400/30 text-xl  py-3 p-6 rounded-2xl"
                    />
                    <select
                      name=""
                      value={message.prix_par}
                      onChange={(e) =>
                        setMessage({ ...message, prix_par: e.target.value })
                      }
                      id=" "
                      className="bg-gray-300/60 flex-1 text-gray-700 border-2 border-gray-400/30 text-xl  py-3 p-6 rounded-2xl"
                    >
                      <option value="Dh">Dh</option>
                      <option value="Dh/Heure">Dh/Heure</option>
                      <option value="Dh/Jour">Dh/Jour</option>
                      <option value="Dh/Mois">Dh/Mois</option>
                    </select>
                  </div>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="text-orange-500 hover:text-white cursor-pointer hover:bg-orange-500 rounded-2xl "
                >
                  <motion.div
                    animate={{ rotate: 45 }}
                    whileHover={{ rotate: 0 }}
                    className="h-14 aspect-square flex items-center justify-center"
                  >
                    <Send size={30} />
                  </motion.div>
                </motion.button>
              </form>
            </>
          )}
        </section>
      )}
    </main>
  )
}
