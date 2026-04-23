"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { Download, RefreshCw, Video, ArrowLeft, Heart, MoreVertical, FileText } from "lucide-react"
import Link from "next/link"
import { InternalSlider } from "@/components/dashboard/InternalSlider"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"

export default function ResultsPage() {
  const [designData, setDesignData] = useState<any>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("latest_design")
      if (saved) {
        const parsed = JSON.parse(saved)
        const rooms = parsed.rooms || []
        const enhancedRooms = rooms.map((room: any) => ({
          ...room,
          before: room.beforeUrl,
          after: room.afterUrl,
          variations: room.variations || []
        }))
        setDesignData({ ...parsed, rooms: enhancedRooms })
      }
    } catch (err) {
      console.error("Error loading saved design:", err)
    }
  }, [])

  const activeRooms = designData?.rooms || []

  const handleSingleDownload = async (url: string, name: string) => {
    if (!url) return
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `${name.toLowerCase().replace(/\s+/g, "-")}-hd.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (e) {
      console.error("Single download failed", e)
      window.open(url, "_blank")
    }
  }

  const handleDownloadPDF = async () => {
    if (!activeRooms.length) return
    setIsDownloading(true)
    
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1280, 720]
      })

      for (let i = 0; i < activeRooms.length; i++) {
        const room = activeRooms[i]
        const url = room.after || room.afterUrl
        
        if (url) {
          try {
            // Load image
            const img = new Image()
            img.crossOrigin = "anonymous"
            
            await new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
              // Use proxy if it's external
              img.src = url.startsWith('http') ? `/api/image-proxy?url=${encodeURIComponent(url)}` : url
            })

            if (i > 0) pdf.addPage([1280, 720], 'landscape')
            
            // Background color
            pdf.setFillColor(15, 15, 15)
            pdf.rect(0, 0, 1280, 720, 'F')
            
            // Draw image
            pdf.addImage(img, 'JPEG', 0, 0, 1280, 720)
            
            // Overlay Branding
            pdf.setFillColor(0, 0, 0, 0.5)
            pdf.rect(50, 600, 300, 80, 'F')
            
            pdf.setTextColor(255, 255, 255)
            pdf.setFontSize(40)
            pdf.text(room.name.toUpperCase(), 70, 635)
            
            pdf.setTextColor(197, 160, 89) // Gold
            pdf.setFontSize(20)
            pdf.text(`${designData?.style || 'Luxury'} Interior AI Design`, 70, 665)
            
            pdf.setTextColor(255, 255, 255)
            pdf.setFontSize(15)
            pdf.text("INTERIORAI STUDIO", 1100, 680)

          } catch (err) {
            console.error(`Failed to add room ${room.name} to PDF`, err)
          }
        }
      }

      pdf.save(`interior-ai-design-report-${Date.now()}.pdf`)
    } catch (err) {
      console.error("PDF generation failed", err)
      alert("Could not generate PDF. Please try individual downloads.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12 text-center sm:text-left">
        <div className="space-y-1">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#C5A059] mb-2 transition-colors text-xs uppercase font-bold tracking-widest mx-auto sm:mx-0">
            <ArrowLeft className="w-3 h-3" /> Back to Upload
          </Link>
          <h1 className="text-3xl md:text-5xl font-light font-display text-white leading-tight">Neural Master <span className="text-[#C5A059] font-bold">Designs</span></h1>
          <p className="text-slate-500 tracking-wide text-[10px] md:text-xs uppercase font-bold">
            Style: <span className="text-white">{designData?.style || "Modern"}</span> | 
            Property: <span className="text-white">{designData?.bhk || "2 BHK"}</span> | 
            Results: <span className="text-[#C5A059]">{activeRooms.length} High-End Designs</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
           <Link href="/video-generation" className="flex-1">
             <Button variant="outline" className="w-full gap-2 rounded-2xl h-14 px-6 border-white/10 bg-[#0F0F0F] text-white hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all text-xs font-bold uppercase tracking-widest">
                <Video className="w-4 h-4 text-[#C5A059]" /> Generate House Tour
             </Button>
           </Link>
           <Button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex-1 gap-2 rounded-2xl h-14 px-10 shadow-xl shadow-[#C5A059]/10 bg-[#C5A059] text-black font-black uppercase tracking-widest hover:bg-white text-[10px] min-w-[240px]"
           >
              {isDownloading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              {isDownloading ? "Generating PDF..." : "Download All in PDF"}
           </Button>
        </div>
      </div>

      {activeRooms.length === 0 ? (
        <div className="text-center py-20 bg-[#0F0F0F] rounded-[3rem] border border-dashed border-white/10">
          <p className="text-slate-500 uppercase tracking-widest text-xs">No designs found. Go back to dashboard to generate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activeRooms.map((room: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
              className="perspective-1000"
            >
              <Card className="bg-[#0F0F0F] border-white/10 group overflow-hidden rounded-[2rem] shadow-2xl transition-all hover:border-[#C5A059]/30 hover:shadow-[#C5A059]/10">
                <div className="p-2">
                    <InternalSlider 
                      before={room.before || room.beforeUrl} 
                      after={room.after || room.afterUrl} 
                    />
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-base md:text-lg text-white">{room.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span className="text-[9px] text-[#C5A059] uppercase font-black tracking-widest">Elite AI Design</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSingleDownload(room.after || room.afterUrl, room.name)}
                        className="flex-1 rounded-xl h-10 px-0 bg-[#C5A059] text-black font-black uppercase tracking-widest text-[9px] hover:bg-white transition-all shadow-lg shadow-[#C5A059]/10"
                      >
                        Download HD
                      </button>
                      <Link href="/dashboard" className="flex-1">
                        <Button variant="outline" className="w-full rounded-xl h-10 px-0 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white text-[9px] uppercase font-black tracking-widest">Regenerate</Button>
                      </Link>
                    </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-6 left-6 right-6 lg:hidden z-50">
         <Link href="/video-generation">
           <button className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-3xl shadow-3xl flex items-center justify-center gap-3 active:scale-95 transition-all">
             <Video className="w-4 h-4" /> House Tour Studio
           </button>
         </Link>
      </div>

    </div>
  )
}
