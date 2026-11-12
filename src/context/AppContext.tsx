import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  CurrentUser,
  EntrepreneurProfile,
  InvestorProfile,
  CollaborationRequest,
  ChatMessage,
  CollaborationRequestStatus,
  DataRoomDocument,
  SyndicateAllocation,
  ScheduledCall
} from '../types';
import {
  INITIAL_ENTREPRENEURS,
  INITIAL_INVESTORS,
  INITIAL_COLLABORATION_REQUESTS,
  INITIAL_MESSAGES,
  INITIAL_DATA_ROOM_DOCS,
  INITIAL_SYNDICATES,
  DEMO_INVESTOR_USER,
  DEMO_ENTREPRENEUR_USER
} from '../data/mockData';
import { Language, Translations, translations } from '../i18n/translations';

interface AppContextType {
  currentUser: CurrentUser;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  entrepreneurs: EntrepreneurProfile[];
  investors: InvestorProfile[];
  collaborationRequests: CollaborationRequest[];
  messages: Record<string, ChatMessage[]>;
  dataRoomDocs: DataRoomDocument[];
  syndicates: SyndicateAllocation[];
  toggleTheme: () => void;
  login: (email: string, role: UserRole) => void;
  register: (name: string, email: string, role: UserRole, orgName: string, title?: string) => void;
  logout: () => void;
  switchRoleQuick: () => void;
  sendCollaborationRequest: (entrepreneurId: string, note: string, checkSize: number) => boolean;
  respondToRequest: (requestId: string, status: CollaborationRequestStatus) => void;
  sendMessage: (
    conversationId: string,
    text: string,
    recipientId: string,
    recipientName: string,
    recipientRole: UserRole,
    recipientAvatar: string
  ) => void;
  getConversationId: (idA: string, idB: string) => string;
  requestDataRoomAccess: (docId: string) => void;
  grantDataRoomAccess: (docId: string) => void;
  joinSyndicate: (syndicateId: string, checkSize: number) => boolean;
  scheduleCall: (
    conversationId: string,
    title: string,
    date: string,
    time: string,
    durationMinutes: number,
    attendeeName: string
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language state (English vs Roman Urdu)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('business_nexus_lang');
    if (saved === 'romanUrdu' || saved === 'en') return saved;
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('business_nexus_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'romanUrdu' : 'en');
  };

  const t = translations[language];

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('business_nexus_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('business_nexus_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Auth & Current User
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('business_nexus_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_INVESTOR_USER;
      }
    }
    return DEMO_INVESTOR_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('business_nexus_auth');
    return saved !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('business_nexus_user', JSON.stringify(currentUser));
    localStorage.setItem('business_nexus_auth', String(isAuthenticated));
  }, [currentUser, isAuthenticated]);

  // Data collections
  const [entrepreneurs, setEntrepreneurs] = useState<EntrepreneurProfile[]>(() => {
    const saved = localStorage.getItem('business_nexus_entrepreneurs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ENTREPRENEURS;
      }
    }
    return INITIAL_ENTREPRENEURS;
  });

  const [investors, setInvestors] = useState<InvestorProfile[]>(() => {
    const saved = localStorage.getItem('business_nexus_investors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_INVESTORS;
      }
    }
    return INITIAL_INVESTORS;
  });

  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>(() => {
    const saved = localStorage.getItem('business_nexus_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COLLABORATION_REQUESTS;
      }
    }
    return INITIAL_COLLABORATION_REQUESTS;
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('business_nexus_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [dataRoomDocs, setDataRoomDocs] = useState<DataRoomDocument[]>(() => {
    const saved = localStorage.getItem('business_nexus_dataroom');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DATA_ROOM_DOCS;
      }
    }
    return INITIAL_DATA_ROOM_DOCS;
  });

  const [syndicates, setSyndicates] = useState<SyndicateAllocation[]>(() => {
    const saved = localStorage.getItem('business_nexus_syndicates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SYNDICATES;
      }
    }
    return INITIAL_SYNDICATES;
  });

  useEffect(() => {
    localStorage.setItem('business_nexus_entrepreneurs', JSON.stringify(entrepreneurs));
  }, [entrepreneurs]);

  useEffect(() => {
    localStorage.setItem('business_nexus_investors', JSON.stringify(investors));
  }, [investors]);

  useEffect(() => {
    localStorage.setItem('business_nexus_requests', JSON.stringify(collaborationRequests));
  }, [collaborationRequests]);

  useEffect(() => {
    localStorage.setItem('business_nexus_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('business_nexus_dataroom', JSON.stringify(dataRoomDocs));
  }, [dataRoomDocs]);

  useEffect(() => {
    localStorage.setItem('business_nexus_syndicates', JSON.stringify(syndicates));
  }, [syndicates]);

  // Actions
  const login = (email: string, role: UserRole) => {
    if (role === 'investor') {
      const match = investors.find(i => i.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setCurrentUser({
          id: match.userId,
          name: match.name,
          email: match.email,
          role: 'investor',
          avatar: match.avatar,
          title: match.title,
          organization: match.firm,
          profileId: match.id
        });
      } else {
        setCurrentUser({
          ...DEMO_INVESTOR_USER,
          email
        });
      }
    } else {
      const match = entrepreneurs.find(e => e.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setCurrentUser({
          id: match.userId,
          name: match.name,
          email: match.email,
          role: 'entrepreneur',
          avatar: match.avatar,
          title: match.title,
          organization: match.startupName,
          profileId: match.id
        });
      } else {
        setCurrentUser({
          ...DEMO_ENTREPRENEUR_USER,
          email
        });
      }
    }
    setIsAuthenticated(true);
  };

  const register = (name: string, email: string, role: UserRole, orgName: string, title?: string) => {
    const newId = `user-${Date.now()}`;
    const newProfileId = role === 'investor' ? `inv-${Date.now()}` : `ent-${Date.now()}`;
    const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80';

    if (role === 'investor') {
      const newInvestor: InvestorProfile = {
        id: newProfileId,
        userId: newId,
        name,
        avatar: defaultAvatar,
        title: title || 'Managing Partner',
        firm: orgName,
        location: 'San Francisco, CA',
        email,
        bio: `Venture investor at ${orgName} focused on high-potential technology opportunities.`,
        checkSizeMin: 250000,
        checkSizeMax: 2000000,
        targetStages: ['Seed', 'Series A'],
        targetIndustries: ['AI & SaaS', 'HealthTech'],
        aum: '$50M',
        portfolioCompanies: []
      };
      setInvestors(prev => [newInvestor, ...prev]);
    } else {
      const newEntrepreneur: EntrepreneurProfile = {
        id: newProfileId,
        userId: newId,
        name,
        avatar: defaultAvatar,
        title: title || 'Founder & CEO',
        location: 'San Francisco, CA',
        email,
        bio: `Founder at ${orgName}. Building the future of our industry.`,
        startupName: orgName,
        startupTagline: `Next-generation intelligence for ${orgName}`,
        startupDescription: `${orgName} delivers transformative technology designed to scale rapidly in high-value global markets.`,
        industry: 'AI & SaaS',
        stage: 'Seed',
        fundingNeeded: 2000000,
        fundingRaised: 500000,
        valuationCap: '$12M',
        equityOffered: '15%',
        foundingYear: 2026,
        teamSize: 4,
        website: `https://${orgName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        traction: {
          arr: '$120,000',
          momGrowth: '20%',
          activeUsers: '5 Enterprise Pilots',
          grossMargin: '80%'
        },
        pitchDeckSlides: [
          {
            title: 'Vision & Problem Statement',
            subtitle: `Industry inefficiencies solved by ${orgName}`,
            keyPoints: [
              'Modern businesses struggle with slow, legacy manual processes.',
              'Market demand requires automated, intelligent software.',
              'Our beachhead market is underserved by existing incumbents.'
            ]
          },
          {
            title: 'Product & Differentiation',
            subtitle: 'Proprietary core technology and speed',
            keyPoints: [
              'Full-stack platform deployed in hours, not weeks.',
              'Built-in automation cuts operational overhead by 60%.',
              'Enterprise-grade compliance and security from day one.'
            ]
          }
        ]
      };
      setEntrepreneurs(prev => [newEntrepreneur, ...prev]);
    }

    const newUser: CurrentUser = {
      id: newId,
      name,
      email,
      role,
      avatar: defaultAvatar,
      title: title || (role === 'investor' ? 'Managing Partner' : 'Founder & CEO'),
      organization: orgName,
      profileId: newProfileId
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRoleQuick = () => {
    if (currentUser.role === 'investor') {
      setCurrentUser(DEMO_ENTREPRENEUR_USER);
    } else {
      setCurrentUser(DEMO_INVESTOR_USER);
    }
  };

  const sendCollaborationRequest = (
    entrepreneurId: string,
    note: string,
    checkSize: number
  ): boolean => {
    const target = entrepreneurs.find(e => e.id === entrepreneurId);
    if (!target) return false;

    const newReq: CollaborationRequest = {
      id: `req-${Date.now()}`,
      fromInvestorId: currentUser.profileId,
      fromInvestorName: currentUser.name,
      fromInvestorFirm: currentUser.organization,
      fromInvestorAvatar: currentUser.avatar,
      toEntrepreneurId: target.id,
      toEntrepreneurName: target.name,
      startupName: target.startupName,
      status: 'pending',
      note,
      date: new Date().toISOString().split('T')[0],
      proposedCheckSize: checkSize
    };

    setCollaborationRequests(prev => [newReq, ...prev]);

    const convId = getConversationId(currentUser.profileId, target.id);
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.profileId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: 'investor',
      text: `Hello ${target.name}! I just submitted a collaboration request with an indicative check size of $${(checkSize / 1000).toFixed(0)}k. Note: "${note}"`,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), initialMsg]
    }));

    return true;
  };

  const respondToRequest = (requestId: string, status: CollaborationRequestStatus) => {
    setCollaborationRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return { ...r, status };
        }
        return r;
      })
    );
  };

  const getConversationId = (idA: string, idB: string): string => {
    const sorted = [idA, idB].sort();
    return `conv-${sorted[0]}-${sorted[1]}`;
  };

  const requestDataRoomAccess = (docId: string) => {
    setDataRoomDocs(prev =>
      prev.map(d => (d.id === docId ? { ...d, accessStatus: 'requested' } : d))
    );
  };

  const grantDataRoomAccess = (docId: string) => {
    setDataRoomDocs(prev =>
      prev.map(d => (d.id === docId ? { ...d, accessStatus: 'granted' } : d))
    );
  };

  const joinSyndicate = (syndicateId: string, checkSize: number): boolean => {
    setSyndicates(prev =>
      prev.map(s => {
        if (s.id === syndicateId) {
          return {
            ...s,
            coInvestors: [
              ...s.coInvestors,
              {
                investorId: currentUser.profileId,
                investorName: currentUser.name,
                investorFirm: currentUser.organization,
                checkSize,
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
        }
        return s;
      })
    );
    return true;
  };

  const scheduleCall = (
    conversationId: string,
    title: string,
    date: string,
    time: string,
    durationMinutes: number,
    attendeeName: string
  ) => {
    const meetUrl = `https://meet.businessnexus.com/diligence-${Math.random().toString(36).substring(2, 8)}`;
    const systemCallCard: ChatMessage = {
      id: `msg-call-${Date.now()}`,
      conversationId,
      senderId: currentUser.profileId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      text: `📅 SCHEDULED DILIGENCE CALL: "${title}"\n\n• Date: ${date} at ${time} (${durationMinutes} mins)\n• Video Meeting: ${meetUrl}\n• Calendar Invite dispatched to both participants.`,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), systemCallCard]
    }));
  };

  const sendMessage = (
    conversationId: string,
    text: string,
    recipientId: string,
    recipientName: string,
    recipientRole: UserRole,
    recipientAvatar: string
  ) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.profileId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), userMsg]
    }));

    // Realistic automated simulated response after 1.5 seconds
    setTimeout(() => {
      const responsesForInvestor = [
        `Thanks for reaching out, ${currentUser.name}! We'd be thrilled to walk you through our product demo and latest cohort retention data.`,
        `Thank you for the thoughtful message. We have our updated Q3 data room ready on Carta and would love to schedule a 30-min call.`,
        `Great point! Our gross margins expanded to 82% last quarter due to improved inference batching. Let us know when works best for a deep dive.`
      ];

      const responsesForEntrepreneur = [
        `Thanks for the update, ${currentUser.name}. We really like the traction and will discuss this during our partner meeting on Monday.`,
        `Appreciate the context! We reviewed your team background and have high conviction in this sector. Let's schedule a formal call.`,
        `Got it! Could you send over your updated Cap Table and projected burn rate for the next 12 months?`
      ];

      const chosenResponses = currentUser.role === 'investor' ? responsesForInvestor : responsesForEntrepreneur;
      const autoText = chosenResponses[Math.floor(Math.random() * chosenResponses.length)];

      const autoReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        conversationId,
        senderId: recipientId,
        senderName: recipientName,
        senderAvatar: recipientAvatar,
        senderRole: recipientRole,
        text: autoText,
        timestamp: 'Just now'
      };

      setMessages(current => ({
        ...current,
        [conversationId]: [...(current[conversationId] || []), autoReply]
      }));
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        theme,
        language,
        t,
        setLanguage,
        toggleLanguage,
        entrepreneurs,
        investors,
        collaborationRequests,
        messages,
        dataRoomDocs,
        syndicates,
        toggleTheme,
        login,
        register,
        logout,
        switchRoleQuick,
        sendCollaborationRequest,
        respondToRequest,
        sendMessage,
        getConversationId,
        requestDataRoomAccess,
        grantDataRoomAccess,
        joinSyndicate,
        scheduleCall
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
