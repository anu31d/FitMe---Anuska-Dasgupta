
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Home,
  Building2,
  Sparkles,
  Loader2,
  BrainCircuit
} from 'lucide-react';
import { UserProfile, FitnessGoal, FitnessLevel, LocationPreference } from '../types';
import { GOALS_DATA } from '../constants';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    gender: 'Other',
    height: 170,
    weight: 70,
    goals: [],
    level: FitnessLevel.BEGINNER,
    location: LocationPreference.GYM,
    conditions: [],
    wants: []
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleGoal = (goal: FitnessGoal) => {
    setProfile(p => ({
      ...p,
      goals: p.goals?.includes(goal) 
        ? p.goals.filter(g => g !== goal) 
        : [...(p.goals || []), goal]
    }));
  };

  const toggleCondition = (cond: string) => {
    setProfile(p => ({
      ...p,
      conditions: p.conditions?.includes(cond) 
        ? p.conditions.filter(c => c !== cond) 
        : [...(p.conditions || []), cond]
    }));
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    // Cycle through generation messages for better UX
    setTimeout(() => setGenerationPhase(1), 1500);
    setTimeout(() => setGenerationPhase(2), 3000);
    setTimeout(() => {
      onComplete({ ...profile, onboarded: true } as UserProfile);
    }, 4500);
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2 italic uppercase tracking-tighter">The Basics</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Foundation building in progress</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Identity</label>
          <input 
            type="text" 
            value={profile.name}
            onChange={e => setProfile({...profile, name: e.target.value})}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 focus:border-[#00FF99] outline-none transition-all placeholder:text-gray-700 text-sm font-bold"
            placeholder="How should we call you?"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Age</label>
            <input 
              type="number" 
              value={profile.age}
              onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Gender</label>
            <select 
              value={profile.gender}
              onChange={e => setProfile({...profile, gender: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm font-bold appearance-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Height (cm)</label>
            <input 
              type="number" 
              value={profile.height}
              onChange={e => setProfile({...profile, height: parseInt(e.target.value)})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Weight (kg)</label>
            <input 
              type="number" 
              value={profile.weight}
              onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2 italic uppercase tracking-tighter">Mission Focus</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Define your primary directives</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GOALS_DATA.map(goal => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`flex items-center space-x-4 p-5 rounded-3xl border transition-all ${
              profile.goals?.includes(goal.id) 
                ? 'bg-[#00FF99]/10 border-[#00FF99] text-white' 
                : 'bg-white/[0.02] border-white/10 text-gray-500 hover:bg-white/5'
            }`}
          >
            <div className={goal.color}>{goal.icon}</div>
            <span className="font-bold text-sm">{goal.id}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2 italic uppercase tracking-tighter">Base Preference</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Where will the evolution occur?</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[FitnessLevel.BEGINNER, FitnessLevel.INTERMEDIATE, FitnessLevel.ADVANCED].map(lvl => (
            <button
              key={lvl}
              onClick={() => setProfile({...profile, level: lvl})}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center space-y-2 ${
                profile.level === lvl 
                  ? 'bg-[#00FF99]/10 border-[#00FF99] text-white shadow-xl' 
                  : 'bg-white/[0.02] border-white/5 text-gray-600'
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest">{lvl}</div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setProfile({...profile, location: LocationPreference.GYM})}
            className={`p-8 rounded-[40px] border transition-all flex flex-col items-center space-y-4 ${
              profile.location === LocationPreference.GYM 
                ? 'bg-[#00FF99]/10 border-[#00FF99] text-white shadow-2xl shadow-[#00FF99]/10' 
                : 'bg-white/[0.02] border-white/5 text-gray-600'
            }`}
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                <Building2 className={`w-8 h-8 ${profile.location === LocationPreference.GYM ? 'text-[#00FF99]' : ''}`} />
            </div>
            <span className="font-black uppercase tracking-widest text-xs italic">Elite Gym</span>
          </button>
          <button
            onClick={() => setProfile({...profile, location: LocationPreference.HOME})}
            className={`p-8 rounded-[40px] border transition-all flex flex-col items-center space-y-4 ${
              profile.location === LocationPreference.HOME 
                ? 'bg-[#00FF99]/10 border-[#00FF99] text-white shadow-2xl shadow-[#00FF99]/10' 
                : 'bg-white/[0.02] border-white/5 text-gray-600'
            }`}
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                <Home className={`w-8 h-8 ${profile.location === LocationPreference.HOME ? 'text-[#00FF99]' : ''}`} />
            </div>
            <span className="font-black uppercase tracking-widest text-xs italic">Private Home</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-2 italic uppercase tracking-tighter text-white">Safety Check</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Optimizing protocol for safety</p>
      </div>
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Physical Constraints</label>
          <div className="flex flex-wrap gap-2">
            {['None', 'PCOS', 'Hypertension', 'Diabetes', 'Back Pain', 'Knee Injury'].map(cond => (
              <button
                key={cond}
                onClick={() => toggleCondition(cond)}
                className={`px-6 py-2.5 rounded-full border transition-all text-[11px] font-black uppercase tracking-widest ${
                  profile.conditions?.includes(cond) 
                    ? 'bg-[#F59E0B] border-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/20' 
                    : 'bg-white/[0.03] border-white/10 text-gray-500'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Neural Directives</label>
          <div className="grid grid-cols-2 gap-3">
            {['Daily motivation', 'Structured workouts', 'Habit tracking', 'Rewards & streaks'].map(want => (
              <button
                key={want}
                onClick={() => {
                  setProfile(p => ({
                    ...p,
                    wants: p.wants?.includes(want) ? p.wants.filter(w => w !== want) : [...(p.wants || []), want]
                  }))
                }}
                className={`flex items-center space-x-3 p-4 rounded-2xl border text-xs text-left transition-all ${
                  profile.wants?.includes(want) ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white' : 'bg-white/[0.02] border-white/5 text-gray-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-lg border flex items-center justify-center transition-all ${profile.wants?.includes(want) ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'border-white/20'}`}>
                  {profile.wants?.includes(want) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-bold tracking-tight">{want}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const generationMessages = [
    "Synthesizing personalized load algorithms...",
    "Adjusting recovery windows for Level " + profile.level + "...",
    "VigorAI Protocol Finalized. Engaging Evolution."
  ];

  return (
    <div className="min-h-screen fixed inset-0 z-50 bg-[#0B0F14] flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-xl w-full"
          >
            {/* Progress Bar */}
            <div className="flex space-x-2 mb-10">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`h-1 flex-1 rounded-full transition-all duration-700 ${s <= step ? 'bg-[#00FF99] neon-glow shadow-[0_0_10px_#00FF99]' : 'bg-white/5'}`}
                />
              ))}
            </div>

            <div className="glass-card p-10 rounded-[48px] border border-white/10 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <BrainCircuit className="w-24 h-24 text-[#00FF99]" />
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-12 flex justify-between items-center">
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-4 glass rounded-2xl text-gray-500 hover:text-white transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    ) : <div />}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (step < 4) nextStep();
                            else handleGeneratePlan();
                        }}
                        disabled={step === 1 && !profile.name}
                        className={`px-10 py-5 rounded-[24px] font-black uppercase text-[11px] tracking-[0.3em] flex items-center space-x-3 transition-all ${
                            step === 1 && !profile.name ? 'opacity-30 cursor-not-allowed bg-gray-800' : 'bg-[#00FF99] text-black shadow-2xl shadow-[#00FF99]/20'
                        }`}
                    >
                        <span>{step === 4 ? '🚀 Engage AI' : 'Progress'}</span>
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#00FF99] blur-3xl opacity-20 animate-pulse" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 rounded-[40px] border-2 border-dashed border-[#00FF99]/30 flex items-center justify-center relative z-10"
                >
                    <BrainCircuit className="w-16 h-16 text-[#00FF99]" />
                </motion.div>
                <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 bg-[#8B5CF6] p-2 rounded-xl"
                >
                    <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
            </div>
            <div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Protocol Generation</h2>
                <div className="flex items-center justify-center space-x-4 h-8">
                    {generationPhase < 2 && <Loader2 className="w-4 h-4 animate-spin text-[#00FF99]" />}
                    <motion.p 
                      key={generationPhase}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00FF99]"
                    >
                      {generationMessages[generationPhase]}
                    </motion.p>
                </div>
                <div className="mt-8 max-w-sm mx-auto p-6 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      Welcome {profile.name}. VigorAI has analyzed your profile: {profile.age}y, {profile.weight}kg, focusing on {profile.goals?.join(' & ')}. 
                      Your safety conditions ({profile.conditions?.join(', ')}) have been integrated into the load algorithms.
                   </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
