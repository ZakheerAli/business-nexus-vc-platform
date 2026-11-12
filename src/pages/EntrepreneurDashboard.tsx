import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusText } from '../components/ui/StatusText';
import { formatCurrency } from '../data/mockData';
import {
  Inbox,
  Check,
  X,
  MessageSquare,
  Compass,
  DollarSign,
  TrendingUp,
  Building,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { InvestorProfile } from '../types';

export const EntrepreneurDashboard: React.FC = () => {
  const { collaborationRequests, respondToRequest, currentUser, investors, entrepreneurs } =
    useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') === 'investors' ? 'investors' : 'requests';
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');

  // Find current entrepreneur startup profile
  const myStartupProfile = entrepreneurs.find(e => e.id === currentUser.profileId) || entrepreneurs[0];

  // Requests directed to this entrepreneur
  const receivedRequests = useMemo(() => {
    return collaborationRequests.filter(r => r.toEntrepreneurId === currentUser.profileId);
  }, [collaborationRequests, currentUser.profileId]);

  const filteredRequests = useMemo(() => {
    if (statusFilter === 'all') return receivedRequests;
    return receivedRequests.filter(r => r.status === statusFilter);
  }, [receivedRequests, statusFilter]);

  const totalCapitalProposed = receivedRequests.reduce((sum, r) => sum + r.proposedCheckSize, 0);
  const acceptedCount = receivedRequests.filter(r => r.status === 'accepted').length;
  const pendingCount = receivedRequests.filter(r => r.status === 'pending').length;

  const handleAccept = (reqId: string, investorId: string) => {
    respondToRequest(reqId, 'accepted');
  };

  const handleDecline = (reqId: string) => {
    respondToRequest(reqId, 'declined');
  };

  const handleOpenChat = (investorId: string) => {
    navigate(`/chat/${investorId}`);
  };

  return (
    <DashboardLayout
      pageTitle="Entrepreneur Dashboard & Collaboration"
      pageSubtitle="Manage inbound venture inquiries, review indicative check proposals, and discover active investors."
      action={
        <div className="flex items-center gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <button
            onClick={() => setSearchParams({ tab: 'requests' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'requests'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Inbound Requests ({receivedRequests.length})
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'investors' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'investors'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Explore Matching Investors ({investors.length})
          </button>
        </div>
      }
    >
      {/* Startup Health & Round Progress Strip with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-amber-50/30 dark:from-[#0f1626]/90 dark:to-amber-950/20 border-amber-100/60 dark:border-amber-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Inbound Proposals
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-neutral-900 dark:text-white mt-1.5">
            {receivedRequests.length}
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
            {pendingCount} Pending Decision
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-cyan-50/30 dark:from-[#0f1626]/90 dark:to-cyan-950/20 border-cyan-100/60 dark:border-cyan-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Capital Proposed
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-cyan-600 dark:text-cyan-400 mt-1.5">
            {formatCurrency(totalCapitalProposed)}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Target Round: {formatCurrency(myStartupProfile.fundingNeeded)}
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-emerald-50/30 dark:from-[#0f1626]/90 dark:to-emerald-950/20 border-emerald-100/60 dark:border-emerald-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Accepted Collaborations
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1.5">
            {acceptedCount}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Due Diligence in Progress
          </div>
        </Card>

        <Card hoverEffect glow className="p-4.5 bg-gradient-to-br from-white/90 to-indigo-50/30 dark:from-[#0f1626]/90 dark:to-indigo-950/20 border-indigo-100/60 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Round Progress
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-indigo-600 dark:text-cyan-400 mt-1.5">
            {Math.round((myStartupProfile.fundingRaised / myStartupProfile.fundingNeeded) * 100)}%
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {formatCurrency(myStartupProfile.fundingRaised)} Committed
          </div>
        </Card>
      </motion.div>

      {activeTab === 'requests' ? (
        <div className="space-y-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
              {(['all', 'pending', 'accepted', 'declined'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${
                    statusFilter === tab
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs text-neutral-500">
              Showing {filteredRequests.length} of {receivedRequests.length} requests
            </div>
          </div>

          {/* Requests List */}
          {filteredRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Inbox className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                No collaboration requests in this filter
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                When venture capital funds and angel syndicates review your pitch deck, their
                check proposals will appear here.
              </p>
              {statusFilter !== 'all' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setStatusFilter('all')}
                >
                  View All Requests
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map(req => {
                const investorDetail = investors.find(i => i.id === req.fromInvestorId);

                return (
                  <Card
                    key={req.id}
                    className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* Left: Investor Information & Proposal Memo */}
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={req.fromInvestorAvatar}
                          alt={req.fromInvestorName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                        />
                        <div className="space-y-2 flex-1">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                                {req.fromInvestorName}
                              </h3>
                              <span className="text-neutral-300 dark:text-neutral-700">·</span>
                              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                {req.fromInvestorFirm}
                              </span>
                              <span className="text-neutral-300 dark:text-neutral-700">·</span>
                              <span className="text-xs font-mono tabular-nums text-neutral-500">
                                Received {req.date}
                              </span>
                            </div>

                            {investorDetail && (
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                                {investorDetail.bio}
                              </p>
                            )}
                          </div>

                          {/* Message Note */}
                          <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800/80">
                            <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                              Investment Proposal Memo
                            </div>
                            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              "{req.note}"
                            </p>
                          </div>

                          {/* Metadata row: Check size, Status */}
                          <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                            <div>
                              <span className="text-neutral-500">Proposed Check Size:</span>{' '}
                              <strong className="font-mono tabular-nums text-neutral-900 dark:text-neutral-100 text-sm">
                                {formatCurrency(req.proposedCheckSize)}
                              </strong>
                            </div>
                            <span className="text-neutral-300 dark:text-neutral-700">·</span>
                            <StatusText status={req.status} />
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
                        {req.status === 'pending' ? (
                          <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleAccept(req.id, req.fromInvestorId)}
                              icon={<Check className="w-3.5 h-3.5" />}
                              className="text-xs"
                            >
                              Accept Proposal
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDecline(req.id)}
                              icon={<X className="w-3.5 h-3.5" />}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Decline
                            </Button>
                          </div>
                        ) : null}

                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenChat(req.fromInvestorId)}
                            icon={<MessageSquare className="w-3.5 h-3.5" />}
                            className="text-xs"
                          >
                            Open Conversation
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/profile/investor/${req.fromInvestorId}`)}
                            className="text-xs"
                          >
                            View Investor Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Explore Investors Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Top Active Venture Capital & Angel Investors
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Explore funds actively allocating capital to your industry and funding stage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {investors.map(inv => (
              <Card
                key={inv.id}
                hoverEffect
                className="p-5 flex flex-col justify-between border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={inv.avatar}
                      alt={inv.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white truncate">
                        {inv.name}
                      </h3>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                        {inv.firm}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">{inv.title}</div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4 leading-relaxed">
                    {inv.bio}
                  </p>

                  <div className="space-y-2 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800/80 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Check Size Range:</span>
                      <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency(inv.checkSizeMin)} - {formatCurrency(inv.checkSizeMax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Target Stages:</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">
                        {inv.targetStages.join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Sectors:</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[150px]">
                        {inv.targetIndustries.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/profile/investor/${inv.id}`)}
                    className="text-xs"
                  >
                    View Full Profile
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenChat(inv.id)}
                    icon={<MessageSquare className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    Message
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
