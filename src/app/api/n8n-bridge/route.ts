import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl || webhookUrl.includes("your-n8n")) {
       // Mock response for demo if not configured
       return NextResponse.json({ 
         success: true, 
         message: "n8n Bridge Triggered (Mock)",
         tracking_id: "N8N_TRK_" + Math.random().toString(36).substring(7)
       })
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "interior-ai-app",
        timestamp: new Date().toISOString(),
        design_data: data
      })
    })

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error: any) {
    console.error("n8n Bridge Error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
