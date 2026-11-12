export type Language = 'en' | 'romanUrdu';

export interface Translations {
  // Global & Navigation
  topBannerTag: string;
  topBannerSubtitle: string;
  topBannerStat1: string;
  topBannerStat2: string;
  navDealflow: string;
  navSafeModeler: string;
  navDataVault: string;
  navSyndicates: string;
  navTrackRecord: string;
  navSignIn: string;
  navLaunchTerminal: string;
  langSwitchLabel: string;

  // Hero Section
  heroBadge: string;
  heroBadgeStage: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  heroQuickTestDrive: string;
  heroEnterInvestor: string;
  heroInvestorRole: string;
  heroInvestorDetail: string;
  heroPitchFounder: string;
  heroFounderRole: string;
  heroFounderDetail: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  heroTrust4: string;

  // Hero Right Card (Interactive Simulator)
  heroCardActiveRound: string;
  heroCardFit: string;
  heroCardThesis: string;
  heroCardArr: string;
  heroCardGrowth: string;
  heroCardTarget: string;
  heroCardSimulateCheck: string;
  heroCardValuationCap: string;
  heroCardEquityStake: string;
  heroCardRequestTermSheet: string;
  heroCardViewVault: string;
  heroCardLeadInvestor: string;
  heroCardClosingTime: string;

  // Ticker
  tickerTitle: string;
  tickerEvent1: string;
  tickerEvent2: string;
  tickerEvent3: string;
  tickerEvent4: string;
  tickerEvent5: string;

  // SAFE Calculator Section
  calcBadge: string;
  calcTitle: string;
  calcSubtitle: string;
  calcParametersHeader: string;
  calcStandardTag: string;
  calcTargetRaise: string;
  calcValuationCap: string;
  calcPreFounderEquity: string;
  calcDisclaimer: string;
  calcDistributionHeader: string;
  calcFoundersLabel: string;
  calcInvestorsLabel: string;
  calcOptionPoolLabel: string;
  calcEffectiveDilution: string;
  calcDilutionSub: string;
  calcImpliedPreMoney: string;
  calcPreMoneySub: string;
  calcGenerateTermSheetBtn: string;

  // Dual Perspective Tabs
  tabsTitle: string;
  tabsSubtitle: string;
  tabInvestor: string;
  tabFounder: string;
  tabExploreBtn: string;

  // Investor Cards
  cardInvestor1Title: string;
  cardInvestor1Desc: string;
  cardInvestor1Item1: string;
  cardInvestor1Item2: string;
  cardInvestor2Title: string;
  cardInvestor2Desc: string;
  cardInvestor2Item1: string;
  cardInvestor2Item2: string;
  cardInvestor3Title: string;
  cardInvestor3Desc: string;
  cardInvestor3Item1: string;
  cardInvestor3Item2: string;

  // Founder Cards
  cardFounder1Title: string;
  cardFounder1Desc: string;
  cardFounder1Item1: string;
  cardFounder1Item2: string;
  cardFounder2Title: string;
  cardFounder2Desc: string;
  cardFounder2Item1: string;
  cardFounder2Item2: string;
  cardFounder3Title: string;
  cardFounder3Desc: string;
  cardFounder3Item1: string;
  cardFounder3Item2: string;

  // Active Startups Showcase
  startupsBadge: string;
  startupsTitle: string;
  startupsViewAll: string;
  startupsTargetRaise: string;
  startupsLocation: string;
  startupsInspectRoom: string;

  // Security & Data Room
  securityBadge: string;
  securityTitle: string;
  securityDesc: string;
  securityWatermarkTitle: string;
  securityWatermarkDesc: string;
  securityKillswitchTitle: string;
  securityKillswitchDesc: string;
  securityProtectedVault: string;
  securityScreenProtection: string;
  securityNdaCleared: string;

  // Track Record & Stats
  stat1Value: string;
  stat1Title: string;
  stat1Sub: string;
  stat2Value: string;
  stat2Title: string;
  stat2Sub: string;
  stat3Value: string;
  stat3Title: string;
  stat3Sub: string;
  stat4Value: string;
  stat4Title: string;
  stat4Sub: string;

  // Command Palette & Pro Tip
  proTipLabel: string;
  proTipInside: string;
  proTipAction: string;

