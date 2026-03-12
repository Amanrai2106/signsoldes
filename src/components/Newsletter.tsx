"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white px-[5px]">
      <div className="w-full bg-[#f7f9fc] py-20 px-6 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden border border-black/5">
        {/* Decorative elements - Wayfinding style */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 -mr-32 -mt-32 rotate-45 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 -ml-16 -mb-16 pointer-events-none" />

        <div className="max-w-2xl text-center lg:text-left z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-600 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4"
          >
            Stay in the loop
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-black tracking-tighter leading-none mb-6 uppercase whitespace-nowrap"
          >
            JOIN OUR <span className="italic font-serif text-orange-600">MAILING LIST</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Be the first to know about our latest architectural wayfinding projects, design insights, and studio news.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md z-10"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-black px-6 py-5 outline-none text-lg placeholder:text-gray-400 border-2 border-black/5 focus:border-orange-500/30 transition-all rounded-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="absolute right-2 top-2 bottom-2 bg-black hover:bg-orange-600 text-white px-6 transition-all flex items-center gap-2 group/btn active:scale-95 disabled:opacity-70 rounded-none"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" />
                ) : isSubmitted ? (
                  <span className="font-bold text-sm uppercase tracking-widest">Sent!</span>
                ) : (
                  <>
                    <span className="font-bold text-sm uppercase tracking-widest hidden sm:inline">Join</span>
                    <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest text-center lg:text-left">
              * We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
