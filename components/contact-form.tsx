"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Send, Facebook, Instagram, MessageSquare, MapPin, Sparkles } from "lucide-react"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de envio
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-coffee-dark/10 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-coffee-light/10 blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-60 h-60 rounded-full bg-gold/5 blur-3xl"></div>

      <div className="container px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
                Entre em{" "}
                <span
                  className="text-gold-dark"
                  style={{
                    background: "linear-gradient(135deg, #996515 0%, #DAA520 50%, #996515 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Contato
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gold-gradient rounded-full"></div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 bg-gold-light/20 rounded-full blur-xl"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-lora text-xl mt-6"
            >
              Estamos à disposição para transformar seu evento em uma experiência memorável com nossos serviços premium
              de coffee break e alimentação.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-coffee-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-coffee-dark">Fale Conosco</h3>
                      <p className="text-muted-foreground">Estamos prontos para atendê-lo</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start group">
                      <div className="bg-coffee-dark/5 w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-coffee-dark/10 transition-colors duration-300 shadow-sm">
                        <Phone className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-coffee-dark mb-1">Telefone</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+5521959017485" className="hover:text-gold transition-colors">
                            (21) 95901-7485
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="bg-coffee-dark/5 w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-coffee-dark/10 transition-colors duration-300 shadow-sm">
                        <Mail className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-coffee-dark mb-1">E-mail</h3>
                        <p className="text-muted-foreground">
                          <a href="mailto:elevecafecia@gmail.com" className="hover:text-gold transition-colors">
                            elevecafecia@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="bg-coffee-dark/5 w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-coffee-dark/10 transition-colors duration-300 shadow-sm">
                        <MapPin className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-coffee-dark mb-1">Áreas de Atendimento</h3>
                        <p className="text-muted-foreground">São Paulo, Rio de Janeiro e Belo Horizonte</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="font-bold text-xl text-coffee-dark mb-6 relative inline-block">
                      Nossas Redes Sociais
                      <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gold-gradient rounded-full"></div>
                    </h3>
                    <div className="flex gap-4 mt-6">
                      <motion.a
                        href="https://www.facebook.com/elevacafe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-coffee-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-coffee-medium transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="h-5 w-5 text-gold" />
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/eleve.cafe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-coffee-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-coffee-medium transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Instagram className="h-5 w-5 text-gold" />
                      </motion.a>
                      <motion.a
                        href="https://wa.me/5521959017485"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-coffee-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-coffee-medium transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageSquare className="h-5 w-5 text-gold" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-coffee-dark/5 rounded-xl border border-coffee-dark/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="h-5 w-5 text-gold" />
                      <h3 className="font-bold text-coffee-dark">Eventos Especiais</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Oferecemos serviços personalizados para eventos corporativos e sociais. Entre em contato para
                      saber mais sobre nossas opções exclusivas e disponibilidade.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-light/70 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Send className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-coffee-dark">Mensagem Enviada!</h2>
                      <p className="text-muted-foreground mb-8 font-lora text-xl">
                        Agradecemos seu contato. Nossa equipe retornará em breve para atender sua solicitação com
                        excelência.
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg px-8 py-6 h-auto shadow-lg"
                          onClick={() => setIsSubmitted(false)}
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          Enviar nova mensagem
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-coffee-dark w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                          <Mail className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-coffee-dark">Envie uma Mensagem</h3>
                          <p className="text-muted-foreground">Preencha o formulário abaixo para entrar em contato</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-coffee-dark font-medium">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              placeholder="Seu nome"
                              required
                              className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-coffee-dark font-medium">
                              E-mail
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Seu e-mail"
                              required
                              className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-coffee-dark font-medium">
                              Telefone
                            </Label>
                            <Input
                              id="phone"
                              placeholder="Seu telefone"
                              className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-coffee-dark font-medium">
                              Empresa
                            </Label>
                            <Input
                              id="company"
                              placeholder="Nome da empresa"
                              className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-coffee-dark font-medium">
                            Assunto
                          </Label>
                          <Input
                            id="subject"
                            placeholder="Assunto da mensagem"
                            required
                            className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-coffee-dark font-medium">
                            Mensagem
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Digite sua mensagem..."
                            className="min-h-[150px] border-coffee-light/30 focus-visible:ring-gold bg-white/80 rounded-lg"
                            required
                          />
                        </div>

                        <div className="pt-4">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              type="submit"
                              className="w-full bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg py-6 h-auto shadow-lg"
                            >
                              <Sparkles className="mr-2 h-5 w-5" />
                              Enviar Mensagem
                            </Button>
                          </motion.div>
                        </div>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
