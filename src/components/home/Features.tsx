"use client"

import { motion } from "framer-motion"
import { Sparkles, Camera, Box, Layout, Wand2, Shield, Hexagon } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "Neural Synergy",
    desc: "Architectural-grade neural processing engine for unparalleled spatial synthesis.",
    tag: "01"
  },
  {
    icon: Camera,
    title: "RAW Synthesis",
    desc: "Uncompressed 8K level renders that capture physical light physics with high fidelity.",
    tag: "02"
  },
  {
    icon: Box,
    title: "Geospatial Logic",
    desc: "Advanced structural boundary detection ensuring designs respect physical architecture.",
    tag: "03"
  },
  {
    icon: Shield,
    title: "Elite Privacy",
    desc: "End-to-end encrypted storage for high-value architectural project data and renders.",
    tag: "04"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-40 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A059] opacity-[0.02] blur-[200px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-end mb-20 md:mb-32">
           <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                 <Hexagon className="w-8 h-8 md:w-12 md:h-12 text-[#C5A059] animate-pulse" />
                 <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">Capabilities Unit</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-light text-white leading-tight">Elite Spatial <br /><span className="text-luxury font-bold">Foundation</span></h2>
           </div>
           <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-md lg:border-l lg:border-white/10 lg:pl-10">
              We transcend traditional image generation. Our core engine operates at the intersection of mathematical precision and high-art aesthetic excellence.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 shadow-2xl overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#050505] p-10 md:p-16 group transition-all duration-1000 hover:bg-[#0A0A0A] relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-10 text-[60px] md:text-[80px] font-bold text-white/[0.02] select-none group-hover:text-[#C5A059]/[0.05] transition-colors">{f.tag}</div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center text-[#C5A059] mb-10 group-hover:bg-[#C5A059] group-hover:text-black transition-all duration-700 rounded-2xl">
                <f.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <h3 className="text-[12px] md:text-[14px] uppercase font-black tracking-[0.4em] text-white mb-6 group-hover:text-[#C5A059] transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed italic max-w-xs">{f.desc}</p>
              
              <div className="absolute bottom-10 left-10 md:left-16 w-0 group-hover:w-12 h-px bg-[#C5A059] transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
