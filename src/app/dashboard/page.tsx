"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Upload, X, Home, Palette, Sparkles, CheckCircle2, ChevronRight, Layout } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



type BHK = "1 BHK" | "2 BHK" | "3 BHK" | "4 BHK"

const roomTypesByBHK: Record<BHK, string[]> = {
  "1 BHK": ["Living Room", "Bedroom", "Kitchen"],
  "2 BHK": ["Living Room", "Bedroom 1", "Bedroom 2", "Kitchen"],
  "3 BHK": ["Living Room", "Bedroom 1", "Bedroom 2", "Bedroom 3", "Kitchen", "Balcony"],
  "4 BHK": ["Living Room", "Bedroom 1", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Kitchen", "Dining Room", "Balcony"]
}

const styles = [
  { name: "Modern", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=300" },
  { name: "Luxury", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=80&w=300" },
  { name: "Minimalist", img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=300" },
  { name: "Scandinavian", img: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=300" },
  { name: "Industrial", img: "https://images.unsplash.com/photo-1512914890251-2f96a9b092e3?auto=format&fit=crop&q=80&w=300" },
  { name: "Classic", img: "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&q=80&w=300" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedBHK, setSelectedBHK] = useState<BHK | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [uploads, setUploads] = useState<Record<string, File[]>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        router.push("/dashboard/results")
      }, 6000) // Redirect after 6 seconds to simulate generation
      return () => clearTimeout(timer)
    }
  }, [isGenerating, router])

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)


  const handleFileUpload = (room: string, files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files)
    setUploads(prev => ({
      ...prev,
      [room]: [...(prev[room] || []), ...newFiles]
    }))
  }

  const removeFile = (room: string, index: number) => {
    setUploads(prev => ({
      ...prev,
      [room]: prev[room].filter((_, i) => i !== index)
    }))
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Select Property Type</h2>
              <p className="text-muted-foreground">Tell us about the size of your space.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(roomTypesByBHK).map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk as BHK)}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                    selectedBHK === bhk ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <Home className={`w-8 h-8 ${selectedBHK === bhk ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-bold">{bhk}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center pt-8">
              <Button size="lg" disabled={!selectedBHK} onClick={handleNext} className="gap-2">
                Continue to Uploads <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Upload Room Photos</h2>
              <p className="text-muted-foreground">Upload 3-4 photos for each room for the best results.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedBHK && roomTypesByBHK[selectedBHK].map((room) => (
                <Card key={room} className="p-6 glass">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" /> {room}
                  </h3>
                  
                  <div className="relative border-2 border-dashed border-border rounded-2xl p-8 transition-colors hover:border-primary/50 text-center">
                    <input 
                      type="file" 
                      multiple 
                      onChange={(e) => handleFileUpload(room, e.target.files)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop or <span className="text-primary font-bold">browse</span></p>
                  </div>

                  {uploads[room] && uploads[room].length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {uploads[room].map((file, idx) => (
                        <div key={idx} className="group relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => removeFile(room, idx)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button size="lg" onClick={handleNext}>Continue to Style</Button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Select Design Style</h2>
              <p className="text-muted-foreground">Choose the aesthetic that defines your dream space.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {styles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(style.name)}
                  className={`group relative aspect-video rounded-[2rem] overflow-hidden border-4 transition-all ${
                    selectedStyle === style.name ? 'border-primary ring-4 ring-primary/10' : 'border-transparent'
                  }`}
                >
                  <img src={style.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-white font-bold text-lg">{style.name}</span>
                      {selectedStyle === style.name && <CheckCircle2 className="text-primary fill-white w-6 h-6" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button size="lg" disabled={!selectedStyle} onClick={() => setIsGenerating(true)} className="gap-2 bg-linear-to-r from-indigo-600 to-purple-600">
                <Sparkles className="w-5 h-5" /> Generate AI Design
              </Button>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Progress Stepper */}
      {!isGenerating && (
        <div className="flex items-center justify-center gap-4 mb-20 overflow-x-auto pb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                step === s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 
                step > s ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? 'bg-green-500' : 'bg-secondary'}`} />}
            </div>
          ))}
        </div>
      )}

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <motion.div
                animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-8 border-primary/20 border-t-primary rounded-full mb-12"
            />
            <h2 className="text-4xl font-bold mb-4 animate-pulse">Designing Your Space...</h2>
            <div className="space-y-4 max-w-sm w-full">
                {[
                    "Uploading images...",
                    "Processing room boundaries...",
                    "Applying Modern style...",
                    "Generating 4K renders..."
                ].map((text, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 1 }}
                        key={i} 
                        className="flex items-center gap-3 text-muted-foreground"
                    >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>{text}</span>
                    </motion.div>
                ))}
            </div>
            <Link href="/dashboard/results" className="mt-12">
                <Button variant="ghost">Skip logic and view demo results</Button>
            </Link>
        </div>
      ) : renderStep()}
    </div>
  )
}
