import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  User, 
  Mail, 
  Phone, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
      return;
    }

    fetchCases();
  }, [nav]);

  const fetchCases = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/cases", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        nav("/login");
      }
      toast.error("Failed to load cases");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/cases/${id}`, {
        status: "Contacted"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Status updated");
      fetchCases(); 
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    nav("/");
  };

  const stats = [
    { label: "Total Cases", value: cases.length, icon: <Users className="text-blue-500" /> },
    { label: "Pending", value: cases.filter(c => c.status !== "Contacted").length, icon: <Clock className="text-amber-500" /> },
    { label: "Resolved", value: cases.filter(c => c.status === "Contacted").length, icon: <CheckCircle className="text-emerald-500" /> },
    { label: "High Risk", value: cases.filter(c => c.riskLevel === "High").length, icon: <AlertTriangle className="text-rose-500" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cases Overview</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, your patients are waiting.</p>
          </div>
          <div className="lg:hidden">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-200 transition-colors font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 dark:bg-black/5">
            <div className="flex items-center gap-2 font-bold text-lg">
              <BarChart3 size={20} className="text-primary-500" />
              Recent Cases
            </div>
            <div className="flex gap-2 text-[10px] md:text-xs">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500" /> High Risk</span>
                <span className="flex items-center gap-1 ml-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Medium Risk</span>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-500 animate-pulse">Fetching cases...</p>
              </div>
            ) : cases.length === 0 ? (
              <div className="text-center py-20">
                  <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold">No cases found</h3>
                  <p className="text-slate-500">Wait for users to reach out through the chat.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {cases.map((c, idx) => (
                    <motion.div
                      key={c._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-3xl bg-white/5 hover:bg-white/10 dark:hover:bg-black/20 border border-white/5 transition-all duration-300"
                    >
                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold shrink-0">
                            {c.name ? c.name[0].toUpperCase() : <User size={18} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-lg leading-none truncate">{c.name || "Anonymous User"}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                              <span className="flex items-center gap-1"><Mail size={12} /> {c.email || "N/A"}</span>
                              <span className="flex items-center gap-1"><Phone size={12} /> {c.phone || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Detailed Analytics */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                            <div className="col-span-full mb-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Primary Concern: </span>
                                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{c.primaryConcern || "N/A"}</span>
                            </div>
                            {c.categoryScores && Object.entries(c.categoryScores).map(([cat, score]) => (
                                <div key={cat} className="flex items-center justify-between px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5">
                                    <span className="text-[10px] text-slate-500">{cat}</span>
                                    <span className={`text-[10px] font-bold ${score > 3 ? 'text-rose-500' : 'text-slate-600 dark:text-slate-400'}`}>{score}</span>
                                </div>
                            ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          c.riskLevel === 'High' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                          c.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        }`}>
                          {c.riskLevel}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          c.status === 'Contacted' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {c.status}
                        </div>
                        
                        {c.status !== "Contacted" && (
                          <button 
                            onClick={() => updateStatus(c._id)}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-primary-500/20 ml-auto md:ml-0"
                          >
                            Mark Contacted
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
