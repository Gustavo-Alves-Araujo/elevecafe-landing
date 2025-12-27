"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Star, Sparkles, CheckCircle2 } from "lucide-react"

export default function FeedbackForm() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
                Sua{" "}
                <span
                  className="text-gold-dark"
                  style={{
                    background: "linear-gradient(135deg, #996515 0%, #DAA520 50%, #996515 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Opinião
                </span>{" "}
                é Valiosa
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
              Compartilhe sua experiência com nossos produtos e serviços para eventos e ajude-nos a elevar ainda mais a
              qualidade de nossos serviços.
            </motion.p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/10 blur-3xl"></div>
                <CardContent className="pt-16 pb-16 text-center px-8 md:px-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-gold to-gold-light/70 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold mb-4 text-coffee-dark"
                  >
                    Agradecemos seu Feedback!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground mb-8 font-lora text-xl"
                  >
                    Sua opinião é muito importante para continuarmos elevando a qualidade de nossos serviços e produtos.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                  >
                    <Button
                      className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg px-8 py-6 h-auto shadow-lg"
                      onClick={() => setIsSubmitted(false)}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Enviar outro feedback
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                <CardHeader className="bg-coffee-dark text-white rounded-t-lg p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-gold/20 w-12 h-12 rounded-full flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <CardTitle className="text-gold-light text-2xl">Formulário de Feedback</CardTitle>
                      <CardDescription className="text-cream/80">
                        Conte-nos sobre sua experiência na Eleve Café
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="p-6 bg-coffee-dark/5 rounded-xl space-y-4">
                      <Label className="text-coffee-dark font-medium text-lg">Qual produto você escolheu?</Label>
                      <RadioGroup defaultValue="coffee-break" className="space-y-3">
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="coffee-break" id="coffee-break" className="text-gold" />
                          <Label htmlFor="coffee-break" className="font-medium cursor-pointer">
                            COFFEE BREAK
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="kit-lanches" id="kit-lanches" className="text-gold" />
                          <Label htmlFor="kit-lanches" className="font-medium cursor-pointer">
                            KIT LANCHES
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="cesta-cafe" id="cesta-cafe" className="text-gold" />
                          <Label htmlFor="cesta-cafe" className="font-medium cursor-pointer">
                            CESTA DE CAFÉ DA MANHÃ
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="p-6 bg-coffee-dark/5 rounded-xl space-y-4">
                      <Label className="text-coffee-dark font-medium text-lg">Como você avalia nossos serviços?</Label>
                      <RadioGroup defaultValue="excelente" className="space-y-3">
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="excelente" id="excelente" className="text-gold" />
                          <Label htmlFor="excelente" className="font-medium cursor-pointer">
                            Excelente
                          </Label>
                          <div className="ml-auto flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="bom" id="bom" className="text-gold" />
                          <Label htmlFor="bom" className="font-medium cursor-pointer">
                            Bom
                          </Label>
                          <div className="ml-auto flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                            ))}
                            <Star className="h-5 w-5 text-muted" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg border border-coffee-light/10 hover:border-gold/30 transition-colors">
                          <RadioGroupItem value="regular" id="regular" className="text-gold" />
                          <Label htmlFor="regular" className="font-medium cursor-pointer">
                            Regular
                          </Label>
                          <div className="ml-auto flex">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                            ))}
                            {[...Array(2)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-muted" />
                            ))}
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-coffee-dark font-medium">
                        Comentários adicionais
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Compartilhe sua experiência ou sugestões..."
                        className="min-h-[120px] border-coffee-light/30 focus-visible:ring-gold bg-white/80 rounded-lg"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg py-6 h-auto shadow-lg"
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Enviar Feedback
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
