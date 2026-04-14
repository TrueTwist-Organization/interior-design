import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "InteriorAI | Transform Empty Rooms into Beautiful Spaces",
  description: "Upload empty room photos and instantly generate professional interior designs and a complete house tour video using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Abstract Background Decorations */}
        <div className="fixed inset-0 -z-10 bg-grid pointer-events-none opacity-50" />
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/30 blur-[120px] rounded-full -z-10" />
        
        <Navbar />
        <main className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
