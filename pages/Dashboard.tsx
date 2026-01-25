
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  Zap, 
  Smile, 
  Frown, 
  Meh, 
  CheckCircle2, 
  Sparkles,
  Award,
  Send,
  Loader2,
  HeartPulse,
  BrainCircuit,
  ShieldAlert,
  Trophy,
  Activity,
  ChevronRight,
  Info,
  TrendingUp,
  Monitor,
  Home,
  X,
  Lock
} from 'lucide-react';
import { AppState, LocationPreference, Exercise, CheckIn } from '../types';
import { GlassCard } from '../components/GlassCard';
import { WORKOUT_PLAN } from '../constants';
import { aiService } from '../services/gemini';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';

interface DashboardProps {
  activeTab: 'dashboard' | 'workout' | 'motivation' | 'rewards' | 'chat';
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, state, updateState }) => {
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState(2); 
  const [aiMotivation, setAiMotivation] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [workoutView, setWorkoutView] = useState<'active' | 'map'>('active');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentWorkout = WORKOUT_PLAN[activeDayIndex];
  const workoutList = state.profile?.location === LocationPreference.GYM ? currentWorkout.gymWorkout : currentWorkout.homeWorkout;

  useEffect(() => {
    const fetchMotivation = async () => {
      if (state.profile) {
        const msg = await aiService.getPersonalizedMotivation(state.profile, energy, mood);
        setAiMotivation(msg);
      }
    };
    fetchMotivation();
  }, [state.profile, energy, mood]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCheckIn: CheckIn = {
      date: today,
      energy,
      mood,
      stress: 5,
      completed: true
    };
    
    updateState(prev => ({
      ...prev,
      checkIns: [...prev.checkIns.filter(c => c.date !== today), newCheckIn],
      streak: prev.streak + 1
    }));
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00FF99', '#8B5CF6', '#F59E0B']
    });
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !state.profile) return;
    
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await aiService.chat(state.profile, chatMessages, userMsg);
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const renderDashboard = () => (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 bg-gradient-to-br from-[#00FF99]/5 to-transparent border-[#00FF99]/10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[11px] font-black text-[#00FF99] uppercase tracking-[0.2em] mb-2">Target Protocol</h2>
              <h3 className="text-4xl font-black italic tracking-tighter leading-none">{currentWorkout.title}</h3>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center min-w-[80px]">
              <span className="block text-[10px] font-bold text-gray-500 uppercase">Est. Time</span>
              <span className="text-sm font-black text-[#00FF99]">45m</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mb-8">
             <div className="flex items-center space-x-2">
               <div className="flex gap-1">
                 {[1, 2, 3].map(i => (
                   <div key={i} className={`w-3 h-1 rounded-full ${i <= currentWorkout.intensity ? 'bg-[#00FF99]' : 'bg-white/10'}`} />
                 ))}
               </div>
               <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Load Rating</span>
             </div>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center space-x-2 text-gray-400">
               {state.profile?.location === LocationPreference.GYM ? <Activity className="w-4 h-4" /> : <Home className="w-4 h-4" />}
               <span className="text-[10px] font-black uppercase tracking-widest">{state.profile?.location} Mode</span>
             </div>
          </div>

          <div className="p-6 bg-[#00FF99]/5 border border-[#00FF99]/10 rounded-2xl flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#00FF99]/20 flex items-center justify-center shrink-0">
               <Sparkles className="w-5 h-5 text-[#00FF99]" />
            </div>
            <div>
               <p className="text-gray-300 font-medium leading-relaxed">
                 {aiMotivation || "Our neural engine is preparing your daily focus shift..."}
               </p>
               <span className="text-[10px] text-[#00FF99] font-black uppercase mt-3 block tracking-[0.2em]">Validated by VigorAI</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-[#8B5CF6]/5 to-transparent border-[#8B5CF6]/10">
          <h2 className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em] mb-6">Biometric Check</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <label className="text-[11px] text-gray-500 uppercase font-black">Energy Density</label>
                 <span className="text-sm font-black text-[#00FF99] mono">{energy}/10</span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={energy} 
                onChange={e => setEnergy(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FF99]"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[11px] text-gray-500 uppercase font-black block">Neural State</label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(m => (
                  <button 
                    key={m}
                    onClick={() => setMood(m)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${mood === m ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-xl' : 'bg-white/2 border-white/5 text-gray-600 hover:bg-white/5'}`}
                  >
                    {m === 1 && <Frown className="w-6 h-6 mb-1" />}
                    {m === 2 && <Meh className="w-6 h-6 mb-1" />}
                    {m === 3 && <Smile className="w-6 h-6 mb-1" />}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleCheckIn}
              className="w-full py-4 bg-[#8B5CF6] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 shadow-lg shadow-[#8B5CF6]/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sync Metrics</span>
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard className="lg:col-span-7">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center space-x-3">
              <Activity className="text-[#00FF99] w-5 h-5" />
              <h3 className="text-lg font-black italic uppercase">Daily Tasks</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Level {state.profile?.level} Protocol</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutList.length > 0 ? workoutList.map((ex, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-3xl group cursor-pointer hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#00FF99]/10 flex items-center justify-center text-[#00FF99] font-black text-xs">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{ex.name}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">{ex.sets} × {ex.reps || ex.duration}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExercise(ex)}
                  className="p-2 hover:bg-[#00FF99]/10 rounded-xl transition-all group-hover:text-[#00FF99] text-gray-700"
                >
                    <Info className="w-4 h-4" />
                </button>
              </motion.div>
            )) : (
              <div className="col-span-2 py-20 text-center">
                <HeartPulse className="w-16 h-16 text-white/5 mx-auto mb-4" />
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Cellular Recovery Active</p>
              </div>
            )}
          </div>
        </GlassCard>

        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="h-[280px]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Momentum Trend</h3>
                <TrendingUp className="w-4 h-4 text-[#00FF99]" />
             </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'M', score: 30 },
                  { name: 'T', score: 45 },
                  { name: 'W', score: 40 },
                  { name: 'T', score: 65 },
                  { name: 'F', score: 80 },
                  { name: 'S', score: 75 },
                  { name: 'S', score: 90 },
                ]}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF99" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00FF99" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="score" stroke="#00FF99" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );

  const renderProgressMap = () => {
    const totalDays = 45;
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    
    return (
      <div className="pb-20 animate-in fade-in duration-500">
        <GlassCard className="!p-10 border-[#00FF99]/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Tactical Evolution Grid</h3>
              <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">Tracing your 45-day neural & physiological restructuring</p>
            </div>
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-[#00FF99] neon-glow" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Locked In</span>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Future Protocol</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-4">
            {days.map(day => {
              const isActive = day <= state.streak;
              return (
                <div 
                  key={day}
                  className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all ${
                    isActive 
                      ? 'bg-[#00FF99]/10 border-[#00FF99] text-[#00FF99] shadow-lg shadow-[#00FF99]/10' 
                      : 'bg-white/[0.02] border-white/5 text-gray-800'
                  }`}
                >
                  <span className="text-lg font-black italic">{day}</span>
                  {isActive ? <CheckCircle2 className="w-3 h-3 mt-1" /> : <Lock className="w-3 h-3 mt-1 opacity-20" />}
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-8 bg-[#00FF99]/5 border border-[#00FF99]/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
               <Trophy className="w-10 h-10 text-[#00FF99]" />
               <div>
                 <h4 className="text-lg font-black italic uppercase tracking-tight">Phase 01 Status: Optimal</h4>
                 <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Evolution progress: {Math.round((state.streak / 45) * 100)}% COMPLETE</p>
               </div>
            </div>
            <button 
              onClick={() => setWorkoutView('active')} 
              className="w-full md:w-auto px-6 py-3 bg-[#00FF99] text-black rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Resume Active Cycle
            </button>
          </div>
        </GlassCard>
      </div>
    );
  };

  const renderWorkoutPlan = () => (
    <div className="h-full flex flex-col space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Protocol<br /><span className="text-[#00FF99]">Evolution</span></h2>
          <div className="flex items-center space-x-3 mt-3">
            <div className="px-2.5 py-1 bg-[#00FF99]/10 text-[#00FF99] rounded text-[10px] font-black uppercase tracking-widest">Cycle 01</div>
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">45 Day Mastery Program</div>
          </div>
        </div>
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10 shrink-0">
           <button 
             onClick={() => setWorkoutView('active')}
             className={`px-4 lg:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${workoutView === 'active' ? 'bg-[#00FF99] text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
           >
             Active
           </button>
           <button 
             onClick={() => setWorkoutView('map')}
             className={`px-4 lg:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${workoutView === 'map' ? 'bg-[#00FF99] text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
           >
             Map
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {workoutView === 'map' ? (
          <motion.div 
            key="map" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderProgressMap()}
          </motion.div>
        ) : (
          <motion.div 
            key="active" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col lg:flex-row gap-8 items-start"
          >
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-2 lg:sticky lg:top-10">
              <div className="px-4 mb-4">
                 <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em]">Evolution Track</span>
              </div>
              {WORKOUT_PLAN.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDayIndex(i)}
                  className={`w-full group text-left p-5 rounded-3xl border transition-all flex items-center justify-between overflow-hidden relative ${
                    activeDayIndex === i 
                      ? 'bg-gradient-to-r from-[#00FF99]/10 to-transparent border-[#00FF99] shadow-2xl' 
                      : 'bg-white/2 border-white/5 hover:bg-white/5'
                  }`}
                >
                  {activeDayIndex === i && (
                    <motion.div layoutId="active-indicator" className="absolute left-0 top-0 w-1 h-full bg-[#00FF99]" />
                  )}
                  <div className="relative z-10">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${activeDayIndex === i ? 'text-[#00FF99]' : 'text-gray-600'}`}>
                      {day.day}
                    </span>
                    <h4 className={`text-sm font-black transition-colors ${activeDayIndex === i ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {day.title}
                    </h4>
                  </div>
                  <div className={`p-2 rounded-xl transition-all ${activeDayIndex === i ? 'bg-[#00FF99] text-black shadow-lg shadow-[#00FF99]/20' : 'bg-white/5 text-gray-700'}`}>
                     <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </aside>

            <div className="flex-1 w-full min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDayIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <GlassCard className="!p-6 lg:!p-10 bg-gradient-to-br from-[#00FF99]/5 via-transparent to-transparent border-white/10 shadow-3xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                      <div className="space-y-3">
                        <h3 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-none">{currentWorkout.title}</h3>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                            <Clock className="w-4 h-4 text-[#00FF99]" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">60 Minutes</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                            <Monitor className="w-4 h-4 text-[#00FF99]" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">{state.profile?.location} Mode</span>
                          </div>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto px-10 py-5 bg-[#00FF99] text-black font-black uppercase text-xs tracking-[0.3em] rounded-3xl neon-glow shadow-2xl"
                      >
                        Engage Protocol
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workoutList.length > 0 ? (
                        workoutList.map((ex, i) => (
                          <div key={i} className="p-6 lg:p-8 bg-[#0B0F14]/60 border border-white/5 rounded-[40px] flex items-center justify-between group hover:border-[#00FF99]/30 transition-all shadow-xl">
                            <div className="flex items-center space-x-6">
                              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#00FF99]/10 flex items-center justify-center font-black text-[#00FF99] text-sm">
                                {i+1}
                              </div>
                              <div>
                                <h4 className="font-black text-sm lg:text-base tracking-tight mb-1">{ex.name}</h4>
                                <div className="flex items-center space-x-3">
                                   <span className="text-[10px] lg:text-[11px] text-gray-500 font-black uppercase tracking-widest">{ex.sets} Sets</span>
                                   <div className="w-1 h-1 rounded-full bg-white/10" />
                                   <span className="text-[10px] lg:text-[11px] text-[#00FF99] font-black uppercase tracking-widest">{ex.reps || ex.duration}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedExercise(ex)}
                              className="p-3 bg-white/5 rounded-2xl hover:bg-[#00FF99]/20 transition-all group-hover:text-[#00FF99] text-gray-600"
                            >
                               <Info className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 py-32 text-center">
                           <div className="relative inline-block mb-10">
                              <div className="absolute inset-0 bg-[#00FF99] blur-3xl opacity-10" />
                              <HeartPulse className="w-20 h-20 text-[#00FF99] opacity-40 mx-auto relative z-10" />
                           </div>
                           <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">Total Recalibration</h4>
                           <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium leading-relaxed">
                             Physiological adaptation occurs during rest. We have prioritized metabolic repair and muscular recovery for this cycle.
                           </p>
                        </div>
                      )}
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <GlassCard className="border-[#00FF99]/20 !p-8">
                        <div className="flex items-center space-x-3 mb-6">
                           <Zap className="w-5 h-5 text-[#00FF99]" />
                           <h5 className="text-[11px] font-black text-[#00FF99] uppercase tracking-[0.2em]">Metabolic Engine: Cardio</h5>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-bold italic">"{currentWorkout.cardio}"</p>
                     </GlassCard>
                     <GlassCard className="border-[#8B5CF6]/20 !p-8">
                        <div className="flex items-center space-x-3 mb-6">
                           <Activity className="w-5 h-5 text-[#8B5CF6]" />
                           <h5 className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">Structural Focus: Stretch</h5>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-bold italic">"{currentWorkout.stretching}"</p>
                     </GlassCard>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderMotivationHub = () => (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="bg-gradient-to-br from-[#8B5CF6]/10 to-transparent flex flex-col justify-center min-h-[400px] border-[#8B5CF6]/20 p-12">
          <BrainCircuit className="w-16 h-16 text-[#8B5CF6] mb-10" />
          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">Neural<br />Fortitude</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-sm font-medium">
            Discipline is not an act, but a habit. We are reshaping your baseline response to discomfort.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-4 bg-[#8B5CF6] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Daily Insight</button>
            <button className="px-8 py-4 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest">Mental Reset</button>
          </div>
        </GlassCard>
        
        <GlassCard className="bg-[#00FF99]/5 border-[#00FF99]/10 p-12">
          <h3 className="text-[11px] font-black text-[#00FF99] uppercase tracking-[0.2em] mb-10">Comeback Algorithms</h3>
          <div className="space-y-6">
            <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-[#00FF99]/20 transition-all cursor-pointer">
              <h4 className="font-black text-white text-base uppercase tracking-tight mb-2 italic">The 5-Min Protocol</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Don't feel it? Start for 5 mins. Once inertia is broken, biology takes over.</p>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-[#00FF99]/20 transition-all cursor-pointer">
              <h4 className="font-black text-white text-base uppercase tracking-tight mb-2 italic">Volume Bias</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">A moderate session is a victory. The only failure is the zero-input day.</p>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-[#00FF99]/20 transition-all cursor-pointer">
              <h4 className="font-black text-white text-base uppercase tracking-tight mb-2 italic">Identity Shift</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">You aren't "trying" to be fit. You are becoming a person who values excellence.</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="text-center py-16 flex flex-col items-center justify-center">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-[#00FF99] blur-[60px] opacity-20" />
            <Flame className={`w-32 h-32 relative z-10 ${state.streak > 0 ? 'text-[#00FF99] fill-[#00FF99]/20' : 'text-gray-900'} transition-all`} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 z-20">
              <span className="text-4xl font-black text-white italic mono">{state.streak}</span>
            </div>
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-widest mb-2">Cycle Streak</h3>
          <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.3em]">Elite Consistency Rank</p>
        </GlassCard>
        
        <GlassCard className="md:col-span-2 p-10">
          <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-12">Rank Advancement</h3>
          <div className="space-y-10">
            {[
              { label: 'Level 1: Novice Operator', progress: Math.min(state.streak, 7), target: 7, icon: <Zap className="w-5 h-5" /> },
              { label: 'Level 2: Discipline Expert', progress: Math.min(state.streak, 21), target: 21, icon: <CheckCircle2 className="w-5 h-5" /> },
              { label: 'Level 3: Vigor Vanguard', progress: Math.min(state.streak, 45), target: 45, icon: <Trophy className="w-5 h-5" /> }
            ].map((milestone, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl ${milestone.progress >= milestone.target ? 'bg-[#00FF99]/20 text-[#00FF99]' : 'bg-white/5 text-gray-700'}`}>
                        {milestone.icon}
                    </div>
                    <span className={`font-black text-base italic uppercase tracking-tight ${milestone.progress >= milestone.target ? 'text-white' : 'text-gray-600'}`}>{milestone.label}</span>
                  </div>
                  <span className="font-mono text-[11px] font-black text-gray-600 tracking-widest">{milestone.progress} / {milestone.target} DAYS</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(milestone.progress / milestone.target) * 100}%` }}
                    className={`h-full rounded-full ${milestone.progress >= milestone.target ? 'bg-[#00FF99] neon-glow shadow-[0_0_15px_#00FF99]' : 'bg-[#8B5CF6]/30'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map(badge => (
          <GlassCard key={badge} className={`text-center transition-all p-8 ${state.streak >= badge * 5 ? 'opacity-100' : 'opacity-10 grayscale'}`}>
            <Award className={`w-14 h-14 mx-auto mb-4 ${state.streak >= badge * 5 ? 'text-[#F59E0B]' : 'text-gray-800'}`} />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F59E0B]">Honor Rank {badge}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderAiCoach = () => (
    <div className="h-[calc(100vh-14rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar mb-8">
        {chatMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
            <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center border border-white/10">
                <BrainCircuit className="w-12 h-12 text-[#00FF99]" />
            </div>
            <div>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Neural Interface Online</h3>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] max-w-xs mx-auto text-gray-400">Personalized consulting on Physiology, Nutrition, and Fatigue.</p>
            </div>
          </div>
        )}
        
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-8 py-5 rounded-[32px] shadow-2xl ${
              msg.role === 'user' 
                ? 'bg-[#00FF99] text-black font-bold text-sm rounded-tr-none' 
                : 'glass text-gray-300 font-medium text-sm leading-relaxed rounded-tl-none border border-white/5'
            }`}>
              <p>{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass px-8 py-5 rounded-[32px] border border-white/5 flex items-center space-x-4 rounded-tl-none">
              <Loader2 className="w-4 h-4 animate-spin text-[#00FF99]" />
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Neural Synthesis...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF99] to-[#8B5CF6] rounded-3xl blur-2xl opacity-0 group-focus-within:opacity-10 transition-opacity" />
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Query VigorAI: I feel fatigued. Adjust my load."
          className="relative w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 pr-20 focus:border-[#00FF99] outline-none transition-all placeholder:text-gray-700 text-sm font-bold tracking-tight"
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/[0.05] text-white rounded-2xl hover:bg-[#00FF99] hover:text-black transition-all shadow-2xl active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'workout' && renderWorkoutPlan()}
          {activeTab === 'motivation' && renderMotivationHub()}
          {activeTab === 'rewards' && renderRewards()}
          {activeTab === 'chat' && renderAiCoach()}
        </motion.div>
      </AnimatePresence>

      {/* Exercise Info Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card max-w-lg w-full rounded-[40px] p-6 lg:p-10 border border-[#00FF99]/20 shadow-[0_0_50px_rgba(0,255,153,0.1)] relative z-[101] max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedExercise(null)}
                className="absolute top-6 right-6 p-3 glass rounded-2xl hover:text-[#00FF99] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <div className="w-16 h-16 rounded-3xl bg-[#00FF99]/10 flex items-center justify-center mb-6">
                    <Info className="w-8 h-8 text-[#00FF99]" />
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{selectedExercise.name}</h3>
                
                {/* Muscle Group Highlighting Section */}
                <div className="flex flex-wrap gap-2 mt-4">
                   {selectedExercise.primaryMuscles.map(m => (
                     <span key={m} className="px-3 py-1 bg-[#00FF99]/20 border border-[#00FF99]/30 rounded-full text-[9px] font-black uppercase text-[#00FF99] tracking-widest shadow-lg shadow-[#00FF99]/5">Primary: {m}</span>
                   ))}
                   {selectedExercise.secondaryMuscles.map(m => (
                     <span key={m} className="px-3 py-1 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded-full text-[9px] font-black uppercase text-[#8B5CF6] tracking-widest">Secondary: {m}</span>
                   ))}
                </div>

                <div className="flex gap-3 mt-6">
                   {selectedExercise.sets && <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase text-gray-400 tracking-widest">{selectedExercise.sets} Sets</span>}
                   <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase text-gray-500 tracking-widest">{selectedExercise.reps || selectedExercise.duration}</span>
                </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-3">Protocol Instructions</h4>
                    <p className="text-gray-300 leading-relaxed font-medium">{selectedExercise.description}</p>
                 </div>

                 {selectedExercise.variations && selectedExercise.variations.length > 0 && (
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-[#8B5CF6] tracking-[0.2em] mb-4">Tactical Variations</h4>
                      <div className="space-y-4">
                        {selectedExercise.variations.map((v, i) => (
                          <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
                             <h5 className="font-black text-xs uppercase tracking-tight text-[#8B5CF6] mb-1">{v.title}</h5>
                             <p className="text-xs text-gray-400 leading-relaxed">{v.description}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                 )}

                 <div className="pt-6 border-t border-white/5">
                    <button 
                      onClick={() => setSelectedExercise(null)}
                      className="w-full py-4 bg-[#00FF99] text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-[#00FF99]/20"
                    >
                        Return to Cycle
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
