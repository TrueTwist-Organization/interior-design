"use client"

import { useState, useRef, useEffect } from "react"

interface InternalSliderProps {
  before: string
  after: string
  label?: string
}

export function InternalSlider({ before, after, label }: InternalSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent | any) => {
    if (!isResizing || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = "touches" in event ? event.touches[0].clientX : event.clientX
    const position = ((x - rect.left) / rect.width) * 100
    
    if (position >= 0 && position <= 100) {
      setSliderPosition(position)
    }
  }

  const handleMouseDown = (e: any) => {
      e.preventDefault();
      setIsResizing(true)
  }
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
    <div 
      ref={containerRef}
      className="relative aspect-video rounded-3xl overflow-hidden cursor-ew-resize shadow-md select-none group/slider"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After image */}
      <img 
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before image */}
      <div 
        className="absolute inset-0 w-full h-full object-cover overflow-hidden pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={before} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary">
            <div className="flex gap-0.5">
                <div className="w-0.5 h-2.5 bg-primary rounded-full" />
                <div className="w-0.5 h-2.5 bg-primary rounded-full" />
            </div>
        </div>
      </div>

      <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-opacity">
        BEFORE
      </div>
      <div className="absolute top-3 right-3 bg-primary/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-opacity">
        AFTER
      </div>
    </div>
  )
}
