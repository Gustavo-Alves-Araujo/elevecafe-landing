"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scissors, Sparkles, Send } from "lucide-react"
import Logo from "@/components/logo"

export default function PromotionCoupon() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <>
      <section className="py-8 bg-gradient-to-r from-coffee-dark via-coffee-medium to-coffee-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/abstract-gold-pattern.png')] opacity-10 mix-blend-overlay"></div>

        <motion.div
          className="container px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-gold/90 to-gold-dark/90 rounded-xl p-1 shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
          >
            <div className="bg-coffee-dark rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-gold/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gold/20 rounded-full blur-xl"></div>

              <div className="absolute top-0 right-0 md:right-8 h-full flex items-center opacity-10">
                <Scissors className="w-20 h-20 text-gold" />
              </div>

              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-gold" />
                  <span className="text-gold font-bold uppercase tracking-wider text-sm">Oferta Especial</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-cream mb-2">
                  Ganhe <span className="text-gold">10% OFF</span> no seu primeiro pedido!
                </h2>
                <p className="text-cream/80 max-w-2xl">
                  Clique aqui e preencha o formulário para receber um cupom exclusivo para seu evento. Válido para novos
                  clientes em pedidos acima de R$ 500.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button className="bg-gold hover:bg-gold/90 text-coffee-dark font-bold px-6 py-6 h-auto shadow-lg">
                  RESGATAR CUPOM
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-white to-cream border-gold/20">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <Logo variant="green" size="md" />
            </div>
            <DialogTitle className="text-2xl font-bold text-coffee-dark flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              Resgate seu cupom de 10% OFF
            </DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para receber seu cupom exclusivo por WhatsApp ou e-mail.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-coffee-dark">Cupom Enviado!</h3>
              <p className="text-muted-foreground mb-6">
                Seu cupom de desconto foi enviado com sucesso. Em breve nossa equipe entrará em contato!
              </p>
              <Button
                className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium"
                onClick={() => {
                  setIsSubmitted(false)
                  setIsOpen(false)
                }}
              >
                Fechar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  required
                  className="border-coffee-light/30 focus-visible:ring-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="border-coffee-light/30 focus-visible:ring-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    required
                    className="border-coffee-light/30 focus-visible:ring-gold"
                  />
                </div>
              </div>

              <div className="pt-4 flex">
                <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-coffee-dark font-medium">
                  Enviar e Receber Cupom
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
