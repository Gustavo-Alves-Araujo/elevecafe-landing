"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import RelatedProducts from "@/components/related-products"
import { products } from "@/lib/data"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    // Scroll para o topo quando a página carrega
    window.scrollTo(0, 0)

    if (params.slug) {
      const foundProduct = products.find((p) => p.slug === params.slug)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedImage(foundProduct.image)
      } else {
        // Produto não encontrado, redirecionar para a página inicial
        router.push("/")
      }
    }
    setLoading(false)
  }, [params.slug, router])

  const handlePreviousProduct = () => {
    const currentIndex = products.findIndex((p) => p.slug === params.slug)
    if (currentIndex > 0) {
      router.push(`/product-page/${products[currentIndex - 1].slug}`)
    }
  }

  const handleNextProduct = () => {
    const currentIndex = products.findIndex((p) => p.slug === params.slug)
    if (currentIndex < products.length - 1) {
      router.push(`/product-page/${products[currentIndex + 1].slug}`)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-cream">
        <Header />
        <div className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col bg-cream">
        <Header />
        <div className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link href="/">Voltar para a página inicial</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-cream">
      <Header />
      <div className="flex-grow pt-24">
        <div className="container px-4 py-8">
          {/* Breadcrumb e navegação */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-secondary transition-colors">
                Início
              </Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousProduct}
                disabled={products.findIndex((p) => p.slug === params.slug) === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextProduct}
                disabled={products.findIndex((p) => p.slug === params.slug) === products.length - 1}
              >
                Próximo <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Conteúdo do produto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagem do produto */}
            <div>
              <div className="relative h-[400px] bg-white rounded-lg overflow-hidden border border-muted">
                <Image src={selectedImage || product.image} alt={product.name} fill className="object-contain" />
              </div>

              {/* Galeria de miniaturas */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative h-20 w-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === img ? "border-gold" : "border-transparent"}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} - imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detalhes do produto */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Botões de ação */}
              <Button
                className="w-full font-bold py-3 bg-yellow-400 hover:bg-yellow-500 text-coffee-dark"
                onClick={() =>
                  window.open(
                    `https://wa.me/5521959017485?text=Olá! Gostaria de solicitar informações sobre o produto: ${product.name}`,
                    "_blank",
                  )
                }
              >
                Solicitar Informações
              </Button>

              {/* Informações adicionais */}
              <div className="mt-8">
                <h3 className="font-bold mb-4">Informações Adicionais</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Consultar custo de entrega</li>
                  <li>Preço sugerido para coffee delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        {product && <RelatedProducts currentProductId={product.id} category={product.category} />}
      </div>
      <Footer />
    </main>
  )
}
