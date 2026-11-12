import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Briefcase, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [title, setTitle] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (!organization.trim()) {
      errs.organization =
        role === 'investor' ? 'Venture firm / Fund name is required.' : 'Startup company name is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      register(name, email, role, organization, title || undefined);
      setIsLoading(false);
      if (role === 'investor') {
        navigate('/dashboard/investor');
      } else {
        navigate('/dashboard/entrepreneur');
      }
    }, 450);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#070A12] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/15 to-violet-600/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/25 mb-4 ring-1 ring-white/20">
          BN
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-700 dark:from-white dark:via-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
          Join Business Nexus
        </h2>
        <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
          Join leading founders and venture capital syndicates
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10"
      >
        <div className="bg-white/90 dark:bg-[#0D1220]/90 backdrop-blur-xl py-8 px-6 sm:px-8 border border-neutral-200/80 dark:border-cyan-500/20 rounded-2xl shadow-xl shadow-indigo-950/5 dark:shadow-cyan-950/30">
          {/* Role selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-[#141B2D] border border-neutral-200/60 dark:border-white/5 rounded-xl">
              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === 'entrepreneur'
                    ? 'bg-white dark:bg-[#090D16] text-neutral-900 dark:text-cyan-400 shadow-sm border border-neutral-200 dark:border-cyan-500/40 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                Entrepreneur
              </button>
              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                  role === 'investor'
                    ? 'bg-white dark:bg-[#090D16] text-neutral-900 dark:text-cyan-400 shadow-sm border border-neutral-200 dark:border-cyan-500/40 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                Investor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Dr. Jane Cooper"
              error={errors.name}
            />

            <Input
              label="Work Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={role === 'investor' ? 'partner@fund.vc' : 'founder@startup.io'}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              error={errors.password}
            />

            <Input
              label={role === 'investor' ? 'Venture Capital Firm / Angel Syndicate' : 'Startup Company Name'}
              type="text"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              placeholder={role === 'investor' ? 'e.g. Horizon Ventures' : 'e.g. QuantumScale AI'}
              error={errors.organization}
            />

            <Input
              label="Your Role / Title (Optional)"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={role === 'investor' ? 'General Partner / Angel' : 'Founder & CEO / CTO'}
            />

            <Button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold py-2.5 shadow-md shadow-indigo-600/20"
              isLoading={isLoading}
            >
              Complete Registration as {role === 'investor' ? 'Investor' : 'Entrepreneur'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Sign In here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
