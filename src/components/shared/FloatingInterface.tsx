"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { Box, Layers, Move3d } from "lucide-react"

export function FloatingInterface() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [mounted, setMounted] = useState(false)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 })

  const transX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50px", "50px"])
  const transY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50px", "50px"])
  
  const transX2 = useTransform(transX, (v: string) => parseFloat(v) * -1.5 + "px")
  const transY2 = useTransform(transY, (v: string) => parseFloat(v) * -1.5 + "px")

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5)
      y.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden hidden lg:block">
      <motion.div 
        style={{ x: transX, y: transY }}
        className="absolute top-[30%] right-[10%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex items-center gap-4 shadow-2xl"
      >
        <div className="w-10 h-10 bg-[#C5A059]/20 rounded-full flex items-center justify-center">
            <Layers className="w-5 h-5 text-[#C5A059]" />
        </div>
        <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-[#C5A059]">Depth Synthesis</p>
            <p className="text-[10px] text-white/40">Active Neural Layer</p>
        </div>
      </motion.div>

      <motion.div 
        style={{ x: transX2, y: transY2 }}
        className="absolute bottom-[20%] left-[5%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex items-center gap-4 shadow-2xl"
      >
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Move3d className="w-5 h-5 text-white/50" />
        </div>
        <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Axis Calibration</p>
            <p className="text-[10px] text-white/20">Spatial Aware</p>
        </div>
      </motion.div>
    </div>
  )
}
