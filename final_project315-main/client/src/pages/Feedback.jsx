import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star, MessageSquare, Smile, Frown, Meh, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for your feedback!");
      setFeedback("");
      setRating(0);
      setIsSubmitting(false);
    }, 1500);
  };

  const ratings = [
    { value: 1, label: "Poor", icon: <Frown className="text-rose-500" /> },
    { value: 2, label: "Fair", icon: <Meh className="text-amber-500" /> },
    { value: 3, label: "Good", icon: <Smile className="text-emerald-500" /> },
    { value: 4, label: "Great", icon: <Star className="text-primary-500" /> },
    { value: 5, label: "Excellent", icon: <Sparkles className="text-indigo-500" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 rounded-[2.5rem]"
      >
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Your opinion <span className="text-primary-500">matters</span></h1>
            <p className="text-slate-500">Help us improve BetterLife by sharing your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
            {/* Rating */}
            <div className="space-y-4 text-center">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Rate your experience</label>
                <div className="flex justify-between gap-2">
                    {ratings.map((r) => (
                        <button
                            key={r.value}
                            type="button"
                            onClick={() => setRating(r.value)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl flex-1 transition-all ${
                                rating === r.value 
                                ? "bg-white dark:bg-slate-800 shadow-xl scale-110 ring-2 ring-primary-500" 
                                : "hover:bg-white/50 dark:hover:bg-black/20"
                            }`}
                        >
                            <div className="text-2xl">{r.icon}</div>
                            <span className={`text-[10px] font-bold uppercase ${rating === r.value ? "text-primary-500" : "text-slate-400"}`}>
                                {r.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment */}
            <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">Detailed Feedback</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <textarea 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Tell us what you liked or what we can improve..."
                        rows={5}
                        className="glass-input w-full pt-4 pl-12 pr-4 rounded-3xl resize-none"
                    />
                </div>
            </div>

            <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-5 rounded-[2rem] text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isSubmitting ? "Sending..." : "Submit Feedback"}
                <Send size={20} />
            </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;
