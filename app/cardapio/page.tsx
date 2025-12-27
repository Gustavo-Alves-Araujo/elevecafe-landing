"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Clock, Users, UtensilsCrossed, Cookie, GlassWater, Sparkles, Send, FileText } from "lucide-react"

const salgados = [
  "Canapés de frango",
  "Canapés de cream cheese com parmesão",
  "Quiche de tomate com manjericão",
  "Quiche de queijo",
  "Barquete de salaminho com cream cheese",
  "Espetinho de legumes",
  "Kibe com geleia de pimenta",
  "Coxinha de frango com geleia de hortelã",
  "Bolinhas de queijo",
  "Mini caponata com toradinhas",
  "Queijo camembert com geleia de frutas vermelhas",
  "Dadinho de tapioca com melado de cana",
]

const doces = [
  "Mini tortinha de morango",
  "Mini palha italiana",
  "Banoffee nas tacinhas",
  "Cookies",
]

const bebidas = [
  "Drinks variados",
  "Cerveja",
  "Espumante",
]

export default function CardapioPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    data: "",
    horarioInicio: "",
    horarioFim: "",
    quantidadeParticipantes: "",
    salgados: [] as string[],
    doces: [] as string[],
    bebidas: {} as Record<string, number>,
    informacoesAdicionais: "",
  })

  const handleSalgadoChange = (salgado: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      salgados: checked
        ? [...prev.salgados, salgado]
        : prev.salgados.filter((s) => s !== salgado),
    }))
  }

  const handleDoceChange = (doce: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      doces: checked
        ? [...prev.doces, doce]
        : prev.doces.filter((d) => d !== doce),
    }))
  }

  const handleBebidaChange = (bebida: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      bebidas: checked
        ? { ...prev.bebidas, [bebida]: prev.bebidas[bebida] || 1 }
        : Object.fromEntries(
            Object.entries(prev.bebidas).filter(([key]) => key !== bebida)
          ),
    }))
  }

  const handleBebidaQuantityChange = (bebida: string, quantidade: number) => {
    setFormData((prev) => ({
      ...prev,
      bebidas: {
        ...prev.bebidas,
        [bebida]: Math.max(1, quantidade),
      },
    }))
  }

  const generatePDF = async () => {
    // Importar dinamicamente apenas no cliente
    if (typeof window === "undefined") {
      return
    }
    
    const { generateCardapioPDF } = await import("@/lib/generate-pdf")
    await generateCardapioPDF(formData)
  }

  const sendToWebhook = async () => {
    try {
      /**
       * Formato do payload enviado para o webhook:
       * 
       * POST https://app.elevecafe.com.br/api/webhook/cardapio
       * Content-Type: application/json
       * 
       * {
       *   "data": "2024-12-22",                    // Data no formato YYYY-MM-DD
       *   "horarioInicio": "17:30",                 // Horário no formato HH:MM
       *   "horarioFim": "19:00",                    // Horário no formato HH:MM
       *   "quantidadeParticipantes": "30",          // String com número de participantes
       *   "salgados": [                             // Array de strings com os salgados selecionados
       *     "Canapés de frango",
       *     "Quiche de tomate com manjericão",
       *     ...
       *   ],
       *   "doces": [                                // Array de strings com os doces selecionados
       *     "Mini tortinha de morango",
       *     "Cookies",
       *     ...
       *   ],
       *   "bebidas": {                              // Objeto com bebidas e quantidades
       *     "Cerveja": 70,                          // Nome da bebida: quantidade
       *     "Espumante": 20,
       *     "Drinks variados": 1                    // Se não especificar quantidade, será 1
       *   },
       *   "informacoesAdicionais": "Texto livre...", // String com informações adicionais (pode ser vazia)
       *   "timestamp": "2024-12-22T17:30:00.000Z"   // ISO 8601 timestamp do momento do envio
       * }
       */
      const payload = {
        data: formData.data,
        horarioInicio: formData.horarioInicio,
        horarioFim: formData.horarioFim,
        quantidadeParticipantes: formData.quantidadeParticipantes,
        salgados: formData.salgados,
        doces: formData.doces,
        bebidas: formData.bebidas,
        informacoesAdicionais: formData.informacoesAdicionais,
        timestamp: new Date().toISOString(),
      }

      // Usar a API route do Next.js para evitar problemas de CORS
      const response = await fetch("/api/webhook/cardapio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erro ao enviar para o webhook")
      }

      return true
    } catch (error) {
      console.error("Erro ao enviar para webhook:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Gerar e baixar PDF
      await generatePDF()

      // Enviar para webhook
      await sendToWebhook()

      setIsSubmitted(true)
    } catch (error) {
      console.error("Erro ao processar solicitação:", error)
      alert("Erro ao processar solicitação. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden flex-1">
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
                  Monte seu{" "}
                  <span
                    className="text-gold-dark"
                    style={{
                      background: "linear-gradient(135deg, #996515 0%, #DAA520 50%, #996515 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Cardápio
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
                Personalize seu evento escolhendo os itens do cardápio, data, horário e quantidade de participantes
              </motion.p>
            </div>

            {isSubmitted ? (
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                  <CardContent className="p-12 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-light/70 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <Send className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-coffee-dark">Cardápio Enviado!</h2>
                    <p className="text-muted-foreground mb-8 font-lora text-xl">
                      Agradecemos sua solicitação. Nossa equipe entrará em contato em breve para confirmar os detalhes
                      do seu evento.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg px-8 py-6 h-auto shadow-lg"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormData({
                            data: "",
                            horarioInicio: "",
                            horarioFim: "",
                            quantidadeParticipantes: "",
                            salgados: [],
                            doces: [],
                            bebidas: {},
                            informacoesAdicionais: "",
                          })
                        }}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Montar novo cardápio
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-cream overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                  <CardHeader className="p-8 pb-6">
                    <CardTitle className="text-3xl text-coffee-dark flex items-center gap-3">
                      <UtensilsCrossed className="h-8 w-8 text-gold" />
                      Informações do Evento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Informações básicas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="data" className="text-coffee-dark font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gold" />
                            Data do Evento
                          </Label>
                          <Input
                            id="data"
                            type="date"
                            required
                            value={formData.data}
                            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                            className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="participantes" className="text-coffee-dark font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-gold" />
                            Quantidade de Participantes
                          </Label>
                          <Input
                            id="participantes"
                            type="number"
                            min="1"
                            required
                            value={formData.quantidadeParticipantes}
                            onChange={(e) =>
                              setFormData({ ...formData, quantidadeParticipantes: e.target.value })
                            }
                            placeholder="Ex: 50"
                            className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="horarioInicio"
                            className="text-coffee-dark font-medium flex items-center gap-2"
                          >
                            <Clock className="h-4 w-4 text-gold" />
                            Horário de Início
                          </Label>
                          <Input
                            id="horarioInicio"
                            type="time"
                            required
                            value={formData.horarioInicio}
                            onChange={(e) => setFormData({ ...formData, horarioInicio: e.target.value })}
                            className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="horarioFim"
                            className="text-coffee-dark font-medium flex items-center gap-2"
                          >
                            <Clock className="h-4 w-4 text-gold" />
                            Horário de Fim
                          </Label>
                          <Input
                            id="horarioFim"
                            type="time"
                            required
                            value={formData.horarioFim}
                            onChange={(e) => setFormData({ ...formData, horarioFim: e.target.value })}
                            className="border-coffee-light/30 focus-visible:ring-gold bg-white/80 h-12 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Salgados */}
                      <div className="space-y-4 pt-6 border-t border-coffee-light/20">
                        <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-3">
                          <UtensilsCrossed className="h-6 w-6 text-gold" />
                          Salgados
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {salgados.map((salgado) => (
                            <div key={salgado} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                              <Checkbox
                                id={`salgado-${salgado}`}
                                checked={formData.salgados.includes(salgado)}
                                onCheckedChange={(checked) =>
                                  handleSalgadoChange(salgado, checked === true)
                                }
                                className="border-coffee-light data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                              />
                              <Label
                                htmlFor={`salgado-${salgado}`}
                                className="text-coffee-dark font-medium cursor-pointer flex-1"
                              >
                                {salgado}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Doces */}
                      <div className="space-y-4 pt-6 border-t border-coffee-light/20">
                        <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-3">
                          <Cookie className="h-6 w-6 text-gold" />
                          Doces
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {doces.map((doce) => (
                            <div key={doce} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                              <Checkbox
                                id={`doce-${doce}`}
                                checked={formData.doces.includes(doce)}
                                onCheckedChange={(checked) => handleDoceChange(doce, checked === true)}
                                className="border-coffee-light data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                              />
                              <Label
                                htmlFor={`doce-${doce}`}
                                className="text-coffee-dark font-medium cursor-pointer flex-1"
                              >
                                {doce}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bebidas */}
                      <div className="space-y-4 pt-6 border-t border-coffee-light/20">
                        <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-3">
                          <GlassWater className="h-6 w-6 text-gold" />
                          Bebidas
                        </h3>
                        <div className="space-y-4">
                          {bebidas.map((bebida) => (
                            <div
                              key={bebida}
                              className="flex items-center gap-4 p-4 rounded-lg hover:bg-cream/50 transition-colors border border-coffee-light/10"
                            >
                              <Checkbox
                                id={`bebida-${bebida}`}
                                checked={bebida in formData.bebidas}
                                onCheckedChange={(checked) => handleBebidaChange(bebida, checked === true)}
                                className="border-coffee-light data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                              />
                              <Label
                                htmlFor={`bebida-${bebida}`}
                                className="text-coffee-dark font-medium cursor-pointer flex-1"
                              >
                                {bebida}
                              </Label>
                              {bebida in formData.bebidas && (
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`quantidade-${bebida}`} className="text-sm text-muted-foreground">
                                    Quantidade:
                                  </Label>
                                  <Input
                                    id={`quantidade-${bebida}`}
                                    type="number"
                                    min="1"
                                    value={formData.bebidas[bebida] || 1}
                                    onChange={(e) =>
                                      handleBebidaQuantityChange(bebida, parseInt(e.target.value) || 1)
                                    }
                                    className="w-20 h-9 border-coffee-light/30 focus-visible:ring-gold bg-white/80 rounded-lg"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Informações Adicionais */}
                      <div className="space-y-4 pt-6 border-t border-coffee-light/20">
                        <h3 className="text-2xl font-bold text-coffee-dark flex items-center gap-3">
                          <FileText className="h-6 w-6 text-gold" />
                          Informações Adicionais
                        </h3>
                        <div className="space-y-2">
                          <Label htmlFor="informacoesAdicionais" className="text-coffee-dark font-medium">
                            Adicione qualquer informação adicional sobre o evento (opcional)
                          </Label>
                          <Textarea
                            id="informacoesAdicionais"
                            placeholder="Ex: Local do evento, necessidades especiais, observações..."
                            value={formData.informacoesAdicionais}
                            onChange={(e) =>
                              setFormData({ ...formData, informacoesAdicionais: e.target.value })
                            }
                            className="min-h-[120px] border-coffee-light/30 focus-visible:ring-gold bg-white/80 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Botão de envio */}
                      <div className="pt-6 border-t border-coffee-light/20">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gold hover:bg-gold/90 text-coffee-dark font-medium text-lg py-6 h-auto shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <>
                                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                                Processando...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Enviar Solicitação de Cardápio
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

