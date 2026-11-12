import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../data/mockData';
import {
  MapPin,
  Mail,
  DollarSign,
  Briefcase,
  ChevronLeft,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export const InvestorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { investors } = useApp();

  const investor = investors.find(i => i.id === id) || investors[0];

  return (
    <DashboardLayout
      pageTitle={`${investor.name} — Investor Profile`}
      pageSubtitle={`${investor.title} at ${investor.firm} · ${investor.location}`}
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/chat/${investor.id}`)}
            icon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            Send Message / Pitch
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 md:p-8 bg-white/80 dark:bg-[#0D1220]/80 backdrop-blur-xl border border-neutral-200/80 dark:border-cyan-500/20 glow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-200/60 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={investor.avatar}
                    alt={investor.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-indigo-500/30 dark:border-cyan-400/40 shrink-0 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0D1220] flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                    <span className="font-bold text-indigo-600 dark:text-cyan-400">
                      {investor.firm}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{investor.title}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    {investor.name}
                  </h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      {investor.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" />
                      {investor.email}
                    </span>
                  </p>
                </div>
              </div>

              {/* Check Size & AUM Strip */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-100/70 dark:bg-[#141B2D]/70 rounded-xl border border-neutral-200/80 dark:border-white/5 text-xs">
                <div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    Sweet Spot Check
                  </div>
                  <div className="text-base font-extrabold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatCurrency(investor.checkSizeMin)} - {formatCurrency(investor.checkSizeMax)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    Fund AUM
                  </div>
                  <div className="text-base font-extrabold font-mono tabular-nums text-indigo-600 dark:text-cyan-400 mt-0.5">
                    {investor.aum}
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Thesis & Bio */}
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-xs font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Investment Thesis & Strategy
                </h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {investor.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200/60 dark:border-white/10 text-xs">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 font-semibold block mb-2">
                    Target Industries & Verticals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {investor.targetIndustries.map(ind => (
                      <span
                        key={ind}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-[#141B2D] border border-neutral-200 dark:border-white/5 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 font-semibold block mb-2">
                    Target Investment Stages:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {investor.targetStages.map(stg => (
                      <span
                        key={stg}
                        className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300"
                      >
                        {stg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Portfolio Companies Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-500" />
                Portfolio Companies ({investor.portfolioCompanies.length})
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Representative venture investments backed by {investor.name} and {investor.firm}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investor.portfolioCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <Card className="p-5 border border-neutral-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0D1220]/70 backdrop-blur-md hover:border-cyan-500/40 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                          {company.name}
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                        </h3>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 mt-0.5 font-mono">
                          <span>{company.sector}</span>
                          <span aria-hidden="true">·</span>
                          <span>Invested {company.yearInvested}</span>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          company.status === 'IPO'
                            ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                            : company.status === 'Acquired'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
                        }`}
                      >
                        {company.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2.5">
                      {company.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
