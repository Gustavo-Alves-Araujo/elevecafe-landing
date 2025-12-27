"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-coffee-dark">
      <Header />
      <div className="flex-grow pt-24">
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}
