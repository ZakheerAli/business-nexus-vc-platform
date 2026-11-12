import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  FileText,
  PieChart,
  Briefcase,
  Rocket,
  Sun,
  Moon,
  ArrowUpRight,
  Activity,
  Star,
  Check,
  Crown,
  Languages
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, login, entrepreneurs, language, toggleLanguage, t } = useApp();

  // Interactive SAFE Calculator State on Landing Page
  const [calcRaise, setCalcRaise] = useState<number>(1500000);
  const [calcValuation, setCalcValuation] = useState<number>(12000000);
  const [calcExistingFounder, setCalcExistingFounder] = useState<number>(85);

  // Active Perspective Tab
  const [activePersonaTab, setActivePersonaTab] = useState<'investor' | 'founder'>('investor');

  // Interactive Hero Card State
  const [heroCheckSize, setHeroCheckSize] = useState<number>(250000);

  // Calculate dynamic dilution values
  const investorEquity = Math.min(100, Number(((calcRaise / calcValuation) * 100).toFixed(2)));
  const remainingFounderEquity = Math.max(0, Number(((calcExistingFounder * (1 - investorEquity / 100))).toFixed(2)));
  const optionPool = Math.max(0, Number((100 - investorEquity - remainingFounderEquity).toFixed(2)));

  // Hero card equity calculation (Post-Money Valuation $10M for SynthFlow)
  const heroEquityPct = ((heroCheckSize / 10000000) * 100).toFixed(2);

  // Quick 1-click persona login
  const handleQuickLogin = (role: 'investor' | 'entrepreneur') => {
    if (role === 'investor') {
      login('victoria@peakhc.com', 'investor');
      navigate('/dashboard/investor');
    } else {
      login('marcus@synthflow.ai', 'entrepreneur');
      navigate('/dashboard/entrepreneur');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#04060C] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Mesmerizing Cyber-Velvet & Liquid Aurum Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm Golden Aurum Core Glow */}
        <div className="absolute top-[-8%] left-[25%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-transparent blur-[140px] animate-pulse" />
        
        {/* Royal Amethyst Nebula Glow */}
        <div className="absolute top-[25%] right-[-8%] w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-violet-600/25 via-indigo-600/20 to-transparent blur-[150px]" />
        
        {/* Bioluminescent Jade Emerald Pulse */}
        <div className="absolute bottom-[10%] left-[-8%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent blur-[140px]" />
        
        {/* Subtle Luxury Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70 dark:opacity-40" />
      </div>

      {/* Top Banner: Market Status with Gold Beacon */}
      <div className="relative z-50 bg-gradient-to-r from-[#04060C] via-[#0E1526] to-[#04060C] text-xs py-2 px-4 border-b border-amber-500/25 text-neutral-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-sm shadow-amber-400"></span>
            </span>
            <span className="font-mono text-amber-400 font-bold tracking-wider uppercase text-[10px] md:text-xs flex items-center gap-1">
              <Crown className="h-3 w-3 inline text-amber-400" />
              <span>{t.topBannerTag}</span>
            </span>
            <span className="hidden sm:inline text-neutral-600 dark:text-neutral-500">|</span>
            <span className="hidden sm:inline text-neutral-300">
              {t.topBannerSubtitle}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-300">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <span>⚡</span>
              <span>{t.topBannerStat1}</span>
            </span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span className="hidden md:inline text-emerald-400 font-medium">{t.topBannerStat2}</span>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar with Liquid Aurum Border */}
      <nav className="sticky top-0 z-40 backdrop-blur-2xl bg-white/80 dark:bg-[#04060C]/85 border-b border-neutral-200/80 dark:border-amber-500/15 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/40">
              <TrendingUp className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-neutral-900 via-amber-800 to-neutral-700 dark:from-white dark:via-amber-100 dark:to-neutral-300 bg-clip-text text-transparent">
                Business Nexus
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[9px] uppercase tracking-widest font-mono text-amber-600 dark:text-amber-400 font-bold">
                  Institutional Capital
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <a href="#dealflow" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              {t.navDealflow}
            </a>
            <a href="#calculator" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span>{t.navSafeModeler}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gradient-to-r from-amber-500/15 to-emerald-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold">
                Interactive
              </span>
            </a>
            <a href="#architecture" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              {t.navDataVault}
            </a>
            <a href="#syndicates" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              {t.navSyndicates}
            </a>
            <a href="#stats" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              {t.navTrackRecord}
            </a>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Roman Urdu / English Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-300 transition-all cursor-pointer shadow-xs"
              title={language === 'en' ? 'Roman Urdu mein switch karein' : 'Switch to English'}
            >
              <Languages className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono">{language === 'en' ? 'Roman Urdu' : 'English'}</span>
            </motion.button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-amber-300 hover:bg-neutral-100 dark:hover:bg-white/5 border border-transparent dark:hover:border-amber-500/20 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-violet-600" />}
            </button>

            {/* Direct Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="hidden sm:inline-flex px-3.5 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t.navSignIn}
            </button>

            {/* Launch Terminal CTA with Liquid Aurum Gradient */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleQuickLogin('investor')}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:via-orange-400 hover:to-violet-500 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 ring-1 ring-white/20 transition-all duration-300 cursor-pointer"
            >
              <span>{t.navLaunchTerminal}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge with Gold/Emerald Border */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-violet-500/10 to-emerald-500/15 text-amber-700 dark:text-amber-300 text-xs font-semibold shadow-sm backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>{t.heroBadge}</span>
                <span className="text-amber-400/50">•</span>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{t.heroBadgeStage}</span>
              </motion.div>

              {/* Punchy Title with Entrance Animation & Mesmerizing Metallic Gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14]"
              >
                {t.heroTitlePrefix}
                <motion.span
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  className="bg-gradient-to-r from-amber-400 via-emerald-300 via-cyan-300 to-amber-400 bg-[length:200%_auto] bg-clip-text text-transparent inline-block drop-shadow-sm"
                >
                  {t.heroTitleHighlight}
                </motion.span>
                {t.heroTitleSuffix}
              </motion.h1>

              {/* Subheading with Entrance Animation */}
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed"
              >
                {t.heroSubtitle}
              </motion.p>

              {/* Quick Persona Launchers with Radiant Hover Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2 pb-1"
              >
                <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-amber-500" />
                  <span>{t.heroQuickTestDrive}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Investor Card (Golden Aurum Theme) */}
                  <motion.button
                    whileHover={{ scale: 1.025, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => handleQuickLogin('investor')}
                    className="flex-1 relative overflow-hidden flex items-center justify-between p-3.5 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-white/90 via-amber-50/20 to-white/60 dark:from-white/[0.05] dark:via-amber-500/[0.04] dark:to-violet-950/20 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group cursor-pointer shadow-sm text-left backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                          <span>{t.heroEnterInvestor}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold border border-amber-500/30">
                            {t.heroInvestorRole}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-300 mt-0.5">
                          {t.heroInvestorDetail}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-500 group-hover:translate-x-1.5 transition-transform ml-2 shrink-0" />
                  </motion.button>

                  {/* Founder Card (Emerald Jade Theme) */}
                  <motion.button
                    whileHover={{ scale: 1.025, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => handleQuickLogin('entrepreneur')}
                    className="flex-1 relative overflow-hidden flex items-center justify-between p-3.5 rounded-2xl border border-emerald-500/35 bg-gradient-to-br from-white/90 via-emerald-50/20 to-white/60 dark:from-white/[0.05] dark:via-emerald-500/[0.04] dark:to-teal-950/20 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 group cursor-pointer shadow-sm text-left backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Rocket className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                          <span>{t.heroPitchFounder}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-500/30">
                            {t.heroFounderRole}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-300 mt-0.5">
                          {t.heroFounderDetail}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-500 group-hover:translate-x-1.5 transition-transform ml-2 shrink-0" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Compliance & Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-600 dark:text-neutral-400 font-medium"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t.heroTrust1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>{t.heroTrust2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                  <span>{t.heroTrust3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{t.heroTrust4}</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right: Interactive Live Deal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Glowing Multi-Color Nebula Backplate */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-500 via-violet-600 to-emerald-400 opacity-30 blur-2xl animate-pulse"></div>
              
              <div className="relative rounded-3xl glass-panel p-6 sm:p-7 shadow-2xl border border-amber-500/25 dark:border-white/10 space-y-5 backdrop-blur-2xl">
                {/* Header with Live Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop"
                      alt="SynthFlow"
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-amber-500/40 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-neutral-900 dark:text-white text-base">SynthFlow AI</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40">
                          {t.heroCardActiveRound}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Autonomous Enterprise Workflow Engine</p>
                    </div>
                  </div>

                  {/* Match Radar Indicator in Gold */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/35 text-amber-600 dark:text-amber-300 font-mono text-xs font-bold shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                      <span>{t.heroCardFit}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium mt-1">{t.heroCardThesis}</span>
                  </div>
                </div>

                {/* Live Traction Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-100/80 dark:bg-black/40 border border-neutral-200/60 dark:border-white/10 font-mono text-center">
                  <div>
                    <div className="text-[10px] uppercase text-neutral-500 font-semibold">{t.heroCardArr}</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-amber-300">$1.20M</div>
                    <div className="text-[10px] text-emerald-500 font-medium">+280% YoY</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-500 font-semibold">{t.heroCardGrowth}</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">24.5%</div>
                    <div className="text-[10px] text-neutral-400">12 Mo. Avg</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-neutral-500 font-semibold">{t.heroCardTarget}</div>
                    <div className="text-sm font-bold text-violet-600 dark:text-violet-400">$2.00M</div>
                    <div className="text-[10px] text-emerald-500 font-medium">$1.4M Wired</div>
                  </div>
                </div>

                {/* Interactive Check Size Slider with Gold Thumb */}
                <div className="space-y-2 pt-1 border-t border-neutral-200/60 dark:border-white/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-600 dark:text-neutral-300 font-medium">{t.heroCardSimulateCheck}</span>
                    <span className="font-mono font-bold text-amber-500 dark:text-amber-300 text-sm">
                      ${(heroCheckSize / 1000).toLocaleString()}k
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={heroCheckSize}
                    onChange={(e) => setHeroCheckSize(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                    <span>{t.heroCardValuationCap}</span>
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">{t.heroCardEquityStake}: ~{heroEquityPct}%</span>
                  </div>
                </div>

                {/* Quick Action inside preview */}
                <div className="flex items-center gap-2 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickLogin('investor')}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/25 cursor-pointer"
                  >
                    <span>{t.heroCardRequestTermSheet}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickLogin('investor')}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300 text-xs font-semibold cursor-pointer"
                    title={t.heroCardViewVault}
                  >
                    <Lock className="h-4 w-4 text-amber-400" />
                  </motion.button>
                </div>

                {/* Floating micro ticker status */}
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    {t.heroCardLeadInvestor}
                  </span>
                  <span className="text-amber-500 dark:text-amber-400 font-semibold">{t.heroCardClosingTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Venture Pulse Ribbon with Glowing Jewel Dots */}
      <div className="relative border-y border-amber-500/20 bg-white/60 dark:bg-[#070B18]/70 backdrop-blur-md py-3.5 overflow-hidden">
        <div className="flex items-center gap-10 whitespace-nowrap overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 text-xs font-mono text-neutral-600 dark:text-neutral-300 px-4">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
              <strong className="text-neutral-900 dark:text-amber-300">{t.tickerEvent1}</strong>
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400"></span>
              <strong className="text-neutral-900 dark:text-violet-300">{t.tickerEvent2}</strong>
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
              <strong className="text-neutral-900 dark:text-cyan-300">{t.tickerEvent3}</strong>
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>
              <strong className="text-neutral-900 dark:text-amber-300">{t.tickerEvent4}</strong>
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
              <strong className="text-neutral-900 dark:text-emerald-300">{t.tickerEvent5}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive SAFE Cap Table Dilution Modeler Section with Luxury Gold/Emerald Visuals */}
      <section id="calculator" className="relative z-10 py-24 bg-neutral-100/40 dark:bg-black/30 border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
              <PieChart className="h-3.5 w-3.5" />
              <span>{t.calcBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {t.calcTitle}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
              {t.calcSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/25 dark:border-white/10 shadow-xl">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg flex items-center justify-between">
                <span>{t.calcParametersHeader}</span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
                  {t.calcStandardTag}
                </span>
              </h3>

              {/* Target Raise Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-neutral-700 dark:text-neutral-300 font-semibold">{t.calcTargetRaise}</label>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base">
                    ${(calcRaise / 1000000).toFixed(2)}M
                  </span>
                </div>
                <input
                  type="range"
                  min="250000"
                  max="5000000"
                  step="50000"
                  value={calcRaise}
                  onChange={(e) => setCalcRaise(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>$250k</span>
                  <span>$2.5M</span>
                  <span>$5.0M</span>
                </div>
              </div>

              {/* Post-Money Valuation Cap */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-neutral-700 dark:text-neutral-300 font-semibold">{t.calcValuationCap}</label>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400 text-base">
                    ${(calcValuation / 1000000).toFixed(1)}M
                  </span>
                </div>
                <input
                  type="range"
                  min="3000000"
                  max="30000000"
                  step="500000"
                  value={calcValuation}
                  onChange={(e) => setCalcValuation(Number(e.target.value))}
                  className="w-full accent-violet-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>$3.0M</span>
                  <span>$15.0M</span>
                  <span>$30.0M</span>
                </div>
              </div>

              {/* Existing Founder Ownership */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-neutral-700 dark:text-neutral-300 font-semibold">{t.calcPreFounderEquity}</label>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {calcExistingFounder}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={calcExistingFounder}
                  onChange={(e) => setCalcExistingFounder(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{t.calcDisclaimer}</span>
              </div>
            </div>

            {/* Visual Breakdown Results */}
            <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/25 dark:border-white/10 shadow-xl space-y-6">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg">
                {t.calcDistributionHeader}
              </h3>

              {/* Visual Ownership Bar with Luxury Jewel Colors */}
              <div className="space-y-2">
                <div className="h-7 w-full rounded-2xl overflow-hidden flex shadow-inner bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-white/10">
                  <div
                    style={{ width: `${remainingFounderEquity}%` }}
                    className="bg-emerald-500 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden"
                    title={`Founders: ${remainingFounderEquity}%`}
                  >
                    {remainingFounderEquity > 15 ? `${remainingFounderEquity}%` : ''}
                  </div>
                  <div
                    style={{ width: `${investorEquity}%` }}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 text-black transition-all duration-300 flex items-center justify-center text-[10px] font-extrabold shadow-sm overflow-hidden"
                    title={`New Investors: ${investorEquity}%`}
                  >
                    {investorEquity > 10 ? `${investorEquity}%` : ''}
                  </div>
                  {optionPool > 0 && (
                    <div
                      style={{ width: `${optionPool}%` }}
                      className="bg-violet-500 text-white transition-all duration-300 flex items-center justify-center text-[10px] font-bold overflow-hidden"
                      title={`Option Pool / Reserved: ${optionPool}%`}
                    >
                      {optionPool > 8 ? `${optionPool}%` : ''}
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {t.calcFoundersLabel} ({remainingFounderEquity}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> {t.calcInvestorsLabel} ({investorEquity}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span> {t.calcOptionPoolLabel} ({optionPool}%)
                  </span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 font-mono">
                  <div className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase">{t.calcEffectiveDilution}</div>
                  <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-300 mt-1">
                    {investorEquity}%
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t.calcDilutionSub}</div>
                </div>

                <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30 font-mono">
                  <div className="text-xs text-violet-700 dark:text-violet-300 font-bold uppercase">{t.calcImpliedPreMoney}</div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                    ${((calcValuation - calcRaise) / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[11px] text-emerald-500 font-semibold mt-0.5">{t.calcPreMoneySub}</div>
                </div>
              </div>

              {/* Call to action */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickLogin('investor')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <span>{t.calcGenerateTermSheetBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Experience Tabs: For Investors vs For Founders */}
      <section id="dealflow" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {t.tabsTitle}
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-base">
              {t.tabsSubtitle}
            </p>

            {/* Persona Switcher Tabs with Rich Badges */}
            <div className="inline-flex p-1.5 rounded-2xl bg-neutral-200/80 dark:bg-white/10 mt-8 border border-neutral-300/80 dark:border-white/10">
              <button
                onClick={() => setActivePersonaTab('investor')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activePersonaTab === 'investor'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>{t.tabInvestor}</span>
              </button>
              <button
                onClick={() => setActivePersonaTab('founder')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activePersonaTab === 'founder'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Rocket className="h-4 w-4" />
                <span>{t.tabFounder}</span>
              </button>
            </div>
          </div>

          {/* Tab Content: Investor Features */}
          {activePersonaTab === 'investor' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 dark:border-amber-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardInvestor1Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardInvestor1Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 font-bold" /> {t.cardInvestor1Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 font-bold" /> {t.cardInvestor1Item2}
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-violet-500/30 dark:border-violet-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-500/30">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardInvestor2Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardInvestor2Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-violet-400 font-bold" /> {t.cardInvestor2Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-violet-400 font-bold" /> {t.cardInvestor2Item2}
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 dark:border-emerald-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardInvestor3Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardInvestor3Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 font-bold" /> {t.cardInvestor3Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 font-bold" /> {t.cardInvestor3Item2}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content: Founder Features */}
          {activePersonaTab === 'founder' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 dark:border-cyan-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/30">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardFounder1Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardFounder1Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 font-bold" /> {t.cardFounder1Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 font-bold" /> {t.cardFounder1Item2}
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 dark:border-amber-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardFounder2Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardFounder2Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 font-bold" /> {t.cardFounder2Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-500 font-bold" /> {t.cardFounder2Item2}
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-violet-500/30 dark:border-violet-500/20 glow-card space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-violet-500/30">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{t.cardFounder3Title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.cardFounder3Desc}
                </p>
                <ul className="text-xs space-y-2 text-neutral-500 dark:text-neutral-400 font-mono pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-violet-400 font-bold" /> {t.cardFounder3Item1}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-violet-400 font-bold" /> {t.cardFounder3Item2}
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleQuickLogin(activePersonaTab === 'investor' ? 'investor' : 'entrepreneur')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer shadow-xl"
            >
              <span>{t.tabExploreBtn} {activePersonaTab === 'investor' ? 'Investor Portal' : 'Founder Suite'}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Featured Active Startups Live Dealflow with Jewel Accents */}
      <section className="relative z-10 py-20 bg-neutral-100/50 dark:bg-black/30 border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold mb-3">
                <Activity className="h-3.5 w-3.5 text-amber-500" />
                <span>{t.startupsBadge}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {t.startupsTitle}
              </h2>
            </div>
            <button
              onClick={() => handleQuickLogin('investor')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
            >
              <span>{t.startupsViewAll}</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entrepreneurs.slice(0, 3).map((startup) => (
              <div
                key={startup.id}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-amber-500/20 dark:border-white/10 glow-card space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <img
                      src={startup.avatar}
                      alt={startup.startupName}
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-amber-500/30 shadow-md"
                    />
                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        {startup.stage}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium mt-1">{startup.industry}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white">{startup.startupName}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300 line-clamp-2 mt-1">
                      {startup.startupTagline}
                    </p>
                  </div>

                  {/* Metrics bar with Gold & Emerald Highlights */}
                  <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-2xl bg-neutral-100/80 dark:bg-black/30 border border-neutral-200/60 dark:border-white/5 font-mono text-xs">
                    <div>
                      <span className="text-neutral-400 text-[10px] block">{t.startupsTargetRaise}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        ${(startup.fundingNeeded / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[10px] block">{t.startupsLocation}</span>
                      <span className="font-bold text-neutral-900 dark:text-white truncate block">
                        {startup.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickLogin('investor')}
                    className="w-full py-2.5 rounded-xl border border-amber-500/40 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-white text-amber-700 dark:text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{t.startupsInspectRoom}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Security & Cryptographic Vault Banner */}
      <section id="architecture" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#0A0E1F] via-[#0F172E] to-[#04060C] border border-amber-500/30 text-white relative overflow-hidden shadow-2xl">
            {/* Ambient Gold & Violet Glow inside banner */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-mono font-bold">
                  <Shield className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t.securityBadge}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {t.securityTitle}
                </h2>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {t.securityDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{t.securityWatermarkTitle}</h4>
                      <p className="text-xs text-neutral-400">{t.securityWatermarkDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/30">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{t.securityKillswitchTitle}</h4>
                      <p className="text-xs text-neutral-400">{t.securityKillswitchDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Mockup: Forensic Watermark Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-black/70 border border-amber-500/25 p-5 space-y-3 font-mono text-xs relative overflow-hidden backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-amber-400" />
                      <span>Financial_Cohort_Q4.pdf</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      AES-256
                    </span>
                  </div>

                  <div className="py-7 px-4 rounded-xl bg-white/[0.03] border border-white/5 relative flex flex-col items-center justify-center text-center">
                    {/* Watermark diagonal overlay in Gold */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 rotate-[-18deg] text-[11px] font-bold text-amber-400 select-none tracking-widest">
                      CONFIDENTIAL · PEAK HORIZON · IP 198.51.100.4 · 2026-11-02
                    </div>
                    <Lock className="h-9 w-9 text-amber-400/80 mb-2" />
                    <span className="text-neutral-200 font-bold text-sm">{t.securityProtectedVault}</span>
                    <span className="text-[11px] text-neutral-400 mt-1">{t.securityScreenProtection}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
                    <span>Viewer: victoria@peakhc.com</span>
                    <span className="text-emerald-400 font-bold">{t.securityNdaCleared}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Metrics Wall with Metallic Gold Typography */}
      <section id="stats" className="relative z-10 py-20 border-t border-amber-500/15 bg-neutral-100/40 dark:bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-7 rounded-3xl glass-panel border border-amber-500/25 dark:border-white/10 shadow-lg">
              <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 font-mono">
                {t.stat1Value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-2">
                {t.stat1Title}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{t.stat1Sub}</div>
            </div>

            <div className="p-7 rounded-3xl glass-panel border border-emerald-500/25 dark:border-white/10 shadow-lg">
              <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 font-mono">
                {t.stat2Value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-2">
                {t.stat2Title}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{t.stat2Sub}</div>
            </div>

            <div className="p-7 rounded-3xl glass-panel border border-violet-500/25 dark:border-white/10 shadow-lg">
              <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 font-mono">
                {t.stat3Value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-2">
                {t.stat3Title}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{t.stat3Sub}</div>
            </div>

            <div className="p-7 rounded-3xl glass-panel border border-amber-500/25 dark:border-white/10 shadow-lg">
              <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 font-mono">
                {t.stat4Value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-2">
                {t.stat4Title}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{t.stat4Sub}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Shortcut Callout: Command Palette */}
      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-amber-500/20 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 shadow-sm backdrop-blur-md">
            <span className="font-bold text-amber-600 dark:text-amber-400">{t.proTipLabel}</span>
            <span>{t.proTipInside}</span>
            <kbd className="px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono font-bold text-neutral-900 dark:text-amber-300 shadow-inner">
              ⌘K / Ctrl+K
            </kbd>
            <span>{t.proTipAction}</span>
          </div>
        </div>
      </section>

      {/* Final Conversion Action Banner */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.finalCtaTitle}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            {t.finalCtaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickLogin('investor')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 shadow-xl shadow-amber-500/30 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="h-4 w-4" />
              <span>{t.finalCtaInvestorBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickLogin('entrepreneur')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-neutral-900 dark:text-white bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/15 border border-emerald-500/30 dark:border-emerald-500/30 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Rocket className="h-4 w-4 text-emerald-400" />
              <span>{t.finalCtaFounderBtn}</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Prestige Footer */}
      <footer className="relative z-10 border-t border-amber-500/15 bg-white/80 dark:bg-[#04060C]/95 backdrop-blur-xl pt-16 pb-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/25">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-base text-neutral-900 dark:text-white">Business Nexus</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
                {t.footerTagline}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
                <span>{t.footerUptime}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
                {t.footerColPlatform}
              </h4>
              <ul className="space-y-2">
                <li><a href="#dealflow" className="hover:text-amber-500 transition-colors">{t.navDealflow}</a></li>
                <li><a href="#calculator" className="hover:text-amber-500 transition-colors">{t.navSafeModeler}</a></li>
                <li><a href="#architecture" className="hover:text-amber-500 transition-colors">{t.navDataVault}</a></li>
                <li><a href="#syndicates" className="hover:text-amber-500 transition-colors">{t.navSyndicates}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
                {t.footerColLegal}
              </h4>
              <ul className="space-y-2">
                <li><span className="hover:text-amber-500 cursor-pointer">NVCA Standards</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">Delaware Corporate</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">SOC2 Compliance</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">Automated NDAs</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">
                {t.footerColSecurity}
              </h4>
              <ul className="space-y-2">
                <li><span className="hover:text-amber-500 cursor-pointer">AES-256 Storage</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">IP Stamping</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">Instant Killswitch</span></li>
                <li><span className="hover:text-amber-500 cursor-pointer">Audit Logs</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              {t.footerCopyright}
            </div>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer hover:underline hover:text-amber-400">{t.footerPrivacy}</span>
              <span className="cursor-pointer hover:underline hover:text-amber-400">{t.footerTerms}</span>
              <span className="cursor-pointer hover:underline hover:text-amber-400">{t.footerWhitepaper}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
