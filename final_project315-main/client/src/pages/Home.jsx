import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Shield, Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  const nav = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="text-primary-500" size={32} />,
      title: "Empathetic Support",
      description: "Chat with our AI-powered support system designed to understand and guide you."
    },
    {
      icon: <Shield className="text-primary-500" size={32} />,
      title: "Safe & Private",
      description: "Your conversations are encrypted and private. We prioritize your mental well-being."
    },
    {
      icon: <Sparkles className="text-primary-500" size={32} />,
      title: "Personalized Care",
      description: "Get insights tailored to your specific symptoms and emotional state."
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium"
        >
          <Heart size={16} fill="currentColor" />
          <span>Your mental health matters</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
        >
          Find Your Path to a <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
            Better Life
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
        >
          Welcome to BetterLife, a compassionate space to explore your mental health. 
          Identify symptoms, find professional help, and take the first step towards feeling better.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => nav("/chat")}
            className="btn-primary flex items-center gap-2 py-4 px-8 text-lg"
          >
            Start Chat Now
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => nav("/login")}
            className="btn-secondary py-4 px-8 text-lg"
          >
            Psychologist Login
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-3xl group transition-all duration-300"
            >
              <div className="mb-6 bg-primary-50 dark:bg-primary-900/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-20 w-full text-center">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="glass-card p-12 rounded-[3rem]"
        >
            <h2 className="text-3xl font-bold mb-8">Trusted by individuals worldwide</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">10k+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Active Users</div>
                </div>
                <div>
                    <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">24/7</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Support</div>
                </div>
                <div>
                    <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">100%</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Private</div>
                </div>
                <div>
                    <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">50+</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">Experts</div>
                </div>
            </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
