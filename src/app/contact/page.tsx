"use client"

import { Card } from "@/components/ui/Card"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C5A059]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-20">
           <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] block">Get In Touch</span>
           <h1 className="text-5xl md:text-7xl font-light tracking-tight font-display text-white">Contact <span className="font-bold">Us</span></h1>
           <div className="h-px w-24 bg-[#C5A059] mx-auto mt-8" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
           
           {/* Left Side: Information */}
           <div className="space-y-12">
              <div>
                 <h2 className="text-3xl font-light text-white mb-4">Let's build your <span className="font-bold text-[#C5A059]">vision.</span></h2>
                 <p className="text-slate-400 text-lg font-light leading-relaxed">
                    Whether you have a question about our architectural AI, need custom enterprise solutions, or want to explore partnership opportunities, we're ready to talk.
                 </p>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/30 transition-all flex-shrink-0">
                       <Mail className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold mb-1">Email Us</h3>
                       <p className="text-slate-500 mb-2 font-light">Our team responds within 24 hours.</p>
                       <a href="mailto:support@interiorai.studio" className="text-[#C5A059] hover:text-white transition-colors font-medium">support@interiorai.studio</a>
                    </div>
                 </div>

                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/30 transition-all flex-shrink-0">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold mb-1">Visit Studio</h3>
                       <p className="text-slate-500 mb-2 font-light">Come see our intelligence at work.</p>
                       <p className="text-[#C5A059] font-medium">123 Architectural Way<br/>Design District, NY 10001</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/30 transition-all flex-shrink-0">
                       <Phone className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold mb-1">Call Us</h3>
                       <p className="text-slate-500 mb-2 font-light">Mon-Fri from 8am to 5pm.</p>
                       <p className="text-[#C5A059] font-medium">+1 (555) 000-0000</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Side: Form */}
           <Card className="p-10 lg:p-12 bg-[#0F0F0F] border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 blur-[80px] rounded-full pointer-events-none" />
              
              <form className="relative z-10 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">First Name</label>
                       <input type="text" className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-slate-700" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Last Name</label>
                       <input type="text" className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-slate-700" placeholder="Doe" />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Email Address</label>
                    <input type="email" className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-slate-700" placeholder="john@company.com" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">How can we help?</label>
                    <textarea rows={5} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder:text-slate-700 resize-none" placeholder="Tell us about your project..."></textarea>
                 </div>

                 <button type="button" className="group w-full bg-[#C5A059] text-black px-8 py-5 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-4 mt-8 shadow-xl shadow-[#C5A059]/10">
                    Send Message 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </form>
           </Card>

        </div>
      </div>
    </div>
  )
}
