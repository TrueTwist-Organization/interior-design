"use client"

import Link from "next/link"
import { Sparkles, Globe, Mail, MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-20">
        
        {/* Brand Section */}
        <div className="md:col-span-5 space-y-10">
          <Link href="/" className="flex items-center gap-4 group">
             <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rotate-45 transition-all duration-1000 group-hover:rotate-180">
                <Sparkles className="w-5 h-5 text-black -rotate-45 group-hover:rotate-45 transition-all duration-1000" />
             </div>
             <span className="text-xl font-bold tracking-[0.2em] uppercase text-white font-display">Interior<span className="text-[#C5A059]">AI</span></span>
          </Link>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-light tracking-wide">
            Crafting the next generation of architectural visualizations through high-fidelity artificial intelligence. Elevating living standards, one space at a time.
          </p>
          <div className="flex gap-6">
             {[Globe, Mail, MessageSquare].map((Icon, i) => (
               <a key={i} href="#" className="text-slate-500 hover:text-[#C5A059] transition-colors">
                  <Icon className="w-5 h-5" />
               </a>
             ))}
          </div>
        </div>

        {/* The Studio Links */}
        <div className="md:col-span-3 space-y-8">
           <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-[#C5A059]">The Studio</h4>
           <div className="flex flex-col gap-5">
              {[
                { name: "Gallery", href: "/#gallery" },
                { name: "Models", href: "/#features" },
                { name: "Styles", href: "/#how-it-works" },
                { name: "Technology", href: "/#pricing" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[12px] text-slate-500 hover:text-white transition-all font-light tracking-widest uppercase">
                   {link.name}
                </Link>
              ))}
           </div>
        </div>

        {/* Legal Links */}
        <div className="md:col-span-4 space-y-8">
           <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-[#C5A059]">Legal</h4>
           <div className="flex flex-col gap-5">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Disclaimer", href: "/disclaimer" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[12px] text-slate-500 hover:text-white transition-all font-light tracking-widest uppercase">
                  {link.name}
                </Link>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col items-center justify-center gap-6">
         <span className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-500">
            © 2026 InteriorAI Studio. All Rights Reserved.
         </span>
         
         <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] uppercase font-black tracking-[0.3em] text-slate-500">AI Clusters Online</span>
         </div>
      </div>
    </footer>
  )
}
