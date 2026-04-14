import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring the possibilities.",
    features: [
      "2 room generations",
      "Standard quality images",
      "Watermarked results",
      "Community support"
    ],
    buttonText: "Start for Free",
    variant: "outline"
  },
  {
    name: "Pro",
    price: "$29",
    description: "For homeowners and enthusiasts.",
    features: [
      "50 room generations/mo",
      "4K high-quality renders",
      "No watermarks",
      "Priority AI processing",
      "Cinematic video tours"
    ],
    buttonText: "Get Pro Access",
    variant: "primary",
    recommended: true
  },
  {
    name: "Agency",
    price: "$99",
    description: "For interior design professionals.",
    features: [
      "Unlimited generations",
      "White-label results",
      "API access",
      "Dedicated account manager",
      "Custom style training"
    ],
    buttonText: "Contact Sales",
    variant: "outline"
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">Choose the plan that fits your vision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`p-8 relative ${plan.recommended ? 'scale-105 border-primary shadow-2xl z-10' : 'glass border-none'}`}>
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant as any} className="w-full rounded-2xl">
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
