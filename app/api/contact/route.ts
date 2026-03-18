import { NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, phone, company, subject, message } = await request.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "contato@elevecafe.com.br",
    to: "elevecafecia@gmail.com",
    subject: `[Contato] ${subject}`,
    html: `
      <h2>Nova mensagem de contato — Eleve Café</h2>
      <table cellpadding="6" cellspacing="0">
        <tr><td><strong>Nome:</strong></td><td>${name}</td></tr>
        <tr><td><strong>E-mail:</strong></td><td>${email}</td></tr>
        ${phone ? `<tr><td><strong>Telefone:</strong></td><td>${phone}</td></tr>` : ""}
        ${company ? `<tr><td><strong>Empresa:</strong></td><td>${company}</td></tr>` : ""}
        <tr><td><strong>Assunto:</strong></td><td>${subject}</td></tr>
      </table>
      <hr />
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
