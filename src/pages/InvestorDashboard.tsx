import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { StatusText } from '../components/ui/StatusText';
import { formatCurrency, calculateThesisMatch } from '../data/mockData';
import {
  Search,
  MessageSquare,
  Send,
  Building,
  TrendingUp,
  MapPin,
  CheckCircle,
  ExternalLink,
  DollarSign,
  BarChart2,
  Users2,
  Sparkles
} from 'lucide-react';
import { EntrepreneurProfile, SyndicateAllocation } from '../types';
import { DealComparisonModal } from '../components/matching/DealComparisonModal';
import { SyndicateModal } from '../components/syndicate/SyndicateModal';

export const InvestorDashboard: React.FC = () => {
  const { entrepreneurs, collaborationRequests, sendCollaborationRequest, currentUser, investors, syndicates } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [activeSyndicateModal, setActiveSyndicateModal] = useState<SyndicateAllocation | null>(null);

  const currentInvestor = investors.find(i => i.id === currentUser.profileId) || investors[0];

  const activeTab = searchParams.get('tab') === 'requests' ? 'requests' : 'startups';

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');

  // Collaboration Request Modal
  const [selectedStartupForRequest, setSelectedStartupForRequest] = useState<EntrepreneurProfile | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [proposedCheckSize, setProposedCheckSize] = useState<number>(500000);
  const [requestSentSuccess, setRequestSentSuccess] = useState(false);

  const industries = ['All', 'HealthTech', 'AI & SaaS', 'CleanTech', 'FinTech', 'Robotics', 'EdTech', 'AgTech'];
  const stages = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'];

  const filteredEntrepreneurs = useMemo(() => {
    return entrepreneurs.filter(ent => {
      const matchesSearch =
        ent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ent.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ent.startupTagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ent.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry = selectedIndustry === 'All' || ent.industry === selectedIndustry;
      const matchesStage = selectedStage === 'All' || ent.stage === selectedStage;

      return matchesSearch && matchesIndustry && matchesStage;
    });
  }, [entrepreneurs, searchQuery, selectedIndustry, selectedStage]);

  // Outbound requests sent by this investor
  const mySentRequests = useMemo(() => {
    return collaborationRequests.filter(r => r.fromInvestorId === currentUser.profileId);
  }, [collaborationRequests, currentUser.profileId]);

  const handleOpenRequestModal = (startup: EntrepreneurProfile) => {
    setSelectedStartupForRequest(startup);
    setRequestNote(
      `Hi ${startup.name}, we reviewed ${startup.startupName}'s traction and would love to discuss participating in your ${startup.stage} round.`
    );
    setProposedCheckSize(Math.min(startup.fundingNeeded, 750000));
    setRequestSentSuccess(false);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStartupForRequest) return;

    const success = sendCollaborationRequest(
      selectedStartupForRequest.id,
      requestNote,
      proposedCheckSize
    );

    if (success) {
      setRequestSentSuccess(true);
      setTimeout(() => {
        setSelectedStartupForRequest(null);
        setRequestSentSuccess(false);
      }, 1400);
    }
  };

  const handleNavigateToChat = (entrepreneurId: string) => {
    navigate(`/chat/${entrepreneurId}`);
  };

  return (
    <DashboardLayout
      pageTitle="Investor Deal Flow & Discovery"
      pageSubtitle="Evaluate vetted venture-scale founders, view pitch decks, and initiate collaboration requests."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setComparisonModalOpen(true)}
            icon={<BarChart2 className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Compare Deals (Matrix)
          </Button>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              onClick={() => setSearchParams({ tab: 'startups' })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'startups'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Startups Directory ({entrepreneurs.length})
            </button>
            <button
              onClick={() => setSearchParams({ tab: 'requests' })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'requests'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              My Outbound Inquiries ({mySentRequests.length})
            </button>
          </div>
        </div>
      }
    >
      {/* KPI Overview Bar with Animated Stagger */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-indigo-50/30 dark:from-[#0f1626]/90 dark:to-indigo-950/20 border-indigo-100/60 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Active Startup Pitches
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-neutral-900 dark:text-white mt-1.5">
            {entrepreneurs.length}
          </div>
          <div className="text-xs text-indigo-600 dark:text-cyan-400 font-medium mt-0.5">
            8 High-Growth Verticals
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-amber-50/30 dark:from-[#0f1626]/90 dark:to-amber-950/20 border-amber-100/60 dark:border-amber-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Capital in Round Demand
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1.5">
            {formatCurrency(entrepreneurs.reduce((sum, e) => sum + e.fundingNeeded, 0))}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Verified Seed to Series B rounds
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-emerald-50/30 dark:from-[#0f1626]/90 dark:to-emerald-950/20 border-emerald-100/60 dark:border-emerald-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Your Sent Inquiries
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1.5">
            {mySentRequests.length}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
            {mySentRequests.filter(r => r.status === 'accepted').length} Accepted into Due Diligence
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-purple-50/30 dark:from-[#0f1626]/90 dark:to-purple-950/20 border-purple-100/60 dark:border-purple-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Average Round Size
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-purple-600 dark:text-purple-400 mt-1.5">
            $3.1M
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Median Post-Money: $16.5M
          </div>
        </Card>
      </motion.div>

      {activeTab === 'startups' ? (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-6 shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <Input
                  placeholder="Search by company, founder, or keyword..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                  Industry Vertical
                </label>
                <select
                  value={selectedIndustry}
                  onChange={e => setSelectedIndustry(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                  Funding Stage
                </label>
                <select
                  value={selectedStage}
                  onChange={e => setSelectedStage(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {stages.map(stg => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filters summary */}
            {(selectedIndustry !== 'All' || selectedStage !== 'All' || searchQuery) && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
                <span>
                  Showing {filteredEntrepreneurs.length} of {entrepreneurs.length} startups
                </span>
                <button
                  onClick={() => {
                    setSelectedIndustry('All');
                    setSelectedStage('All');
                    setSearchQuery('');
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Entrepreneur Profile Cards Grid */}
          {filteredEntrepreneurs.length === 0 ? (
            <Card className="p-12 text-center">
              <Building className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                No matching startups found
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                Try loosening your industry vertical or stage filter to discover more ventures.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedStage('All');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEntrepreneurs.map((ent, idx) => {
                const percentRaised = Math.round((ent.fundingRaised / ent.fundingNeeded) * 100);
                const hasExistingRequest = mySentRequests.some(r => r.toEntrepreneurId === ent.id);
                const match = calculateThesisMatch(currentInvestor, ent);
                const syndicate = syndicates.find(s => s.startupId === ent.id);

                return (
                  <motion.div
                    key={ent.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex flex-col justify-between p-5.5 rounded-2xl bg-white/85 dark:bg-[#0f1626]/85 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 glow-card"
                  >
                    <div>
                      {/* Top Bar: Sector and Stage metadata with Thesis Match Score */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
                            {ent.industry}
                          </span>
                          <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/5 font-semibold text-[11px] text-neutral-700 dark:text-neutral-300">
                            {ent.stage}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {syndicate && (
                            <button
                              type="button"
                              onClick={() => setActiveSyndicateModal(syndicate)}
                              className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-cyan-500/30 px-2 py-0.5 rounded-full cursor-pointer hover:scale-105 transition-transform"
                            >
                              Syndicate Open
                            </button>
                          )}
                          <span
                            className="font-mono tabular-nums text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/40 px-2 py-0.5 rounded-full"
                            title={match.reasons.join(' · ')}
                          >
                            <Sparkles className="w-3 h-3" />
                            {match.score}% Fit
                          </span>
                        </div>
                      </div>

                      {/* Startup Identity */}
                      <div className="flex items-start gap-3.5 mb-3.5">
                        <div className="relative shrink-0">
                          <img
                            src={ent.avatar}
                            alt={ent.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                          />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0f1626]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-extrabold text-neutral-900 dark:text-white truncate">
                            {ent.startupName}
                          </h3>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 truncate mt-0.5">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{ent.name}</span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-0.5 text-neutral-400">
                              <MapPin className="w-3 h-3" />
                              {ent.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tagline / Pitch Summary */}
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                        {ent.startupTagline}
                      </p>

                      {/* Traction Metrics Strip */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 bg-neutral-50/80 dark:bg-[#090d16]/70 rounded-xl border border-neutral-100 dark:border-white/5 mb-4 text-xs">
                        <div>
                          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-bold">
                            ARR / Revenue
                          </div>
                          <div className="font-mono tabular-nums font-extrabold text-neutral-900 dark:text-white text-sm mt-0.5">
                            {ent.traction.arr}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-bold">
                            MoM Growth
                          </div>
                          <div className="font-mono tabular-nums font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            +{ent.traction.momGrowth}
                          </div>
                        </div>
                      </div>

                      {/* Funding Progress Bar with Animated Gradient */}
                      <div className="space-y-1.5 mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Round Progress
                          </span>
                          <span className="font-mono tabular-nums font-bold text-neutral-900 dark:text-neutral-100">
                            {formatCurrency(ent.fundingRaised)} / {formatCurrency(ent.fundingNeeded)} ({percentRaised}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentRaised, 100)}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-400 rounded-full shadow-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/profile/entrepreneur/${ent.id}`)}
                          className="w-full text-xs"
                        >
                          View Full Profile
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleNavigateToChat(ent.id)}
                          icon={<MessageSquare className="w-3.5 h-3.5" />}
                          className="w-full text-xs"
                        >
                          Message
                        </Button>
                      </div>

                      {hasExistingRequest ? (
                        <div className="w-full text-center py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg flex items-center justify-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Collaboration Request Active
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleOpenRequestModal(ent)}
                          icon={<Send className="w-3.5 h-3.5" />}
                          className="w-full text-xs"
                        >
                          Send Collaboration Request
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* Outbound Collaboration Requests Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Your Outbound Collaboration Requests
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Tracking proposals and investment memos submitted to founders.
              </p>
            </div>
          </div>

          {mySentRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Send className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                No outbound requests yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                Explore our directory of high-growth founders and submit an introductory check proposal.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => setSearchParams({ tab: 'startups' })}
              >
                Browse Startups
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {mySentRequests.map(req => (
                <Card
                  key={req.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {req.startupName}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <span className="text-xs text-neutral-500">Founder: {req.toEntrepreneurName}</span>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <span className="text-xs font-mono tabular-nums text-neutral-500">
                        {req.date}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-950 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                      "{req.note}"
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-neutral-500">
                        Proposed Check Size:{' '}
                        <strong className="font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                          {formatCurrency(req.proposedCheckSize)}
                        </strong>
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <StatusText status={req.status} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/profile/entrepreneur/${req.toEntrepreneurId}`)}
                      className="text-xs"
                    >
                      View Startup
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleNavigateToChat(req.toEntrepreneurId)}
                      icon={<MessageSquare className="w-3.5 h-3.5" />}
                      className="text-xs"
                    >
                      Open Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Collaboration Request Dialog */}
      <Modal
        isOpen={Boolean(selectedStartupForRequest)}
        onClose={() => setSelectedStartupForRequest(null)}
        title={
          selectedStartupForRequest
            ? `Submit Collaboration Request to ${selectedStartupForRequest.startupName}`
            : 'Send Request'
        }
        description="Share an introductory investment memo and indicative ticket size."
        maxWidth="lg"
      >
        {selectedStartupForRequest && (
          <form onSubmit={handleSendRequest} className="space-y-4">
            {requestSentSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Collaboration Request Sent!
                </h4>
                <p className="text-xs text-neutral-500">
                  {selectedStartupForRequest.name} has been notified and a chat thread has been
                  initiated.
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500">Recipient Founder:</span>{' '}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      {selectedStartupForRequest.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Seeking:</span>{' '}
                    <strong className="font-mono text-neutral-900 dark:text-neutral-100">
                      {formatCurrency(selectedStartupForRequest.fundingNeeded)} ({selectedStartupForRequest.stage})
                    </strong>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Proposed Indicative Check Size ($ USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="number"
                      min={50000}
                      step={25000}
                      value={proposedCheckSize}
                      onChange={e => setProposedCheckSize(Number(e.target.value))}
                      className="w-full h-10 pl-9 pr-3 text-sm font-mono tabular-nums bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    Formatted: {formatCurrency(proposedCheckSize)}
                  </p>
                </div>

                <Textarea
                  label="Introductory Note & Diligence Focus"
                  rows={4}
                  value={requestNote}
                  onChange={e => setRequestNote(e.target.value)}
                  placeholder="Outline your fund's interest, relevant portfolio synergies, and meeting availability..."
                  required
                />

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedStartupForRequest(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
                    Send Request
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </Modal>

      {/* Deal Flow Comparison Matrix Modal */}
      <DealComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        startups={entrepreneurs}
      />

      {/* Syndicate Co-Investment Modal */}
      {activeSyndicateModal && (
        <SyndicateModal
          isOpen={Boolean(activeSyndicateModal)}
          onClose={() => setActiveSyndicateModal(null)}
          syndicate={activeSyndicateModal}
        />
      )}
    </DashboardLayout>
  );
};
