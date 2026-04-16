"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeftRight, Sparkles } from "lucide-react"

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = "touches" in event ? event.touches[0].clientX : event.clientX
    const position = ((x - rect.left) / rect.width) * 100
    
    if (position >= 0 && position <= 100) {
      setSliderPosition(position)
    }
  }

  const handleMouseDown = () => setIsResizing(true)
  const handleMouseUp = () => setIsResizing(false)

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return (
    <section id="gallery" className="py-24 md:py-40 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C5A059]/[0.03] blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-32 space-y-6">
           <div className="inline-flex items-center gap-4 bg-white/5 border border-white/5 rounded-full px-6 py-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px]">Spatial Impact</span>
           </div>
           <h2 className="text-5xl md:text-8xl font-light text-white font-display leading-[0.9]">The Synthesis <br /><span className="text-luxury font-bold">Transformation</span></h2>
           <p className="text-slate-500 mt-10 max-w-xl mx-auto font-light tracking-wide italic">Slide to witness the convergence of raw structural potential and high-end neural design.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden cursor-ew-resize shadow-[0_40px_100px_rgba(0,0,0,0.5)] select-none border-2 border-white/5 group"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* After image */}
          <img 
            src="/images/slider-after.png" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Before image */}
          <div 
            className="absolute inset-0 w-full h-full object-cover overflow-hidden z-10" 
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src="/images/slider-before.jpg" 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 top-0 right-0 bg-black/20" />
          </div>

          {/* Luxury Slider Handle */}
          <div 
            className="absolute inset-y-0 w-[2px] bg-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.5)] z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white flex items-center justify-center rounded-full shadow-[0_0_40px_rgba(0,0,0,0.4)] border-4 border-[#C5A059] transition-transform group-active:scale-110">
               <ArrowLeftRight className="w-5 h-5 text-black" />
            </div>
            
            {/* Unique Tag Overlays */}
            <div className="absolute top-10 left-[-120px] bg-[#050505]/90 backdrop-blur-xl border border-white/10 text-white px-5 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all">
                Structural RAW
            </div>
            <div className="absolute top-10 right-[-120px] bg-[#C5A059] text-black px-5 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all font-display">
                Elite Render
            </div>
          </div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] animate-pulse" 
               style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
        </div>
      </div>
    </section>
  )
}
