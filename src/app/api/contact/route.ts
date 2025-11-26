import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Contacto Web <onboarding@resend.dev>', // Cambia esto cuando tengas dominio verificado
      to: ['miguel.gargurevich@gmail.com'], // Email donde recibirás los mensajes
      replyTo: email,
      subject: `🏗️ Nuevo contacto: ${name} - ${service || 'Consulta general'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056A6 0%, #003d75 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">
              📬 Nuevo Mensaje de Contacto
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">
              SOLUCIONES INTEGRALES JS S.A.C.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e9ecef;">
            <h2 style="color: #0056A6; margin-top: 0; font-size: 18px; border-bottom: 2px solid #FFC300; padding-bottom: 10px;">
              Información del Contacto
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold; width: 140px;">👤 Nombre:</td>
                <td style="padding: 10px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">📧 Email:</td>
                <td style="padding: 10px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #0056A6;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">📱 Teléfono:</td>
                <td style="padding: 10px 0; color: #333;">
                  <a href="tel:${phone}" style="color: #0056A6;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">🏢 Empresa:</td>
                <td style="padding: 10px 0; color: #333;">${company}</td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">🔧 Servicio:</td>
                <td style="padding: 10px 0; color: #333;">
                  <span style="background: #FFC300; color: #333; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                    ${service}
                  </span>
                </td>
              </tr>
              ` : ''}
            </table>
            
            <h2 style="color: #0056A6; margin-top: 30px; font-size: 18px; border-bottom: 2px solid #FFC300; padding-bottom: 10px;">
              💬 Mensaje
            </h2>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0056A6; margin-top: 15px;">
              <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #0F1115; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              Este mensaje fue enviado desde el formulario de contacto de la web
            </p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 11px;">
              © ${new Date().getFullYear()} SOLUCIONES INTEGRALES JS S.A.C.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error de Resend:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente', id: data?.id },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
