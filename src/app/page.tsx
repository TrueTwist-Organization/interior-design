import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Features />
      <BeforeAfterSlider />
      <HowItWorks />
      <Pricing />
      <FAQ />
    </div>
  );
}
