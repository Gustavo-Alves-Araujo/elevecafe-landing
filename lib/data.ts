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

export const products: Product[] = [
  {
    id: 1,
    name: "Cesta I",
    description: "Cesta de café da manha convencional. Com itens personalizados; consultar cardápio.",
    price: 179.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S8Eb7rgFWXal0DDAqBt5uVz47fOks4.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S8Eb7rgFWXal0DDAqBt5uVz47fOks4.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DN7wasM5OQVkDny8pjQwhLkN5jtOgr.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A73DSCR4tV0ftlt5aWWsFa1UWBTHvU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M73eknDkCrdReWAQH0mk8QwqVgbdMi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wuHbVQxhZyXn9Cahe7hCg91B6RaylW.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Jr2f46fu3T4witqnyGlbnbwvzFB5q5.png",
    ],
    category: "Café da Manhã",
    slug: "cesta-i",
    featured: true,
  },
  {
    id: 2,
    name: "Cesta II",
    description: "Cesta de café da manha convencional. Com itens personalizados; consultar cardápio.",
    price: 259.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DN7wasM5OQVkDny8pjQwhLkN5jtOgr.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S8Eb7rgFWXal0DDAqBt5uVz47fOks4.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DN7wasM5OQVkDny8pjQwhLkN5jtOgr.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A73DSCR4tV0ftlt5aWWsFa1UWBTHvU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M73eknDkCrdReWAQH0mk8QwqVgbdMi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wuHbVQxhZyXn9Cahe7hCg91B6RaylW.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Jr2f46fu3T4witqnyGlbnbwvzFB5q5.png",
    ],
    category: "Café da Manhã",
    badge: "NOVO",
    slug: "cesta-ii",
    featured: true,
  },
  {
    id: 3,
    name: "Cesta III",
    description: "Cesta de café da manha convencional. Com itens personalizados; consultar cardápio.",
    price: 299.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A73DSCR4tV0ftlt5aWWsFa1UWBTHvU.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S8Eb7rgFWXal0DDAqBt5uVz47fOks4.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DN7wasM5OQVkDny8pjQwhLkN5jtOgr.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A73DSCR4tV0ftlt5aWWsFa1UWBTHvU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M73eknDkCrdReWAQH0mk8QwqVgbdMi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wuHbVQxhZyXn9Cahe7hCg91B6RaylW.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Jr2f46fu3T4witqnyGlbnbwvzFB5q5.png",
    ],
    category: "Café da Manhã",
    slug: "cesta-iii",
    featured: true,
  },
  {
    id: 4,
    name: "Kit Lanche I",
    description: "Verificar disponibilidade",
    price: 25.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-df7AOfF0QQl4Sfhz7KMN2nTlUcyI8M.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-df7AOfF0QQl4Sfhz7KMN2nTlUcyI8M.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BUf8Ts8uteGjE0lO9EICJx9XzNA48N.png",
    ],
    category: "Kit Lanches",
    badge: "KIT LANCHE I",
    slug: "kit-lanche-i",
    featured: true,
  },
  {
    id: 5,
    name: "Kit Lanche II",
    description: "Verificar disponibilidade",
    price: 25.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IKnUjq3d1nSL3Upx2LLfc5mgEA7lQC.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IKnUjq3d1nSL3Upx2LLfc5mgEA7lQC.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uymdZfPMb6zhukW1tUDi0f5gY9YWYv.png",
    ],
    category: "Kit Lanches",
    badge: "KIT LANCHE II",
    slug: "kit-lanche-ii",
    featured: true,
  },
  {
    id: 6,
    name: "Kit Lanche III",
    description: "Verificar disponibilidade",
    price: 28.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gJdoDM0666ARwjnyGQBLrDYTrKDvBY.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gJdoDM0666ARwjnyGQBLrDYTrKDvBY.png"],
    category: "Kit Lanches",
    badge: "KIT LANCHE III",
    slug: "kit-lanche-iii",
    featured: true,
  },
  {
    id: 7,
    name: "COFFEE BREAK até 10 PESSOAS",
    description:
      "20   Mini sanduíches (consultar sabores)\n\n100 Mini assadinhos (consultar sabores)\n10   Mini doce (consultar sabores)\n01   Bolo de laranja ou chocolate\n01   Litro de suco \n02   Litros de Refrigerante\n\nCONSULTAR TAXA DE ENTREGA. (opcional)",
    price: 500.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pBVUArPeQzQDdt9XeHRb6KU3fEJaRU.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pBVUArPeQzQDdt9XeHRb6KU3fEJaRU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rRLwxji7dFtSf39A3Fg9UdYEjUj8d1.png",
    ],
    category: "Coffee Break",
    slug: "coffee-break-10-pessoas",
    featured: true,
  },
  {
    id: 8,
    name: "COFFEE BREAK até 20 PESSOAS",
    description:
      "17  Mini sanduiches presunto e queijo\n17 Mini sanduiches salame\n30 Croissant\n30 Joelhinho \n20 Empadinhas de frango\n20 Esfirras de carne\n20 Mini quichês de Alho Poró\n20 Quichês de chocolate\n30 Folh. Calabresa\n30 Folh. Presunto\n04 Litros de Refrigerantes\n02 Litros de Suco\n\nCONSULTAR TAXA DE ENTREGA. (opcional)",
    price: 650.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uhK5TrExzefs9e9FMgRwVMMbW2ZyIA.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uhK5TrExzefs9e9FMgRwVMMbW2ZyIA.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-19UtHSyL7bbxbO3EFqj3gt3jd7LKyb.png",
    ],
    category: "Coffee Break",
    badge: "POPULAR",
    slug: "coffee-break-20-pessoas",
    featured: true,
  },
  {
    id: 9,
    name: "COFFEE BREAK até 30 PESSOAS",
    description:
      "25   Mini sanduiches presunto e queijo\n25   Mini sanduiches salame\n40  Croissant\n40  Joelhinho \n40  Empadinhas de frango\n40  Esfirras de carne\n30  Mini quiches  alho poró\n30  Quiches de chocolate\n40  Folheado de Calabresa\n40  Folheado de Presunto\n06  Litros de Refrigerantes\n03  Litros de Suco\n\nCONSULTAR TAXA DE ENTREGA. (opcional)",
    price: 900.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UK3Z97qB9XzLLBaIYEksE2VbrOF3O6.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UK3Z97qB9XzLLBaIYEksE2VbrOF3O6.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIqlnfZMT4pIK2TPEmptRzi3CziNPV.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k0Ge4wD25AlonfnYAXsmCCWJW4dnGT.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eZiSWHuSMmU2hGMhkHoIj8TGDJZOdO.png",
    ],
    category: "Coffee Break",
    badge: "PREMIUM",
    slug: "coffee-break-30-pessoas",
    featured: true,
  },
  {
    id: 10,
    name: "COFFEE BREAK até 50 PESSOAS",
    description:
      "40  Mini sanduiches presunto e queijo\n40  Mini sanduiches salame\n40  Croissant\n40  Joelhinho\n40  Romeu e Julieta\n40  Empadinhas de frango\n40  Esfirras de carne\n40  Mini quiches  alho poró\n40  Quiches de chocolate\n40  Folheado de calabresa\n40  Folheado de presunto\n10  Litros de refrigerantes\n05  Litros de Suco\n\nCONSULTAR TAXA DE ENTREGA. (opcional)",
    price: 1500.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OO9treQ638PI88yWF1y7i5xi1zX1uI.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OO9treQ638PI88yWF1y7i5xi1zX1uI.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5FVN8Lwc5sBRUEHs4jiFeLyjhSJarS.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aW9RSHJZzqvtQbuUAoFKHK14wCcLoO.png",
    ],
    category: "Coffee Break",
    badge: "PREMIUM",
    slug: "coffee-break-50-pessoas",
    featured: true,
  },
]

export const categories = [
  { id: "all", name: "Todas" },
  { id: "coffee-break", name: "Coffee Break" },
  { id: "kit-lanches", name: "Kit Lanches" },
  { id: "cafe-da-manha", name: "Café da Manhã" },
]

export type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Gerente de Eventos",
    content:
      "Os kits de lanches da Eleve superaram todas as expectativas em nosso evento corporativo. A apresentação impecável e a qualidade dos alimentos impressionaram todos os participantes. Definitivamente nossa primeira escolha para futuros eventos.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Diretor Executivo",
    content:
      "Contratamos o coffee break da Eleve para nossa conferência anual e foi um sucesso absoluto. A pontualidade na entrega, a variedade de opções e o atendimento personalizado fizeram toda a diferença. Nossos convidados não paravam de elogiar.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Coordenadora de RH",
    content:
      "Os kits personalizados para nosso treinamento corporativo foram perfeitos. A Eleve entendeu exatamente nossas necessidades e entregou uma experiência gastronômica que complementou perfeitamente o evento. A qualidade e a apresentação são incomparáveis.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100",
  },
]
