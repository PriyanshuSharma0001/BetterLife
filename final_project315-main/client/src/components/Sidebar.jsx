import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  PieChart,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Patients", path: "/dashboard/patients", icon: <Users size={20} /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <PieChart size={20} /> },
    { name: "Notifications", path: "/dashboard/notifications", icon: <Bell size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="hidden lg:flex flex-col w-72 glass-card h-[calc(100vh-140px)] rounded-[2.5rem] p-6 sticky top-28">
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
              location.pathname === item.path 
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
              : "hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-primary-500"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-bold">{item.name}</span>
            </div>
            {location.pathname === item.path && (
              <motion.div layoutId="arrow">
                <ChevronRight size={18} />
              </motion.div>
            )}
          </Link>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 p-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
