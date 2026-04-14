"use client"

import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Play, ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Interior Revolution</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Transform Empty Rooms into <span className="text-gradient">Dream Homes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
            Upload photos of your empty rooms and watch our AI professionally design your interior 
            in seconds. Get 4k renders and 3D walkthroughs instantly.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2">
              Start Designing <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2">
              <Play className="w-5 h-5 fill-current" /> View Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              Joined by <span className="text-primary">10k+</span> homeowners and designers
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/50 aspect-4/3 md:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Interior Design" 
              className="w-full h-full object-cover"
            />

            {/* Overlay UI elements */}
            <div className="absolute top-8 right-8 glass p-4 rounded-3xl animate-bounce shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold">Design Ready</p>
                  <p className="text-[10px] text-muted-foreground">Modern Scandinavian style</p>
                </div>
              </div>
            </div>
          </div>
          


          
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}
