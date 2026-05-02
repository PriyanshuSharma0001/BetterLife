import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  Sparkles, 
  ArrowRight, 
  RefreshCcw, 
  MessageCircle,
  BrainCircuit,
  Heart,
  ShieldCheck,
  PhoneCall
} from "lucide-react";
import toast from "react-hot-toast";

const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [categoryScores, setCategoryScores] = useState({
    Anxiety: 0,
    Depression: 0,
    Relationship: 0,
    Family: 0,
    Stress: 0,
    Loneliness: 0
  });
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
        addMessage("bot", "Hello. I'm here to listen and help you understand your emotional well-being. How are you feeling today?");
    }
  }, [questions]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chat");
      if (res.data && res.data.length > 0) {
        setQuestions(res.data);
      } else {
        throw new Error("No questions found");
      }
    } catch (err) {
      console.error("Error fetching questions, using fallback:", err);
      setQuestions([
        {
          text: "How have you been feeling lately?",
          level: 1,
          category: "General",
          options: [
            { text: "Mostly good", score: 1, impact: "General" },
            { text: "A bit off", score: 2, impact: "General" },
            { text: "Quite stressed", score: 4, impact: "Stress" },
            { text: "Very low", score: 5, impact: "Depression" }
          ]
        },
        {
          text: "Do you often feel worried or restless without a clear reason?",
          level: 2,
          category: "Anxiety",
          options: [
            { text: "Never", score: 1, impact: "Anxiety" },
            { text: "Occasionally", score: 3, impact: "Anxiety" },
            { text: "Very often", score: 5, impact: "Anxiety" }
          ]
        },
        {
          text: "Do you find it hard to enjoy things you used to like?",
          level: 3,
          category: "Depression",
          options: [
            { text: "Not at all", score: 1, impact: "Depression" },
            { text: "Sometimes", score: 3, impact: "Depression" },
            { text: "Often", score: 5, impact: "Depression" }
          ]
        }
      ]);
    }
  };

  const addMessage = (sender, text, isInitial = false) => {
    const newMessage = { sender, text, id: Date.now() };
    if (isInitial) {
        setMessages([newMessage]);
    } else {
        setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleOptionClick = (option) => {
    addMessage("user", option.text);
    
    // Update scores
    if (option.impact && option.impact !== "General") {
        setCategoryScores(prev => ({
            ...prev,
            [option.impact]: prev[option.impact] + (option.score || 0)
        }));
    }

    // Move to next question
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        const nextIdx = currentQuestionIdx + 1;
        if (nextIdx < questions.length) {
            setCurrentQuestionIdx(nextIdx);
            addMessage("bot", questions[nextIdx].text);
        } else {
            processResults();
        }
    }, 1000);
  };

  const processResults = () => {
    setDone(true);
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setShowSummary(true);
    }, 1500);
  };

  const getPrimaryConcern = () => {
    let maxScore = -1;
    let concern = "Stress";
    Object.entries(categoryScores).forEach(([key, value]) => {
      if (value > maxScore) {
        maxScore = value;
        concern = key;
      }
    });
    return concern;
  };

  const getSummaryMessage = () => {
    const concern = getPrimaryConcern();
    const messages = {
      Anxiety: "It seems like you've been carrying a lot of worry and restlessness lately. Anxiety can feel overwhelming, but understanding its roots is the first step.",
      Depression: "I hear a lot of sadness and low energy in your responses. It's okay to feel this way, but you don't have to go through it alone.",
      Relationship: "Emotional strain in relationships can be deeply draining. It seems like this is a significant area of concern for you right now.",
      Family: "Family dynamics are complex and can sometimes be a source of great pressure. Your feelings of disconnect are valid.",
      Stress: "You seem to be under a lot of pressure, possibly from work or daily responsibilities. Burnout is real, and taking care of yourself is vital.",
      Loneliness: "It feels like you're searching for more meaningful connections. Loneliness is a common but difficult experience that we can help you navigate."
    };
    return messages[concern] || "You've been going through a lot lately. Let's find the right way to support you.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(true);
    setIsSubmitting(true);
    try {
      const concern = getPrimaryConcern();
      const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
      
      await axios.post("http://localhost:5000/api/cases", {
        ...formData,
        score: totalScore,
        riskLevel: totalScore > 20 ? "High" : totalScore > 10 ? "Moderate" : "Low",
        primaryConcern: concern,
        categoryScores
      });
      toast.success("Details sent. A professional will contact you.");
      setShowSummary(false);
      setDone(true);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h2 className="font-bold">Emotional Wellness Chat</h2>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500 uppercase font-black tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Support
            </div>
          </div>
        </div>
        {!done && (
            <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Progress: {Math.round(((currentQuestionIdx) / (questions.length || 1)) * 100)}%
            </div>
        )}
      </div>

      <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                        msg.sender === 'user' ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`}>
                        {msg.sender === 'user' ? <User size={14} className="text-white" /> : <Sparkles size={14} className="text-primary-500" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex justify-start">
               <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <Sparkles size={14} className="text-primary-500" />
                    </div>
                    <div className="flex gap-1 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-white/5">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    </div>
               </div>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="p-6 bg-slate-50/50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div 
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {currentQuestion?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={isTyping}
                    onClick={() => handleOptionClick(opt)}
                    className="p-4 bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-slate-200 dark:border-white/10 hover:border-primary-300 rounded-2xl text-sm font-medium transition-all text-left flex items-center justify-between group disabled:opacity-50"
                  >
                    {opt.text}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </motion.div>
            ) : showSummary ? (
              <motion.div 
                key="summary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="text-center p-6 bg-primary-500/10 rounded-3xl border border-primary-500/20">
                    <Heart className="mx-auto text-primary-500 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Our Understanding</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {getSummaryMessage()}
                    </p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-white/5">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        Next Recommended Steps
                    </h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                                required
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="glass-input p-3 rounded-xl text-sm"
                            />
                            <input 
                                required
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="glass-input p-3 rounded-xl text-sm"
                            />
                            <input 
                                required
                                type="tel"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="glass-input p-3 rounded-xl text-sm"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                <PhoneCall size={18} />
                                Talk to a Specialist
                            </button>
                            <button 
                                type="button"
                                onClick={() => window.location.reload()}
                                className="btn-secondary px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={18} />
                            </button>
                        </div>
                    </form>
                </div>
              </motion.div>
            ) : (
                <div className="flex justify-center py-4">
                    <div className="animate-pulse text-primary-500 font-bold">Analyzing your responses...</div>
                </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <p className="text-[10px] text-center text-slate-400 mt-4 px-12">
        This conversation is private and intended to help you reflect. If you are in immediate danger, please contact emergency services.
      </p>
    </div>
  );
};

export default Chat;
