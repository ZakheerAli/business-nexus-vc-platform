import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Rocket,
  Briefcase,
  Calculator,
  FolderLock,
  Moon,
  Sun,
  UserCheck,
  ArrowRight,
  Sparkles,
  Command,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    entrepreneurs,
    investors,
    currentUser,
    theme,
    toggleTheme,
    login
  } = useApp();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build searchable items
  interface ActionItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Startups' | 'Investors' | 'Actions' | 'Navigation';
    icon: React.ReactNode;
    onSelect: () => void;
  }

  const items: ActionItem[] = [];

  // Startups
  entrepreneurs.forEach(s => {
    items.push({
      id: `startup-${s.id}`,
      title: s.startupName,
      subtitle: `${s.industry} · Seeking ${s.stage} ($${(s.fundingNeeded / 1000000).toFixed(1)}M)`,
      category: 'Startups',
      icon: <Rocket className="w-4 h-4 text-cyan-400" />,
      onSelect: () => {
        navigate(`/profile/entrepreneur/${s.id}`);
        onClose();
      }
    });
  });

  // Investors
  investors.forEach(inv => {
    items.push({
      id: `investor-${inv.id}`,
      title: inv.name,
      subtitle: `${inv.firm} (${inv.title}) · ${inv.location}`,
      category: 'Investors',
      icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
      onSelect: () => {
        navigate(`/profile/investor/${inv.id}`);
        onClose();
      }
    });
  });

  // Quick Actions & Navigation
  items.push({
    id: 'action-dilution',
    title: 'Post-Money SAFE Cap Table Calculator',
    subtitle: 'Model round dilution, option pool & NVCA term sheets',
    category: 'Actions',
    icon: <Calculator className="w-4 h-4 text-emerald-400" />,
    onSelect: () => {
      navigate('/profile/entrepreneur/entrepreneur-1');
      onClose();
    }
  });

  items.push({
    id: 'action-theme',
    title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    subtitle: 'Toggle platform aesthetic theme',
    category: 'Actions',
    icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
    onSelect: () => {
      toggleTheme();
      onClose();
    }
  });

  items.push({
    id: 'action-switch-investor',
    title: 'Switch Persona: Victoria Sterling (Apex VC)',
    subtitle: 'View platform as General Partner investor',
    category: 'Actions',
    icon: <UserCheck className="w-4 h-4 text-cyan-400" />,
    onSelect: () => {
      login('victoria@apexventures.vc', 'investor');
      navigate('/dashboard/investor');
      onClose();
    }
  });

  items.push({
    id: 'action-switch-founder',
    title: 'Switch Persona: Marcus Chen (NeuroFlow AI)',
    subtitle: 'View platform as Seed-stage startup founder',
    category: 'Actions',
    icon: <UserCheck className="w-4 h-4 text-purple-400" />,
    onSelect: () => {
      login('marcus@neuroflow.ai', 'entrepreneur');
      navigate('/dashboard/entrepreneur');
      onClose();
    }
  });

  // Filter items
  const filtered = items.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }).slice(0, 10);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-2xl rounded-2xl border border-neutral-200 dark:border-cyan-500/30 shadow-2xl shadow-indigo-950/40 overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/10 gap-3">
              <Search className="w-5 h-5 text-neutral-400 dark:text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search startups, investors, tools..."
                className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-hidden"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/10">
                  ESC
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-white/5">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  No matching startups, investors, or commands found for "{query}".
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-neutral-100 dark:bg-cyan-950/40 border border-neutral-200 dark:border-cyan-500/30 text-neutral-900 dark:text-white'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 dark:bg-cyan-500/20 text-white dark:text-cyan-300'
                              : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500">
                              [{item.category}]
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-sm">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="text-[10px] font-mono font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                            Press Enter <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-neutral-50/80 dark:bg-[#090D16]/80 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-neutral-200 dark:bg-white/10 px-1 py-0.5 rounded-sm text-[10px]">
                    ↑↓
                  </span>{' '}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-neutral-200 dark:bg-white/10 px-1 py-0.5 rounded-sm text-[10px]">
                    ↵
                  </span>{' '}
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-neutral-200 dark:bg-white/10 px-1 py-0.5 rounded-sm text-[10px]">
                    esc
                  </span>{' '}
                  Close
                </span>
              </div>
              <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                <Sparkles className="w-3 h-3" />
                Venture Nexus Command
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
