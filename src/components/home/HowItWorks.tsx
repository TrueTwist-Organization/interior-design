"use client"

import { motion } from "framer-motion"
import { Share2, Wand2, Box, Camera, Download, Layers } from "lucide-react"

const steps = [
  {
    step: "01",
    label: "Capture",
    title: "Spatial Mapping",
    description: "Multi-angle photo Capture of your environment.",
    icon: Camera
  },
  {
    step: "02",
    label: "Curation",
    title: "Aesthetic Intent",
    description: "Bespoke selection from our 15+ Elite style libraries.",
    icon: Layers
  },
  {
    step: "03",
    label: "Synthesis",
    title: "Neural Render",
    description: "Deep-learning 4K synthesis of your future space.",
    icon: Wand2
  },
  {
    step: "04",
    label: "Delivery",
    title: "Cinematic Export",
    description: "Uncompressed raw renders and cinematic house tours.",
    icon: Download
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-40 px-6 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-20 md:mb-32">
           <div className="lg:col-span-8 space-y-6">
              <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px] block">Process v2</span>
              <h2 className="text-5xl md:text-8xl font-light text-white font-display leading-[0.9]">The Blueprint <br /><span className="text-luxury font-bold">Of Design</span></h2>
           </div>
           <div className="lg:col-span-4 flex items-end">
              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed pb-2">
                Our protocol bridges the gap between raw spatial data and high-end architectural vision.
              </p>
           </div>
        </div>

        <div className="relative">
           {/* Vertical Line Desktop */}
           <div className="hidden lg:block absolute left-[31px] top-0 bottom-0 w-px bg-white/5" />
           
           <div className="space-y-12 md:space-y-24">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
                >
                   {/* Icon / Step Circle */}
                   <div className="lg:col-span-1 flex lg:justify-center">
                      <div className="relative w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 group-hover:bg-[#C5A059] transition-all duration-700">
                         <step.icon className="w-6 h-6 text-[#C5A059] group-hover:text-black transition-colors" />
                         <span className="absolute -top-3 -right-3 text-[10px] font-black text-white/20 uppercase tracking-widest bg-black px-2">{step.step}</span>
                      </div>
                   </div>

                   {/* Title Area */}
                   <div className="lg:col-span-4">
                      <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">{step.label}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">{step.title}</h3>
                   </div>

                   {/* Description */}
                   <div className="lg:col-span-4 text-slate-500 text-sm md:text-base font-light italic leading-relaxed">
                      {step.description}
                   </div>

                   {/* Tech Detail (Unique Element) */}
                   <div className="lg:col-span-3 hidden lg:flex justify-end order-last">
                      <div className="w-full h-px bg-white/[0.03] group-hover:bg-[#C5A059]/20 transition-all duration-1000" />
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  )
}
