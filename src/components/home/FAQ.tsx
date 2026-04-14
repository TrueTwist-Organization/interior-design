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
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground leading-relaxed">
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
