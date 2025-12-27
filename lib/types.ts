export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  images?: string[] // Array de imagens adicionais para galeria
  category: string
  badge?: string
  slug: string
  featured?: boolean
}
