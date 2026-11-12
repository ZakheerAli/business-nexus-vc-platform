export type UserRole = 'investor' | 'entrepreneur';

export interface PitchDeckSlide {
  title: string;
  subtitle: string;
  keyPoints: string[];
  metrics?: { label: string; value: string }[];
}

export interface EntrepreneurProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  startupName: string;
  startupTagline: string;
  startupDescription: string;
  industry: 'HealthTech' | 'AI & SaaS' | 'CleanTech' | 'FinTech' | 'Robotics' | 'EdTech' | 'AgTech';
  stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B';
  fundingNeeded: number;
  fundingRaised: number;
  valuationCap: string;
  equityOffered: string;
  foundingYear: number;
  teamSize: number;
  website: string;
  traction: {
    arr: string;
    momGrowth: string;
    activeUsers: string;
    grossMargin: string;
  };
  pitchDeckSlides: PitchDeckSlide[];
}

export interface PortfolioCompany {
  id: string;
  name: string;
  sector: string;
  yearInvested: number;
  description: string;
  status: 'Active' | 'Acquired' | 'IPO' | 'Seed Round';
}

export interface InvestorProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  firm: string;
  location: string;
  email: string;
  bio: string;
  checkSizeMin: number;
  checkSizeMax: number;
  targetStages: ('Pre-Seed' | 'Seed' | 'Series A' | 'Series B')[];
  targetIndustries: ('HealthTech' | 'AI & SaaS' | 'CleanTech' | 'FinTech' | 'Robotics' | 'EdTech' | 'AgTech')[];
  aum: string;
  portfolioCompanies: PortfolioCompany[];
}

export type CollaborationRequestStatus = 'pending' | 'accepted' | 'declined';

export interface CollaborationRequest {
  id: string;
  fromInvestorId: string;
  fromInvestorName: string;
  fromInvestorFirm: string;
  fromInvestorAvatar: string;
  toEntrepreneurId: string;
  toEntrepreneurName: string;
  startupName: string;
  status: CollaborationRequestStatus;
  note: string;
  date: string;
  proposedCheckSize: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: UserRole;
  participantAvatar: string;
  participantSubtitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface DataRoomDocument {
  id: string;
  startupId: string;
  title: string;
  category: 'Financials' | 'Cap Table' | 'Legal & IP' | 'Customer Traction';
  fileSize: string;
  lastUpdated: string;
  isConfidential: boolean;
  accessStatus: 'locked' | 'requested' | 'granted';
  previewContent: string;
}

export interface ScheduledCall {
  id: string;
  conversationId: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  meetUrl: string;
  status: 'scheduled' | 'completed';
  organizerName: string;
  attendeeName: string;
}

export interface SyndicateAllocation {
  id: string;
  startupId: string;
  startupName: string;
  leadInvestorId: string;
  leadInvestorName: string;
  leadInvestorFirm: string;
  leadCheckSize: number;
  totalRoundTarget: number;
  minimumCoInvestCheck: number;
  coInvestors: {
    investorId: string;
    investorName: string;
    investorFirm: string;
    checkSize: number;
    date: string;
  }[];
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  organization: string; // startupName or firm
  profileId: string;
}
