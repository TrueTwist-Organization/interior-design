"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto glass rounded-[2rem] px-8 py-3 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">InteriorAI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          <div className="flex items-center gap-4 border-l pl-8 ml-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-[2rem] p-6 flex flex-col gap-4 shadow-2xl"
        >
          <Link href="#features" className="text-lg font-medium p-2">Features</Link>
          <Link href="#how-it-works" className="text-lg font-medium p-2">How it Works</Link>
          <Link href="/pricing" className="text-lg font-medium p-2">Pricing</Link>
          <hr className="border-border/50" />
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link href="/signup" className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
