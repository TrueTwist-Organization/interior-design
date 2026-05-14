"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Home, Upload, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Layout, Camera, Wand2, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedBHK, setSelectedBHK] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [roomPrompts, setRoomPrompts] = useState<Record<string, string>>({})
  const [uploads, setUploads] = useState<Record<string, File[]>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [processingStatus, setProcessingStatus] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, isGenerating]);

  const roomTypes: Record<string, string[]> = {
    "1 BHK": ["Living Room", "Bedroom", "Kitchen", "Balcony"],
    "2 BHK": ["Living Room", "Bedroom 1", "Bedroom 2", "Kitchen", "Balcony"],
    "3 BHK": ["Living Room", "Bedroom 1", "Bedroom 2", "Bedroom 3", "Kitchen", "Balcony"],
    "4 BHK": ["Living Room", "Master Bed", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Kitchen", "Balcony"],
    "Office": ["Main Cabin", "Workstation Area", "Conference Room", "Reception"]
  }

  const styles = [
    { name: "Modern",        img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80" },
    { name: "Luxury",        img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80" },
    { name: "Minimalist",    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80" },
    { name: "Scandinavian",  img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" },
    { name: "Industrial",    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" },
    { name: "Classic",       img: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=800&q=80" },
  ]

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width, height = img.height;
          const maxDim = 1440;
          if (width > height && width > maxDim) { height *= maxDim / width; width = maxDim; }
          else if (height > maxDim) { width *= maxDim / height; height = maxDim; }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const compressForStorage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width, height = img.height;
          const maxDim = 800;
          if (width > height && width > maxDim) { height *= maxDim / width; width = maxDim; }
          else if (height > maxDim) { width *= maxDim / height; height = maxDim; }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleStartGeneration = async () => {
    if (Object.keys(uploads).length === 0) {
      alert("Please upload at least one photo.");
      return;
    }
    setIsGenerating(true);
    
    try {
      const results = [];
      const roomsToProcess = Object.entries(uploads);
      
      for (const [roomName, files] of roomsToProcess) {
        if (!files || files.length === 0) continue;

        const roomSeed = Math.floor(Math.random() * 2147483647); // Consistency anchor across angles
        const angleNames = ["North View", "East View", "South View", "West View"];
        const angles: any[] = [];

        setProcessingStatus(`Analyzing 360° Perspectives for ${roomName}...`);

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const angleLabel = angleNames[i] || `Angle ${i + 1}`;
          
          setProcessingStatus(`Synthesizing ${angleLabel}: ${roomName}...`);
          
          const thumbnailUri = await compressForStorage(file);
          const perRoomPrompt = roomPrompts[roomName] || "";
          const angleDataUri = await compressImage(file);
          const angleBase64 = angleDataUri.split(",")[1];

          const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: angleBase64,
              roomType: roomName,
              style: selectedStyle || "Luxury",
              prompt: perRoomPrompt,
              angle: angleLabel,
              seed: roomSeed 
            })
          });

          if (!response.ok) continue; // Skip failed angles
          const data = await response.json();
          if (data.error) continue;

          angles.push({
            label: angleLabel,
            beforeUrl: thumbnailUri,
            afterUrl: data.image
          });
        }

        if (angles.length > 0) {
          results.push({
            name: roomName,
            beforeUrl: angles[0].beforeUrl,
            afterUrl: angles[0].afterUrl,
            angles: angles,
            allStages: angles.flatMap(a => [a.beforeUrl, a.afterUrl])
          });
        }
      }

      localStorage.setItem("latest_design", JSON.stringify({
        style: selectedStyle,
        bhk: selectedBHK,
        prompt: customPrompt,
        rooms: results
      }));
      router.push("/dashboard/results");

    } catch (err: any) {
      alert(`Error: ${err.message}`);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C5A059] opacity-[0.02] blur-[200px] -z-10" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(90deg, #C5A059 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Step Indicator */}
        {!isGenerating && (
          <div className="flex items-center justify-center gap-4 mb-20">
            {[1,2,3].map(s => (
              <div key={s} className="flex items-center">
                 <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-700 ${step >= s ? 'border-[#C5A059] bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'border-white/10 text-white/20'}`}>
                    {step > s ? '✓' : s}
                 </div>
                 {s < 3 && <div className={`w-12 h-px transition-all duration-700 ${step > s ? 'bg-[#C5A059]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        )}

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-12">
            <div className="relative">
               <div className="w-32 h-32 border-2 border-white/5 rounded-full" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-[#C5A059] rounded-full"
               />
               <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-[#C5A059] animate-pulse" />
            </div>
            <div className="space-y-4">
               <h2 className="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] text-white">Synthesizing <span className="font-bold text-luxury">Design</span></h2>
               <p className="text-slate-500 uppercase tracking-[0.5em] text-[10px] md:text-xs font-black animate-pulse">{processingStatus}</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                <div className="text-center space-y-4">
                   <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">Step 01</span>
                   <h2 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tighter">Spatial <span className="font-bold italic">Scale</span></h2>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                  {Object.keys(roomTypes).map(bhk => (
                  <button 
                    key={bhk} 
                    onClick={() => setSelectedBHK(bhk)} 
                    className={`relative group p-6 md:p-10 transition-all duration-700 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-3 ${
                      selectedBHK === bhk 
                      ? 'bg-[#C5A059] border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.3)] text-black' 
                      : 'bg-[#121212] border-white/5 text-white/40 hover:border-white/20 hover:bg-[#181818]'
                    }`}
                  >
                    <div className={`p-3 md:p-4 rounded-2xl transition-all duration-700 ${selectedBHK === bhk ? 'bg-black/10' : 'bg-white/5 group-hover:bg-[#C5A059]/10'}`}>
                       {bhk === "Office" ? 
                         <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}><Briefcase className={`w-6 h-6 md:w-10 md:h-10 ${selectedBHK === bhk ? 'text-black' : 'text-inherit group-hover:text-[#C5A059]'}`} /></motion.div> :
                         <Home className={`w-6 h-6 md:w-10 md:h-10 ${selectedBHK === bhk ? 'text-black' : 'text-inherit group-hover:text-[#C5A059]'}`} />
                       }
                    </div>
                    <span className="font-black tracking-[0.3em] uppercase text-[9px] md:text-xs text-center">{bhk}</span>
                  </button>
                ))}
                </div>

                <div className="flex justify-center pt-10">
                  <button 
                    disabled={!selectedBHK} onClick={() => setStep(2)} 
                    className="group bg-white text-black px-16 py-6 font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-all duration-700 disabled:opacity-20 flex items-center gap-4"
                  >
                    Configure Rooms <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                   <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">Step 02</span>
                   <h2 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tighter">Capture <span className="font-bold italic">Angles</span></h2>
                   <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase max-w-md mx-auto">Upload varied perspectives for high-fidelity spatial awareness.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedBHK && roomTypes[selectedBHK].map((room, idx) => {
                    const isLastOdd = roomTypes[selectedBHK].length % 2 !== 0 && idx === roomTypes[selectedBHK].length - 1
                    const roomFiles = uploads[room] || []
                    
                    return (
                      <div key={room} className={`bg-[#121212] border border-white/5 rounded-[2.5rem] p-6 md:p-8 space-y-6 transition-all duration-700 hover:border-white/10 ${isLastOdd ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${roomFiles.length > 0 ? 'bg-[#C5A059] animate-pulse' : 'bg-white/10'}`} />
                              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">{room}</h3>
                           </div>
                           {roomFiles.length > 0 && <span className="text-[8px] font-black text-[#C5A059] uppercase tracking-[0.3em] bg-[#C5A059]/10 px-4 py-2 rounded-full border border-[#C5A059]/20">PROTOCOL READY</span>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                           <div className="flex-1 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-[#050505] group transition-all hover:border-[#C5A059]/30">
                              <input type="file" accept="image/*" onChange={(e) => {
                                 if (e.target.files) {
                                   setUploads(prev => ({ ...prev, [room]: [...(prev[room] || []), ...Array.from(e.target.files!)].slice(0, 4) }))
                                 }
                              }} className="absolute inset-0 z-10 opacity-0 cursor-pointer" />
                              {roomFiles[0] ? (
                                <>
                                  <img src={URL.createObjectURL(roomFiles[0])} className="w-full h-full object-cover" />
                                  <button onClick={(e) => { e.stopPropagation(); setUploads(prev => ({ ...prev, [room]: prev[room].filter((_, i) => i !== 0) })) }} className="absolute top-3 right-3 w-8 h-8 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#C5A059] transition-all z-20">✕</button>
                                </>
                              ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                   <Camera className="w-8 h-8 text-white/5 group-hover:text-[#C5A059] transition-all duration-700" />
                                   <p className="text-[8px] text-white/20 uppercase font-black tracking-[0.3em] group-hover:text-white/40 transition-colors">Capture Primary</p>
                                </div>
                              )}
                           </div>
                                                  <div className="flex sm:flex-col gap-3 overflow-x-auto sm:w-28 scrollbar-hide">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="relative shrink-0 w-20 h-20 sm:w-auto sm:flex-1 rounded-2xl overflow-hidden border border-white/5 bg-black group hover:border-[#C5A059]/30 cursor-pointer transition-all">
                                  <input type="file" accept="image/*" onChange={(e) => {
                                     if (e.target.files) {
                                       setUploads(prev => ({ ...prev, [room]: [...(prev[room] || []), ...Array.from(e.target.files!)].slice(0, 4) }))
                                     }
                                  }} className="absolute inset-0 z-10 opacity-0 cursor-pointer" />
                                  {roomFiles[i] ? (
                                    <>
                                      <img src={URL.createObjectURL(roomFiles[i])} className="w-full h-full object-cover" />
                                      <button onClick={(e) => { e.stopPropagation(); setUploads(prev => ({ ...prev, [room]: prev[room].filter((_, fi) => fi !== i) })) }} className="absolute top-1 right-1 w-5 h-5 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white text-[8px] z-20">✕</button>
                                    </>
                                  ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                      <span className="text-white/5 font-black text-xl group-hover:text-[#C5A059]/20 transition-colors">+</span>
                                      <p className="text-[6px] text-white/20 uppercase font-black tracking-widest">{i === 1 ? "East View" : i === 2 ? "South View" : "West View"}</p>
                                    </div>
                                  )}
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* Per-Room Directive Input */}
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                           <div className="flex items-center gap-2 text-white/20">
                              <Wand2 className="w-3 h-3 text-[#C5A059]" />
                              <span className="text-[8px] font-black uppercase tracking-widest">Special Directive for {room}</span>
                           </div>
                           <input 
                             type="text"
                             value={roomPrompts[room] || ""}
                             onChange={(e) => setRoomPrompts(prev => ({ ...prev, [room]: e.target.value }))}
                             placeholder="e.g., 'Navy blue walls', 'L-shaped red sofa', 'Marble floor'..."
                             className="w-full bg-black/50 border border-white/5 p-4 rounded-xl text-white text-[10px] focus:border-[#C5A059]/30 transition-all outline-none font-light italic"
                           />
                        </div>
                     </div>
                   )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
                  <button onClick={() => setStep(1)} className="text-white/30 hover:text-white uppercase font-black tracking-[0.4em] text-[10px] transition-colors">Back to Scale</button>
                  <button onClick={() => setStep(3)} className="w-full sm:w-auto bg-white text-black px-12 py-6 font-black uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-4">
                    Inspiration Select <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                   <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">Step 03</span>
                   <h2 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tighter">Style <span className="font-bold italic text-luxury">Protocol</span></h2>
                   <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase max-w-md mx-auto">Select the aesthetic blueprint for your neural synthesis.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {styles.map(style => (
                    <button 
                      key={style.name} onClick={() => setSelectedStyle(style.name)} 
                      className={`relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border-2 transition-all duration-1000 group ${selectedStyle === style.name ? 'border-[#C5A059] gold-shadow scale-[1.03]' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                    >
                      <img src={style.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex items-end p-8 text-left">
                        <div>
                          <span className={`block text-xs font-black uppercase tracking-[0.3em] transition-all duration-700 ${selectedStyle === style.name ? 'text-[#C5A059] translate-y-0' : 'text-white translate-y-2'}`}>{style.name}</span>
                          {selectedStyle === style.name && <div className="h-0.5 w-8 bg-[#C5A059] mt-2 animate-width" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>



                <div className="flex flex-col sm:flex-row justify-between items-center gap-10 py-12 border-t border-white/5">
                  <button onClick={() => setStep(2)} className="text-white/30 hover:text-white uppercase font-black tracking-[0.4em] text-[10px]">Back</button>
                  <button 
                    disabled={!selectedStyle}
                    onClick={handleStartGeneration} 
                    className="w-full sm:w-auto bg-[#C5A059] text-black px-16 py-8 font-black uppercase tracking-[0.4em] hover:bg-white hover:text-[#C5A059] transition-all duration-700 shadow-2xl gold-shadow flex items-center justify-center gap-6 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    SYNTHESIZE DESIGN <Wand2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