  // Final CTA & Footer
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaInvestorBtn: string;
  finalCtaFounderBtn: string;
  footerTagline: string;
  footerUptime: string;
  footerColPlatform: string;
  footerColLegal: string;
  footerColSecurity: string;
  footerCopyright: string;
  footerPrivacy: string;
  footerTerms: string;
  footerWhitepaper: string;

  // Dashboard & Shared
  dashSearchPlaceholder: string;
  dashSwitchToFounder: string;
  dashSwitchToInvestor: string;
  dashSwitchBtn: string;
  dashSignOut: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    topBannerTag: 'Institutional Venture Exchange Q4',
    topBannerSubtitle: 'Elite Founders Meeting Top 1% Institutional Capital',
    topBannerStat1: '$48.5M Syndicated',
    topBannerStat2: '14-Day Median Term Sheet',
    navDealflow: 'Dealflow Radar',
    navSafeModeler: 'SAFE Modeler',
    navDataVault: 'Diligence Vault',
    navSyndicates: 'Syndicates',
    navTrackRecord: 'Track Record',
    navSignIn: 'Sign In',
    navLaunchTerminal: 'Launch Terminal',
    langSwitchLabel: 'Language',

    heroBadge: 'Next-Gen Venture Dealflow Engine',
    heroBadgeStage: 'Series Seed to B',
    heroTitlePrefix: 'Where Visionary Founders ',
    heroTitleHighlight: 'Close Term Sheets',
    heroTitleSuffix: ' in Weeks, Not Months.',
    heroSubtitle:
      'Replace 6 months of fragmented cold outreach with verified ARR traction, algorithmic thesis matching, interactive post-money SAFE dilution modeling, and cryptographic data room vaults.',
    heroQuickTestDrive: 'Instant 1-Click Interactive Test Drive',
    heroEnterInvestor: 'Enter as Investor',
    heroInvestorRole: 'VC',
    heroInvestorDetail: 'Victoria Sterling · Peak Horizon ($50M AUM)',
    heroPitchFounder: 'Pitch as Founder',
    heroFounderRole: 'CEO',
    heroFounderDetail: 'Marcus Chen · SynthFlow AI ($1.2M ARR)',
    heroTrust1: 'NVCA Term Sheets',
    heroTrust2: 'Delaware C-Corp',
    heroTrust3: 'SOC2 Data Vaults',
    heroTrust4: 'Automated NDAs',

    heroCardActiveRound: 'Active Round',
    heroCardFit: '96% Fit',
    heroCardThesis: 'Peak Horizon Thesis',
    heroCardArr: 'ARR',
    heroCardGrowth: 'MoM Growth',
    heroCardTarget: 'Target',
    heroCardSimulateCheck: 'Simulate Allocation Check:',
    heroCardValuationCap: 'Valuation Cap: $10.0M',
    heroCardEquityStake: 'Equity Stake',
    heroCardRequestTermSheet: 'Request Term Sheet Access',
    heroCardViewVault: 'View Encrypted Data Room',
    heroCardLeadInvestor: 'Lead: Accel Scout Syndicate',
    heroCardClosingTime: 'Closing in 12 days',

    tickerTitle: 'VENTURE PULSE',
    tickerEvent1: 'SynthFlow AI: $250k check wired by Peak Horizon',
    tickerEvent2: 'QuantumEdge: $3.5M Seed Term Sheet Executed',
    tickerEvent3: 'BioGenix Labs: Confidential Data Room Vault Opened',
    tickerEvent4: 'EcoSphere: Series A Syndicate reached 115% Allocation',
    tickerEvent5: 'Nexus Fund IV: Deployed $12.4M across 8 Co-Investments',

    calcBadge: 'Real-Time Valuation Simulator',
    calcTitle: 'Model Post-Money SAFE Dilution in Seconds',
    calcSubtitle:
      'Test how new capital impacts cap table ownership before signing standard Y-Combinator & NVCA post-money SAFE agreements.',
    calcParametersHeader: 'Financing Round Parameters',
    calcStandardTag: 'YC Standard',
    calcTargetRaise: 'Target Capital Raise',
    calcValuationCap: 'Post-Money Valuation Cap',
    calcPreFounderEquity: 'Pre-Round Founder Equity',
    calcDisclaimer:
      'Calculations follow Post-Money SAFE guidelines with mathematical equity precision.',
    calcDistributionHeader: 'Post-Round Ownership Distribution',
    calcFoundersLabel: 'Founders',
    calcInvestorsLabel: 'Investors',
    calcOptionPoolLabel: 'Pool',
    calcEffectiveDilution: 'Effective Dilution',
    calcDilutionSub: 'Yield to new capital',
    calcImpliedPreMoney: 'Implied Pre-Money',
    calcPreMoneySub: 'Enterprise base',
    calcGenerateTermSheetBtn: 'Generate Official NVCA Term Sheet',

