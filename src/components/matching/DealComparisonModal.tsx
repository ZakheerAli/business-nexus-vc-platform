import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { EntrepreneurProfile } from '../../types';
import { formatCurrency, calculateThesisMatch } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Check, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DealComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  startups: EntrepreneurProfile[];
}

export const DealComparisonModal: React.FC<DealComparisonModalProps> = ({
  isOpen,
  onClose,
  startups
}) => {
  const { investors, currentUser } = useApp();
  const navigate = useNavigate();

  // Pick first 2 or 3 startups by default
  const [selectedIds, setSelectedIds] = useState<string[]>([
    startups[0]?.id || '',
    startups[1]?.id || '',
    startups[2]?.id || ''
  ].filter(Boolean));

  const currentInvestor = investors.find(i => i.id === currentUser.profileId) || investors[0];

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(prev => prev.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        setSelectedIds(prev => [prev[1], prev[2], id]);
      }
    }
  };

  const comparedStartups = startups.filter(s => selectedIds.includes(s.id));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title="Venture Deal Flow Comparison Matrix"
      description="Compare unit economics, growth trajectories, and thesis alignment side-by-side."
    >
      <div className="space-y-4">
        {/* Startup selector pills */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
          <span className="font-semibold text-neutral-500">Select Startups (Max 3):</span>
          {startups.map(s => {
            const isSelected = selectedIds.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleToggle(s.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {s.startupName}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <th className="py-3 px-4 font-semibold text-neutral-500 w-1/4">Metric / Dimension</th>
                {comparedStartups.map(s => (
                  <th key={s.id} className="py-3 px-4 font-bold text-neutral-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span className="truncate">{s.startupName}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Sector / Industry</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-semibold text-neutral-900 dark:text-neutral-100">
                    {s.industry}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Stage & Round Target</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-mono">
                    {s.stage} · {formatCurrency(s.fundingNeeded)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Thesis Match Score</td>
                {comparedStartups.map(s => {
                  const match = calculateThesisMatch(currentInvestor, s);
                  return (
                    <td key={s.id} className="py-2.5 px-4">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {match.score}% Fit
                      </span>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">ARR / Current Revenue</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                    {s.traction.arr}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">MoM Growth Rate</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{s.traction.momGrowth}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Gross Margins</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-mono">
                    {s.traction.grossMargin}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Valuation Cap</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 font-mono font-semibold">
                    {s.valuationCap}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-medium text-neutral-500">Team Size & Location</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-2.5 px-4 text-neutral-600 dark:text-neutral-400">
                    {s.teamSize} members · {s.location}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-neutral-500">Quick Actions</td>
                {comparedStartups.map(s => (
                  <td key={s.id} className="py-3 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onClose();
                        navigate(`/profile/entrepreneur/${s.id}`);
                      }}
                      className="text-xs w-full"
                    >
                      View Profile
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
