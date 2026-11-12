import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Input';
import { formatCurrency } from '../data/mockData';
import {
  Building,
  MapPin,
  Globe,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  Presentation,
  CheckCircle,
  DollarSign,
  Maximize2,
  Users2
} from 'lucide-react';
import { DilutionCalculator } from '../components/dilution/DilutionCalculator';
import { DataRoomVault } from '../components/dataroom/DataRoomVault';
import { SyndicateModal } from '../components/syndicate/SyndicateModal';

export const EntrepreneurProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { entrepreneurs, currentUser, sendCollaborationRequest, collaborationRequests, syndicates } = useApp();

  // Find the entrepreneur by ID or fallback
  const entrepreneur = entrepreneurs.find(e => e.id === id) || entrepreneurs[0];

  // Pitch Deck interactive slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [deckFullscreen, setDeckFullscreen] = useState(false);

  // Request modal state
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestNote, setRequestNote] = useState('');
  const [proposedCheckSize, setProposedCheckSize] = useState<number>(
    Math.min(entrepreneur.fundingNeeded, 500000)
  );
  const [requestSent, setRequestSent] = useState(false);
  const [syndicateModalOpen, setSyndicateModalOpen] = useState(false);

  const activeSyndicate = syndicates.find(s => s.startupId === entrepreneur.id);

  const slides = entrepreneur.pitchDeckSlides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const existingRequest = collaborationRequests.find(
    r => r.fromInvestorId === currentUser.profileId && r.toEntrepreneurId === entrepreneur.id
  );

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation for pitch deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!deckFullscreen) return;
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deckFullscreen, currentSlideIndex, slides.length]);

  const handleOpenRequestModal = () => {
    setRequestNote(
      `Hi ${entrepreneur.name}, we are very impressed with ${entrepreneur.startupName} and your ${entrepreneur.stage} round milestones. We would like to initiate formal diligence.`
    );
    setRequestSent(false);
    setRequestModalOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const success = sendCollaborationRequest(entrepreneur.id, requestNote, proposedCheckSize);
    if (success) {
      setRequestSent(true);
      setTimeout(() => {
        setRequestModalOpen(false);
        setRequestSent(false);
      }, 1500);
    }
  };

  const percentRaised = Math.round((entrepreneur.fundingRaised / entrepreneur.fundingNeeded) * 100);

  return (
    <DashboardLayout
      pageTitle={`${entrepreneur.startupName} — Venture Profile`}
      pageSubtitle={`Founded by ${entrepreneur.name} · ${entrepreneur.location}`}
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
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/chat/${entrepreneur.id}`)}
            icon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            Direct Message
          </Button>
          {currentUser.role === 'investor' && !existingRequest && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenRequestModal}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Collaborate / Invest
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Hero Header Card */}
        <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4">
              <img
                src={entrepreneur.avatar}
                alt={entrepreneur.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {entrepreneur.industry}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{entrepreneur.stage} Stage</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">Est. {entrepreneur.foundingYear}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {entrepreneur.startupName}
                </h1>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mt-1">
                  {entrepreneur.startupTagline}
                </p>
              </div>
            </div>

            {/* Quick stats badge cluster */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{entrepreneur.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-neutral-400" />
                <span>{entrepreneur.teamSize} Team Members</span>
              </div>
              <a
                href={entrepreneur.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Globe className="w-4 h-4" />
                <span>Website</span>
              </a>
            </div>
          </div>

          {/* Funding Need & Round Progress */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Funding Target
              </div>
              <div className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100 mt-0.5">
                {formatCurrency(entrepreneur.fundingNeeded)}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">{entrepreneur.stage} Round</div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Committed So Far
              </div>
              <div className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(entrepreneur.fundingRaised)} ({percentRaised}%)
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">
                {formatCurrency(entrepreneur.fundingNeeded - entrepreneur.fundingRaised)} allocation remaining
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Valuation Cap
              </div>
              <div className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100 mt-0.5">
                {entrepreneur.valuationCap}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">SAFE Note</div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Equity Offered
              </div>
              <div className="text-lg font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100 mt-0.5">
                {entrepreneur.equityOffered}
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">Target Dilution</div>
            </div>
          </div>
        </Card>

        {/* 2-Column Section: Left Founder & Description, Right Traction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Startup Overview */}
            <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                Executive Overview & Technology
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {entrepreneur.startupDescription}
              </p>

              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Founder Background
                </h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {entrepreneur.name} — {entrepreneur.title}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {entrepreneur.bio}
                    </p>
                    <div className="text-xs text-neutral-500 mt-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{entrepreneur.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interactive Pitch Deck Viewer (Week 2 & 3 deliverable!) */}
            <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Presentation className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Interactive Pitch Deck Presentation
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">
                    Slide {currentSlideIndex + 1} of {slides.length}
                  </span>
                  <button
                    onClick={() => setDeckFullscreen(true)}
                    className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    title="Fullscreen Deck"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Display Area with Motion Animation */}
              <div className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-neutral-950 via-[#0a0f1d] to-neutral-900 text-white rounded-2xl min-h-[300px] flex flex-col justify-between shadow-2xl border border-white/10 ring-1 ring-indigo-500/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-1">
                      {currentSlide.subtitle}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">
                      {currentSlide.title}
                    </h3>

                    <ul className="space-y-3 my-4">
                      {currentSlide.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                {/* Optional slide metrics row */}
                {currentSlide.metrics && currentSlide.metrics.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                    {currentSlide.metrics.map((m, i) => (
                      <div key={i} className="p-2.5 bg-white/5 backdrop-blur-xs rounded-xl border border-white/5">
                        <div className="text-[10px] text-neutral-400 font-bold uppercase">{m.label}</div>
                        <div className="text-base font-extrabold font-mono text-cyan-300 mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deck Navigation Controls */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous Slide
                </Button>

                {/* Slide indicator dots */}
                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlideIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-neutral-300 dark:bg-neutral-700'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Next Slide
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Traction Metrics & Investment Actions */}
          <div className="space-y-6">
            <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Verified Traction
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">
                    Annual Recurring Revenue (ARR)
                  </div>
                  <div className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                    {entrepreneur.traction.arr}
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">
                    Month-over-Month Growth
                  </div>
                  <div className="text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
                    +{entrepreneur.traction.momGrowth}
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">
                    Customer / User Base
                  </div>
                  <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                    {entrepreneur.traction.activeUsers}
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">
                    Gross Margin
                  </div>
                  <div className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                    {entrepreneur.traction.grossMargin}
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleOpenRequestModal}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Collaboration Proposal
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/chat/${entrepreneur.id}`)}
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Message {entrepreneur.name.split(' ')[0]}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Co-Investment Syndicate Banner (if active syndicate exists) */}
        {activeSyndicate && (
          <Card className="p-5 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Active Co-Investment Syndicate Open
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-600 text-white font-semibold">
                    Round Led by {activeSyndicate.leadInvestorFirm}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Lead check of {formatCurrency(activeSyndicate.leadCheckSize)} committed by {activeSyndicate.leadInvestorName}. Co-investors can join with minimum ticket of {formatCurrency(activeSyndicate.minimumCoInvestCheck)}.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setSyndicateModalOpen(true)}
              icon={<Users2 className="w-4 h-4" />}
              className="shrink-0"
            >
              View Syndicate Allocation
            </Button>
          </Card>
        )}

        {/* Next-Level Feature 1: SAFE Dilution & Cap Table Simulator */}
        <DilutionCalculator
          startupName={entrepreneur.startupName}
          initialCheckSize={Math.min(entrepreneur.fundingNeeded, 750000)}
        />

        {/* Next-Level Feature 2: Confidential Due Diligence Data Room */}
        <DataRoomVault
          startupId={entrepreneur.id}
          startupName={entrepreneur.startupName}
        />
      </div>

      {/* Syndicate Modal */}
      {activeSyndicate && (
        <SyndicateModal
          isOpen={syndicateModalOpen}
          onClose={() => setSyndicateModalOpen(false)}
          syndicate={activeSyndicate}
        />
      )}

      {/* Collaboration Request Modal */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title={`Collaborate with ${entrepreneur.startupName}`}
        description="Submit an investment check proposal and initial thesis memo to the founder."
      >
        <form onSubmit={handleSendRequest} className="space-y-4">
          {requestSent ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                Request Successfully Sent!
              </h4>
              <p className="text-xs text-neutral-500">
                {entrepreneur.name} has been notified and can review your proposal.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Indicative Check Size ($ USD)
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
                label="Message Note & Thesis"
                rows={4}
                value={requestNote}
                onChange={e => setRequestNote(e.target.value)}
                placeholder="Share reasons for interest, syndicate details, and next availability..."
                required
              />

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRequestModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Submit Proposal
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>

      {/* Fullscreen Pitch Deck Theater Modal with Keyboard Navigation */}
      <Modal
        isOpen={deckFullscreen}
        onClose={() => setDeckFullscreen(false)}
        maxWidth="4xl"
        title={`${entrepreneur.startupName} — Fullscreen Pitch Deck Theater`}
      >
        <div className="p-6 md:p-10 bg-gradient-to-br from-neutral-950 via-[#070A12] to-[#0D1220] text-white rounded-2xl min-h-[500px] flex flex-col justify-between border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

          {/* Top Bar inside Theater */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                THEATER MODE · SLIDE {currentSlideIndex + 1} OF {slides.length}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              <span>Use</span>
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-neutral-200">←</kbd>
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-neutral-200">→</kbd>
              <span>arrows to navigate</span>
            </div>
          </div>

          {/* Slide Content with AnimatePresence */}
          <div className="my-8 relative z-10 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-sm font-mono font-bold tracking-wider text-cyan-400 uppercase mb-2">
                  {currentSlide.subtitle}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>

                <ul className="space-y-4 my-6 max-w-3xl">
                  {currentSlide.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-sm md:text-base text-neutral-200">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Optional slide metrics */}
          {currentSlide.metrics && currentSlide.metrics.length > 0 && (
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center relative z-10">
              {currentSlide.metrics.map((m, i) => (
                <div key={i} className="p-3.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-xs text-neutral-400 font-bold uppercase">{m.label}</div>
                  <div className="text-xl md:text-2xl font-extrabold font-mono text-cyan-300 mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 relative z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              icon={<ChevronLeft className="w-4 h-4" />}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Previous Slide
            </Button>

            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              icon={<ChevronRight className="w-4 h-4" />}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Next Slide
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
