import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  PieChart,
  Shield,
  Zap,
  MessageSquare,
  Crown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const NexusAIChatbot: React.FC = () => {
  const { language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'initial-ai',
        sender: 'ai',
        text:
          language === 'romanUrdu'
            ? 'Salam! Main **Nexus AI** hun — aapka Institutional Venture Capital & Dealflow Co-Pilot. Aap mujhse kisi bhi startup (e.g. SynthFlow AI, QuantumEdge), SAFE dilution mechanics, ya data room ke baray mein pooch sakte hain!'
            : 'Welcome! I am **Nexus AI** — your institutional venture capital and dealflow co-pilot. Ask me anything about our active rounds (SynthFlow AI, QuantumEdge), SAFE dilution modeling, or diligence vaults!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Quick suggestion prompts based on active language
  const quickPrompts =
    language === 'romanUrdu'
      ? [
          { label: '🚀 SynthFlow AI ki traction?', query: 'SynthFlow AI ki traction aur ARR kitna hai?' },
          { label: '📊 SAFE Dilution kaise kaam karti hai?', query: 'Post-money SAFE dilution kaise calculate hoti hai?' },
          { label: '🔒 Data Room forensic watermark?', query: 'Confidential Data Room ka watermark kaise kaam karta hai?' },
          { label: '💼 Series A vs Seed deals?', query: 'Active Series A aur Seed deals ka mawazna karein' }
        ]
      : [
          { label: '🚀 SynthFlow AI Traction?', query: 'What is SynthFlow AI ARR and round details?' },
          { label: '📊 How SAFE Dilution works?', query: 'How is post-money SAFE dilution calculated mathematically?' },
          { label: '🔒 Data Room Watermark?', query: 'How does forensic watermarking protect pitch documents?' },
          { label: '💼 Compare Active Deals?', query: 'Compare SynthFlow AI vs QuantumEdge rounds' }
        ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          language
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || (language === 'romanUrdu' ? 'Maazrat, jawab generate nahi ho saka.' : 'Sorry, could not generate a response.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn('AI Chat request error:', err);
      // Fallback message
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          language === 'romanUrdu'
            ? `**Nexus AI Analysis:**\n\n- **SynthFlow AI:** $1.20M ARR, 24.5% MoM Growth, Raising $2.0M at $10.0M Cap.\n- **SAFE Calculator:** Investment check / Post-money Cap = Exact Equity %.\n\nAap terminal mein live deals aur dilution modeler explore kar sakte hain!`
            : `**Nexus AI Analysis:**\n\n- **SynthFlow AI:** $1.20M ARR, +280% YoY Velocity, Raising $2.0M at $10.0M Cap.\n- **SAFE Calculator:** Investment Check / Post-Money Cap = Exact Equity Stake.\n\nYou can model any check size on the platform or inspect data rooms!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'initial-ai',
        sender: 'ai',
        text:
          language === 'romanUrdu'
            ? 'Chat history clear kar di gayi hai. Main aapki kya madad kar sakta hun?'
            : 'Chat history cleared. How can I assist with your dealflow or cap table modeling today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to format basic markdown-style text into styled output
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={idx} className={`${line.trim() === '' ? 'h-2' : 'my-0.5'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-amber-500 dark:text-amber-300">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Holographic AI Launcher Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Floating Tooltip Callout when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-white/90 dark:bg-[#070B18]/90 backdrop-blur-xl border border-amber-500/35 shadow-xl shadow-amber-500/10 cursor-pointer hover:border-amber-400 group transition-all"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-amber-500 transition-colors">
                {language === 'romanUrdu' ? 'Nexus AI Co-Pilot Se Poochein' : 'Ask Nexus AI Co-Pilot'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Multi-Ring Glowing Orb */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(prev => !prev)}
          className="relative group w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-2xl focus:outline-none"
          title="Toggle Nexus AI Chatbot"
        >
          {/* Ambient Rotating Glowing Rings */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-violet-600 to-emerald-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
          
          {/* Inner Core Button */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 flex items-center justify-center text-white border border-white/25 shadow-inner">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Animated Chatbot Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed z-50 bottom-24 right-4 sm:right-6 ${
              isExpanded
                ? 'w-[calc(100vw-2rem)] sm:w-[680px] h-[78vh]'
                : 'w-[calc(100vw-2rem)] sm:w-[440px] h-[580px]'
            } max-w-full rounded-3xl glass-panel border border-amber-500/35 dark:border-amber-500/25 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl bg-white/95 dark:bg-[#070B18]/95 transition-all duration-300`}
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-200/80 dark:border-white/10 bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#070B18]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                      Nexus AI
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      Co-Pilot
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                    <span className="text-emerald-500 font-semibold">● Online</span>
                    <span>·</span>
                    <span>Gemini 3.8 Flash</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Clear Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="hidden sm:block p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
                  title={isExpanded ? 'Restore Size' : 'Expand View'}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-neutral-800 dark:text-neutral-200">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-xs font-medium'
                        : 'bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10 rounded-bl-xs'
                    }`}
                  >
                    <div>{renderFormattedText(msg.text)}</div>
                    <div
                      className={`text-[9px] font-mono mt-1 text-right ${
                        msg.sender === 'user' ? 'text-amber-100' : 'text-neutral-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Animated AI Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="rounded-2xl py-2.5 px-4 bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 border-t border-neutral-200/60 dark:border-white/5 bg-neutral-50/50 dark:bg-black/20">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.query)}
                    className="shrink-0 px-2.5 py-1 rounded-lg border border-amber-500/25 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] hover:border-amber-400 hover:bg-amber-500/10 text-[10px] font-semibold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#070B18]">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder={
                    language === 'romanUrdu'
                      ? 'Deals, traction, ya dilution ke baray mein poochein...'
                      : 'Ask about dealflow, dilution, term sheets...'
                  }
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-amber-500/60 dark:focus:border-amber-400/60 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/25 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
