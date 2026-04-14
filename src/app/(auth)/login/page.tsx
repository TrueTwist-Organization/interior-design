"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Lock, User, Sparkles, Home } from "lucide-react"



export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 glass shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue to InteriorAI</p>
          </div>

          <div className="space-y-4 mb-8">
             <Button variant="outline" className="w-full rounded-2xl gap-3">
               <Sparkles className="w-4 h-4" />
               Continue with Google
             </Button>
             <Button variant="outline" className="w-full rounded-2xl gap-3">
               <Home className="w-4 h-4" />
               Continue with Github
             </Button>
          </div>

          <div className="relative mb-8 text-center">
            <hr className="border-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-muted-foreground">OR</span>
          </div>

          <form className="space-y-4">
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
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 bg-white rounded-2xl border border-border pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <Link href="/dashboard">
              <Button className="w-full rounded-2xl h-12 mt-4">Sign In</Button>
            </Link>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
