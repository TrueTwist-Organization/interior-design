"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How does the AI design the rooms?",
    answer: "Our AI uses advanced computer vision to understand the geometry and lighting of your empty room, then applies state-of-the-art generative models to place furniture and decor that fit the space perfectly."
  },
  {
    question: "Can I upload multiple photos of the same room?",
    answer: "Yes! In fact, we recommend it. Uploading photos from different angles helps the AI create a more accurate 3D representation and produce better cinematic video tours."
  },
  {
    question: "What formats can I download?",
    answer: "You can download high-resolution JPG/PNG images (up to 4K on Pro plans) and MP4 video walkthroughs."
  },
  {
    question: "Do I need a 3D scanner?",
    answer: "No, just a regular smartphone camera will work. Our AI handles the depth estimation and 3D reconstruction automatically."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32 px-6 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-24 space-y-4">
           <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Curation 06</span>
           <h2 className="text-5xl md:text-7xl font-light text-white font-display">Common <span className="font-bold">Questions</span></h2>
           <div className="h-px w-20 bg-[#C5A059] mx-auto mt-6" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10 group">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-8 flex items-center justify-between text-left text-white group-hover:text-[#C5A059] transition-colors"
              >
                <span className="text-lg font-light tracking-wide">{faq.question}</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#C5A059]/30">
                   {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-slate-500 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
