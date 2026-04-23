"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Play, ShieldCheck, Globe, Move3d, Compass, Layers } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Hero() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center pt-32 pb-20 px-4 md:px-10 overflow-hidden bg-transparent"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059] opacity-[0.05] blur-[150px] -z-10 animate-pulse" />
      
      {/* Floating 3D Markers */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
           animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-[20%] right-[15%] text-[#C5A059]"
         >
           <Move3d className="w-12 h-12" />
         </motion.div>
         <motion.div 
           animate={{ y: [0, -30, 0], opacity: [0.05, 0.2, 0.05] }}
           transition={{ duration: 7, repeat: Infinity }}
           className="absolute bottom-[25%] left-[10%] text-[#C5A059]"
         >
           <Layers className="w-16 h-16" />
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/5 rounded-full px-4 py-2 mb-8 mx-auto lg:mx-0">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
               </span>
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Next-Gen Architecture v2.5</span>
            </div>
            
            <motion.h1 
              style={{ rotateX, rotateY }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tighter mb-8 leading-[0.85] text-white"
            >
              Elite <br />
              <span className="text-luxury font-bold italic">Atmos</span>
            </motion.h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light tracking-wide lg:border-l lg:border-white/10 lg:pl-8">
              Experience the pinnacle of synthetic interior design. Our neural engine curates architectural masterpieces tailored to your unique spatial identity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
              <Link href="/dashboard" className="w-full sm:w-auto overflow-hidden group">
                <button className="relative w-full sm:w-auto bg-[#C5A059] text-black px-12 py-5 text-[10px] uppercase font-black tracking-[0.4em] transition-all duration-700 shadow-[0_20px_40px_rgba(197,160,89,0.15)] overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-4">Initialize Studio <ArrowRight className="w-4 h-4" /></span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
                </button>
              </Link>
              
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />)}
                 </div>
                 <div className="text-left">
                    <span className="block text-[10px] font-black tracking-[0.2em] text-[#C5A059]">4.9 Excellence</span>
                    <span className="text-[8px] uppercase font-bold text-white/30 tracking-widest whitespace-nowrap">Industry Standard AI</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Element - Redesigned for Elite 3D Aesthetic */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative group perspective-1000 py-10">
           {/* Animated Background Glow */}
           <div className="absolute -inset-10 bg-[#C5A059] opacity-[0.05] blur-[100px] rounded-full animate-pulse" />
           
           <motion.div
             style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
             initial={{ opacity: 0, scale: 0.9, y: 30 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative aspect-[4/5] rounded-[3.5rem] p-[1px] bg-linear-to-b from-[#C5A059]/30 via-white/5 to-white/5 overflow-visible shadow-2xl"
           >
              <div className="absolute inset-0 rounded-[3.5rem] bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#C5A059]/20 to-transparent mix-blend-overlay z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200" 
                    alt="Luxury Workspace" 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Main Attribution Overlay */}
              <div 
                style={{ transform: "translateZ(60px)" }}
                className="absolute bottom-10 inset-x-10 p-8 glassmorphism luxury-glass border-white/5 text-center shadow-2xl"
              >
                 <p className="text-[#C5A059] text-[9px] font-black tracking-[0.4em] uppercase mb-1">Visual Synthesis Engine</p>
                 <p className="text-white text-base font-light italic">Refined Masterpiece v4.0</p>
                 <div className="mt-4 flex justify-center gap-2">
                    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ x: ["-100%", "100%"] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="w-1/2 h-full bg-[#C5A059]" 
                       />
                    </div>
                 </div>
              </div>
           </motion.div>
           
           {/* Verified Badge */}
           <motion.div 
             style={{ rotateX, rotateY, transform: "translateZ(100px)" }}
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-6 -right-6 md:-top-12 md:-right-12 bg-[#050505] border border-[#C5A059]/20 p-6 md:p-10 shadow-3xl flex flex-col items-center gap-3 z-20 rounded-2xl"
           >
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#C5A059]" />
              <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-white/50">Active AI</span>
           </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 text-white/20">
         <span className="text-[8px] uppercase font-black tracking-[0.5em] -rotate-90 origin-center translate-y-6">Explore</span>
         <div className="w-px h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#C5A059]"
            />
         </div>
      </div>
    </section>
  )
}
