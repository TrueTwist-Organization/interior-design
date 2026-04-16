"use client"

import { Card } from "@/components/ui/Card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-20">
           <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] block">InteriorAI Studio</span>
           <h1 className="text-5xl md:text-7xl font-light tracking-tight font-display text-white">Privacy <span className="font-bold">Policy</span></h1>
           <div className="h-px w-24 bg-[#C5A059] mx-auto mt-8" />
        </div>

        <Card className="p-12 bg-[#0F0F0F] border-white/10 text-slate-400 space-y-8 font-light leading-relaxed">
           <section className="space-y-4">
              <h2 className="text-xl text-white font-bold">1. Data Collection</h2>
              <p>We collect information you provide directly to us, such as when you create an account, upload photos of your spaces, or communicate with us. This includes your name, email address, and image data.</p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl text-white font-bold">2. How We Use Your Data</h2>
              <p>The images you upload are processed by our AI algorithms to generate design concepts. We do not sell your personal data to third parties. We use your data to provide, maintain, and improve our services.</p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl text-white font-bold">3. Security</h2>
              <p>We implement industry-standard security measures to protect your personal information and uploaded images from unauthorized access or disclosure.</p>
           </section>
        </Card>
      </div>
    </div>
  )
}
