"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeedbackForm from "@/components/feedback-form"

export default function FeedbackPage() {
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-coffee-dark">
      <Header />
      <div className="flex-grow pt-24">
        <FeedbackForm />
      </div>
      <Footer />
    </main>
  )
}
