
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Added missing TrendingUp icon to lucide-react imports.
import { ChevronRight, Brain, Flame, Trophy, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface LandingProps {
  onStart: () => void;
  children?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ onStart, children }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative bg-[#0B0F14] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00FF99]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 lg:pt-48 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00FF99]/10 text-[#00FF99] text-sm font-bold mb-6 tracking-wide uppercase border border-[#00FF99]/20">
              Future of Fitness
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Train Smart.<br />
              Stay Motivated.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF99] to-[#8B5CF6]">Don’t Quit.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Experience the luxury of an AI-powered personal trainer that understands your lifestyle, energy, and goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOnboarding(true)}
              className="px-8 py-4 bg-[#00FF99] text-[#0B0F14] font-bold rounded-xl flex items-center space-x-3 neon-glow transition-all"
            >
              <span>Start My Fitness Journey</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             <GlassCard className="mt-12" delay={0.2}>
               <Brain className="text-[#00FF99] w-8 h-8 mb-4" />
               <h3 className="font-bold mb-2">AI Guidance</h3>
               <p className="text-sm text-gray-400">Personalized logic that adapts to your energy levels daily.</p>
             </GlassCard>
             <GlassCard delay={0.4}>
               <Flame className="text-[#F59E0B] w-8 h-8 mb-4" />
               <h3 className="font-bold mb-2">Motivation</h3>
               <p className="text-sm text-gray-400">Strategic pushes when you feel like skipping a day.</p>
             </GlassCard>
             <GlassCard delay={0.6}>
               <Trophy className="text-[#8B5CF6] w-8 h-8 mb-4" />
               <h3 className="font-bold mb-2">Rewards</h3>
               <p className="text-sm text-gray-400">Consistency badges that value effort over perfection.</p>
             </GlassCard>
             <GlassCard className="mt-[-48px]" delay={0.8}>
               <div className="flex items-center space-x-2 text-[#00FF99] mb-4">
                 <TrendingUp className="w-8 h-8" />
                 <span className="text-xl font-bold">45 Days</span>
               </div>
               <h3 className="font-bold mb-2">Structure</h3>
               <p className="text-sm text-gray-400">A clear path to a better version of yourself.</p>
             </GlassCard>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-48 text-center pb-20"
        >
          <p className="text-2xl lg:text-3xl italic text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
            "You don’t need discipline every day. You need the right push on the right day."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
