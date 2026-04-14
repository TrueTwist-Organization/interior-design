import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { Sparkles, Zap, Shield, Crown } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-0 pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Flexible Subscription Models</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
           Ready to Design Your <span className="text-gradient">Future Home?</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
           Whether you are a casual homeowner or a professional agency, we have the perfect plan to help you visualize stunning interiors.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
           {[
              { icon: Zap, label: "Fast Rendering" },
              { icon: Shield, label: "Secure Data" },
              { icon: Crown, label: "Premium Stocks" },
              { icon: Sparkles, label: "AI Precision" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center text-primary">
                 <item.icon className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-muted-foreground uppercase">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
      
      <Pricing />
      <FAQ />
    </div>
  );
}
