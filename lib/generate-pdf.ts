// Utilitário para geração de PDF - apenas cliente
export interface CardapioFormData {
  data: string
  horarioInicio: string
  horarioFim: string
  quantidadeParticipantes: string
  salgados: string[]
  doces: string[]
  bebidas: Record<string, number>
  informacoesAdicionais: string
}

const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}/${month}`
}

const formatTime = (timeString: string) => {
  if (!timeString) return ""
  const [hours, minutes] = timeString.split(":")
  return `${hours}:${minutes}`
}

export const generateCardapioPDF = async (formData: CardapioFormData) => {
  // Verificar se estamos no cliente
  if (typeof window === "undefined") {
    throw new Error("generateCardapioPDF só pode ser executado no cliente")
  }

  // Importar jsPDF dinamicamente
  const jsPDFModule = await import("jspdf")
  const jsPDF = jsPDFModule.default

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - margin * 2

  // Cores da empresa
  const darkGreen = [13, 51, 44] // #0d332c
  const gold = [210, 180, 120] // #d2b478
  const white = [255, 255, 255]

  // Fundo verde escuro
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.rect(0, 0, pageWidth, pageHeight, "F")

  // Logo (canto superior esquerdo) - adicionar apenas uma vez
  let logoAdded = false
  try {
    const logoResponse = await fetch("/images/logo-gold.png")
    if (logoResponse.ok && !logoAdded) {
      const logoBlob = await logoResponse.blob()
      const logoUrl = URL.createObjectURL(logoBlob)
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = logoUrl

      await new Promise<void>((resolve) => {
        let resolved = false
        const timeout = setTimeout(() => {
          if (!resolved) {
            resolved = true
            URL.revokeObjectURL(logoUrl)
            resolve()
          }
        }, 2000)

        img.onload = () => {
          if (!resolved && !logoAdded) {
            clearTimeout(timeout)
            resolved = true
            try {
              const logoWidth = 40
              const logoHeight = (img.height / img.width) * logoWidth
              doc.addImage(img, "PNG", margin, margin, logoWidth, logoHeight)
              logoAdded = true
              URL.revokeObjectURL(logoUrl)
              resolve()
            } catch (err) {
              URL.revokeObjectURL(logoUrl)
              resolve()
            }
          }
        }
        img.onerror = () => {
          if (!resolved) {
            clearTimeout(timeout)
            resolved = true
            URL.revokeObjectURL(logoUrl)
            resolve()
          }
        }
      })
    }
  } catch (error) {
    // Se não conseguir carregar a logo, apenas continua sem ela
    console.error("Erro ao carregar logo:", error)
  }

  // Informações do evento (canto superior direito)
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  const eventInfoY = margin + 5
  const eventInfoX = pageWidth - margin - 5
  doc.text(`Data: ${formatDate(formData.data)}`, eventInfoX, eventInfoY, { align: "right" })
  doc.text(
    `Horário: ${formatTime(formData.horarioInicio)} às ${formatTime(formData.horarioFim)}`,
    eventInfoX,
    eventInfoY + 6,
    { align: "right" }
  )
  doc.text(`${formData.quantidadeParticipantes} participantes`, eventInfoX, eventInfoY + 12, { align: "right" })

  // Título COQUETEL
  const titleY = margin + 35
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.setDrawColor(gold[0], gold[1], gold[2])
  doc.setLineWidth(1)
  const titleWidth = 60
  const titleHeight = 15
  const titleX = (pageWidth - titleWidth) / 2
  // Retângulo preenchido com borda
  doc.rect(titleX, titleY, titleWidth, titleHeight, "FD")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("COQUETEL", pageWidth / 2, titleY + titleHeight / 2 + 3, { align: "center" })

  // Linha vertical dourada
  const lineX = pageWidth / 2
  const lineStartY = titleY + titleHeight + 5
  const lineEndY = pageHeight - margin - 30
  doc.setDrawColor(gold[0], gold[1], gold[2])
  doc.setLineWidth(1)
  doc.line(lineX, lineStartY, lineX, lineEndY)

  // Ícone de café na linha (simulado com círculo)
  const coffeeIconY = lineStartY + (lineEndY - lineStartY) / 2
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.circle(lineX, coffeeIconY, 3, "F")

  // Coluna esquerda - Salgados
  const leftColumnX = margin
  const leftColumnWidth = (pageWidth - margin * 2) / 2 - 5
  let currentY = titleY + titleHeight + 15

  // Título Salgados
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.rect(leftColumnX, currentY, leftColumnWidth, 8, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Salgados:", leftColumnX + 3, currentY + 5.5)

  currentY += 12
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  formData.salgados.forEach((salgado) => {
    if (currentY > pageHeight - margin - 20) {
      doc.addPage()
      doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      currentY = margin + 10
    }
    doc.text(`• ${salgado}`, leftColumnX + 2, currentY)
    currentY += 5
  })

  // Coluna direita - Doces e Bebidas
  const rightColumnX = pageWidth / 2 + 5
  const rightColumnWidth = (pageWidth - margin * 2) / 2 - 5
  currentY = titleY + titleHeight + 15

  // Título Doces
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.rect(rightColumnX, currentY, rightColumnWidth, 8, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Doces:", rightColumnX + 3, currentY + 5.5)

  currentY += 12
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  formData.doces.forEach((doce) => {
    if (currentY > pageHeight - margin - 40) {
      doc.addPage()
      doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      currentY = margin + 10
    }
    doc.text(`• ${doce}`, rightColumnX + 2, currentY)
    currentY += 5
  })

  // Título Bebidas
  currentY += 5
  if (currentY > pageHeight - margin - 40) {
    doc.addPage()
    doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
    doc.rect(0, 0, pageWidth, pageHeight, "F")
    currentY = margin + 10
  }
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.rect(rightColumnX, currentY, rightColumnWidth, 8, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Bebidas:", rightColumnX + 3, currentY + 5.5)

  currentY += 12
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  Object.entries(formData.bebidas).forEach(([bebida, quantidade]) => {
    if (currentY > pageHeight - margin - 20) {
      doc.addPage()
      doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      currentY = margin + 10
    }
    let texto = `• ${bebida}`
    if (bebida === "Cerveja") {
      texto = `• ${quantidade} unidades de cerveja Heineken`
    } else if (bebida === "Espumante") {
      texto = `• ${quantidade} garrafas de espumante`
    } else {
      texto = `• ${bebida}`
    }
    doc.text(texto, rightColumnX + 2, currentY)
    currentY += 5
  })

  // Calcular o maior Y usado (entre coluna esquerda e direita)
  // Calcular altura da coluna esquerda (salgados)
  const leftColumnStartY = titleY + titleHeight + 15
  const leftColumnTitleHeight = 8 + 12 // Título + espaço
  const leftColumnItemsHeight = formData.salgados.length * 5
  const leftColumnY = leftColumnStartY + leftColumnTitleHeight + leftColumnItemsHeight
  
  // Calcular altura da coluna direita (doces + bebidas)
  const rightColumnStartY = titleY + titleHeight + 15
  const rightColumnTitleHeight = 8 + 12 // Título doces + espaço
  const rightColumnDocesHeight = formData.doces.length * 5
  const rightColumnBebidasTitleHeight = 8 + 12 // Título bebidas + espaço
  const rightColumnBebidasHeight = Object.keys(formData.bebidas).length * 5
  const rightColumnY = rightColumnStartY + rightColumnTitleHeight + rightColumnDocesHeight + 5 + rightColumnBebidasTitleHeight + rightColumnBebidasHeight
  
  // Usar o maior Y entre as duas colunas
  const maxContentY = Math.max(leftColumnY, rightColumnY)
  
  // Calcular espaço disponível para informações adicionais na primeira página
  const spaceForFooter = 25 // Espaço necessário para o rodapé
  const availableSpace = pageHeight - maxContentY - spaceForFooter
  const hasAdditionalInfo = formData.informacoesAdicionais.trim()
  
  // Tentar adicionar informações adicionais na primeira página se couber
  if (hasAdditionalInfo) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const lines = doc.splitTextToSize(formData.informacoesAdicionais, contentWidth - 6)
    const textHeight = lines.length * 5 + 20 // Altura do texto + título + margem
    
    // Posição inicial para informações adicionais
    const startY = maxContentY + 10
    
    if (textHeight <= availableSpace && startY < pageHeight - spaceForFooter - textHeight) {
      // Cabe na primeira página - adicionar abaixo do conteúdo
      doc.setFillColor(gold[0], gold[1], gold[2])
      doc.rect(margin, startY, contentWidth, 8, "F")
      doc.setTextColor(white[0], white[1], white[2])
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Informações Adicionais:", margin + 3, startY + 5.5)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(lines, margin + 3, startY + 12)
    } else {
      // Não cabe, criar nova página
      doc.addPage()
      doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      doc.setFillColor(gold[0], gold[1], gold[2])
      doc.rect(margin, margin, contentWidth, 8, "F")
      doc.setTextColor(white[0], white[1], white[2])
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Informações Adicionais:", margin + 3, margin + 5.5)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(lines, margin + 3, margin + 15)
    }
  }

  // Rodapé
  const footerY = pageHeight - margin - 10
  doc.setFillColor(gold[0], gold[1], gold[2])
  doc.circle(margin + 5, footerY, 2, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.text("www.elevecafe.com.br", pageWidth / 2, footerY, { align: "center" })
  doc.text("WhatsApp: (21) 96591-3009", pageWidth / 2, footerY + 5, { align: "center" })
  doc.text("Instagram: @eleve.cafe", pageWidth / 2, footerY + 10, { align: "center" })

  // Salvar PDF
  const fileName = `cardapio-${formData.data || "evento"}.pdf`
  doc.save(fileName)
}