    tabsTitle: 'Engineered for Both Sides of the Table',
    tabsSubtitle:
      'Whether you deploy institutional capital or build generational companies, Nexus eliminates low-signal noise.',
    tabInvestor: 'For Institutional Investors',
    tabFounder: 'For Growth Founders',
    tabExploreBtn: 'Explore',

    cardInvestor1Title: 'Algorithmic Thesis Match',
    cardInvestor1Desc:
      'Filter by sector, stage, ARR threshold, and burn multiple. Receive automated compatibility radar scores so you only review high-probability matches.',
    cardInvestor1Item1: 'Dynamic 0-100% Fit Scoring',
    cardInvestor1Item2: 'Side-by-Side Comparison Matrix',
    cardInvestor2Title: 'Zero-Friction Diligence Vault',
    cardInvestor2Desc:
      'Access audited financial models, patent filings, and customer cohorts inside forensic watermarked viewers with automated digital NDA clearance.',
    cardInvestor2Item1: 'Dynamic Email/IP Watermark',
    cardInvestor2Item2: 'Instant Access Revocation',
    cardInvestor3Title: 'Co-Investment Syndicates',
    cardInvestor3Desc:
      'Pool capital with tier-1 lead checks. View syndicate fill rates, track carry parameters, and secure pro-rata allocations with institutional trust.',
    cardInvestor3Item1: 'SPV Allocation Tracking',
    cardInvestor3Item2: 'Direct Wire Settlement Escrow',

    cardFounder1Title: 'Theater Deck Presentation',
    cardFounder1Desc:
      'Showcase pitch decks in fullscreen theater presentation with keyboard navigation, slide transition telemetry, and real-time investor view tracking.',
    cardFounder1Item1: 'Slide-Level Attention Heatmaps',
    cardFounder1Item2: 'Zero Download Leakage',
    cardFounder2Title: 'Digital Term Sheet Seal',
    cardFounder2Desc:
      'Generate, counter-propose, and cryptographically seal standard NVCA term sheets with SHA-256 validation timestamps and direct PDF export.',
    cardFounder2Item1: '1-Click Digital Execution',
    cardFounder2Item2: 'Real-Time Dilution Shielding',
    cardFounder3Title: 'Verified Partner Network',
    cardFounder3Desc:
      'Connect exclusively with verified partners with allocated dry powder. No ghosting, no brokers, and no unqualified intermediation.',
    cardFounder3Item1: '180+ Active Check Writers',
    cardFounder3Item2: 'Direct In-App Partner Chat',

    startupsBadge: 'Curated Exchange',
    startupsTitle: 'High-Growth Companies Now Raising',
    startupsViewAll: 'View Full Dealflow Matrix',
    startupsTargetRaise: 'Target Raise',
    startupsLocation: 'Location',
    startupsInspectRoom: 'Inspect Diligence Room',

    securityBadge: 'Confidential Data Room Architecture',
    securityTitle: 'Institutional Security for Sensitive Pitch Data & Cap Tables',
    securityDesc:
      'Protect intellectual property with multi-layer defense. Every document opened is dynamically stamped with the viewer’s cryptographic ID, timestamp, and IP watermark.',
    securityWatermarkTitle: 'Forensic Watermarking',
    securityWatermarkDesc: 'Burned-in email & IP stamps prevent unauthorized leakages.',
    securityKillswitchTitle: 'Instant Killswitch',
    securityKillswitchDesc: 'Revoke document access from any party in real-time with one tap.',
    securityProtectedVault: 'Protected Pitch Deck Diligence Vault',
    securityScreenProtection: 'Screen capture protection active',
    securityNdaCleared: '✓ NDA Cleared',

