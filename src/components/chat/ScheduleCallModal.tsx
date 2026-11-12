import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Video, CheckCircle } from 'lucide-react';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  partnerName: string;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  partnerName
}) => {
  const { scheduleCall } = useApp();

  const [callTopic, setCallTopic] = useState('Partner Diligence & Product Demo');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM PST');
  const [duration, setDuration] = useState(30);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSlots = [
    '09:30 AM PST',
    '10:00 AM PST',
    '11:30 AM PST',
    '01:30 PM PST',
    '03:00 PM PST',
    '04:30 PM PST'
  ];

  const topics = [
    'Partner Diligence & Product Demo',
    'Technical Architecture & Security Audit',
    'Cap Table, Projections & Financial Review',
    'Final Partner Meeting & Term Sheet Discussion'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleCall(conversationId, callTopic, selectedDate, selectedTime, duration, partnerName);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Schedule Diligence Call with ${partnerName}`}
      description="Select meeting topic and open calendar time slot."
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-2">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
            Call Confirmed & Calendar Invite Dispatched!
          </h4>
          <p className="text-xs text-neutral-500">
            A secure video conference card has been posted to your 1-on-1 chat room.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Diligence Agenda Topic
            </label>
            <select
              value={callTopic}
              onChange={e => setCallTopic(e.target.value)}
              className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {topics.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Duration
              </label>
              <div className="flex gap-2">
                {[15, 30, 45].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`flex-1 h-10 text-xs font-medium rounded-lg border transition-colors ${
                      duration === mins
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-2 text-xs font-mono rounded-lg border transition-colors ${
                    selectedTime === slot
                      ? 'border-indigo-600 bg-indigo-600 text-white font-semibold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <Video className="w-4 h-4 text-indigo-600" />
            <span>Automatic Google Meet conference link will be created.</span>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>
              Confirm Call
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
