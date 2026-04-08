import { motion } from "motion/react"
import {
  Briefcase,
  Camera,
  CloudUpload,
  Coins,
  FileText,
  HandHelping,
  ImagePlus,
  MapPin,
  Pen,
  Search,
  Upload,
  X,
} from "lucide-react"
import { serviceCategories } from "../../assets/categorie"
import { setToaster } from "../../redux/sliceElements"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useNearestCities from "../hooks/useNearestCities"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

export default function AjouterAnnonce() {
  const categories = serviceCategories
  const cities = useNearestCities()
  const navigate = useNavigate()
  const disp = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const annonceSchema = Yup.object().shape({
    titre: Yup.string()
      .required("Le titre est obligatoire")
      .min(5, "Le titre doit faire au moins 5 caractères")
      .max(50, "Le titre ne doit pas dépasser 50 caractères"),
    description: Yup.string()
      .required("La description est obligatoire")
      .min(10, "La description doit faire au moins 10 caractères")
      .max(255, "La description est trop longue (255 caractères max)"),
    categorie: Yup.string().required("Veuillez sélectionner une catégorie"),
    ville: Yup.string().required("La ville est obligatoire"),
    prix: Yup.number()
      .typeError("Le prix doit être un nombre")
      .required("Le prix est obligatoire")
      .min(1, "Le prix doit être au moins de 1 Dh")
      .max(200000, "Le prix est trop élevé"),
    prix_par: Yup.string().required("L'unité de prix est obligatoire"),
    photo: Yup.mixed().required("La photo principale est obligatoire"),
  })
  const { watch, setValue, register, handleSubmit } = useForm({
    resolver: yupResolver(annonceSchema),
    defaultValues: {
      type: "offre",
      enligne: "non",
    },
  })
  const [previews, setPreviews] = useState({})
  const type = watch("type")
  const enligne = watch("enligne")
  useEffect(() => {
    const ville = watch("ville")
    cities.length > 0 && !ville && setValue("ville", cities[0].name)
  }, [cities])
  const parentVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }
  const childVariant = {
    hidden: {
      opacity: 0,
      y: 70,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60 },
    },
  }
  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("titre", data.titre)
      formData.append("description", data.description)
      data.categorie && formData.append("categorie", data.categorie)
      formData.append("ville", data.ville)
      formData.append("prix", data.prix)
      formData.append("prix_par", data.prix_par)
      formData.append("photo", data.photo)
      formData.append("user_id", user.id)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/annonces",
        formData,
      )
      navigate("/")
    } catch (error) {
      disp(setToaster({ message: error.response.data.message }))
      console.log(error)
    }
  }
  const onError = (errors) => {
    const allErrors = Object.keys(errors)
    if (allErrors.length > 0) {
      disp(setToaster({ message: errors[allErrors[0]].message, type: "x" }))
    }
  }
  const handlePhotoChange = (e, photo) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2048 * 1024) {
        disp(setToaster({ message: "La photo ne doit pas dépasse 2 Mo" }))
        return
      }
      setPreviews({ ...previews, [photo]: URL.createObjectURL(file) })
      setValue(photo, file)
    }
  }
  const photoRemove = (photo) => {
    setPreviews({ ...previews, [photo]: null })
    setValue(photo, null)
  }
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit, onError)}
      variants={parentVariant}
      animate="visible"
      initial="hidden"
    >
      <h1 className="text-5xl w-full text-center font-medium mt-5">
        Publier une annonce
      </h1>
      <h2 className="text-center mt-2 text-gray-500 mb-10">
        Brikouly vous permet de partager votre besoin ou votre services
      </h2>
      <motion.section className="flex flex-col xl:flex-row w-full gap-4">
        <motion.div
          variants={childVariant}
          className="bg-white p-7 rounded-[40px] w-full xl:w-2/3 shadow-[0_0_2px_rgba(0,0,0,0.07)]"
        >
          <h1 className="flex font-semibold items-center gap-3 mb-4">
            <div className="p-2 bg-orange-200/50 text-orange-500 rounded-full">
              <Camera strokeWidth={2.5} />
            </div>
            Photos de service
          </h1>
          <div className="w-full sm:p-5 p-1  flex flex-col md:flex-row gap-5">
            <motion.label
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97, y: 3 }}
              htmlFor="photo"
              className="md:w-1/2 relative overflow-hidden w-full border-dashed border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-100"
            >
              <input
                type="file"
                id="photo"
                className="hidden"
                onChange={(e) => handlePhotoChange(e, "photo")}
              />
              {previews.photo ? (
                <>
                  <img
                    src={previews.photo}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="hover:opacity-100 opacity-0 flex absolute z-40 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                    <Pen size={40} />
                    Photo Principale
                  </div>
                </>
              ) : (
                <div className="flex gap-1 font-medium items-center flex-col justify-center">
                  <CloudUpload size={40} />
                  Photo Principale
                </div>
              )}
            </motion.label>
            <div className="md:w-1/2 w-full h-100 flex flex-col gap-3">
              <div className="w-full h-1/2 flex gap-3">
                <motion.label
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  htmlFor="photo2"
                  className="w-1/2 border-dashed overflow-hidden relative border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-full"
                >
                  <input
                    type="file"
                    id="photo2"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e, "photo2")}
                  />
                  {previews.photo2 ? (
                    <>
                      <img
                        src={previews.photo2}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="hover:opacity-100 opacity-0 flex absolute z-1 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                        <Pen size={32} />
                      </div>
                      <button
                        onClick={() => photoRemove("photo2")}
                        className="absolute z-2 cursor-pointer bg-gray-100/80 text-gray-500 rounded-full p-0.5 top-3 right-3"
                      >
                        <X strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-1 font-medium items-center flex-col justify-center">
                      <ImagePlus size={32} />
                    </div>
                  )}
                </motion.label>
                <motion.label
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  htmlFor="photo3"
                  className="w-1/2 border-dashed overflow-hidden relative border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-full"
                >
                  <input
                    type="file"
                    id="photo3"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e, "photo3")}
                  />
                  {previews.photo3 ? (
                    <>
                      <img
                        src={previews.photo3}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="hover:opacity-100 opacity-0 flex absolute z-1 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                        <Pen size={32} />
                      </div>
                      <button
                        onClick={() => photoRemove("photo3")}
                        className="absolute z-2 cursor-pointer bg-gray-100/80 text-gray-500 rounded-full p-0.5 top-3 right-3"
                      >
                        <X strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-1 font-medium items-center flex-col justify-center">
                      <ImagePlus size={32} />
                    </div>
                  )}
                </motion.label>
              </div>
              <div className="w-full h-1/2 flex gap-3">
                <motion.label
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  htmlFor="photo4"
                  className="w-1/2 border-dashed overflow-hidden relative border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-full"
                >
                  <input
                    type="file"
                    id="photo4"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e, "photo4")}
                  />
                  {previews.photo4 ? (
                    <>
                      <img
                        src={previews.photo4}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="hover:opacity-100 opacity-0 flex absolute z-1 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                        <Pen size={32} />
                      </div>
                      <button
                        onClick={() => photoRemove("photo4")}
                        className="absolute z-2 cursor-pointer bg-gray-100/80 text-gray-500 rounded-full p-0.5 top-3 right-3"
                      >
                        <X strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-1 font-medium items-center flex-col justify-center">
                      <ImagePlus size={32} />
                    </div>
                  )}
                </motion.label>
                <motion.label
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  htmlFor="photo5"
                  className="w-1/2 border-dashed overflow-hidden relative border-gray-300 text-gray-500 border-3 rounded-4xl cursor-pointer borderd flex justify-center items-center bg-gray-100/80 h-full"
                >
                  <input
                    type="file"
                    id="photo5"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(e, "photo5")}
                  />
                  {previews.photo5 ? (
                    <>
                      <img
                        src={previews.photo5}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="hover:opacity-100 opacity-0 flex absolute z-1 w-full h-full bg-gray-200/70 gap-1 font-medium items-center flex-col justify-center">
                        <Pen size={32} />
                      </div>
                      <button
                        onClick={() => photoRemove("photo5")}
                        className="absolute z-2 cursor-pointer bg-gray-100/80 text-gray-500 rounded-full p-0.5 top-3 right-3"
                      >
                        <X strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-1 font-medium items-center flex-col justify-center">
                      <ImagePlus size={32} />
                    </div>
                  )}
                </motion.label>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="xl:w-1/3 w-full flex flex-col md:flex-row xl:flex-col gap-4">
          <motion.div
            variants={childVariant}
            className="bg-white flex flex-col p-7 rounded-[40px] w-full xl:h-1/2 shadow-[0_0_2px_rgba(0,0,0,0.07)]"
          >
            <h1 className="flex font-semibold items-center mb-4 gap-3">
              <div className="p-2 bg-orange-200/50 text-orange-500 rounded-full">
                <HandHelping strokeWidth={2.5} />
              </div>
              Type d'annonce
            </h1>
            <div className=" flex gap-5 h-full w-full">
              <motion.label
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95, y: 3 }}
                htmlFor="besoin"
                className={`w-1/2 flex-col gap-2  rounded-2xl items-center justify-center text-2xl flex p-5 h-full ${type == "besoin" ? "bg-green-500 text-green-100" : "bg-gray-200/80  text-gray-700"} cursor-pointer font-semibold`}
              >
                <input
                  type="radio"
                  value="besoin"
                  id="besoin"
                  {...register("type")}
                  className="hidden"
                />
                <Search strokeWidth={3} size={32} />
                <h2>Je cherche</h2>
              </motion.label>
              <motion.label
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95, y: 3 }}
                htmlFor="offre"
                className={`w-1/2 flex-col gap-2  rounded-2xl items-center justify-center text-2xl flex p-5  ${type == "offre" ? "bg-blue-500 text-blue-100" : "bg-gray-200/80  text-gray-700"} cursor-pointer font-semibold`}
              >
                <input
                  type="radio"
                  value="offre"
                  id="offre"
                  {...register("type")}
                  className="hidden"
                />
                <Briefcase strokeWidth={3} size={32} />
                <h2>J'offre</h2>
              </motion.label>
            </div>
          </motion.div>
          <motion.div
            variants={childVariant}
            className="bg-white flex flex-col p-7 rounded-[40px] w-full h-1/2 shadow-[0_0_2px_rgba(0,0,0,0.07)]"
          >
            <h1 className="flex font-semibold items-center mb-4 gap-3">
              <div className="p-2 bg-orange-200/50 text-orange-500 rounded-full">
                <MapPin strokeWidth={2.5} />
              </div>
              Localisation
            </h1>
            <label
              htmlFor=""
              className="font-semibold block text-sm text-gray-600"
            >
              VILLE
            </label>
            <select
              name="ville"
              className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
              {...register("ville")}
            >
              <option value="">Pas spécifique</option>

              {cities.map((c) => (
                <option key={c?.name} value={c?.name}>
                  {c?.name}
                </option>
              ))}
            </select>
            <label
              htmlFor=""
              className="font-semibold mt-4 block text-sm text-gray-600"
            >
              EN LIGNE
            </label>
            <div className="w-full mt-2 gap-4 h-full flex">
              <motion.label
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95, y: 3 }}
                htmlFor="oui"
                className={`flex p-2 cursor-pointer ${enligne == "oui" ? "bg-orange-500 w-1/2 text-orange-100" : "bg-gray-200 text-gray-500"}  w-1/2 items-center justify-center  rounded-2xl gap-2 text-2xl font-semibold`}
              >
                <input
                  type="radio"
                  value="oui"
                  id="oui"
                  className="hidden"
                  {...register("enligne")}
                />
                <h1>Oui</h1>
              </motion.label>
              <motion.label
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95, y: 3 }}
                htmlFor="non"
                className={`flex p-2 cursor-pointer ${enligne == "non" ? "bg-orange-500 w-1/2 text-orange-100" : "bg-gray-200 text-gray-500"}  w-1/2 items-center justify-center  rounded-2xl gap-2 text-2xl font-semibold`}
              >
                <input
                  type="radio"
                  value="non"
                  id="non"
                  className="hidden"
                  {...register("enligne")}
                />
                <h1>Non</h1>
              </motion.label>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section className="flex md:flex-row flex-col w-full gap-4 mt-4">
        <motion.div
          variants={childVariant}
          className="bg-white p-7 rounded-[40px] md:w-2/3 w-full shadow-[0_0_2px_rgba(0,0,0,0.07)]"
        >
          <h1 className="flex font-semibold mb-4 items-center gap-3">
            <div className="p-2 bg-orange-200/50 text-orange-500 rounded-full">
              <FileText strokeWidth={2.5} />
            </div>
            Détails de l'annonce
          </h1>
          <label
            htmlFor=""
            className="font-semibold block text-sm text-gray-600"
          >
            TITRE
          </label>
          <input
            type="text"
            placeholder="Titre de l'annonce"
            {...register("titre")}
            className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
          />
          <label
            htmlFor=""
            className="font-semibold block mt-5 mb-3 text-sm text-gray-600"
          >
            CATEGORIE
          </label>
          <div className="w-full flex mb-5 flex-wrap gap-1.5">
            {categories.map((c) => {
              const isSelected = watch("categorie") === c?.name
              return (
                <motion.label
                  key={c?.name}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  htmlFor={c?.name}
                  className={`p-1 px-1.5 ${isSelected ? c?.accent + " " + c?.color : "bg-gray-200 text-gray-800"}    cursor-pointer rounded-lg  shadow-sm hover:shadow-md font-medium`}
                >
                  <input
                    type="radio"
                    name="categorie"
                    id={c?.name}
                    value={c?.name}
                    className="hidden"
                    {...register("categorie")}
                  />
                  {c.name}
                </motion.label>
              )
            })}
          </div>
          <label htmlFor="" className="font-semibold text-sm text-gray-600">
            DESCRIPTION
          </label>
          <textarea
            type="text"
            {...register("description")}
            placeholder="Description de l'annonce"
            className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-3 min-h-50 max-h-100 h-50 border-gray-300 pl-3"
          />
        </motion.div>
        <div className="md:w-1/3">
          <motion.div
            variants={childVariant}
            className="bg-white p-7 rounded-[40px] w-full h-fit shadow-[0_0_2px_rgba(0,0,0,0.07)]"
          >
            <h1 className="flex font-semibold mb-4 items-center gap-3">
              <div className="p-2 bg-orange-200/50 text-orange-500 rounded-full">
                <Coins strokeWidth={2.5} />
              </div>
              Payement
            </h1>
            <div className="flex md:flex-col xl:flex-row w-full gap-2">
              <div className="w-2/3 md:w-full xl:w-2/3">
                <label
                  htmlFor=""
                  className="font-semibold block text-sm text-gray-600"
                >
                  PRIX
                </label>
                <input
                  type="number"
                  placeholder="Prix"
                  {...register("prix")}
                  className="bg-gray-100 border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
                />
              </div>
              <div className="w-1/3 md:w-full xl:w-1/3">
                <label
                  htmlFor=""
                  className="font-semibold block text-sm text-gray-600"
                >
                  PRIX PAR
                </label>
                <select
                  {...register("prix_par")}
                  className="bg-gray-100  border-2 text-gray-800 font-medium text-lg rounded-2xl w-full p-2 mt-2 border-gray-300 pl-3"
                >
                  <option value="Dh">rochdi</option>
                </select>
              </div>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            variants={childVariant}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95, y: 3 }}
            className="text-white cursor-pointer mb-10 sm:mb-0 font-semibold flex gap-2 justify-center text-lg shadow-xl shadow-orange-500/20 bg-orange-500 p-4 items-center rounded-3xl mt-5 w-19/20 mx-auto "
          >
            <Upload strokeWidth={2.5} />
            <h1>Publier l'annonce </h1>
          </motion.button>
        </div>
      </motion.section>
    </motion.form>
  )
}
