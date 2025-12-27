"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { products, categories } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, Tag, Utensils, Package, Cake, ChevronRight, Sparkles } from "lucide-react"

export default function AllProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Ícones para categorias
  const categoryIcons = {
    all: <Tag className="h-5 w-5" />,
    "coffee-break": <Utensils className="h-5 w-5" />,
    "kit-lanches": <Package className="h-5 w-5" />,
    "cafe-da-manha": <Cake className="h-5 w-5" />,
  }

  // Filtrar e ordenar produtos
  useEffect(() => {
    let result = [...products]

    // Filtrar por categoria
    if (selectedCategory !== "all") {
      const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name
      result = result.filter((product) => product.category.toLowerCase() === categoryName?.toLowerCase())
    }

    // Filtrar por pesquisa
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Ordenar produtos
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory, sortOption])

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="products" className="py-24 bg-gradient-to-b from-white to-cream relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cream/50 to-transparent"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-coffee-light/10 blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-60 h-60 rounded-full bg-gold/5 blur-3xl"></div>

      <motion.div
        className="absolute top-1/3 left-10 w-16 h-16 opacity-15"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="w-full h-full text-gold" />
      </motion.div>

      <div className="container px-4 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-coffee-dark relative z-10">
              Monte seu <span className="text-gold-dark">Pedido</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gold-gradient rounded-full"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 bg-gold-light/20 rounded-full blur-xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground max-w-3xl mx-auto font-lora text-xl mt-6">
              Escolha entre nossa variedade de kits de lanches e monte um pedido personalizado para seu evento. Entre em
              contato hoje mesmo para saber como podemos atender às suas necessidades específicas.
            </p>
          </motion.div>
        </div>

        {/* Barra de pesquisa e filtros */}
        <motion.div
          className="max-w-5xl mx-auto mb-12 bg-white p-8 rounded-2xl shadow-xl border border-coffee-light/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="relative flex-grow">
              <div
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${isSearchFocused ? "text-secondary" : "text-muted-foreground"}`}
              >
                <Search className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 border-coffee-light/30 focus-visible:ring-secondary bg-white/80 h-12 rounded-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="w-48">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-12 border-coffee-light/30 focus:ring-secondary bg-white/80 rounded-lg">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Ordenar por" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destaques</SelectItem>
                    <SelectItem value="price-asc">Menor preço</SelectItem>
                    <SelectItem value="price-desc">Maior preço</SelectItem>
                    <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Categorias em formato de tabs */}
          <div className="mt-6">
            <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="w-full bg-coffee-dark/5 h-auto p-1.5 flex flex-wrap justify-center gap-1 rounded-lg">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={`
                      data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground
                      h-10 px-4 rounded-md flex items-center gap-2 transition-all
                      ${selectedCategory === category.id ? "shadow-md" : "hover:bg-coffee-dark/10"}
                    `}
                  >
                    {categoryIcons[category.id]}
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Resultados da pesquisa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${sortOption}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-16 bg-white rounded-2xl shadow-lg border border-coffee-light/10 p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold text-coffee-dark mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Não encontramos produtos que correspondam à sua pesquisa. Tente outros termos ou categorias.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 border-coffee-dark text-coffee-dark"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Limpar filtros
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 bg-coffee-dark/5 p-4 rounded-xl">
                  <p className="text-coffee-dark">
                    Mostrando <span className="font-medium text-coffee-dark">{filteredProducts.length}</span> produtos
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      {categories.find((cat) => cat.id === selectedCategory)?.name || "Todas"}
                    </Badge>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
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
                          <Link
                            href={`/product-page/${product.slug}`}
                            className="relative h-64 w-full overflow-hidden block"
                          >
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

                          {product.featured && (
                            <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-semibold px-3 py-1 shadow-md">
                              Destaque
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
                            <h3 className="text-xl font-bold mb-2 hover:text-secondary transition-colors">
                              {product.name}
                            </h3>
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
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-br from-white to-cream rounded-3xl shadow-2xl border border-gold/20 w-full max-w-4xl mx-auto overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient md:w-1 md:h-full"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-coffee-dark mb-6 text-left relative inline-block">
                  Personalize seu Evento
                  <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold-gradient rounded-full"></div>
                </h3>

                <p className="text-coffee-dark/80 font-lora text-lg md:text-xl mb-8 text-left leading-relaxed">
                  Não encontrou exatamente o que procura? Entre em contato conosco para criar um pacote personalizado
                  que atenda perfeitamente às necessidades do seu evento.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full md:w-auto">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 h-auto shadow-lg"
                    asChild
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="text-center">Solicitar Orçamento Personalizado</span>
                      <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="hidden md:block relative h-full min-h-[300px] bg-coffee-dark/5 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wqZYw8DhaHaHxtKE4qGOsX7GN5B6Zl.png"
                  alt="Mesa de evento personalizado com pães, frutas e plantas decorativas"
                  fill
                  className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-gold/90 text-coffee-dark px-4 py-2 rounded-full text-sm font-bold">
                    Soluções Exclusivas
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
