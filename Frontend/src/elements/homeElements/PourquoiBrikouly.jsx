import { Layout, MapPin, MessageCircle, Users } from "lucide-react"
import React from "react"
import { motion } from "framer-motion" // Use "framer-motion" or "motion/react" depending on your install

const whyBrikouly = [
  {
    title: "Double Rôle Unique",
    subtitle:
      "Un compte unique pour tout faire : postez un besoin ou proposez vos services.",
    icon: Users,
  },
  {
    title: "Ultra-Proximité",
    subtitle:
      "Trouvez l'aide idéale juste à côté de chez vous grâce au filtrage par ville.",
    icon: MapPin,
  },
  {
    title: "Chat en Temps Réel",
    subtitle:
      "Échangez instantanément et en toute sécurité via notre messagerie privée.",
    icon: MessageCircle,
  },
  {
    title: "Expérience Épurée",
    subtitle:
      "Une alternative moderne et organisée aux publications confuses des réseaux sociaux.",
    icon: Layout,
  },
]

export default function PourquoiBrikouly() {
  return (
    <section className="mt-16 px-4 max-w-7xl mx-auto">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-slate-900">
          Pourquoi <span className="text-orange-500">Brikouly</span> ?
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light text-center leading-relaxed">
          La solution idéale pour vos besoins en services au Maroc, alliant
          confiance, rapidité et expertise locale.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {whyBrikouly.map((w, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="group relative bg-white  cursor-default p-8 flex flex-col items-start rounded-4xl shadow-sm border border-slate-100 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 transition-shadow transition-border duration-300"
          >
            <div className="mb-6 bg-orange-50 text-orange-500 p-4 rounded-2xl group-hover:rotate-5 group-hover:bg-orange-500 group-hover:text-white  transition-all duration-300 shadow-inner">
              <w.icon size={28} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-xl xl:text-2xl text-slate-900">
                {w.title}
              </h3>
              <p className="text-gray-500 text-sm xl:text-base leading-relaxed">
                {w.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
