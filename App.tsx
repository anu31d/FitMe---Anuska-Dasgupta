
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  LayoutDashboard, 
  Trophy, 
  MessageSquare,
  TrendingUp,
  Target,
  BrainCircuit,
  Award
} from 'lucide-react';
import { UserProfile, AppState } from './types';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

const STORAGE_KEY = 'vigor_ai_state';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      profile: null,
      currentDay: 1,
      checkIns: [],
      streak: 0
    };
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'workout' | 'motivation' | 'rewards' | 'chat'>('dashboard');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setAppState(prev => ({ ...prev, profile }));
  };

  const updateAppState = (updater: (prev: AppState) => AppState) => {
    setAppState(updater);
  };

  if (!appState.profile) {
    return (
      <Landing onStart={() => setAppState(prev => ({ ...prev, profile: {} as UserProfile }))}>
        <Onboarding onComplete={handleOnboardingComplete} />
      </Landing>
    );
  }

  const NavItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col lg:flex-row items-center lg:space-x-3 w-full justify-center lg:justify-start px-2 lg:px-5 py-3 lg:py-4 rounded-xl lg:rounded-[24px] transition-all relative group overflow-hidden ${
        activeTab === id 
          ? 'bg-[#00FF99]/10 text-[#00FF99]' 
          : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {activeTab === id && (
          <motion.div 
            layoutId="nav-glow"
            className="absolute left-0 top-0 lg:w-1 lg:h-full w-full h-0.5 bottom-0 lg:bottom-auto bg-[#00FF99] shadow-[0_0_10px_#00FF99]"
          />
      )}
      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === id ? 'text-[#00FF99]' : ''}`} />
      <span className="text-[8px] lg:text-[11px] font-black uppercase lg:tracking-widest truncate mt-1 lg:mt-0 lg:block hidden">{label}</span>
      <span className="text-[8px] font-black uppercase lg:hidden block truncate mt-1">{label.split(' ')[0]}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0B0F14] text-gray-200 overflow-hidden selection:bg-[#00FF99] selection:text-black">
      {/* Permanent Sidebar - Fixed Left across all screen sizes */}
      <aside className="flex flex-col w-20 lg:w-72 border-r border-white/5 bg-[#0B0F14]/80 backdrop-blur-3xl z-50 shrink-0">
        <div className="p-4 lg:p-10 pb-8 lg:pb-12 flex flex-col items-center lg:items-start">
          <div className="flex items-center space-x-0 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#00FF99] to-[#8B5CF6] rounded-[14px] lg:rounded-[20px] flex items-center justify-center neon-glow shadow-2xl shadow-[#00FF99]/20">
              <Dumbbell className="text-black w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-2xl font-black tracking-tighter leading-none italic">VIGOR<span className="text-[#00FF99]">AI</span></h1>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-700 mt-1 block">Neural Evolution</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 lg:px-6 space-y-4 lg:space-y-10 overflow-y-auto pb-10 custom-scrollbar">
          <div className="space-y-2">
            <span className="hidden lg:block px-5 text-[10px] uppercase font-black text-gray-700 tracking-[0.4em] mb-4">Command</span>
            <NavItem id="dashboard" icon={LayoutDashboard} label="Command" />
            <NavItem id="workout" icon={Target} label="Protocol" />
          </div>

          <div className="space-y-2">
            <span className="hidden lg:block px-5 text-[10px] uppercase font-black text-gray-700 tracking-[0.4em] mb-4">Cognitive</span>
            <NavItem id="motivation" icon={BrainCircuit} label="Mindset" />
            <NavItem id="chat" icon={MessageSquare} label="Coach" />
          </div>

          <div className="space-y-2">
            <span className="hidden lg:block px-5 text-[10px] uppercase font-black text-gray-700 tracking-[0.4em] mb-4">Status</span>
            <NavItem id="rewards" icon={Award} label="Rewards" />
          </div>
        </nav>

        {/* Status indicator at the bottom of the sidebar */}
        <div className="p-4 lg:p-8 border-t border-white/5 bg-white/[0.02]">
          <div className="hidden lg:flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center font-black text-sm italic shadow-xl">
              {appState.profile.name?.[0] || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black italic uppercase tracking-tight truncate">{appState.profile.name}</p>
              <p className="text-[10px] text-[#00FF99] font-black uppercase tracking-widest mt-0.5">{appState.profile.level} LVL</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-3 lg:gap-0 lg:px-3 lg:py-4 bg-white/5 lg:bg-transparent rounded-2xl">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-[10px] lg:text-xs font-black mono text-white">{appState.streak}D</span>
            </div>
            <div className="hidden lg:block w-px h-4 bg-white/10" />
            <div className="flex items-center space-x-2">
               <TrendingUp className="w-4 h-4 text-[#00FF99]" />
               <span className="hidden lg:inline text-[10px] font-black uppercase tracking-tighter text-[#00FF99]">Optimal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 relative overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-4 lg:p-12 min-h-full">
            <Dashboard 
              activeTab={activeTab} 
              state={appState} 
              updateState={updateAppState}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
