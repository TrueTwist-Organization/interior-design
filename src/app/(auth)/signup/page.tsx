"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Lock, User, Globe, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock user creation delay if needed or API call can go here
    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-32 pb-24 bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-[#0F0F0F] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex bg-[#C5A059]/10 p-3 rounded-2xl text-[#C5A059] mb-4">
               <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white font-display mb-2 tracking-tight">Create <span className="font-bold">Account</span></h1>
            <p className="text-slate-500 tracking-wide text-sm">Start designing your dream space today.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] ml-1 text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full h-14 bg-[#1A1A1A] text-white rounded-2xl border border-white/5 pl-12 pr-4 focus:border-[#C5A059]/50 focus:outline-none transition-all placeholder:text-slate-600 [color-scheme:dark]"
                />
              </div>
            </div>

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
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] ml-1 text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 bg-[#1A1A1A] text-white rounded-2xl border border-white/5 pl-12 pr-4 focus:border-[#C5A059]/50 focus:outline-none transition-all placeholder:text-slate-600 [color-scheme:dark]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-2xl h-14 mt-6 bg-[#C5A059] text-black hover:bg-white font-bold tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#C5A059]/10">
              Create Account
            </Button>
          </form>

          <p className="text-center mt-10 text-xs font-light tracking-wide text-slate-400">
            Already have an account? <Link href="/login" className="text-[#C5A059] font-bold hover:underline ml-1">Sign in</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
