"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Lock, User, Sparkles, Home } from "lucide-react"



export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-32 pb-24 bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-[#0F0F0F] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-light text-white font-display mb-2 tracking-tight">Welcome <span className="font-bold">Back</span></h1>
            <p className="text-slate-500 tracking-wide text-sm">Sign in to continue to InteriorAI</p>
          </div>

          <div className="space-y-4 mb-8">
             <Button variant="outline" className="w-full rounded-2xl gap-3 bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors h-12">
               <Sparkles className="w-4 h-4 text-[#C5A059]" />
               Continue with Google
             </Button>
             <Button variant="outline" className="w-full rounded-2xl gap-3 bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors h-12">
               <Home className="w-4 h-4 text-[#C5A059]" />
               Continue with Github
             </Button>
          </div>

          <div className="relative mb-8 text-center">
            <hr className="border-white/10" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F0F0F] px-4 text-xs tracking-widest uppercase text-slate-500">OR</span>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] ml-1 text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full h-14 bg-[#1A1A1A] text-white rounded-2xl border border-white/5 pl-12 pr-4 focus:border-[#C5A059]/50 focus:outline-none transition-all placeholder:text-slate-600 [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Password</label>
                <Link href="#" className="text-[10px] text-[#C5A059] hover:underline uppercase tracking-wide">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 bg-[#1A1A1A] text-white rounded-2xl border border-white/5 pl-12 pr-4 focus:border-[#C5A059]/50 focus:outline-none transition-all placeholder:text-slate-600 [color-scheme:dark]"
                />
              </div>
            </div>

            <Link href="/dashboard">
              <Button className="w-full rounded-2xl h-14 mt-6 shadow-xl shadow-[#C5A059]/10 bg-[#C5A059] text-black hover:bg-white font-bold tracking-[0.2em] uppercase transition-all">Sign In</Button>
            </Link>
          </form>

          <p className="text-center mt-10 text-xs font-light tracking-wide text-slate-400">
            Don't have an account? <Link href="/signup" className="text-[#C5A059] font-bold hover:underline ml-1">Sign up</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
