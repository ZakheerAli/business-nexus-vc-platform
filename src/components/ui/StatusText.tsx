import React from 'react';
import { CollaborationRequestStatus } from '../../types';

interface StatusTextProps {
  status: CollaborationRequestStatus;
  className?: string;
}

export const StatusText: React.FC<StatusTextProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'accepted':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Accepted
        </span>
      );
    case 'declined':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          Declined
        </span>
      );
    case 'pending':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Pending Review
        </span>
      );
  }
};
