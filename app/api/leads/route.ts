import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function getSupabase() {
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, telefono, marca, servicio, fuente } = body

    const supabase = getSupabase()
    if (!supabase) {
      console.warn('Supabase not configured — lead not saved')
      return NextResponse.json({ success: true, id: null })
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert({
        nombre,
        email: email || null,
        telefono: telefono || null,
        marca,
        servicio: servicio || 'diagnostico_ia',
        fuente: fuente || 'hero',
        status: 'nuevo',
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Discord notification (non-blocking)
    if (DISCORD_WEBHOOK) {
      const emoji = servicio === 'blindaje' ? '🛡️' : servicio === 'diagnostico' ? '🔍' : servicio === 'declaracion' ? '📋' : '🤖'
      const servicioLabels: Record<string, string> = {
        blindaje: 'Blindaje Federal ($5,800)',
        diagnostico: 'Diagnóstico de Viabilidad ($800)',
        declaracion: 'Declaración de Uso ($1,999)',
        diagnostico_ia: 'Diagnóstico IA (Lead)',
      }
      const servicioLabel = servicioLabels[servicio || 'diagnostico_ia'] || servicio

      fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: `${emoji} Nuevo Lead — BrandVault`,
            color: 0xD4AF37,
            fields: [
              { name: 'Nombre', value: nombre || 'No proporcionado', inline: true },
              { name: 'Marca', value: marca || 'No proporcionado', inline: true },
              { name: 'Servicio', value: servicioLabel, inline: true },
              { name: 'Email', value: email || '—', inline: true },
              { name: 'Teléfono', value: telefono || '—', inline: true },
              { name: 'Fuente', value: fuente || 'hero', inline: true },
            ],
            timestamp: new Date().toISOString(),
          }]
        }),
      }).catch(console.error)
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 })
  }
}
