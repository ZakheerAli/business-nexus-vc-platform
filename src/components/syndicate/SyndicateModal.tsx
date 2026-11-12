import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SyndicateAllocation } from '../../types';
import { formatCurrency } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Users, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SyndicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  syndicate: SyndicateAllocation;
}

export const SyndicateModal: React.FC<SyndicateModalProps> = ({ isOpen, onClose, syndicate }) => {
  const { joinSyndicate, currentUser } = useApp();
  const [coInvestCheck, setCoInvestCheck] = useState<number>(syndicate.minimumCoInvestCheck);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalCommitted =
    syndicate.leadCheckSize + syndicate.coInvestors.reduce((sum, c) => sum + c.checkSize, 0);
  const remainingAllocation = Math.max(0, syndicate.totalRoundTarget - totalCommitted);
  const progressPercent = Math.min(
    100,
    Math.round((totalCommitted / syndicate.totalRoundTarget) * 100)
  );

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    joinSyndicate(syndicate.id, coInvestCheck);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={`Co-Investment Syndicate — ${syndicate.startupName}`}
      description={`Led by ${syndicate.leadInvestorName} (${syndicate.leadInvestorFirm})`}
    >
      <div className="space-y-5 text-xs">
        {/* Progress Bar & Summary */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 font-semibold">Syndicate Round Allocation</span>
            <span className="font-mono tabular-nums font-bold text-neutral-900 dark:text-white">
              {formatCurrency(totalCommitted)} / {formatCurrency(syndicate.totalRoundTarget)} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-neutral-500">
            <span>Lead Check: {formatCurrency(syndicate.leadCheckSize)}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Remaining Open: {formatCurrency(remainingAllocation)}
            </span>
          </div>
        </div>

        {/* Existing Syndicate Members */}
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Participating Co-Investors ({syndicate.coInvestors.length + 1})
          </h4>
          <div className="space-y-2">
            {/* Lead Investor Row */}
            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-lg border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {syndicate.leadInvestorName} (Lead)
                </span>
                <span className="text-neutral-500 block text-[11px]">{syndicate.leadInvestorFirm}</span>
              </div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {formatCurrency(syndicate.leadCheckSize)}
              </span>
            </div>

            {/* Other Co-investors */}
            {syndicate.coInvestors.map((c, i) => (
              <div
                key={i}
                className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {c.investorName}
                  </span>
                  <span className="text-neutral-500 block text-[11px]">{c.investorFirm}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(c.checkSize)}
                  </span>
                  <span className="text-[10px] text-neutral-400 block font-mono">{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Syndicate Form */}
        {remainingAllocation > 0 ? (
          isSuccess ? (
            <div className="py-4 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                Allocation Confirmed!
              </h4>
              <p className="text-neutral-500">
                You have co-invested {formatCurrency(coInvestCheck)} into {syndicate.startupName}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Co-Investment Amount ($ USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="number"
                    min={syndicate.minimumCoInvestCheck}
                    max={remainingAllocation}
                    step={25000}
                    value={coInvestCheck}
                    onChange={e => setCoInvestCheck(Number(e.target.value))}
                    className="w-full h-10 pl-9 pr-3 text-sm font-mono tabular-nums bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span>Minimum Check: {formatCurrency(syndicate.minimumCoInvestCheck)}</span>
                  <span>Formatted: {formatCurrency(coInvestCheck)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={<Users className="w-3.5 h-3.5" />}>
                  Commit Co-Investment
                </Button>
              </div>
            </form>
          )
        ) : (
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-center text-neutral-500">
            This syndicate round is 100% subscribed.
          </div>
        )}
      </div>
    </Modal>
  );
};
