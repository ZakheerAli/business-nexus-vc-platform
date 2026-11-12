import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../data/mockData';
import {
  Calculator,
  FileText,
  Check,
  DollarSign,
  Percent,
  ShieldCheck,
  Sparkles,
  PieChart,
  PenTool,
  CheckCircle2,
  Lock,
  Download,
  RotateCcw
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { motion, AnimatePresence } from 'motion/react';

interface DilutionCalculatorProps {
  initialValuationCap?: number;
  initialCheckSize?: number;
  startupName: string;
}

export const DilutionCalculator: React.FC<DilutionCalculatorProps> = ({
  initialValuationCap = 14000000,
  initialCheckSize = 750000,
  startupName
}) => {
  const [valuationCap, setValuationCap] = useState(initialValuationCap);
  const [checkSize, setCheckSize] = useState(initialCheckSize);
  const [existingOptionPool, setExistingOptionPool] = useState(14); // 14%
  const [termSheetModalOpen, setTermSheetModalOpen] = useState(false);
  const [activeSlice, setActiveSlice] = useState<string | null>(null);

  // Term Sheet Signature State
  const [signatureName, setSignatureName] = useState('Victoria Sterling, General Partner');
  const [isSigned, setIsSigned] = useState(false);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);
  const [cryptoHash, setCryptoHash] = useState<string | null>(null);

  // Calculations: Post-money SAFE standard (Y Combinator model)
  const postMoneyValuation = valuationCap + checkSize;
  const investorEquityPercent = Number(((checkSize / postMoneyValuation) * 100).toFixed(2));
  const optionPoolAdjusted = Number((existingOptionPool * (1 - checkSize / postMoneyValuation)).toFixed(1));
  const foundersRetainedPercent = Number((100 - investorEquityPercent - optionPoolAdjusted).toFixed(1));

  // Dollar values
  const founderDollarVal = (postMoneyValuation * foundersRetainedPercent) / 100;
  const investorDollarVal = checkSize;
  const optionPoolDollarVal = (postMoneyValuation * optionPoolAdjusted) / 100;

  // Pie chart calculation
  const slices = [
    {
      id: 'founders',
      name: 'Founders Common',
      percent: foundersRetainedPercent,
      dollarVal: founderDollarVal,
      color: '#10B981', // emerald
      gradient: 'from-emerald-500 to-teal-600',
      stroke: '#059669'
    },
    {
      id: 'investor',
      name: 'New Lead Investor',
      percent: investorEquityPercent,
      dollarVal: investorDollarVal,
      color: '#00F2FE', // cyan
      gradient: 'from-cyan-400 to-indigo-600',
      stroke: '#06B6D4'
    },
    {
      id: 'optionPool',
      name: 'ESOP Option Pool',
      percent: optionPoolAdjusted,
      dollarVal: optionPoolDollarVal,
      color: '#818CF8', // indigo
      gradient: 'from-indigo-400 to-purple-600',
      stroke: '#6366F1'
    }
  ];

  // Calculate SVG stroke dashes for circle donut
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  const handleSign = () => {
    setIsSigned(true);
    const date = new Date().toISOString();
    setSignedTimestamp(date);
    // Generate simulated cryptographic verification hash
    const fakeHash = `0x${Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
    setCryptoHash(fakeHash);
  };

  const handleResetSignature = () => {
    setIsSigned(false);
    setSignedTimestamp(null);
    setCryptoHash(null);
  };

  return (
    <Card className="p-6 bg-white/90 dark:bg-[#0D1220]/90 backdrop-blur-xl border border-neutral-200/80 dark:border-cyan-500/20 glow-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200/70 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white rounded-xl shadow-md shadow-indigo-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                SAFE Dilution & Dynamic Cap Table
              </h3>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                YC Model
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Interactive post-money convertible equity simulator for {startupName}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setTermSheetModalOpen(true)}
          icon={<FileText className="w-3.5 h-3.5" />}
          className="text-xs bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold shadow-md shadow-indigo-600/20"
        >
          {isSigned ? 'View Executed Term Sheet' : 'Draft & Sign Term Sheet'}
        </Button>
      </div>

      {/* Main Grid: Controls + Interactive Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        {/* Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Check Size Slider */}
          <div className="space-y-2 p-3.5 bg-neutral-50/80 dark:bg-[#141B2D]/60 rounded-xl border border-neutral-200/60 dark:border-white/5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
                Proposed Check Size (Investment)
              </label>
              <span className="font-mono tabular-nums font-extrabold text-cyan-600 dark:text-cyan-400 text-base">
                {formatCurrency(checkSize)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={3000000}
              step={50000}
              value={checkSize}
              onChange={e => setCheckSize(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>$100K</span>
              <span>$1.5M</span>
              <span>$3.0M</span>
            </div>
          </div>

          {/* Valuation Cap Slider */}
          <div className="space-y-2 p-3.5 bg-neutral-50/80 dark:bg-[#141B2D]/60 rounded-xl border border-neutral-200/60 dark:border-white/5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-indigo-500" />
                Valuation Cap (Post-Money SAFE)
              </label>
              <span className="font-mono tabular-nums font-extrabold text-neutral-900 dark:text-white text-base">
                {formatCurrency(valuationCap)}
              </span>
            </div>
            <input
              type="range"
              min={5000000}
              max={35000000}
              step={500000}
              value={valuationCap}
              onChange={e => setValuationCap(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>$5.0M</span>
              <span>$20.0M</span>
              <span>$35.0M</span>
            </div>
          </div>
        </div>

        {/* Dynamic SVG Cap Table Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-neutral-50/60 dark:bg-[#141B2D]/40 rounded-2xl border border-neutral-200/60 dark:border-white/5">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-neutral-200 dark:stroke-neutral-800"
                strokeWidth="18"
                fill="transparent"
              />
              {slices.map(slice => {
                const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                cumulativePercent += slice.percent;
                const isHovered = activeSlice === slice.id;

                return (
                  <circle
                    key={slice.id}
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={slice.color}
                    strokeWidth={isHovered ? '22' : '18'}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    fill="transparent"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setActiveSlice(slice.id)}
                    onMouseLeave={() => setActiveSlice(null)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Post-Money
              </span>
              <span className="text-sm font-extrabold font-mono text-neutral-900 dark:text-white tabular-nums">
                {formatCurrency(postMoneyValuation)}
              </span>
              <span className="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400">
                100% Capitalized
              </span>
            </div>
          </div>

          {/* Slices legend */}
          <div className="grid grid-cols-1 w-full gap-1.5 mt-3 pt-3 border-t border-neutral-200/60 dark:border-white/10 text-xs">
            {slices.map(slice => (
              <div
                key={slice.id}
                onMouseEnter={() => setActiveSlice(slice.id)}
                onMouseLeave={() => setActiveSlice(null)}
                className={`flex items-center justify-between px-2 py-1 rounded-lg cursor-pointer transition-all ${
                  activeSlice === slice.id
                    ? 'bg-neutral-200/80 dark:bg-white/10 font-bold'
                    : 'hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="text-neutral-800 dark:text-neutral-200 text-[11px]">
                    {slice.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono tabular-nums text-[11px]">
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {slice.percent}%
                  </span>
                  <span className="text-neutral-400 text-[10px]">
                    ({formatCurrency(slice.dollarVal)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Result Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-100/70 dark:bg-[#141B2D]/70 rounded-xl border border-neutral-200/60 dark:border-white/5 text-xs">
        <div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
            Effective Post-Money
          </div>
          <div className="text-base font-extrabold font-mono tabular-nums text-neutral-900 dark:text-white mt-0.5">
            {formatCurrency(postMoneyValuation)}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
            Investor Ownership
          </div>
          <div className="text-base font-extrabold font-mono tabular-nums text-cyan-600 dark:text-cyan-400 mt-0.5">
            {investorEquityPercent}%
          </div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
            Founders Equity
          </div>
          <div className="text-base font-extrabold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
            {foundersRetainedPercent}%
          </div>
        </div>

        <div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
            Option Pool (Diluted)
          </div>
          <div className="text-base font-extrabold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-0.5">
            {optionPoolAdjusted}%
          </div>
        </div>
      </div>

      {/* Signable Term Sheet Modal */}
      <Modal
        isOpen={termSheetModalOpen}
        onClose={() => setTermSheetModalOpen(false)}
        title={`NVCA Standard Term Sheet — ${startupName}`}
        description="Simple Agreement for Future Equity (Post-Money Valuation Cap)"
        maxWidth="xl"
      >
        <div className="space-y-4 text-xs text-neutral-700 dark:text-neutral-300 max-h-[75vh] overflow-y-auto pr-1">
          {/* Executed Badge if Signed */}
          {isSigned && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>DOCUMENT DIGITALLY EXECUTED & SEALED</span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                    {signedTimestamp ? new Date(signedTimestamp).toLocaleDateString() : ''}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono mt-1 break-all">
                  Verification Hash: <span className="font-bold">{cryptoHash}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Legal Clauses Table */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2.5">
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Security Instrument:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                Post-Money SAFE (NVCA / YC Standard)
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Investment Check Amount:</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {formatCurrency(checkSize)}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Valuation Cap:</span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white">
                {formatCurrency(valuationCap)}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Pro-Forma Ownership:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {investorEquityPercent}% (Post-Round)
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Liquidation Preference:</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                1x Non-Participating with Senior Preferred distribution
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-500 font-semibold">Major Investor Pro-Rata:</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Full Pro-Rata participation rights in next priced equity financing
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500 font-semibold">Governance & Information:</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Quarterly audited financials + 1 Board Observer seat
              </span>
            </div>
          </div>

          {/* Interactive Digital Signature Block */}
          <div className="p-4 bg-neutral-100/80 dark:bg-[#141B2D]/80 rounded-xl border border-neutral-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-cyan-500" />
                Signatory & Electronic Execution
              </span>
              {isSigned && (
                <button
                  onClick={handleResetSignature}
                  className="text-[10px] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Re-sign
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                Authorized Signatory Full Name & Title
              </label>
              <input
                type="text"
                disabled={isSigned}
                value={signatureName}
                onChange={e => setSignatureName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#090D16] border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white disabled:opacity-75 focus:outline-hidden"
              />
            </div>

            {/* Signature Preview Canvas / Stamp */}
            <div className="p-4 bg-white dark:bg-[#070A12] border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-xl text-center">
              {isSigned ? (
                <div className="py-2">
                  <div className="font-serif italic text-2xl text-indigo-600 dark:text-cyan-400 select-none">
                    {signatureName}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-1">
                    Digitally Sealed via Business Nexus · Cryptographic Timestamp {signedTimestamp}
                  </div>
                </div>
              ) : (
                <div className="py-3 text-neutral-400 dark:text-neutral-500 text-xs">
                  Clicking "Affix Digital Signature & Seal" will execute this term sheet agreement.
                </div>
              )}
            </div>

            {!isSigned ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSign}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold py-2 shadow-md shadow-emerald-600/20"
                icon={<Lock className="w-3.5 h-3.5" />}
              >
                Affix Digital Signature & Cryptographic Seal
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        `NVCA TERM SHEET - ${startupName}\nPost-Money Valuation: ${formatCurrency(
                          postMoneyValuation
                        )}\nInvestment Amount: ${formatCurrency(
                          checkSize
                        )}\nInvestor Ownership: ${investorEquityPercent}%\nSignatory: ${signatureName}\nTimestamp: ${signedTimestamp}\nHash: ${cryptoHash}`
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Term_Sheet_${startupName.replace(/\s+/g, '_')}_Executed.txt`;
                    a.click();
                  }}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Download Executed Document
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setTermSheetModalOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </Card>
  );
};
