import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Background3D } from "@/components/shared/Background3D";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.pannellum.org/2.5/pannellum.css" />
        <script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden bg-[#0A0A0A]`}>
        <Background3D />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
