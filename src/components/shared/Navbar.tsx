"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles, User, LogOut, LayoutDashboard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Pricing", href: "/#pricing" },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rotate-45 group-hover:rotate-180 transition-all duration-1000 shadow-[0_0_20px_rgba(197,160,89,0.3)]">
              <Sparkles className="w-5 h-5 text-black -rotate-45 group-hover:-rotate-180 transition-all duration-1000" />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase text-white font-display">Interior<span className="text-[#C5A059]">AI</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 hover:text-[#C5A059] transition-all duration-500 hover:tracking-[0.4em]"
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/5" />
            
            {/* Added LOGIN button as requested */}
            <Link href="/login" className="text-[10px] uppercase font-black tracking-[0.3em] text-white/60 hover:text-white transition-all">
               Login
            </Link>

            {/* Changed from Access Studio to GET STARTED and pointing to signup */}
            <Link href="/signup" className="group relative">
              <button className="bg-white text-black px-10 py-3.5 text-[10px] uppercase font-black tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-all duration-700 shadow-2xl overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-3 bg-white/5 rounded-full border border-white/5 text-white active:scale-90 transition-all z-50" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Premium Mobile Menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#050505] lg:hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(90deg, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="h-full flex flex-col justify-center p-10 space-y-12">
              <div className="space-y-2">
                <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em]">Navigator</span>
                <div className="h-px w-10 bg-[#C5A059]" />
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-4xl font-light text-white hover:text-[#C5A059] transition-all flex items-center justify-between group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#C5A059]" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-10 scrollbar-hide overflow-y-auto">
                 <Link href="/login" className="mb-4 block text-[10px] text-center uppercase font-black tracking-[0.3em] text-white/40" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                 </Link>
                 <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-[#C5A059] text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#C5A059]/20 flex items-center justify-center gap-4">
                      Get Started <ChevronRight className="w-5 h-5" />
                    </button>
                 </Link>
                 <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                       <span className="block text-[#C5A059] text-lg font-bold">12k+</span>
                       <span className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em]">Designs</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                       <span className="block text-[#C5A059] text-lg font-bold">4.9/5</span>
                       <span className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em]">Rating</span>
                    </div>
                 </div>
              </div>

              <div className="flex justify-between items-center text-[8px] uppercase font-bold tracking-[0.3em] text-white/20">
                 <span>© 2024 InteriorAI Studio</span>
                 <span>Elite Architectural Unit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
