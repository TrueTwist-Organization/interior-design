"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Users, Layout, Zap, DollarSign, Activity, Search, Filter, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react"

const stats = [
  { label: "Total Users", value: "12,482", icon: Users, change: "+12.5%", trending: "up" },
  { label: "AI Generations", value: "48,201", icon: Zap, change: "+18.2%", trending: "up" },
  { label: "Revenue", value: "$124,500", icon: DollarSign, change: "+5.4%", trending: "up" },
  { label: "Avg. Latency", value: "2.4s", icon: Activity, change: "-1.2s", trending: "down" }
]

const recentUsers = [
  { name: "John Smith", email: "john@example.com", plan: "Pro", date: "2m ago", credits: 450 },
  { name: "Sarah Miller", email: "sarah@design.io", plan: "Agency", date: "15m ago", credits: 2800 },
  { name: "David Chen", email: "dchen@work.com", plan: "Free", date: "1h ago", credits: 2 },
  { name: "Emily Watson", email: "emily@home.org", plan: "Pro", date: "4h ago", credits: 120 },
  { name: "Michael Ross", email: "mike@ross.co", plan: "Agency", date: "1d ago", credits: 5000 }
]

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Command Center</h1>
          <p className="text-muted-foreground">Monitor platform performance, users, and API usage.</p>
        </div>
        
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-2xl h-12 gap-2">
              <Activity className="w-4 h-4" /> API Health
           </Button>
           <Button className="rounded-2xl h-12 gap-2 shadow-lg shadow-primary/20 bg-linear-to-r from-red-600 to-red-600">
              System Alert
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 glass border-none hover:shadow-xl transition-all">
               <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                     <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${stat.trending === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {stat.trending === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                     {stat.change}
                  </div>
               </div>
               <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</h3>
               <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Table */}
        <Card className="lg:col-span-2 glass border-none overflow-hidden">
           <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Users</h3>
              <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Search className="w-4 h-4" /></Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Filter className="w-4 h-4" /></Button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-secondary/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                       <th className="px-6 py-4">User</th>
                       <th className="px-6 py-4">Plan</th>
                       <th className="px-6 py-4">Credits</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                    {recentUsers.map((user, i) => (
                       <tr key={i} className="hover:bg-primary/5 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                   {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                   <p className="text-sm font-bold">{user.name}</p>
                                   <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${user.plan === 'Agency' ? 'bg-purple-100 text-purple-600' : user.plan === 'Pro' ? 'bg-blue-100 text-blue-600' : 'bg-secondary text-muted-foreground'}`}>
                                {user.plan}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">{user.credits}</td>
                          <td className="px-6 py-4 font-mono text-xs">{user.date}</td>
                          <td className="px-6 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-4 text-center border-t border-border">
              <Button variant="ghost" className="text-xs text-primary font-bold">View All 12,482 Users</Button>
           </div>
        </Card>

        {/* API Usage chart placeholder */}
        <Card className="p-6 glass border-none h-fit">
           <h3 className="text-lg font-bold mb-6">Real-time Traffic</h3>
           <div className="space-y-6">
              {[
                 { label: "US East (N. Virginia)", value: "72%", color: "bg-indigo-600" },
                 { label: "EU West (London)", value: "48%", color: "bg-purple-600" },
                 { label: "Asia Pacific (Tokyo)", value: "15%", color: "bg-pink-600" }
              ].map((region, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span>{region.label}</span>
                       <span className="text-muted-foreground">{region.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: region.value }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full ${region.color}`}
                       />
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-20 pt-8 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-4">Instance Health: <span className="text-green-500 font-bold uppercase tracking-widest">(99.9%) High</span></p>
              <Button className="w-full rounded-xl">Optimize Cluster</Button>
           </div>
        </Card>
      </div>
    </div>
  )
}
