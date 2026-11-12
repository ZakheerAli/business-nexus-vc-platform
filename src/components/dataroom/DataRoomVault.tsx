import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { DataRoomDocument } from '../../types';
import {
  Lock,
  Unlock,
  FileText,
  Clock,
  Eye,
  ShieldAlert,
  Download,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

interface DataRoomVaultProps {
  startupId: string;
  startupName: string;
}

export const DataRoomVault: React.FC<DataRoomVaultProps> = ({ startupId, startupName }) => {
  const { dataRoomDocs, requestDataRoomAccess, grantDataRoomAccess, currentUser } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<DataRoomDocument | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [requestedDocId, setRequestedDocId] = useState<string | null>(null);

  // Filter docs for this startup or fallback to default sample docs
  const docs = dataRoomDocs.filter(d => d.startupId === startupId);
  const activeDocs = docs.length > 0 ? docs : dataRoomDocs.slice(0, 4);

  const handleOpenDoc = (doc: DataRoomDocument) => {
    setSelectedDoc(doc);
    setPreviewModalOpen(true);
  };

  const handleRequestAccess = (docId: string) => {
    requestDataRoomAccess(docId);
    setRequestedDocId(docId);
    setTimeout(() => {
      setRequestedDocId(null);
    }, 2000);
  };

  const isFounderOfStartup = currentUser.role === 'entrepreneur';

  return (
    <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Confidential Due Diligence Vault
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Audited financial models, verified cap table ledgers, and intellectual property filings
            for {startupName}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Encrypted Tier-3 Data Room</span>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {activeDocs.map(doc => {
          const isGranted = doc.accessStatus === 'granted' || isFounderOfStartup;
          const isRequested = doc.accessStatus === 'requested';

          return (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isGranted
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {doc.category === 'Financials' ? (
                    <FileSpreadsheet className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {doc.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {doc.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{doc.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span>Updated {doc.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 sm:self-center shrink-0">
                {isGranted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenDoc(doc)}
                    icon={<Eye className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    View Document
                  </Button>
                ) : isRequested ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    Access Requested
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestAccess(doc.id)}
                    icon={<Lock className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    Request Access
                  </Button>
                )}

                {/* If Founder, ability to authorize/grant access */}
                {isFounderOfStartup && doc.accessStatus === 'requested' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => grantDataRoomAccess(doc.id)}
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                    className="text-xs text-emerald-600"
                  >
                    Approve Request
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Reader Modal */}
      <Modal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        maxWidth="2xl"
        title={selectedDoc?.title || 'Data Room Document'}
        description={`Confidential Diligence Document · ${selectedDoc?.category}`}
      >
        {selectedDoc && (
          <div className="space-y-4">
            {/* Watermark security notice */}
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-indigo-500" />
                Watermarked for: {currentUser.name} ({currentUser.organization})
              </span>
              <span className="font-mono text-[11px]">{new Date().toLocaleDateString()}</span>
            </div>

            {/* Document Content Viewport */}
            <div className="p-5 bg-neutral-950 text-neutral-200 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-neutral-800 max-h-96 overflow-y-auto">
              {selectedDoc.previewContent}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
              <span className="text-neutral-500">Document Size: {selectedDoc.fileSize}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Downloaded copy of ${selectedDoc.title}`)}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Download Signed Copy
                </Button>
                <Button variant="primary" size="sm" onClick={() => setPreviewModalOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};
