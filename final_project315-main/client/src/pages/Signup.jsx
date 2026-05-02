import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully!");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-[2.5rem] w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold">Expert Registration</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Join our network of specialists</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium px-1">Professional Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="expert@clinic.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-input w-full py-4 pl-12 pr-4 rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium px-1">Security Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input w-full py-4 pl-12 pr-4 rounded-2xl"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 px-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="text-primary-500 mt-0.5" size={14} />
            <span>By registering, you agree to our terms of professional conduct and data privacy policies.</span>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full py-4 rounded-2xl text-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
            {!isLoading && <UserPlus size={20} />}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
          Already a registered expert?{" "}
          <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
