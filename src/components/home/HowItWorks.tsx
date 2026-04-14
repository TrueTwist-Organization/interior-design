"use client"

import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Upload Photos",
    description: "Take photos of your empty rooms from different angles."
  },
  {
    step: "02",
    title: "Select Style",
    description: "Choose from 10+ premium interior design styles."
  },
  {
    step: "03",
    title: "AI Generates",
    description: "Our AI creates hyper-realistic designs and layouts."
  },
  {
    step: "04",
    title: "Download Results",
    description: "Get HD renders and a cinematic house tour video."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get your dream design in minutes with these simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
