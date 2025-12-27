"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// Dados das imagens da galeria
const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6cATaSvi4D0GuSVeivg7Va8uwsfYie.png",
    alt: "Tábua de frios e frutas para evento",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iNntoCq21lzOmtuZgkMm8ZqAa4XHHw.png",
    alt: "Mesa de canapés e bebidas para evento",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uZe1v3HwgPnF7bYNmT1mhA4yEjdHhO.png",
    alt: "Buffet com variedade de salgados e doces",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GcFNOrPv6P79V5L3PsBg2Vo5y9Dzhv.png",
    alt: "Cesta de presentes com guloseimas",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GKRYtkVVZAdMXD56Du4anyefkp8JPr.png",
    alt: "Mesa de sobremesas e frutas para evento",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0k0RaEa7I6AKX3Q7irJvRkYPdEGvKv.png",
    alt: "Coffee break corporativo com variedade de alimentos",
  },
]

export default function WorkGallery() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-white to-cream relative overflow-hidden"
      ref={containerRef}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cream/50 to-transparent"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-coffee-light/10 blur-3xl"></div>

      <div className="container px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-coffee-dark relative z-10">
              Nossos <span className="text-gold-dark">Trabalhos</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gold-gradient rounded-full"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 bg-gold-light/20 rounded-full blur-xl"></div>
          </motion.div>

          <motion.p
            className="text-muted-foreground max-w-3xl mx-auto font-lora text-xl mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Conheça alguns dos eventos que atendemos e como podemos transformar seu próximo evento em uma experiência
            memorável com nossos serviços premium de coffee break e alimentação.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <div className="relative h-80 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
