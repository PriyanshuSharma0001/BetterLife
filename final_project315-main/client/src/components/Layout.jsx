import Navbar from "./Navbar";
import Background from "./Background";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      <Toaster position="bottom-right" />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-28 pb-12 px-6 max-w-7xl mx-auto"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <div className="fixed bottom-0 left-0 w-full p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-center">
            <div className="glass-card px-4 py-2 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 pointer-events-auto">
                ⚠️ Disclaimer: This platform does not provide medical diagnosis.
            </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
