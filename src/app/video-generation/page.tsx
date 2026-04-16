"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, ArrowLeft, Film, RefreshCw, ChevronLeft, ChevronRight, Play, LayoutGrid, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const VIDEO_W = 1280, VIDEO_H = 720
const FPS = 24
const SECONDS_PER_ROOM = 4

function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

export default function VideoGenerationPage() {
  const router = useRouter()
  const [rooms, setRooms] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewIdx, setPreviewIdx] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const d = localStorage.getItem("latest_design")
    if (d) {
      const parsed = JSON.parse(d)
      setRooms(parsed.rooms || [])
    } else {
      router.push("/dashboard")
    }
  }, [router])

  const loadImg = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error("Failed to load design image"))
      img.src = url.startsWith("http") ? `/api/image-proxy?url=${encodeURIComponent(url)}` : url
    })

  const generate = useCallback(async () => {
    if (!rooms.length || isGenerating) return
    setIsGenerating(true); setProgress(0); setError(null); setVideoUrl(null)
    
    try {
      const canvas = canvasRef.current!
      canvas.width = VIDEO_W; canvas.height = VIDEO_H
      const ctx = canvas.getContext("2d")!
      
      const mime = ["video/mp4", "video/webm;codecs=vp9", "video/webm"].find(m => MediaRecorder.isTypeSupported(m)) || "video/webm"
      const chunks: BlobPart[] = []
      const stream = canvas.captureStream(FPS)
      const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 25_000_000 })
      
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }
      const blobPromise = new Promise<Blob>(res => recorder.onstop = () => res(new Blob(chunks, { type: mime })))
      
      recorder.start(200)

      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i]
        const finalImg = await loadImg(room.afterUrl)
        
        // INITIAL FRAME (CRITICAL: prevents black/empty stream)
        ctx.drawImage(finalImg, 0, 0, VIDEO_W, VIDEO_H)
        
        setStatus(`Synthesizing motion: ${room.name}...`)
        
        let aiVideoSuccess = false
        try {
          const vRes = await fetch("/api/generate-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: room.afterUrl })
          })
          const vData = await vRes.json()
          
          if (vData.video) {
            const vidEl = document.createElement("video")
            vidEl.src = vData.video
            vidEl.crossOrigin = "anonymous"
            vidEl.muted = true
            await new Promise(res => { 
                vidEl.onloadedmetadata = res; 
                vidEl.onloadeddata = res;
                setTimeout(res, 2000) // safety timeout
            })

            const totalFrames = FPS * SECONDS_PER_ROOM
            vidEl.play()
            for (let f = 0; f < totalFrames; f++) {
              ctx.drawImage(vidEl, 0, 0, VIDEO_W, VIDEO_H)
              const g = ctx.createLinearGradient(0, VIDEO_H * 0.8, 0, VIDEO_H)
              g.addColorStop(0, "transparent"); g.addColorStop(1, "rgba(0,0,0,0.6)")
              ctx.fillStyle = g; ctx.fillRect(0, 0, VIDEO_W, VIDEO_H)
              ctx.fillStyle = "#fff"; ctx.font = "bold 42px serif"
              ctx.fillText(room.name.toUpperCase(), 80, VIDEO_H - 60)
              setProgress(Math.round(((i * totalFrames) + f) / (rooms.length * totalFrames) * 100))
              await new Promise(r => setTimeout(r, 1000/FPS))
            }
            aiVideoSuccess = true
          }
        } catch (e) {
          console.warn("AI Video synthesis skipped, using cinematic pan fallback.")
        }

        // FALLBACK: Cinematic Pan (If AI video fails or key is invalid)
        if (!aiVideoSuccess) {
          const totalFrames = FPS * SECONDS_PER_ROOM
          for (let f = 0; f < totalFrames; f++) {
            const t = f / totalFrames
            const eT = ease(t)
            const scale = 1.05 + eT * 0.1
            const panX = (eT - 0.5) * 100
            
            ctx.fillStyle = "#000"; ctx.fillRect(0, 0, VIDEO_W, VIDEO_H)
            const iA = finalImg.width / finalImg.height, cA = VIDEO_W / VIDEO_H
            let dw = VIDEO_W, dh = VIDEO_H
            if (iA > cA) { dh = VIDEO_H; dw = dh * iA } else { dw = VIDEO_W; dh = dw / iA }

            ctx.drawImage(finalImg, (VIDEO_W - dw * scale) / 2 + panX, (VIDEO_H - dh * scale) / 2, dw * scale, dh * scale)
            
            const g = ctx.createLinearGradient(0, VIDEO_H * 0.8, 0, VIDEO_H)
            g.addColorStop(0, "transparent"); g.addColorStop(1, "rgba(0,0,0,0.6)")
            ctx.fillStyle = g; ctx.fillRect(0, 0, VIDEO_W, VIDEO_H)
            
            ctx.fillStyle = "#fff"; ctx.font = "bold 42px serif"
            ctx.fillText(room.name.toUpperCase(), 80, VIDEO_H - 60)
            
            setProgress(Math.round(((i * totalFrames) + f) / (rooms.length * totalFrames) * 100))
            await new Promise(r => setTimeout(r, 1000/FPS))
          }
        }
      }

      recorder.stop()
      const finalBlob = await blobPromise
      setVideoUrl(URL.createObjectURL(finalBlob))
      setProgress(100)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsGenerating(false); setStatus("")
    }
  }, [rooms, isGenerating])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-3xl border-b border-white/5">
        <Link href="/dashboard/results" className="group flex items-center gap-4 text-white/40 hover:text-[#C5A059] transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#C5A059]/30 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back</span>
        </Link>
        <div className="flex items-center gap-6">
           <Film className="w-5 h-5 text-[#C5A059]" />
           <h1 className="text-sm font-black uppercase tracking-[0.6em] text-white/90">Cinematic <span className="text-[#C5A059]">Tour</span></h1>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio Live</span>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden luxury-card border-white/5 group bg-neutral-900 shadow-2xl">
              {videoUrl ? (
                <video ref={videoRef} src={videoUrl} autoPlay loop controls className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full relative">
                  <canvas ref={canvasRef} className="w-full h-full object-cover opacity-60" />
                  {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                       <div className="w-32 h-32 relative">
                          <svg className="w-full h-full rotate-[-90deg]">
                             <circle cx="64" cy="64" r="60" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
                             <circle cx="64" cy="64" r="60" fill="none" stroke="#C5A059" strokeWidth="4" strokeDasharray="377" strokeDashoffset={377 - (377 * progress) / 100} className="transition-all duration-500" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-[#C5A059]">
                             {progress}%
                          </div>
                       </div>
                       <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] animate-pulse">{status}</p>
                    </div>
                  )}
                  {!isGenerating && !videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Sparkles className="w-12 h-12 text-white/10 animate-pulse" />
                    </div>
                  )}
                </div>
              )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-6 border-y border-white/5">
            <div className="space-y-4">
               <h2 className="text-3xl font-light uppercase tracking-widest">{rooms[previewIdx]?.name || "Luxury View"}</h2>
               <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Neural Motion Synthesis</p>
               </div>
            </div>
            {!videoUrl && !isGenerating && (
              <button 
                onClick={generate} 
                className="px-12 py-5 bg-[#C5A059] text-black rounded-3xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-gold cursor-pointer"
              >
                Start Master Generation
              </button>
            )}
            {videoUrl && (
              <a 
                href={videoUrl} 
                download="home-tour.mp4" 
                className="px-10 py-5 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-[#C5A059] hover:text-white transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export Tour
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="flex items-center gap-4 text-white/40 mb-6">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol Stacks</span>
           </div>
           <div className="space-y-6">
              {rooms.map((room, i) => (
                <button 
                  key={i} 
                  onClick={() => setPreviewIdx(i)}
                  className={`w-full group relative aspect-[16/7] rounded-[2rem] overflow-hidden border-2 transition-all duration-700 cursor-pointer ${previewIdx === i ? "border-[#C5A059] scale-[1.02]" : "border-white/5 opacity-40 hover:opacity-100"}`}
                >
                  <img src={room.afterUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end text-left">
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{room.name}</span>
                  </div>
                </button>
              ))}
           </div>
        </div>
      </main>
      
      {error && (
        <div className="fixed bottom-10 left-10 right-10 p-8 bg-red-950/20 border border-red-500/20 rounded-3xl text-red-500 text-center text-[10px] uppercase tracking-[0.4em] font-black">
          Error: {error}
        </div>
      )}
    </div>
  )
}
