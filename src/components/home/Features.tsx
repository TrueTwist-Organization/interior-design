"use client"

import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { Wand2, Layout, ScanEye, Video, Download } from "lucide-react"

const features = [
  {
    title: "AI Room Design",
    description: "Our advanced neural network analyzes spatial dimensions to create perfect fits.",
    icon: Wand2,
    color: "bg-blue-500"
  },
  {
    title: "Multiple Room Upload",
    description: "Upload your entire house at once and get a consistent design throughout.",
    icon: Layout,
    color: "bg-purple-500"
  },
  {
    title: "Before After Comparison",
    description: "Interactive sliders let you visualize the transformation in real-time.",
    icon: ScanEye,
    color: "bg-indigo-500"
  },
  {
    title: "Auto Video Tour",
    description: "Cinematic walkthroughs generated automatically for your designs.",
    icon: Video,
    color: "bg-pink-500"
  },
  {
    title: "Download HD Images",
    description: "Export high-resolution 4K renders for professional use and planning.",
    icon: Download,
    color: "bg-orange-500"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to visualize your dream home without the cost of a professional designer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all group border-none glass">
                <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
