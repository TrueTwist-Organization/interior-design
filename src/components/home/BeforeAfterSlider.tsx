"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

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
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">See the Transformation</h2>
          <p className="text-muted-foreground">Slide to see how our AI turns empty spaces into masterpieces.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video rounded-[3rem] overflow-hidden cursor-ew-resize shadow-2xl select-none"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* After image */}
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Before image */}
          <div 
            className="absolute inset-0 w-full h-full object-cover overflow-hidden" 
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Slider Line */}
          <div 
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-primary rounded-full" />
                <div className="w-1 h-3 bg-primary rounded-full" />
              </div>
            </div>
            
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md -translate-x-full mr-8">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg translate-x-full ml-8">
              AFTER
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
