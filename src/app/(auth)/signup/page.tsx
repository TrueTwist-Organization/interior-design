"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Lock, User, Globe, Sparkles } from "lucide-react"


export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 glass shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex bg-primary/10 p-3 rounded-2xl text-primary mb-4">
               <Sparkles />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Start designing your dream space today.</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full h-12 bg-white rounded-2xl border border-border pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full h-12 bg-white rounded-2xl border border-border pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 bg-white rounded-2xl border border-border pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <Button className="w-full rounded-2xl h-12 mt-4 shadow-lg shadow-primary/20">
              Create Account
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
