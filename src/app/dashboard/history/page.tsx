"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Search, Filter, ArrowUpRight, Calendar, Bookmark, Download } from "lucide-react"
import Link from "next/link"

const history = [
  {
    id: "1",
    date: "2024-03-15",
    type: "2 BHK",
    style: "Modern Scandinavian",
    thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400",
    status: "Completed"
  },
  {
    id: "2",
    date: "2024-03-12",
    type: "1 BHK",
    style: "Minimalist Loft",
    thumbnail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400",
    status: "Completed"
  },
  {
    id: "3",
    date: "2024-03-08",
    type: "3 BHK",
    style: "Luxury Classic",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=80&w=400",
    status: "Completed"
  }
]

export default function HistoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Design History</h1>
          <p className="text-muted-foreground">Revisit and manage your previous AI interior designs.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                 type="text" 
                 placeholder="Search designs..." 
                 className="h-12 bg-white rounded-2xl border border-border pl-12 pr-4 w-64 focus:ring-2 focus:ring-primary focus:outline-none"
              />
           </div>
           <Button variant="outline" className="rounded-2xl h-12 gap-2">
              <Filter className="w-4 h-4" /> Filter
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {history.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass group overflow-hidden">
               <div className="relative aspect-video overflow-hidden">
                  <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Link href="/dashboard/results">
                        <Button variant="glass" className="h-10 px-4 rounded-xl gap-2 font-bold">
                           View Result <ArrowUpRight className="w-4 h-4" />
                        </Button>
                     </Link>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                      <Bookmark className="w-4 h-4" />
                  </div>
               </div>
               
               <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                     <Calendar className="w-3 h-3 text-muted-foreground" />
                     <span className="text-xs text-muted-foreground font-medium">{item.date}</span>
                  </div>
                  <h3 className="font-bold mb-1">{item.type} Property</h3>
                  <p className="text-sm text-muted-foreground mb-6">{item.style}</p>
                  
                  <div className="flex gap-2">
                     <Button variant="secondary" className="flex-1 h-9 text-xs rounded-xl">Edit Name</Button>
                     <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                        <Download className="w-4 h-4 text-primary" />
                     </Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
