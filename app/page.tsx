"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import PromotionCoupon from "@/components/promotion-coupon"
import FeaturedProducts from "@/components/featured-products"
import AllProducts from "@/components/all-products"
import OurStory from "@/components/our-story"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import LuxuryFeatures from "@/components/luxury-features"
import WorkGallery from "@/components/work-gallery"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  // Verificar se precisamos rolar para uma seção específica após o carregamento da página
  useEffect(() => {
    const shouldScrollToProducts = sessionStorage.getItem("scrollToProducts")
    const scrollToSection = sessionStorage.getItem("scrollToSection")

    if (shouldScrollToProducts === "true") {
      // Limpar o flag do sessionStorage
      sessionStorage.removeItem("scrollToProducts")

      // Pequeno atraso para garantir que a página esteja totalmente carregada
      setTimeout(() => {
        const productsSection = document.getElementById("products")
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 500)
    } else if (scrollToSection) {
      // Limpar o flag do sessionStorage
      sessionStorage.removeItem("scrollToSection")

      // Pequeno atraso para garantir que a página esteja totalmente carregada
      setTimeout(() => {
        const targetSection = document.getElementById(scrollToSection)
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 500)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <PromotionCoupon />
      <FeaturedProducts />
      <LuxuryFeatures />
      <AllProducts />
      <WorkGallery />
      <OurStory />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
