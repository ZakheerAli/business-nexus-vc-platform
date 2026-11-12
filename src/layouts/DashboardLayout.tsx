import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Inbox,
  MessageSquare,
  User,
  Sun,
  Moon,
  LogOut,
  ArrowRightLeft,
  Menu,
  X,
  Briefcase,
  Layers,
  Sparkles,
  Search,
  Command,
  Languages
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { VenturePulseTicker } from '../components/common/VenturePulseTicker';
import { CommandPalette } from '../components/common/CommandPalette';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  action?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  pageTitle,
  pageSubtitle,
  action
}) => {
  const {
    currentUser,
    logout,
    theme,
    toggleTheme,
    switchRoleQuick,
    collaborationRequests,
    messages,
    language,
    toggleLanguage,
    t
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute pending requests count for entrepreneur
  const pendingRequestsCount = collaborationRequests.filter(
    r => r.toEntrepreneurId === currentUser.profileId && r.status === 'pending'
  ).length;

  // Compute total unread messages count across all conversations
  const totalMessagesCount = Object.values(messages).reduce((acc, conv) => acc + conv.length, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems =
    currentUser.role === 'investor'
      ? [
          {
            label: 'Startups Discovery',
            to: '/dashboard/investor',
            icon: <Compass className="w-4 h-4" />
          },
          {
            label: 'Outbound Inquiries',
            to: '/dashboard/investor?tab=requests',
            icon: <Briefcase className="w-4 h-4" />,
            badge: collaborationRequests.filter(r => r.fromInvestorId === currentUser.profileId).length
          },
          {
            label: 'Deal Room Chat',
            to: '/chat',
            icon: <MessageSquare className="w-4 h-4" />,
            badge: totalMessagesCount > 0 ? totalMessagesCount : undefined
          },
          {
            label: 'My Investor Profile',
            to: `/profile/investor/${currentUser.profileId}`,
            icon: <User className="w-4 h-4" />
          }
        ]
      : [
          {
            label: 'Inbound Proposals',
            to: '/dashboard/entrepreneur',
            icon: <Inbox className="w-4 h-4" />,
            badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined
          },
          {
            label: 'Explore Active Funds',
            to: '/dashboard/entrepreneur?tab=investors',
            icon: <Compass className="w-4 h-4" />
          },
          {
            label: 'Deal Room Chat',
            to: '/chat',
            icon: <MessageSquare className="w-4 h-4" />,
            badge: totalMessagesCount > 0 ? totalMessagesCount : undefined
          },
          {
            label: 'Startup & Pitch Deck',
            to: `/profile/entrepreneur/${currentUser.profileId}`,
            icon: <Layers className="w-4 h-4" />
          }
        ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070A12] text-neutral-900 dark:text-neutral-100 bg-grid-pattern overflow-hidden">
      {/* Ambient background lighting orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[350px] bg-purple-500/8 dark:bg-purple-600/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header with Glassmorphism */}
      <header className="sticky top-0 z-40 h-16 bg-white/85 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
        {/* Left: Mobile hamburger + Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <NavLink
            to={currentUser.role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur'}
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-amber-500/30 ring-1 ring-white/20"
            >
              BN
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-neutral-900 via-amber-800 to-neutral-700 dark:from-white dark:via-amber-100 dark:to-neutral-300 bg-clip-text text-transparent leading-none">
                Business Nexus
              </span>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                {currentUser.role} Edition
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center: Command Palette Trigger Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-neutral-100/80 dark:bg-[#10162A]/80 hover:bg-neutral-200/70 dark:hover:bg-amber-500/10 border border-neutral-200/80 dark:border-white/10 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all text-xs text-neutral-500 dark:text-neutral-400 max-w-sm group shadow-xs cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
          <span className="font-medium text-neutral-600 dark:text-neutral-300">
            {t.dashSearchPlaceholder}
          </span>
          <div className="flex items-center gap-0.5 ml-3 font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-300">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Roman Urdu / English Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/15 text-xs font-bold text-amber-700 dark:text-amber-300 transition-all cursor-pointer shadow-xs"
            title={language === 'en' ? 'Roman Urdu mein switch karein' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-[11px] hidden sm:inline">{language === 'en' ? 'Roman Urdu' : 'English'}</span>
          </motion.button>

          {/* Quick Demo Role Switcher */}
          <Button
            variant="outline"
            size="sm"
            onClick={switchRoleQuick}
            icon={<ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />}
            title="Toggle between Investor and Entrepreneur personas"
            className="hidden sm:inline-flex text-xs border-amber-500/30 hover:border-amber-500 bg-amber-500/10 hover:bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold"
          >
            {currentUser.role === 'investor' ? t.dashSwitchToFounder : t.dashSwitchToInvestor}
          </Button>

          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 border border-neutral-200/60 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </motion.button>

          {/* Current User Pill Info & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-white/10">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-8.5 h-8.5 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight text-neutral-900 dark:text-neutral-100 truncate max-w-[120px]">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[120px]">
                {currentUser.title}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 rounded-xl text-neutral-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Live Venture Pulse Ticker */}
      <VenturePulseTicker />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar with Glassmorphism */}
        <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-[#0c121e]/70 backdrop-blur-xl border-r border-neutral-200/80 dark:border-white/10 shrink-0">
          <div className="p-4 flex-1 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-indigo-600 dark:text-cyan-400 uppercase">
              Navigation Menu
            </div>
            {navItems.map(item => {
              const isActive =
                item.to.includes('?')
                  ? location.pathname + location.search === item.to
                  : location.pathname === item.to && !location.search;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-neutral-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Quick Context Card */}
          <div className="p-4 border-t border-neutral-200/80 dark:border-white/10 text-xs">
            <div className="p-3.5 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-white/5 dark:to-cyan-500/10 rounded-xl border border-neutral-200/80 dark:border-white/10">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>Active Workspace</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="font-bold text-neutral-900 dark:text-neutral-100 mt-1 truncate">
                {currentUser.name}
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-[11px] truncate mt-0.5">
                {currentUser.organization}
              </div>
              <button
                onClick={switchRoleQuick}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-indigo-600 dark:text-cyan-400 bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-lg hover:bg-indigo-50 dark:hover:bg-white/10 transition-colors shadow-xs"
              >
                <ArrowRightLeft className="w-3 h-3" />
                Switch to {currentUser.role === 'investor' ? 'Entrepreneur' : 'Investor'}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-[#0c121e] p-5 flex flex-col h-full border-r border-neutral-200 dark:border-white/10">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-neutral-200 dark:border-white/10">
                <span className="font-bold text-base">Business Nexus</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1.5 flex-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    switchRoleQuick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Switch Role
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full text-rose-500">
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto">
          {/* Page Header */}
          {(pageTitle || action) && (
            <div className="bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-md border-b border-neutral-200/80 dark:border-white/10 px-6 py-6">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  {pageTitle && (
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-indigo-900 dark:from-white dark:via-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                      {pageTitle}
                    </h1>
                  )}
                  {pageSubtitle && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {pageSubtitle}
                    </p>
                  )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
              </div>
            </div>
          )}

          {/* Animated Content container */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};
