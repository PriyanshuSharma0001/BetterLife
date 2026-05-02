import { Link } from "react-router-dom";
import { Heart, Moon, Sun, LayoutDashboard, MessageSquare, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3 rounded-2xl"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Heart className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
            BetterLife
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/chat" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors">
            <MessageSquare size={20} />
            <span className="hidden lg:inline">Assessment</span>
          </Link>
          <Link to="/support" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors">
            <Heart size={20} />
            <span className="hidden lg:inline">Support</span>
          </Link>
          <Link to="/feedback" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors">
            <Sparkles size={20} />
            <span className="hidden lg:inline">Feedback</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors">
            <LayoutDashboard size={20} />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-primary-400 transition-all"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/login" className="btn-primary py-2 px-4 text-sm font-medium">
            Professional Login
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
