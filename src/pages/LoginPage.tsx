import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Briefcase, Rocket, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('investor');
  const [email, setEmail] = useState('victoria@apexventures.vc');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'investor') {
      setEmail('victoria@apexventures.vc');
    } else {
      setEmail('marcus@neuroflow.ai');
    }
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      login(email, role);
      setIsLoading(false);
      if (role === 'investor') {
        navigate('/dashboard/investor');
      } else {
        navigate('/dashboard/entrepreneur');
      }
    }, 400);
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    handleRoleChange(demoRole);
    login(demoRole === 'investor' ? 'victoria@apexventures.vc' : 'marcus@neuroflow.ai', demoRole);
    if (demoRole === 'investor') {
      navigate('/dashboard/investor');
    } else {
      navigate('/dashboard/entrepreneur');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFC] dark:bg-[#04060C] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-amber-500/15 via-violet-600/15 to-emerald-500/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 text-white font-extrabold text-2xl shadow-lg shadow-amber-500/25 mb-4 ring-1 ring-white/20">
          BN
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-amber-800 to-neutral-700 dark:from-white dark:via-amber-100 dark:to-neutral-300 bg-clip-text text-transparent">
          Business Nexus
        </h2>
        <p className="mt-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          Venture Institutional Dealflow & SAFE Cap Table Platform
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10"
      >
        <div className="bg-white/90 dark:bg-[#0A0F1D]/90 backdrop-blur-2xl py-8 px-6 sm:px-8 border border-neutral-200/80 dark:border-amber-500/20 rounded-3xl shadow-xl shadow-amber-950/5 dark:shadow-black/60">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-[#141B2D] border border-neutral-200/60 dark:border-white/5 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleChange('investor')}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === 'investor'
                    ? 'bg-white dark:bg-[#090D16] text-neutral-900 dark:text-cyan-400 shadow-sm border border-neutral-200 dark:border-cyan-500/40 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                Investor / VC
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('entrepreneur')}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === 'entrepreneur'
                    ? 'bg-white dark:bg-[#090D16] text-neutral-900 dark:text-cyan-400 shadow-sm border border-neutral-200 dark:border-cyan-500/40 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                Entrepreneur / Founder
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={role === 'investor' ? 'investor@firm.com' : 'founder@startup.com'}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white font-bold py-3 shadow-lg shadow-amber-500/25 cursor-pointer rounded-xl"
              isLoading={isLoading}
            >
              Sign In as {role === 'investor' ? 'Investor' : 'Entrepreneur'}
            </Button>
          </form>

          {/* Instant 1-Click Demo Logins for Reviewers */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-white/10">
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mb-3">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Persona Switch
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">1-click demo</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleQuickDemo('investor')}
                className="flex items-center justify-between p-3 text-left border border-neutral-200 dark:border-white/10 rounded-xl hover:border-amber-500/60 dark:hover:border-amber-500/60 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 transition-all group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-500 transition-colors">
                    Victoria Sterling
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">Peak Horizon (Investor)</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleQuickDemo('entrepreneur')}
                className="flex items-center justify-between p-3 text-left border border-neutral-200 dark:border-white/10 rounded-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-all group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-500 transition-colors">
                    Marcus Chen
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">SynthFlow AI (Founder)</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </motion.button>
            </div>
          </div>

          {/* Link to Register */}
          <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
