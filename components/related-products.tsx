"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { products } from "@/lib/data"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Filtrar produtos da mesma categoria, excluindo o produto atual
  const relatedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4) // Limitar a 4 produtos relacionados

  if (relatedProducts.length === 0) return null

  return (
    <section className="py-12 bg-cream" ref={ref}>
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="product-card overflow-hidden border-none bg-white shadow-md h-full flex flex-col group">
                <Link href={`/product-page/${product.slug}`} className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <CardContent className="pt-4 flex-grow">
                  <Link href={`/product-page/${product.slug}`}>
                    <h3 className="text-lg font-bold mb-1 hover:text-secondary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <Link href={`/product-page/${product.slug}`} className="w-full">
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300"
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
