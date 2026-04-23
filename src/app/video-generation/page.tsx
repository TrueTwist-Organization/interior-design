"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, LayoutGrid, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

// Immersive 360 viewer powered by Three.js
const ThreeSixtyViewer = dynamic(() => import('@/components/ThreeSixtyViewer'), { ssr: false })

export default function VideoGenerationPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [rooms, setRooms] = useState<any[]>([])
  const [previewIdx, setPreviewIdx] = useState(0)
  const [activeAngleIdx, setActiveAngleIdx] = useState(0)
  const [currentViewUrl, setCurrentViewUrl] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const d = localStorage.getItem("latest_design")
    if (d) {
      try {
        const parsed = JSON.parse(d)
        const initialRooms = parsed.rooms || []
        setRooms(initialRooms)
        if (initialRooms.length > 0) {
          setCurrentViewUrl(initialRooms[0].afterUrl)
        }
      } catch (e) {
        console.error("Failed to parse design data", e)
        router.push("/dashboard")
      }
    } else {
      router.push("/dashboard")
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-3xl border-b border-white/5">
        <Link href="/dashboard/results" className="group flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#C5A059]/30 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">Back to Gallery</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059] hidden sm:block" />
          <h1 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] text-white/90 text-center">
            360° Vision <br className="sm:hidden" />
            <span className="text-[#C5A059]">Interactive</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] hidden sm:block">3D Engine Online</span>
        </div>
      </nav>

      <main className="pt-28 sm:pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main 3D Viewer Section */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden luxury-card border border-white/10 group bg-[#0A0A0A] shadow-[0_0_100px_rgba(197,160,89,0.05)] transition-all duration-700">
            {currentViewUrl ? (
               <ThreeSixtyViewer 
                 imageUrls={rooms[previewIdx]?.angles ? rooms[previewIdx].angles.map((a: any) => a.afterUrl) : [currentViewUrl]} 
                 activeAngleIdx={activeAngleIdx} 
               />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black/40">
                <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Initializing 3D Module...</p>
              </div>
            )}
          </div>

          {/* Download Button */}
           <div className="flex justify-center pt-4">
             <button
               onClick={() => {
                 if (!currentViewUrl) return;
                 const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(currentViewUrl)}`;
                 fetch(proxyUrl)
                   .then(res => res.blob())
                   .then(blob => {
                     const blobUrl = URL.createObjectURL(blob);
                     const a = document.createElement('a');
                     a.href = blobUrl;
                     a.download = `interior-design-${Date.now()}.jpg`;
                     document.body.appendChild(a);
                     a.click();
                     document.body.removeChild(a);
                     URL.revokeObjectURL(blobUrl);
                   })
                   .catch(() => {
                     window.open(currentViewUrl, '_blank');
                   });
               }}
               className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E0C878] to-[#C5A059] text-[#050505] font-black text-xs uppercase tracking-[0.3em] shadow-[0_4px_30px_rgba(197,160,89,0.35)] hover:shadow-[0_8px_50px_rgba(197,160,89,0.55)] hover:-translate-y-1 active:translate-y-0 transition-all duration-400 overflow-hidden"
             >
               <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
               <Download className="w-5 h-5 relative z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
               <span className="relative z-10">Download</span>
             </button>
           </div>
        </div>

        {/* Sidebar: View Selection */}
        <div className="lg:col-span-4 space-y-10">
          <div className="flex items-center justify-between text-white/20 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.6em]">Vision Gallery</span>
            <span className="text-[10px] font-black text-[#C5A059]">{rooms.length} SPACES</span>
          </div>

          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
            {rooms.map((room: any, i: number) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-4 px-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059]">0{i+1}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{room.name}</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(room.angles || [{ afterUrl: room.afterUrl, label: "Center View" }]).map((angle: any, aIdx: number) => (
                    <button
                      key={aIdx}
                      onClick={() => { 
                        setPreviewIdx(i); 
                        setActiveAngleIdx(aIdx);
                        setCurrentViewUrl(angle.afterUrl);
                      }}
                      className={`group relative aspect-video rounded-[1.5rem] overflow-hidden border-2 transition-all duration-500 ${currentViewUrl === angle.afterUrl ? "border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.3)]" : "border-white/5 opacity-40 hover:opacity-100"}`}
                    >
                      <img src={angle.afterUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/80">{angle.label || `Angle ${aIdx + 1}`}</span>
                      </div>
                      {currentViewUrl === angle.afterUrl && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
