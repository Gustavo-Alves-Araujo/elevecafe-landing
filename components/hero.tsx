"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Logo from "@/components/logo"

const carouselImages = ["/images/coffee-beans.png", "/images/breakfast.png", "/images/croissants.png"]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef(null)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  useEffect(() => {
    setIsVisible(true)

    // Configurar o carrossel automático
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000) // Muda a imagem a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured")
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Variantes para animações
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  const floatingArrow = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-coffee-dark"
      ref={containerRef}
    >
      {/* Carrossel de imagens com Image component */}
      <div className="absolute inset-0 w-full h-full">
        {carouselImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === index ? 0.5 : 0, // Increased opacity from 0.3 to 0.5 for more transparency
              y,
              scale,
            }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Evento imagem ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        ))}
        {/* Solid overlay to ensure brand colors are prominent - reduced opacity */}
        <div className="absolute inset-0 bg-coffee-dark opacity-60"></div> {/* Changed from opacity-80 to opacity-60 */}
      </div>

      <motion.div className="container relative z-20 px-4" style={{ opacity }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo animation */}
          <motion.div className="mb-8" initial="hidden" animate="visible" variants={logoVariants}>
            <Logo variant="gold" size="lg" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 -mt-8"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <span className="text-cream">Eleve seu </span>
            <span
              className="relative"
              style={{
                background: "linear-gradient(135deg, #d2b478 0%, #e5d4a8 50%, #d2b478 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Evento
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gold-gradient rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-cream/90 mb-8 max-w-3xl mx-auto font-lora leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            Kits de lanches e coffee breaks premium para eventos corporativos e sociais. Soluções personalizadas em São
            Paulo, Rio de Janeiro e Belo Horizonte.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <motion.div whileHover="hover" variants={buttonVariants}>
              <Button
                className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium px-6 py-6 rounded-full shadow-lg shadow-gold/20 h-auto"
                onClick={scrollToFeatured}
              >
                Mais Pedidos
              </Button>
            </motion.div>
            <motion.div whileHover="hover" variants={buttonVariants}>
              <Button
                variant="outline"
                className="border-gold border-2 text-gold bg-coffee-dark/40 backdrop-blur-sm hover:bg-gold hover:text-coffee-dark hover:border-gold hover:font-semibold px-6 py-6 rounded-full shadow-lg h-auto"
                onClick={scrollToProducts}
              >
                Monte seu Pedido
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 opacity-20 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-32 h-32 border-2 border-gold rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-20 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-48 h-48 border-2 border-gold rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 z-20 flex justify-center"
        initial="initial"
        animate="animate"
        variants={floatingArrow}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-gold hover:text-cream hover:bg-transparent"
          onClick={scrollToFeatured}
        >
          <ChevronDown className="h-10 w-10" />
          <span className="sr-only">Rolar para baixo</span>
        </Button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coffee-dark to-transparent z-10" />
    </section>
  )
}