    stat1Value: '$48.5M+',
    stat1Title: 'Total Capital Syndicated',
    stat1Sub: 'Across Series Seed & A',
    stat2Value: '14 Days',
    stat2Title: 'Median Term Sheet Speed',
    stat2Sub: 'vs 90 days traditional',
    stat3Value: '94.8%',
    stat3Title: 'Thesis Match Accuracy',
    stat3Sub: 'Algorithmic LP/GP fit',
    stat4Value: '180+',
    stat4Title: 'Verified Funds & Scouts',
    stat4Sub: 'Active check writers',

    proTipLabel: 'Pro Tip:',
    proTipInside: 'Inside the terminal, press',
    proTipAction: 'anywhere to trigger the Spotlight Command Palette for lightning navigation.',

    finalCtaTitle: 'Ready to Accelerate Your Venture Velocity?',
    finalCtaSubtitle:
      'Join the elite network of venture partners and high-growth entrepreneurs closing the next generation of breakout tech companies.',
    finalCtaInvestorBtn: 'Launch Terminal as Investor',
    finalCtaFounderBtn: 'Pitch as Founder',
    footerTagline:
      'The institutional venture operating system for early-stage and growth syndication. Standardized NVCA term sheets, cryptographic data rooms, and thesis matching.',
    footerUptime: 'All Systems Operational (99.99% Uptime)',
    footerColPlatform: 'Platform',
    footerColLegal: 'Legal & Compliance',
    footerColSecurity: 'Security',
    footerCopyright: '© 2026 Business Nexus Technologies Inc. All rights reserved. Registered Delaware C-Corp.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerWhitepaper: 'Security Whitepaper',

