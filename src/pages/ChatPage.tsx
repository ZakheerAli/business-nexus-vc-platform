import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Send,
  Search,
  CheckCheck,
  User,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Calendar,
  Video
} from 'lucide-react';
import { ChatMessage, Conversation } from '../types';
import { ScheduleCallModal } from '../components/chat/ScheduleCallModal';

export const ChatPage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const {
    currentUser,
    entrepreneurs,
    investors,
    messages,
    sendMessage,
    getConversationId
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Compile list of potential conversation partners based on available investors and entrepreneurs
  const conversationPartners = useMemo(() => {
    if (currentUser.role === 'investor') {
      return entrepreneurs.map(e => ({
        id: e.id,
        name: e.name,
        role: 'entrepreneur' as const,
        avatar: e.avatar,
        subtitle: `${e.startupName} (${e.stage})`,
        isOnline: true
      }));
    } else {
      return investors.map(i => ({
        id: i.id,
        name: i.name,
        role: 'investor' as const,
        avatar: i.avatar,
        subtitle: `${i.firm} · ${i.title}`,
        isOnline: true
      }));
    }
  }, [currentUser.role, entrepreneurs, investors]);

  // Determine active conversation partner
  const [activePartnerId, setActivePartnerId] = useState<string>(() => {
    if (userId) return userId;
    return conversationPartners[0]?.id || '';
  });

  useEffect(() => {
    if (userId) {
      setActivePartnerId(userId);
    }
  }, [userId]);

  const activePartner = useMemo(() => {
    return conversationPartners.find(p => p.id === activePartnerId) || conversationPartners[0];
  }, [conversationPartners, activePartnerId]);

  const activeConvId = useMemo(() => {
    if (!activePartner) return '';
    return getConversationId(currentUser.profileId, activePartner.id);
  }, [activePartner, currentUser.profileId, getConversationId]);

  const activeMessages = messages[activeConvId] || [];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !activePartner) return;

    sendMessage(
      activeConvId,
      inputMessage.trim(),
      activePartner.id,
      activePartner.name,
      activePartner.role,
      activePartner.avatar
    );

    setInputMessage('');
    setIsTyping(true);

    // Typing indicator turns off when reply arrives
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInputMessage(text);
  };

  const quickReplies =
    currentUser.role === 'investor'
      ? [
          'Could you share your updated pitch deck and cap table?',
          'What is your target close date for this round?',
          'We would love to schedule a 30-min intro call next week.'
        ]
      : [
          'Thanks for reaching out! Let us schedule a brief diligence call.',
          'Our Q3 ARR numbers and data room are fully updated.',
          'Happy to answer any questions about our proprietary tech stack.'
        ];

  return (
    <DashboardLayout
      pageTitle="Secure Communications & Deal Room Chat"
      pageSubtitle="Direct, encrypted communication between venture partners and startup founders."
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-14rem)] min-h-[580px]">
        {/* Left: Conversations Directory */}
        <div className="w-full md:w-80 border-r border-neutral-200 dark:border-neutral-800 flex flex-col shrink-0 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Active Conversations
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                placeholder="Filter contacts..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full h-9 pl-8 pr-3 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {conversationPartners
              .filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
              .map(partner => {
                const convId = getConversationId(currentUser.profileId, partner.id);
                const convMsgs = messages[convId] || [];
                const lastMsg = convMsgs[convMsgs.length - 1];
                const isSelected = activePartner?.id === partner.id;

                return (
                  <button
                    key={partner.id}
                    onClick={() => {
                      setActivePartnerId(partner.id);
                      navigate(`/chat/${partner.id}`);
                    }}
                    className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-2 border-indigo-600'
                        : 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {partner.name}
                        </span>
                        {lastMsg && (
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {lastMsg.timestamp.split(' at ')[0]}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {partner.subtitle}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate mt-1">
                        {lastMsg ? lastMsg.text : 'Start a new conversation...'}
                      </p>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-900">
          {activePartner ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activePartner.avatar}
                      alt={activePartner.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      {activePartner.name}
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        Online
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {activePartner.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setScheduleModalOpen(true)}
                    icon={<Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    className="text-xs"
                  >
                    Schedule Diligence Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(
                        activePartner.role === 'investor'
                          ? `/profile/investor/${activePartner.id}`
                          : `/profile/entrepreneur/${activePartner.id}`
                      )
                    }
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    View Profile
                  </Button>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {activeMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-400">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 mb-3">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Begin direct collaboration with {activePartner.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                      Send a pitch question, request diligence documents, or propose next steps.
                    </p>
                  </div>
                ) : (
                  activeMessages.map(msg => {
                    const isMe = msg.senderId === currentUser.profileId;
                    const isMeetingCard = msg.text.includes('📅 SCHEDULED DILIGENCE CALL');

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isMe && (
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-white/10"
                          />
                        )}

                        {isMeetingCard ? (
                          <div className="max-w-[85%] sm:max-w-md p-4 bg-gradient-to-br from-indigo-50 to-cyan-50/50 dark:from-indigo-950/80 dark:to-cyan-950/40 border border-indigo-200 dark:border-indigo-500/40 rounded-2xl text-xs space-y-3 shadow-md shadow-indigo-500/5">
                            <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60 dark:border-indigo-900/40">
                              <span className="font-extrabold text-indigo-950 dark:text-cyan-300 flex items-center gap-1.5">
                                <Video className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                                Diligence Video Call Confirmed
                              </span>
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full">
                                Scheduled
                              </span>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed font-sans">
                              {msg.text}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <a
                                href="https://meet.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-sm text-xs"
                              >
                                <Video className="w-3.5 h-3.5" />
                                Join Meeting Room
                              </a>
                            </div>
                            <div className="text-[10px] text-right font-mono text-neutral-400 pt-1">
                              {msg.timestamp}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`max-w-[75%] sm:max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                              isMe
                                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-xs shadow-md shadow-indigo-600/20'
                                : 'bg-white dark:bg-[#131a29] border border-neutral-200/80 dark:border-white/10 text-neutral-900 dark:text-neutral-100 rounded-bl-xs shadow-xs'
                            }`}
                          >
                            {!isMe && (
                              <div className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 mb-1">
                                {msg.senderName}
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <div
                              className={`text-[10px] mt-1 text-right font-mono ${
                                isMe ? 'text-indigo-200' : 'text-neutral-400'
                              }`}
                            >
                              {msg.timestamp}
                            </div>
                          </div>
                        )}

                        {isMe && (
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-indigo-500/30"
                          />
                        )}
                      </motion.div>
                    );
                  })
                )}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <img
                      src={activePartner.avatar}
                      alt={activePartner.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[11px]">{activePartner.name} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Reply Suggestions */}
              <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0">
                  Quick Prompts:
                </span>
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="px-2.5 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Bottom Message Input Form */}
              <form
                onSubmit={handleSend}
                className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder={`Write a message to ${activePartner.name}...`}
                  className="flex-1 h-10 px-4 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-900 dark:text-neutral-100"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!inputMessage.trim()}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-neutral-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>

      {activePartner && (
        <ScheduleCallModal
          isOpen={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          conversationId={activeConvId}
          partnerName={activePartner.name}
        />
      )}
    </DashboardLayout>
  );
};
