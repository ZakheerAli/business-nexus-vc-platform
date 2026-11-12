import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface PulseEvent {
  id: string;
  type: 'termsheet' | 'dataroom' | 'syndicate' | 'call' | 'traction';
  title: string;
  detail: string;
  timeAgo: string;
}

const INITIAL_EVENTS: PulseEvent[] = [
  {
    id: 'evt-1',
    type: 'termsheet',
    title: 'Apex VC offered SAFE Term Sheet to NeuroFlow AI',
    detail: '$1.5M at $18.0M post-money valuation (94% thesis fit)',
    timeAgo: '2m ago'
  },
  {
    id: 'evt-2',
    type: 'dataroom',
    title: 'Confidential Data Room Access Granted',
    detail: 'QuantumScale AI unlocked Series A financial models for Horizon Partners',
    timeAgo: '5m ago'
  },
  {
    id: 'evt-3',
    type: 'syndicate',
    title: 'Seed Co-Investment Syndicate Reached 85%',
    detail: 'BioSynthetica pool received $250k check from Sequoia Scout',
    timeAgo: '9m ago'
  },
  {
    id: 'evt-4',
    type: 'call',
    title: 'Technical Diligence Call Confirmed',
    detail: 'Victoria Sterling ↔ Marcus Chen (Tomorrow 10:00 AM PST)',
    timeAgo: '14m ago'
  },
  {
    id: 'evt-5',
    type: 'traction',
    title: 'New Traction Milestone',
    detail: 'CyberArmor ARR crossed $1.2M with 340% YoY velocity',
    timeAgo: '22m ago'
  }
];

export const VenturePulseTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % INITIAL_EVENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = INITIAL_EVENTS[currentIndex];

  const getIcon = (type: PulseEvent['type']) => {
    switch (type) {
      case 'termsheet':
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
      case 'dataroom':
        return <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />;
      case 'syndicate':
        return <Users className="w-3.5 h-3.5 text-purple-400" />;
      case 'call':
        return <Calendar className="w-3.5 h-3.5 text-emerald-400" />;
      case 'traction':
        return <TrendingUp className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-neutral-900/90 dark:bg-[#070B18]/95 border-b border-neutral-800 dark:border-amber-500/20 px-4 py-1.5 flex items-center justify-between overflow-hidden text-xs text-neutral-300 z-20 backdrop-blur-md"
    >
      {/* Label */}
      <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-neutral-700/60 dark:border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-sm shadow-amber-400"></span>
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 dark:text-amber-300 font-mono flex items-center gap-1">
          VENTURE PULSE
        </span>
      </div>

      {/* Animated Ticker Content */}
      <div className="flex-1 mx-3 overflow-hidden h-5 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs truncate"
          >
            <span className="p-0.5 rounded-sm bg-neutral-800 dark:bg-white/10 shrink-0">
              {getIcon(current.type)}
            </span>
            <span className="font-semibold text-neutral-100 dark:text-white">
              {current.title}:
            </span>
            <span className="text-neutral-400 dark:text-neutral-300 font-normal truncate">
              {current.detail}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono ml-1 shrink-0">
              ({current.timeAgo})
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Indicator */}
      <div className="hidden sm:flex items-center gap-2 shrink-0 pl-3 border-l border-neutral-700/60 dark:border-white/10 text-[10px] text-neutral-500 font-mono">
        <span>{currentIndex + 1}/{INITIAL_EVENTS.length}</span>
        <span className="text-neutral-600">·</span>
        <span>{isPaused ? 'PAUSED' : 'LIVE'}</span>
      </div>
    </div>
  );
};