    dashSearchPlaceholder: 'Search deals, startups, actions...',
    dashSwitchToFounder: 'Switch to Entrepreneur',
    dashSwitchToInvestor: 'Switch to Investor',
    dashSwitchBtn: 'Switch Mode',
    dashSignOut: 'Sign Out'
  },

  romanUrdu: {
    topBannerTag: 'Q4 Institutional Venture Exchange',
    topBannerSubtitle: 'Elite Founders aur Top 1% Institutional Investors Ka Mushtarka Platform',
    topBannerStat1: '$48.5M Syndicated Sarmaya',
    topBannerStat2: '14-Din Ausat Term Sheet Speed',
    navDealflow: 'Dealflow Radar',
    navSafeModeler: 'SAFE Calculator',
    navDataVault: 'Diligence Vault',
    navSyndicates: 'Syndicates',
    navTrackRecord: 'Track Record',
    navSignIn: 'Sign In Karein',
    navLaunchTerminal: 'Terminal Kholein',
    langSwitchLabel: 'Zaban / Language',

    heroBadge: 'Next-Gen Venture Dealflow Engine',
    heroBadgeStage: 'Series Seed ta B',
    heroTitlePrefix: 'Jahan Visionary Founders ',
    heroTitleHighlight: 'Term Sheets Close',
    heroTitleSuffix: ' Karte Hain Hafton Mein, Mahino Mein Nahi.',
    heroSubtitle:
      '6 mahine ki thaka dene wali cold outreach khatam karein: Verified ARR traction, algorithmic thesis matching, interactive post-money SAFE dilution modeling aur cryptographic data rooms ke sath.',
    heroQuickTestDrive: '1-Click Par Platform Test Drive Karein',
    heroEnterInvestor: 'Bator Investor Enter Hon',
    heroInvestorRole: 'VC',
    heroInvestorDetail: 'Victoria Sterling · Peak Horizon ($50M AUM)',
    heroPitchFounder: 'Bator Founder Pitch Karein',
    heroFounderRole: 'CEO',
    heroFounderDetail: 'Marcus Chen · SynthFlow AI ($1.2M ARR)',
    heroTrust1: 'NVCA Term Sheets',
    heroTrust2: 'Delaware C-Corp',
    heroTrust3: 'SOC2 Data Vaults',
    heroTrust4: 'Automated NDAs',

    heroCardActiveRound: 'Active Round',
    heroCardFit: '96% Fit',
    heroCardThesis: 'Peak Horizon Thesis Match',
    heroCardArr: 'ARR (Salana)',
    heroCardGrowth: 'Mahana Growth',
    heroCardTarget: 'Target Raise',
    heroCardSimulateCheck: 'Apna Investment Check Calculate Karein:',
    heroCardValuationCap: 'Valuation Cap: $10.0M',
    heroCardEquityStake: 'Hisaab / Equity Stake',
    heroCardRequestTermSheet: 'Term Sheet Access Ki Request Karein',
    heroCardViewVault: 'Encrypted Data Room Dekhein',
    heroCardLeadInvestor: 'Lead: Accel Scout Syndicate',
    heroCardClosingTime: 'Round band hone mein 12 din baqi',

    tickerTitle: 'VENTURE PULSE',
    tickerEvent1: 'SynthFlow AI: $250k check Peak Horizon ne confirm kiya',
    tickerEvent2: 'QuantumEdge: $3.5M Seed Term Sheet mukammal hui',
    tickerEvent3: 'BioGenix Labs: Confidential Data Room Vault access khula',
    tickerEvent4: 'EcoSphere: Series A Syndicate 115% allocation tak pohnch gaya',
    tickerEvent5: 'Nexus Fund IV: $12.4M sarmaya 8 co-investments mein lagaya gaya',

    calcBadge: 'Live Valuation Simulator',
    calcTitle: 'Chand Seconds Mein Post-Money SAFE Dilution Calculate Karein',
    calcSubtitle:
      'Y-Combinator aur NVCA post-money SAFE documents sign karne se pehle check karein k naye sarmaye se founders aur investors ki ownership par kya asar parega.',
    calcParametersHeader: 'Financing Round Parameters',
    calcStandardTag: 'YC Standard',
    calcTargetRaise: 'Target Sarmaya / Raise',
    calcValuationCap: 'Post-Money Valuation Cap',
    calcPreFounderEquity: 'Round Se Pehle Founder Ki Equity',
    calcDisclaimer:
      'Yeh hisaab Post-Money SAFE guidelines aur mathematical precision ke mutabiq hai.',
    calcDistributionHeader: 'Round Ke Baad Malkiat (Equity) Ki Taqseem',
    calcFoundersLabel: 'Founders',
    calcInvestorsLabel: 'Naye Investors',
    calcOptionPoolLabel: 'Pool / Reserved',
    calcEffectiveDilution: 'Total Dilution',
    calcDilutionSub: 'Naye sarmaye ka hissa',
    calcImpliedPreMoney: 'Implied Pre-Money',
    calcPreMoneySub: 'Company ki base qeemat',
    calcGenerateTermSheetBtn: 'Official NVCA Term Sheet Generate Karein',

    tabsTitle: 'Founders Aur Investors Dono Ke Lye Khusoosi Design',
    tabsSubtitle:
      'Chaahe aap institutional sarmaya deploy kar rahe hon ya nayi generational company khari kar rahe hon, Nexus be-maqsad shor ko khatam karta hai.',
    tabInvestor: 'Institutional Investors Ke Lye',
    tabFounder: 'Growth Founders Ke Lye',
    tabExploreBtn: 'Mukaamal Portal Dekhein',

    cardInvestor1Title: 'Algorithmic Thesis Match',
    cardInvestor1Desc:
      'Sector, stage, ARR aur burn multiple ke mutabiq filter karein. Automated radar fit score hasil karein taake aap sirf ba-asar deals par focus kar sakein.',
    cardInvestor1Item1: 'Dynamic 0-100% Fit Scoring',
    cardInvestor1Item2: 'Aamne-Saamne Deal Comparison Matrix',
    cardInvestor2Title: 'Zero-Friction Diligence Vault',
    cardInvestor2Desc:
      'Audited financial models, patents aur cohorts forensic watermarked viewer mein dekhein, auto digital NDA clearance ke sath.',
    cardInvestor2Item1: 'Email aur IP Ka Dynamic Watermark',
    cardInvestor2Item2: 'Kisi Bhi Waqt Access Khatam (Revoke) Karein',
    cardInvestor3Title: 'Co-Investment Syndicates',
    cardInvestor3Desc:
      'Tier-1 lead investors ke sath mil kar sarmaya pool karein. SPV allocations aur clear carry parameters ke sath co-invest karein.',
    cardInvestor3Item1: 'SPV Allocation Tracking',
    cardInvestor3Item2: 'Direct Wire Settlement Escrow',

    cardFounder1Title: 'Theater Pitch Deck Presentation',
    cardFounder1Desc:
      'Apne pitch deck ko fullscreen theater presentation mein dikhayein with keyboard navigation aur investor attention tracking.',
    cardFounder1Item1: 'Slide-Wise Attention Heatmaps',
    cardFounder1Item2: 'Zero Download Leakage Security',
    cardFounder2Title: 'Digital Term Sheet Seal',
    cardFounder2Desc:
      'Standard NVCA term sheets generate karein, counter offer bhejein aur SHA-256 cryptographic seal ke sath digitally sign karein.',
    cardFounder2Item1: '1-Click Digital Execution',
    cardFounder2Item2: 'Real-Time Dilution Protection',
    cardFounder3Title: 'Verified Partner Network',
    cardFounder3Desc:
      'Direct un investors se rabta karein jinke paas dry powder available hai. Koi middleman ya time-waste nahi.',
    cardFounder3Item1: '180+ Active Check Writers',
    cardFounder3Item2: 'Direct In-App Partner Chat',

    startupsBadge: 'Curated Exchange',
    startupsTitle: 'High-Growth Startups Jo Abhi Fundraise Kar Rahi Hain',
    startupsViewAll: 'Mukammal Dealflow Matrix Dekhein',
    startupsTargetRaise: 'Target Raise',
    startupsLocation: 'Location',
    startupsInspectRoom: 'Diligence Room Check Karein',

    securityBadge: 'Confidential Data Room Architecture',
    securityTitle: 'Hassaas Pitch Data Aur Cap Tables Ke Lye Institutional Security',
    securityDesc:
      'Intellectual property ko multi-layer hifazat dein. Har khuli hui document par viewer ka naam, email, IP aur waqt dynamically watermark ho jata hai.',
    securityWatermarkTitle: 'Forensic Watermarking',
    securityWatermarkDesc: 'Screen par printed email aur IP stamps unauthorized leaks rokte hain.',
    securityKillswitchTitle: 'Instant Killswitch',
    securityKillswitchDesc: 'Kisi bhi waqt ek click se document ka access wapas cheen lein.',
    securityProtectedVault: 'Protected Pitch Deck Diligence Vault',
    securityScreenProtection: 'Screen capture protection faal hai',
    securityNdaCleared: '✓ NDA Sign Shuda',

    stat1Value: '$48.5M+',
    stat1Title: 'Total Sarmaya Syndicated',
    stat1Sub: 'Series Seed aur A ke doran',
    stat2Value: '14 Din',
    stat2Title: 'Ausat Term Sheet Raftaar',
    stat2Sub: 'Aam 90 dino ke muqable mein',
    stat3Value: '94.8%',
    stat3Title: 'Thesis Match Durustagi',
    stat3Sub: 'Algorithmic LP/GP fit',
    stat4Value: '180+',
    stat4Title: 'Tasdeeq Shuda Funds & Check Writers',
    stat4Sub: 'Active institutional partners',

    proTipLabel: 'Khaas Tip:',
    proTipInside: 'Terminal ke andar kahin bhi',
    proTipAction: 'dabayein taake Spotlight Command Palette se fori navigation kar sakein.',

    finalCtaTitle: 'Apni Fundraising Ya Investment Ko Fast-Track Karne Ke Lye Tayyar?',
    finalCtaSubtitle:
      'Top venture partners aur high-growth founders ke elite network mein shamil hon jo agle baray tech startups ko finance kar rahe hain.',
    finalCtaInvestorBtn: 'Bator Investor Terminal Kholein',
    finalCtaFounderBtn: 'Bator Founder Pitch Karein',
    footerTagline:
      'Early-stage aur growth syndication ke lye institutional operating system. Standardized NVCA term sheets, cryptographic data rooms aur smart thesis matching.',
    footerUptime: 'Tamam Systems Bilkul Theek Kaam Kar Rahe Hain (99.99% Uptime)',
    footerColPlatform: 'Platform',
    footerColLegal: 'Qanooni & Compliance',
    footerColSecurity: 'Hifazat & Security',
    footerCopyright: '© 2026 Business Nexus Technologies Inc. Tamam huqooq mehfooz hain. Registered Delaware C-Corp.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerWhitepaper: 'Security Whitepaper',

    dashSearchPlaceholder: 'Deals, startups aur actions talash karein...',
    dashSwitchToFounder: 'Founder Mode Mein Switch Karein',
    dashSwitchToInvestor: 'Investor Mode Mein Switch Karein',
    dashSwitchBtn: 'Role Badlein',
    dashSignOut: 'Sign Out'
  }
};
