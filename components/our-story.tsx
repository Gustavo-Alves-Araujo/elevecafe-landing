"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Star, Clock } from "lucide-react"
import Link from "next/link"

export default function OurStory() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="story"
      className="py-20 bg-gradient-to-b from-coffee-dark to-coffee-medium text-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-gold/10 blur-3xl"></div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 relative z-10">
                Nossa <span className="gold-text">História</span>
              </h2>
              <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 bg-gold-light/20 rounded-full blur-xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-cream/90 mb-6 font-lora text-xl leading-relaxed">
                Desde nossa fundação em 2018, nos tornamos especialistas em alimentação para eventos. Focados em um
                atendimento incomparável, temos o compromisso de fornecer kits de lanches e coffee breaks de qualidade
                para que seus eventos sejam memoráveis.
              </p>
              <p className="text-cream/90 mb-8 font-lora text-xl leading-relaxed">
                Nossa missão é elevar cada evento através de alimentos preparados com dedicação e conhecimento,
                proporcionando uma experiência única para você e seus convidados em São Paulo, Rio de Janeiro e Belo
                Horizonte.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Users className="h-5 w-5 text-gold" />
                <span className="text-cream font-medium">+500 eventos atendidos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Star className="h-5 w-5 text-gold" />
                <span className="text-cream font-medium">4.9/5 avaliação média</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Clock className="h-5 w-5 text-gold" />
                <span className="text-cream font-medium">5 anos de experiência</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg px-8 py-6 h-auto shadow-xl shadow-gold/20"
                asChild
              >
                <Link href="/contact">
                  Entre em contato
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cnLM5JBK0vAVFzgQ19ypnbTJvWoZCB.png"
                alt="Eleve Café - Recomendado em Restaurant Guru 2022"
                width={400}
                height={500}
                className="object-contain bg-white w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-bold text-xl">Reconhecimento</h3>
                  <p className="text-sm">Recomendado em Restaurant Guru 2022</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
