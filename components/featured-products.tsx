"use client"
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, TrendingUp, ChevronRight } from "lucide-react"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

const featuredProducts = [
  products.find((product) => product.id === 10), // COFFEE BREAK até 50 PESSOAS
  products.find((product) => product.id === 6), // Kit Lanche III
  products.find((product) => product.id === 2), // Cesta II
  products.find((product) => product.id === 9), // COFFEE BREAK até 30 PESSOAS
].filter(Boolean) as Product[]

export default function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

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
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section id="featured" className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-coffee-dark/10 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
      <div className="absolute top-40 left-10 w-40 h-40 rounded-full bg-coffee-light/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl"></div>

      <div className="container px-4 relative z-10">
        <motion.div ref={ref} style={{ opacity, scale }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-coffee-dark relative z-10">
              OS MAIS <span className="text-gold-dark">PEDIDOS</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gold-gradient rounded-full"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 bg-gold-light/20 rounded-full blur-xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground max-wxl mx-auto font-lora text-xl mt-6">
              Conheça os kits mais solicitados para eventos corporativos e sociais, selecionados com cuidado para
              proporcionar uma experiência única aos seus convidados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-4 mt-8 flex-wrap"
          >
            <div className="flex items-center gap-2 bg-coffee-dark/5 px-4 py-2 rounded-full shadow-sm border border-coffee-dark/10">
              <Star className="h-5 w-5 text-gold" />
              <span className="text-coffee-dark font-medium">Mais vendidos</span>
            </div>
            <div className="flex items-center gap-2 bg-coffee-dark/5 px-4 py-2 rounded-full shadow-sm border border-coffee-dark/10">
              <Award className="h-5 w-5 text-gold" />
              <span className="text-coffee-dark font-medium">Qualidade premium</span>
            </div>
            <div className="flex items-center gap-2 bg-coffee-dark/5 px-4 py-2 rounded-full shadow-sm border border-coffee-dark/10">
              <TrendingUp className="h-5 w-5 text-gold" />
              <span className="text-coffee-dark font-medium">Tendências do momento</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="h-full"
            >
              <Card className="product-card overflow-hidden border-none bg-white shadow-lg h-full flex flex-col group rounded-xl">
                <div className="relative">
                  <Link href={`/product-page/${product.slug}`} className="relative h-72 w-full overflow-hidden block">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </Link>

                  {product.badge && (
                    <Badge className="absolute top-4 right-4 bg-gold text-coffee-dark font-semibold px-3 py-1 shadow-md">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="pt-8 flex-grow">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="text-xs bg-coffee-dark/5 text-coffee-dark border-none">
                      {product.category}
                    </Badge>
                  </div>

                  <Link href={`/product-page/${product.slug}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-secondary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                </CardContent>

                <CardFooter className="flex flex-col items-center justify-center pt-0 pb-4 gap-3">
                  <div className="flex flex-col w-full max-w-[200px] gap-2">
                    <Link href={`/product-page/${product.slug}`} className="w-full">
                      <Button className="font-medium shadow-md w-full bg-gold hover:bg-gold/90 text-coffee-dark">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button
                      className="font-medium shadow-md w-full bg-yellow-400 hover:bg-yellow-500 text-coffee-dark"
                      onClick={(e) => {
                        e.preventDefault()
                        window.open(
                          `https://wa.me/5521959017485?text=Olá! Gostaria de comprar o produto: ${product.name}`,
                          "_blank",
                        )
                      }}
                    >
                      Comprar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl border border-gold/10 w-full max-w-4xl mx-auto overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>

              <h3 className="text-2xl md:text-3xl font-bold text-coffee-dark mb-6 relative inline-block">
                Descubra Nossos Produtos Premium
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gold-gradient rounded-full"></div>
              </h3>

              <p className="text-coffee-dark/80 font-lora text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Nossos kits mais pedidos são cuidadosamente preparados para garantir a melhor experiência em seus
                eventos. Cada item é selecionado com ingredientes premium e atenção aos detalhes para impressionar seus
                convidados.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg px-8 py-6 h-auto shadow-lg"
                  asChild
                >
                  <a href="#products">
                    Ver Todos os Produtos
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
