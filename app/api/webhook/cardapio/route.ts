import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Fazer a requisição para o webhook do servidor (sem problemas de CORS)
    const response = await fetch("https://app.elevecafe.com.br/api/webhook/cardapio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    // Retornar a resposta (mesmo que seja 204 No Content)
    if (response.status === 204 || response.ok) {
      return NextResponse.json(
        { success: true, message: "Cardápio enviado com sucesso" },
        { status: 200 }
      )
    }

    // Se houver erro, retornar o status do webhook
    return NextResponse.json(
      { success: false, message: "Erro ao enviar para o webhook" },
      { status: response.status }
    )
  } catch (error) {
    console.error("Erro na API route do webhook:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

