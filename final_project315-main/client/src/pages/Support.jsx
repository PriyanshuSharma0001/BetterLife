import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Globe,
  Clock,
  ShieldCheck,
  HeartHandshake,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const Support = () => {
  const contacts = [
    {
      title: "24/7 Crisis Hotline",
      info: "1-800-273-8255",
      icon: <PhoneCall className="text-rose-500" />,
      desc: "Immediate support for those in distress."
    },
    {
      title: "Email Support",
      info: "help@betterlife.org",
      icon: <Mail className="text-primary-500" />,
      desc: "Get a response within 24 hours."
    },
    {
      title: "Online Community",
      info: "betterlife.org/community",
      icon: <Globe className="text-emerald-500" />,
      desc: "Connect with peers in a safe space."
    }
  ];

  return (
    <div className="space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          We're here to <span className="text-primary-500">support you</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          If you're feeling overwhelmed, please reach out. Whether it's a crisis or you just need to talk, 
          multiple resources are available for you right now.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {contacts.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2rem] hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white/50 dark:bg-black/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              {c.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{c.title}</h3>
            <div className="text-primary-600 dark:text-primary-400 font-bold mb-4">{c.info}</div>
            <p className="text-slate-500 text-sm">{c.desc}</p>
          </motion.div>
        ))}
      </div>

      <section className="glass-card rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div className="flex items-center gap-2 text-primary-500 mb-4">
                    <HeartHandshake size={24} />
                    <span className="font-bold tracking-widest uppercase text-xs">Helpful Resources</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Mental health is a journey, not a destination.</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full mt-1">
                            <ShieldCheck className="text-emerald-600" size={16} />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">Regular check-ins help identify patterns early.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full mt-1">
                            <ShieldCheck className="text-emerald-600" size={16} />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">Practicing mindfulness can reduce daily anxiety.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full mt-1">
                            <ShieldCheck className="text-emerald-600" size={16} />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">Quality sleep is the foundation of mental well-being.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square glass-card rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-primary-500 hover:text-white transition-all cursor-pointer">
                    <MessageSquare size={32} className="mb-4" />
                    <span className="font-bold text-sm">Self-Help Guide</span>
                </div>
                <div className="aspect-square glass-card rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-indigo-500 hover:text-white transition-all cursor-pointer">
                    <Clock size={32} className="mb-4" />
                    <span className="font-bold text-sm">Therapy Tools</span>
                </div>
                <div className="col-span-2 glass-card rounded-3xl flex items-center justify-between p-6 hover:bg-slate-900 hover:text-white transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-500 p-2 rounded-lg text-white">
                            <ExternalLink size={20} />
                        </div>
                        <span className="font-bold">National Mental Health Directory</span>
                    </div>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
      </section>
    </div>
  );
};

export default Support;
