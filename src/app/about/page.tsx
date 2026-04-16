"use client"

import { Card } from "@/components/ui/Card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-20">
           <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] block">InteriorAI Studio</span>
           <h1 className="text-5xl md:text-7xl font-light tracking-tight font-display text-white">About <span className="font-bold">Us</span></h1>
           <div className="h-px w-24 bg-[#C5A059] mx-auto mt-8" />
        </div>

        <Card className="p-12 bg-[#0F0F0F] border-white/10 text-slate-400 space-y-8 font-light leading-relaxed">
           <p className="text-lg text-white">
              InteriorAI is a pioneering architectural intelligence studio dedicated to revolutionizing the way interior design is conceived and visualized.
           </p>
           <p>
              Founded by a team of elite architects and AI researchers, our platform bridges the gap between raw spatial potential and realized cinematic visualization. We provide real estate professionals, interior designers, and homeowners with mathematical precision and uncompromising aesthetic excellence.
           </p>
           <p>
              By combining state-of-the-art Generative AI with classic architectural principles, InteriorAI breathes life into empty rooms, reducing the conceptualization phase from weeks to mere seconds.
           </p>
        </Card>
      </div>
    </div>
  )
}
