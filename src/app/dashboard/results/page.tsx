"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { Download, RefreshCw, Video, ArrowLeft, Heart, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const rooms = [
  {
    name: "Living Room",
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    variations: [
       "https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=40&w=200",
       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=40&w=200"
    ]
  },
  {
    name: "Bedroom",
    before: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1616594831254-ae215839f37c?auto=format&fit=crop&q=80&w=800",
    variations: [
       "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=40&w=200"
    ]
  },
  {
    name: "Kitchen",
    before: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80&w=800",
    variations: []
  }
]

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </Link>
          <h1 className="text-4xl font-bold">Your AI Design Results</h1>
          <p className="text-muted-foreground">Style: Modern Home | Property: 2 BHK</p>
        </div>
        
        <div className="flex gap-4">
           <Link href="/video-generation">
             <Button variant="outline" className="gap-2 rounded-2xl h-14 px-8 border-2 border-primary text-primary hover:bg-primary/5">
                <Video className="w-5 h-5" /> Generate House Tour
             </Button>
           </Link>
           <Button className="gap-2 rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600">
              <Download className="w-5 h-5" /> Download All HD
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass group">
               <div className="relative aspect-square overflow-hidden">
                  <img src={room.after} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {room.name}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                     <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <Heart className="w-4 h-4" />
                     </button>
                     <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
                  
                  {/* Floating Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <Button size="sm" variant="glass" className="h-10 px-4">Compare</Button>
                     <Button size="sm" variant="glass" className="h-10 px-4">Download</Button>
                  </div>
               </div>

               <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-lg">{room.name}</h3>
                     <span className="text-xs text-muted-foreground">Generated 2m ago</span>
                  </div>

                  {room.variations.length > 0 && (
                    <div className="mb-6">
                       <p className="text-xs font-bold mb-3 text-muted-foreground uppercase tracking-widest">More Variations</p>
                       <div className="flex gap-2">
                          {room.variations.map((v, i) => (
                             <div key={i} className="w-12 h-12 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-all">
                                <img src={v} className="w-full h-full object-cover" />
                             </div>
                          ))}
                          <button className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                             <RefreshCw className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                     <Button variant="outline" className="flex-1 rounded-xl h-10 px-0">Regenerate</Button>
                     <Button className="flex-1 rounded-xl h-10 px-0">Edit Details</Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
