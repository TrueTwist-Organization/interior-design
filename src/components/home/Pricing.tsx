"use client"

import { motion } from "framer-motion"
import { Check, Info, ArrowUpRight, Diamond, Zap, Crown } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Base Studio",
    price: "0",
    desc: "Entry-level architectural synthesis for solo visionaries.",
    icon: Zap,
    features: ["5 4K Designs / Month", "Standard GPU Priority", "Community Showcase", "Essential Styles Only"],
    button: "Initiate Access",
    popular: false
  },
  {
    name: "Elite Atelier",
    price: "49",
    desc: "Infinite spatial curation for professional designers.",
    icon: Diamond,
    features: ["Unlimited Pro Designs", "High-Priority GPU Cluster", "Full House Tours (HD)", "80+ Designer Styles", "Custom Spatial Prompts"],
    button: "Upgrade to Elite",
    popular: true
  },
  {
    name: "Master Guild",
    price: "199",
    desc: "Tailored neural training for global architectural firms.",
    icon: Crown,
    features: ["Enterprise Commercial License", "8K Ultra-RAW Renders", "Dedicated GPU Instance", "Private API & Integrations", "Custom Style Training"],
    button: "Join The Guild",
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-40 px-6 bg-[#050505] relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/[0.02] rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32 space-y-6">
           <div className="inline-flex items-center gap-4 border border-white/5 bg-white/5 rounded-full px-6 py-2">
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px]">Membership Access</span>
           </div>
           <h2 className="text-5xl md:text-8xl font-light text-white font-display">Investment <br /><span className="text-luxury font-bold italic">Landscape</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-10 md:p-12 overflow-hidden group shadow-2xl ${
                plan.popular ? 'bg-white/5 border border-[#C5A059]/40 gold-shadow scale-105 z-10 rounded-[2.5rem]' : 'bg-[#0A0A0A] border border-white/5 rounded-[2rem] opacity-70 hover:opacity-100 transition-opacity'
              }`}
            >
              <div className="relative z-10 mb-12">
                <div className="flex items-center justify-between mb-8">
                   <div className={`p-4 rounded-2xl ${plan.popular ? 'bg-[#C5A059] text-black' : 'bg-white/5 text-[#C5A059]'} transition-colors`}>
                      <plan.icon className="w-6 h-6" />
                   </div>
                   {plan.popular && <span className="bg-[#C5A059]/10 text-[#C5A059] text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-[#C5A059]/20">Most Requested</span>}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mb-2">{plan.name}</h3>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-8">{plan.desc}</p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-light text-white tracking-tighter">$<span className="font-bold">{plan.price}</span></span>
                  <span className="text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">/ mo</span>
                </div>
              </div>

              <div className="relative z-10 flex-1 space-y-6 mb-12">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-slate-400 group/item">
                    <div className="w-5 h-5 rounded-full border border-[#C5A059]/20 flex items-center justify-center shrink-0 group-hover/item:border-[#C5A059] transition-colors">
                       <Check className="w-3 h-3 text-[#C5A059]" />
                    </div>
                    <span className="text-[11px] uppercase tracking-widest font-bold group-hover/item:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/dashboard" className="relative z-10">
                <button className={`w-full py-6 rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-3 overflow-hidden group/btn ${
                  plan.popular ? 'bg-[#C5A059] text-black hover:bg-white' : 'border border-white/10 text-white hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}>
                  <span className="relative z-10">{plan.button}</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </Link>
              
              {/* Background detail */}
              <div className="absolute top-0 right-0 p-12 text-white/[0.01] pointer-events-none select-none">
                 <plan.icon size={200} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
