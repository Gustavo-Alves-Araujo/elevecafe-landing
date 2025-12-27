"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import Logo from "@/components/logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#products", label: "Produtos" },
  { href: "#story", label: "Sobre" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "/feedback", label: "Feedback" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const scrollToTestimonials = (e) => {
    e.preventDefault()

    // Find the heading with the text "O que Dizem Nossos Clientes"
    const headings = document.querySelectorAll("h2")
    let testimonialsSection = null

    for (const heading of headings) {
      if (heading.textContent.includes("O que Dizem Nossos Clientes")) {
        // Find the parent section of this heading
        testimonialsSection = heading.closest("section")
        break
      }
    }

    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth", block: "start" })
      // Add a highlight effect to make it more noticeable
      testimonialsSection.classList.add("highlight-section")
      setTimeout(() => {
        testimonialsSection.classList.remove("highlight-section")
      }, 2000)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname.includes("/product-page")
          ? "bg-coffee-dark/95 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <Logo variant="gold" size="sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => {
                  if (link.label === "Depoimentos") {
                    scrollToTestimonials(e)
                  } else if (link.href.startsWith("#")) {
                    e.preventDefault()
                    const element = document.getElementById(link.href.substring(1))
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  } else {
                    window.location.href = link.href
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button asChild className="ml-4 bg-gold hover:bg-gold/90 text-coffee-dark font-medium">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Orçamento
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-cream hover:text-gold hover:bg-transparent"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-coffee-dark/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      closeMobileMenu()
                      if (link.label === "Depoimentos") {
                        scrollToTestimonials(e)
                      } else if (link.href.startsWith("#")) {
                        e.preventDefault()
                        const element = document.getElementById(link.href.substring(1))
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-gold bg-coffee-dark/50"
                        : "text-cream hover:text-gold hover:bg-coffee-dark/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-2 bg-gold hover:bg-gold/90 text-coffee-dark font-medium">
                  <Link href="/contact" onClick={closeMobileMenu}>
                    <Phone className="mr-2 h-4 w-4" />
                    Orçamento
                  </Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
