"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Download, Music, Share2, ArrowLeft, Volume2, Maximize, Settings, Video } from "lucide-react"

import Link from "next/link"
import { useState, useEffect } from "react"

const images = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1616594831254-ae215839f37c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=80&w=1200"
]

export default function VideoGenerationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentIndex((idx) => (idx + 1) % images.length)
            return 0
          }
          return prev + 1
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border-[12px] border-primary/10 border-t-primary rounded-full shadow-[0_0_50px_rgba(99,102,241,0.2)]"
           />
           <div className="bg-primary/10 p-6 rounded-full text-primary scale-150">
             <Video className="w-8 h-8" />
           </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Rendering Cinematic Tour...</h1>
        <p className="text-muted-foreground max-w-sm mb-8">Combining your room designs with smooth transitions, 4K resolution, and background music.</p>
        
        <div className="w-full max-w-md h-2 bg-secondary rounded-full overflow-hidden mb-4">
           <motion.div 
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 3 }}
             className="h-full bg-primary"
           />
        </div>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">72% Rendered</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <Link href="/dashboard/results" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Results
        </Link>
        <div className="flex gap-4">
           <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 gap-2">
              <Share2 className="w-4 h-4" /> Share
           </Button>
           <Button className="rounded-xl h-10 px-4 gap-2 shadow-lg shadow-primary/20">
              <Download className="w-4 h-4" /> Download 4K Tour
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="glass overflow-hidden relative group aspect-video bg-black shadow-2xl">
            {/* Main Video Viewport */}
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={images[currentIndex]} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Cinematic Pan Effect Layer */}
            <motion.div 
               animate={{ x: [-20, 20] }}
               transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
               className="absolute inset-0 bg-black/10 mix-blend-overlay"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="w-full h-1 bg-white/20 rounded-full mb-6 relative cursor-pointer">
                  <div className="h-full bg-primary rounded-full relative" style={{ width: `${progress}%` }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                  </div>
               </div>
               
               <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-6">
                     <button onClick={() => setCurrentIndex((idx) => (idx - 1 + images.length) % images.length)} className="hover:text-primary transition-colors">
                        <SkipBack className="w-6 h-6 fill-current" />
                     </button>
                     <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-full text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl">
                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
                     </button>
                     <button onClick={() => setCurrentIndex((idx) => (idx + 1) % images.length)} className="hover:text-primary transition-colors">
                        <SkipForward className="w-6 h-6 fill-current" />
                     </button>
                     <div className="flex items-center gap-3 ml-4">
                        <Volume2 className="w-5 h-5 text-white/70" />
                        <div className="w-20 h-1 bg-white/20 rounded-full">
                           <div className="w-3/4 h-full bg-white rounded-full" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-white/70">
                     <span className="text-sm font-mono tracking-widest">00:08 / 00:24</span>
                     <Settings className="w-5 h-5 cursor-pointer hover:text-white" />
                     <Maximize className="w-5 h-5 cursor-pointer hover:text-white" />
                  </div>
               </div>
            </div>

            <div className="absolute top-8 left-8 flex items-center gap-3 px-4 py-2 glass rounded-full text-white">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-widest">Live Experience</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="p-6 glass border-none">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <Music className="w-5 h-5 text-primary" /> Audio Tracks
              </h3>
              <div className="space-y-2">
                 {["Lofi Chillhouse", "Modern Minimal", "Premium Cinematic", "Upbeat Interior"].map((t, i) => (
                    <button key={i} className={`w-full text-left p-3 rounded-xl text-sm transition-all ${i === 2 ? 'bg-primary text-white font-bold' : 'hover:bg-secondary'}`}>
                       {t}
                    </button>
                 ))}
              </div>
           </Card>

           <Card className="p-6 glass border-none">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 Video Settings
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transition Speed</span>
                    <span className="text-xs font-bold bg-secondary px-2 py-1 rounded-md">2.5s</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolution</span>
                    <span className="text-xs font-bold bg-secondary px-2 py-1 rounded-md">4K UHD</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pan Intensity</span>
                    <span className="text-xs font-bold bg-secondary px-2 py-1 rounded-md">High</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
