import { EntrepreneurProfile, InvestorProfile, CollaborationRequest, ChatMessage, CurrentUser } from '../types';

export const INITIAL_ENTREPRENEURS: EntrepreneurProfile[] = [
  {
    id: 'ent-1',
    userId: 'user-marcus',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & CEO',
    location: 'San Francisco, CA',
    email: 'marcus@neuroflow.ai',
    bio: 'Former ML Lead at Stanford Health Care. 10+ years specializing in real-time neural signal processing and non-invasive patient diagnostic workflows.',
    startupName: 'NeuroFlow AI',
    startupTagline: 'Precision neural diagnostic infrastructure for clinical triage',
    startupDescription: 'NeuroFlow AI builds edge-deployed machine learning systems that interpret clinical EEG and autonomic biomarkers in seconds, cutting critical ICU diagnostic delays by 74%.',
    industry: 'HealthTech',
    stage: 'Seed',
    fundingNeeded: 2500000,
    fundingRaised: 1400000,
    valuationCap: '$14M',
    equityOffered: '15%',
    foundingYear: 2024,
    teamSize: 8,
    website: 'https://neuroflow.ai',
    traction: {
      arr: '$420,000',
      momGrowth: '24%',
      activeUsers: '14 Hospital Networks',
      grossMargin: '82%'
    },
    pitchDeckSlides: [
      {
        title: 'Executive Summary & Problem',
        subtitle: 'The Critical ICU Diagnostic Gap',
        keyPoints: [
          'Neurological emergencies account for 22% of critical ICU admissions.',
          'Traditional EEG review requires off-site specialist interpretation taking 4 to 8 hours.',
          'Delayed interventions lead to irreversible ischemic neuronal damage and elevated mortality.'
        ],
        metrics: [
          { label: 'Avg Diagnostic Delay', value: '5.4 Hours' },
          { label: 'Hospital Economic Loss', value: '$2.8B / yr' },
          { label: 'Misdiagnosis Rate', value: '18.5%' }
        ]
      },
      {
        title: 'The NeuroFlow Solution',
        subtitle: 'Sub-60-Second Real-Time Edge Biomarker Analysis',
        keyPoints: [
          'FDA breakthrough-designated algorithmic inference engine running directly on bedside hardware.',
          'Zero cloud latency: completely HIPAA compliant, on-premises execution.',
          'Automated anomaly categorization with 96.8% sensitivity validated across 32,000 patient hours.'
        ],
        metrics: [
          { label: 'Inference Speed', value: '420ms' },
          { label: 'Clinical Sensitivity', value: '96.8%' },
          { label: 'Hardware Footprint', value: 'Micro-server' }
        ]
      },
      {
        title: 'Market Opportunity & TAM',
        subtitle: 'Capturing Global Hospital Diagnostic Software',
        keyPoints: [
          'Primary Market: Tier 1 & Tier 2 Hospital intensive care units in North America (6,100 hospitals).',
          'Expansion: Outpatient epilepsy centers and emergency triage ambulances.',
          'Software-as-a-Medical-Device (SaMD) recurring annual subscription per bed.'
        ],
        metrics: [
          { label: 'Total Addressable Market', value: '$8.4B' },
          { label: 'Serviceable Addressable', value: '$2.9B' },
          { label: 'Immediate Beachhead', value: '$650M' }
        ]
      },
      {
        title: 'Business Model & Unit Economics',
        subtitle: 'Enterprise SaaS with Hardware Appliance Lease',
        keyPoints: [
          '$48,000 annual SaaS license per 20-bed ICU ward.',
          'Negative churn (-4%) through departmental seat expansion.',
          '14 enterprise hospital systems live in pilot phase with 100% renewal intent.'
        ],
        metrics: [
          { label: 'ACV', value: '$52,000' },
          { label: 'LTV / CAC Ratio', value: '5.2x' },
          { label: 'Gross Margin', value: '82%' }
        ]
      },
      {
        title: 'Team & Capital Allocation',
        subtitle: 'Use of $2.5M Seed Round',
        keyPoints: [
          'Marcus Chen (CEO) - Ex-Stanford ML Lead, 3 patents in neural telemetry.',
          'Dr. Sarah Lin (Chief Medical Officer) - Attending Neurointensivist at UCSF.',
          '65% engineering and clinical regulatory trials; 25% enterprise health sales pipeline; 10% operations.'
        ],
        metrics: [
          { label: 'Target Close', value: 'Q4 2026' },
          { label: 'Runway Extension', value: '24 Months' },
          { label: 'Committed to Date', value: '$1.4M' }
        ]
      }
    ]
  },
  {
    id: 'ent-2',
    userId: 'user-elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Co-Founder & CEO',
    location: 'Boston, MA',
    email: 'elena@kinetixrobotics.com',
    bio: 'MIT Robotics Ph.D. alumni. Former Senior Autonomy Architect at Boston Dynamics specializing in warehouse perception and agile mobile manipulators.',
    startupName: 'Kinetix Robotics',
    startupTagline: 'Collaborative autonomous mobile handling for micro-fulfillment centers',
    startupDescription: 'Kinetix manufactures self-calibrating robotic picking units capable of handling 850 SKUs/hr with zero prior CAD mapping, solving last-mile sorting bottlenecks.',
    industry: 'Robotics',
    stage: 'Series A',
    fundingNeeded: 6000000,
    fundingRaised: 4200000,
    valuationCap: '$32M',
    equityOffered: '18%',
    foundingYear: 2023,
    teamSize: 16,
    website: 'https://kinetixrobotics.com',
    traction: {
      arr: '$1,850,000',
      momGrowth: '18%',
      activeUsers: '6 Global 3PL Facilities',
      grossMargin: '68%'
    },
    pitchDeckSlides: [
      {
        title: 'Problem: The Last-Foot Warehouse Crisis',
        subtitle: 'Labor shortages and irregular items choke automated sorting',
        keyPoints: [
          'High SKU variance forces expensive manual sorting in 3PL fulfillment hubs.',
          'Existing fixed gantry arms require months of pre-programmed CAD training.',
          'Turnover rates among warehouse sorting staff exceed 110% annually.'
        ]
      },
      {
        title: 'The Kinetix Vision & Robot',
        subtitle: 'Tactile-Vision Hybrid Picking Pods',
        keyPoints: [
          'Proprietary soft-contact pneumatic grippers paired with synthetic vision depth cameras.',
          'Zero-shot item grasping handles polybags, glassware, and unboxed items seamlessly.',
          'Deploys in under 4 hours without altering existing conveyor infrastructure.'
        ]
      },
      {
        title: 'Commercial Traction & Pipeline',
        subtitle: 'Deployed with Top Logistics Tier 1 Operators',
        keyPoints: [
          '$1.85M contracted ARR across 6 enterprise hubs.',
          '$5.4M qualified enterprise pilot pipeline scheduled for rollout.',
          'Gross margins expanded from 52% to 68% in 12 months.'
        ]
      }
    ]
  },
  {
    id: 'ent-3',
    userId: 'user-tariq',
    name: 'Tariq Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & CTO',
    location: 'Austin, TX',
    email: 'tariq@voltgridenergy.com',
    bio: 'Ex-Tesla Energy Grid Reliability Lead. Power systems engineer passionate about distributed microgrid orchestration and virtual power plant dispatch.',
    startupName: 'VoltGrid Systems',
    startupTagline: 'AI-orchestrated virtual power plants for commercial solar & battery fleets',
    startupDescription: 'VoltGrid unlocks automated revenue arbitrage for commercial solar and storage assets by forecasting nodal energy pricing and trading surplus power in real-time wholesale markets.',
    industry: 'CleanTech',
    stage: 'Seed',
    fundingNeeded: 3000000,
    fundingRaised: 1800000,
    valuationCap: '$18M',
    equityOffered: '14%',
    foundingYear: 2024,
    teamSize: 9,
    website: 'https://voltgridenergy.com',
    traction: {
      arr: '$680,000',
      momGrowth: '31%',
      activeUsers: '42MW Managed Capacity',
      grossMargin: '76%'
    },
    pitchDeckSlides: [
      {
        title: 'Energy Grid Volatility',
        subtitle: 'Extreme Weather and Renewables Cause Wild Price Swings',
        keyPoints: [
          'Nodal pricing spikes reach $5,000/MWh during localized grid stress events.',
          'Commercial building owners leave millions on the table without automated battery dispatch.',
          'Regulatory changes (FERC Order 2222) mandate open market participation for distributed assets.'
        ]
      },
      {
        title: 'The VoltGrid Dispatch Engine',
        subtitle: 'Predictive Bidding with Microsecond Execution',
        keyPoints: [
          'Proprietary weather-to-load forecasting models outperforming ISO predictions by 34%.',
          'Automated participation in ancillary services, spinning reserves, and day-ahead markets.',
          'Hardware-agnostic gateway compatible with Tesla, Fluence, and BYD commercial packs.'
        ]
      }
    ]
  },
  {
    id: 'ent-4',
    userId: 'user-priya',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & CEO',
    location: 'New York, NY',
    email: 'priya@prismdata.dev',
    bio: 'Former VP of Data Infrastructure at Datadog. 12 years scaling distributed observability, lakehouses, and real-time schema validation engines.',
    startupName: 'PrismData',
    startupTagline: 'Autonomous data contract validation and drift protection for data meshes',
    startupDescription: 'PrismData sits transparently between ingestion streams and warehouse tables, intercepting silent schema breaks, semantic shifts, and broken analytics before they affect production dashboards.',
    industry: 'AI & SaaS',
    stage: 'Pre-Seed',
    fundingNeeded: 1200000,
    fundingRaised: 850000,
    valuationCap: '$8.5M',
    equityOffered: '12%',
    foundingYear: 2025,
    teamSize: 5,
    website: 'https://prismdata.dev',
    traction: {
      arr: '$180,000',
      momGrowth: '42%',
      activeUsers: '28 Engineering Teams',
      grossMargin: '88%'
    },
    pitchDeckSlides: [
      {
        title: 'The Silent Data Outage Problem',
        subtitle: 'Engineers Push App Code, Analytics Silently Breaks',
        keyPoints: [
          '80% of downstream data pipeline failures originate from unexpected backend schema mutations.',
          'Data engineers waste 15+ hours weekly hunting ghost bugs and backfilling corrupted tables.',
          'Executive revenue reporting is compromised without alerts until quarterly closes.'
        ]
      },
      {
        title: 'PrismData Git-Like Contract Engine',
        subtitle: 'CI/CD Safeguards for Production Data Streams',
        keyPoints: [
          'Semantic linting directly in GitHub Actions and GitLab CI.',
          'Real-time edge proxy flags bad payloads before hitting Snowflake, BigQuery, or Databricks.',
          'Zero configuration: auto-generates contract schemas from historical telemetry.'
        ]
      }
    ]
  },
  {
    id: 'ent-5',
    userId: 'user-charlotte',
    name: 'Charlotte Dubois',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'CEO & Co-Founder',
    location: 'Seattle, WA',
    email: 'charlotte@payforge.io',
    bio: 'Ex-Stripe Infrastructure Director. Fintech veteran with deep experience in multi-currency treasury automation and cross-border settlement rails.',
    startupName: 'PayForge',
    startupTagline: 'Instant global merchant settlement over localized liquidity corridors',
    startupDescription: 'PayForge replaces 3-5 day SWIFT correspondent banking delays for international B2B exporters with instant T+0 settlement at 80% lower transaction fees.',
    industry: 'FinTech',
    stage: 'Series A',
    fundingNeeded: 5000000,
    fundingRaised: 3500000,
    valuationCap: '$28M',
    equityOffered: '16%',
    foundingYear: 2023,
    teamSize: 14,
    website: 'https://payforge.io',
    traction: {
      arr: '$2,100,000',
      momGrowth: '19%',
      activeUsers: '$48M Monthly TPV',
      grossMargin: '71%'
    },
    pitchDeckSlides: [
      {
        title: 'The Cross-Border Friction',
        subtitle: 'B2B Trade Stifled by SWIFT Friction and 4% Hidden Margins',
        keyPoints: [
          '$125 Trillion in global B2B trade remains bound to 1970s correspondent banking rails.',
          'SME exporters face trapped liquidity, unpredictability, and severe FX spreads.',
          'Traditional banks require burdensome manual documentation for recurring cross-border invoices.'
        ]
      }
    ]
  },
  {
    id: 'ent-6',
    userId: 'user-kenji',
    name: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & CEO',
    location: 'Chicago, IL',
    email: 'kenji@luminabio.com',
    bio: 'Northwestern Biochemistry Ph.D. Pioneer in computer-aided enzyme formulation for industrial biomanufacturing and sustainable green chemicals.',
    startupName: 'LuminaBio',
    startupTagline: 'Generative protein design for drop-in petroleum replacement enzymes',
    startupDescription: 'LuminaBio designs custom biocatalysts that synthesize specialty industrial polymers at ambient room temperature, eliminating toxic petrochemical catalysts.',
    industry: 'CleanTech',
    stage: 'Seed',
    fundingNeeded: 3500000,
    fundingRaised: 2100000,
    valuationCap: '$19M',
    equityOffered: '15%',
    foundingYear: 2024,
    teamSize: 7,
    website: 'https://luminabio.com',
    traction: {
      arr: '$540,000',
      momGrowth: '27%',
      activeUsers: '3 Joint Development Agreements',
      grossMargin: '79%'
    },
    pitchDeckSlides: [
      {
        title: 'Industrial Chemical Transformation',
        subtitle: 'Enzymatic Precision vs Petroleum Refining',
        keyPoints: [
          'Chemical manufacturing accounts for 15% of industrial greenhouse gas emissions.',
          'High thermal reactions require immense fossil fuel burn and produce dangerous toxic slag.',
          'LuminaBio enzymes operate at 25°C in neutral water solution with zero hazardous byproducts.'
        ]
      }
    ]
  },
  {
    id: 'ent-7',
    userId: 'user-sophia',
    name: 'Sophia Vance',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & Chief Learning Architect',
    location: 'Boulder, CO',
    email: 'sophia@horizoned.tech',
    bio: 'Former Principal at Harvard Innovation Lab. Built adaptive mastery learning engines adopted by over 120 school districts.',
    startupName: 'HorizonEd',
    startupTagline: 'Socratic adaptive tutoring engine for secondary STEM education',
    startupDescription: 'HorizonEd provides conversational AI tutors that never provide direct answers, instead guiding high school students through multi-step physics and calculus derivations using validated pedagogy.',
    industry: 'EdTech',
    stage: 'Pre-Seed',
    fundingNeeded: 950000,
    fundingRaised: 600000,
    valuationCap: '$7M',
    equityOffered: '10%',
    foundingYear: 2025,
    teamSize: 4,
    website: 'https://horizoned.tech',
    traction: {
      arr: '$140,000',
      momGrowth: '38%',
      activeUsers: '18,500 Active Students',
      grossMargin: '84%'
    },
    pitchDeckSlides: [
      {
        title: 'The Homework Crisis',
        subtitle: 'Students Copy AI Answers Without Retaining Concepts',
        keyPoints: [
          'Generative LLMs provide instant answers that short-circuit critical cognitive struggle.',
          'Standardized STEM test scores dropped 14% post-2022 despite increased screen time.',
          'School districts demand audited, guardrailed pedagogical platforms that promote deep thinking.'
        ]
      }
    ]
  },
  {
    id: 'ent-8',
    userId: 'user-mateo',
    name: 'Mateo Morales',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Founder & Lead Agronomist',
    location: 'Sacramento, CA',
    email: 'mateo@terraharvest.ag',
    bio: 'UC Davis Agronomy M.S. 4th-generation farmer turned IoT telemetry engineer. Built hyper-local soil moisture models for commercial almond orchards.',
    startupName: 'TerraHarvest',
    startupTagline: 'Autonomous precision drip micro-irrigation using subsurface acoustic sensors',
    startupDescription: 'TerraHarvest measures real-time root capillary water tension with subsurface acoustic probes, reducing agricultural water consumption by 38% while boosting crop yield.',
    industry: 'AgTech',
    stage: 'Seed',
    fundingNeeded: 2200000,
    fundingRaised: 1200000,
    valuationCap: '$13M',
    equityOffered: '14%',
    foundingYear: 2024,
    teamSize: 6,
    website: 'https://terraharvest.ag',
    traction: {
      arr: '$390,000',
      momGrowth: '22%',
      activeUsers: '14,000 Acres Monitored',
      grossMargin: '72%'
    },
    pitchDeckSlides: [
      {
        title: 'Agricultural Water Scarcity',
        subtitle: 'Groundwater Restrictions Threaten Commercial Farming',
        keyPoints: [
          'California Sustainable Groundwater Management Act enforces strict pumping quotas.',
          'Traditional evapotranspiration weather models miss actual root-zone soil saturation.',
          'Farmers over-irrigate by 35% as defensive insurance against tree mortality.'
        ]
      }
    ]
  }
];

export const INITIAL_INVESTORS: InvestorProfile[] = [
  {
    id: 'inv-1',
    userId: 'user-victoria',
    name: 'Victoria Sterling',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Managing General Partner',
    firm: 'Apex Venture Capital',
    location: 'San Francisco & New York',
    email: 'victoria@apexventures.vc',
    bio: 'Founding Partner at Apex Ventures. 18 years investing in early-stage frontier technology, HealthTech diagnostics, robotics, and transformative enterprise software.',
    checkSizeMin: 500000,
    checkSizeMax: 3000000,
    targetStages: ['Seed', 'Series A'],
    targetIndustries: ['HealthTech', 'Robotics', 'AI & SaaS'],
    aum: '$450M',
    portfolioCompanies: [
      {
        id: 'port-1',
        name: 'Synthetix Genomics',
        sector: 'HealthTech',
        yearInvested: 2021,
        description: 'Automated rapid gene synthesis printers for pharmaceutical discovery.',
        status: 'Active'
      },
      {
        id: 'port-2',
        name: 'AeroDynamics Autonomous',
        sector: 'Robotics',
        yearInvested: 2020,
        description: 'High-altitude autonomous weather monitoring unmanned aircraft.',
        status: 'Acquired'
      },
      {
        id: 'port-3',
        name: 'RelayFlow Cloud',
        sector: 'AI & SaaS',
        yearInvested: 2022,
        description: 'Serverless event-mesh broker for Fortune 500 financial institutions.',
        status: 'Active'
      },
      {
        id: 'port-4',
        name: 'BioPulse Monitors',
        sector: 'HealthTech',
        yearInvested: 2019,
        description: 'Continuous hemodynamic optical sensors for cardiovascular recovery.',
        status: 'IPO'
      }
    ]
  },
  {
    id: 'inv-2',
    userId: 'user-david',
    name: 'David Vance',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'General Partner',
    firm: 'Horizon Climate & Energy Fund',
    location: 'Austin, TX',
    email: 'david@horizonfund.com',
    bio: 'Focused exclusively on energy transition, decarbonization, smart power grids, and sustainable physical sciences. Former energy trader and clean energy founder.',
    checkSizeMin: 750000,
    checkSizeMax: 4000000,
    targetStages: ['Seed', 'Series A', 'Series B'],
    targetIndustries: ['CleanTech', 'AgTech', 'Robotics'],
    aum: '$320M',
    portfolioCompanies: [
      {
        id: 'port-5',
        name: 'SolaraGrid Storage',
        sector: 'CleanTech',
        yearInvested: 2022,
        description: 'Long-duration iron-air redox flow batteries for utility-scale solar.',
        status: 'Active'
      },
      {
        id: 'port-6',
        name: 'Verde Biofuel',
        sector: 'CleanTech',
        yearInvested: 2021,
        description: 'Algae-based aviation kerosene drop-in fuel synthesis.',
        status: 'Active'
      },
      {
        id: 'port-7',
        name: 'AquaSensor IoT',
        sector: 'AgTech',
        yearInvested: 2023,
        description: 'Satellite-calibrated basin groundwater tracking.',
        status: 'Active'
      }
    ]
  },
  {
    id: 'inv-3',
    userId: 'user-aravind',
    name: 'Aravind Patel',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Partner & Head of Seed Investments',
    firm: 'Nova Seed Collective',
    location: 'Palo Alto, CA',
    email: 'aravind@novaseed.vc',
    bio: 'Lead early checks in AI developer tools, data infrastructure, and B2B SaaS. Hands-on operator partner focused on helping founders hit initial $1M ARR milestone.',
    checkSizeMin: 250000,
    checkSizeMax: 1500000,
    targetStages: ['Pre-Seed', 'Seed'],
    targetIndustries: ['AI & SaaS', 'FinTech'],
    aum: '$180M',
    portfolioCompanies: [
      {
        id: 'port-8',
        name: 'QuerySpeed Labs',
        sector: 'AI & SaaS',
        yearInvested: 2023,
        description: 'Distributed vector indexing for real-time document search.',
        status: 'Active'
      },
      {
        id: 'port-9',
        name: 'CashFlow IQ',
        sector: 'FinTech',
        yearInvested: 2022,
        description: 'Predictive working capital forecasting for e-commerce brands.',
        status: 'Active'
      }
    ]
  },
  {
    id: 'inv-4',
    userId: 'user-claire',
    name: 'Claire Beauchamp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Managing Director',
    firm: 'Vanguard Global Capital',
    location: 'London & New York',
    email: 'claire@vanguardglobal.com',
    bio: 'Specialized in international FinTech rails, cross-border payment infrastructure, and global regulatory compliance software.',
    checkSizeMin: 1000000,
    checkSizeMax: 5000000,
    targetStages: ['Series A', 'Series B'],
    targetIndustries: ['FinTech', 'AI & SaaS'],
    aum: '$600M',
    portfolioCompanies: [
      {
        id: 'port-10',
        name: 'OmniFX Clearing',
        sector: 'FinTech',
        yearInvested: 2021,
        description: 'Direct central bank settlement routing for tier 2 banks.',
        status: 'Active'
      },
      {
        id: 'port-11',
        name: 'ComplianceShield',
        sector: 'AI & SaaS',
        yearInvested: 2020,
        description: 'Automated AML sanctions screening and SAR report drafting.',
        status: 'Acquired'
      }
    ]
  },
  {
    id: 'inv-5',
    userId: 'user-samuel',
    name: 'Dr. Samuel Vance',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Angel Investor & Advisor',
    firm: 'Quantum Syndicate',
    location: 'Boston, MA',
    email: 'samuel@quantumsyndicate.org',
    bio: 'Serial biotech founder (2 previous acquisitions) turned active angel investor. Passionate about synthetic biology, enzyme engineering, and deep scientific computing.',
    checkSizeMin: 100000,
    checkSizeMax: 600000,
    targetStages: ['Pre-Seed', 'Seed'],
    targetIndustries: ['HealthTech', 'CleanTech', 'EdTech'],
    aum: '$45M (Syndicate)',
    portfolioCompanies: [
      {
        id: 'port-12',
        name: 'CellForge Bio',
        sector: 'HealthTech',
        yearInvested: 2023,
        description: 'Microfluidic cell sorting chips for personalized immuno-oncology.',
        status: 'Active'
      }
    ]
  }
];

export const INITIAL_COLLABORATION_REQUESTS: CollaborationRequest[] = [
  {
    id: 'req-1',
    fromInvestorId: 'inv-1',
    fromInvestorName: 'Victoria Sterling',
    fromInvestorFirm: 'Apex Venture Capital',
    fromInvestorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256&q=80',
    toEntrepreneurId: 'ent-1',
    toEntrepreneurName: 'Marcus Chen',
    startupName: 'NeuroFlow AI',
    status: 'pending',
    note: 'Hi Marcus, our clinical diligence committee reviewed your pilot data with Stanford Health Care. We are deeply impressed by your 420ms edge inference speed. We would love to discuss leading your $2.5M Seed round with a $1.2M check.',
    date: '2026-10-28',
    proposedCheckSize: 1200000
  },
  {
    id: 'req-2',
    fromInvestorId: 'inv-3',
    fromInvestorName: 'Aravind Patel',
    fromInvestorFirm: 'Nova Seed Collective',
    fromInvestorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    toEntrepreneurId: 'ent-1',
    toEntrepreneurName: 'Marcus Chen',
    startupName: 'NeuroFlow AI',
    status: 'accepted',
    note: 'Marcus, your ACV expansion from 14 hospital networks shows outstanding product stickiness. Nova Seed would like to co-invest $400k alongside your lead partner.',
    date: '2026-10-25',
    proposedCheckSize: 400000
  },
  {
    id: 'req-3',
    fromInvestorId: 'inv-2',
    fromInvestorName: 'David Vance',
    fromInvestorFirm: 'Horizon Climate & Energy Fund',
    fromInvestorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    toEntrepreneurId: 'ent-3',
    toEntrepreneurName: 'Tariq Al-Mansoor',
    startupName: 'VoltGrid Systems',
    status: 'pending',
    note: 'Tariq, Horizon has been monitoring FERC Order 2222 arbitrage opportunities. Your 42MW managed capacity makes VoltGrid an immediate front-runner. Let us connect next Tuesday.',
    date: '2026-10-30',
    proposedCheckSize: 1500000
  },
  {
    id: 'req-4',
    fromInvestorId: 'inv-4',
    fromInvestorName: 'Claire Beauchamp',
    fromInvestorFirm: 'Vanguard Global Capital',
    fromInvestorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    toEntrepreneurId: 'ent-5',
    toEntrepreneurName: 'Charlotte Dubois',
    startupName: 'PayForge',
    status: 'accepted',
    note: 'Charlotte, your $48M monthly TPV run-rate is outstanding. Vanguard would be delighted to submit a formal term sheet for your Series A expansion.',
    date: '2026-10-24',
    proposedCheckSize: 2500000
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  // Conversation between Victoria Sterling (inv-1) and Marcus Chen (ent-1)
  'conv-inv-1-ent-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-inv-1-ent-1',
      senderId: 'inv-1',
      senderName: 'Victoria Sterling',
      senderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'investor',
      text: 'Marcus, fantastic presentation on your pitch deck. We were reviewing Slide 4 regarding the hardware appliance lease. How quickly can your team manufacture the edge units for the upcoming 6 hospital deployments?',
      timestamp: 'Yesterday at 3:15 PM'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-inv-1-ent-1',
      senderId: 'ent-1',
      senderName: 'Marcus Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'entrepreneur',
      text: 'Thanks Victoria! We have a turnkey contract with an ISO-13485 certified medical manufacturer in Oregon. Turnaround time is currently 3 weeks per batch with 60 units in existing buffer stock.',
      timestamp: 'Yesterday at 3:24 PM'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-inv-1-ent-1',
      senderId: 'inv-1',
      senderName: 'Victoria Sterling',
      senderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'investor',
      text: 'That mitigates our supply chain risk significantly. Let us review the formal term sheet on Friday morning. Looking forward to partnering.',
      timestamp: 'Yesterday at 4:02 PM'
    }
  ],
  // Conversation between Aravind Patel (inv-3) and Marcus Chen (ent-1)
  'conv-inv-3-ent-1': [
    {
      id: 'msg-4',
      conversationId: 'conv-inv-3-ent-1',
      senderId: 'inv-3',
      senderName: 'Aravind Patel',
      senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'investor',
      text: 'Hi Marcus, saw your recent feature in MedTech Digest. What does your current sales cycle look like for academic vs regional hospitals?',
      timestamp: 'Oct 29 at 11:20 AM'
    },
    {
      id: 'msg-5',
      conversationId: 'conv-inv-3-ent-1',
      senderId: 'ent-1',
      senderName: 'Marcus Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'entrepreneur',
      text: 'Hey Aravind! Regional hospitals close in 45-60 days because the Chief Medical Officer has direct budget sign-off. Academic centers take ~90 days due to IRB review.',
      timestamp: 'Oct 29 at 11:45 AM'
    }
  ]
};

// Default simulated profiles for quick demo switching
export const DEMO_INVESTOR_USER: CurrentUser = {
  id: 'user-victoria',
  name: 'Victoria Sterling',
  email: 'victoria@apexventures.vc',
  role: 'investor',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256&q=80',
  title: 'Managing General Partner',
  organization: 'Apex Venture Capital',
  profileId: 'inv-1'
};

export const DEMO_ENTREPRENEUR_USER: CurrentUser = {
  id: 'user-marcus',
  name: 'Marcus Chen',
  email: 'marcus@neuroflow.ai',
  role: 'entrepreneur',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  title: 'Founder & CEO',
  organization: 'NeuroFlow AI',
  profileId: 'ent-1'
};

// Helper formatters
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export const INITIAL_DATA_ROOM_DOCS: import('../types').DataRoomDocument[] = [
  {
    id: 'doc-1',
    startupId: 'ent-1',
    title: 'NeuroFlow 3-Year Audited Financial Model & P&L',
    category: 'Financials',
    fileSize: '2.4 MB',
    lastUpdated: 'Oct 2026',
    isConfidential: true,
    accessStatus: 'granted',
    previewContent:
      'CONFIDENTIAL DUE DILIGENCE AUDIT:\n\n• FY2025 Revenue: $420,000 (100% recurring SaaS)\n• FY2026 Target: $1,450,000 based on contracted hospital expansions\n• Net Burn Rate: $48,000 / month\n• Gross Margins: 82% software, blended with hardware leases\n• Current Cash in Bank: $680,000 (14 months runway before Series A close)'
  },
  {
    id: 'doc-2',
    startupId: 'ent-1',
    title: 'Carta Verified Cap Table & Ownership Ledger',
    category: 'Cap Table',
    fileSize: '840 KB',
    lastUpdated: 'Nov 2026',
    isConfidential: true,
    accessStatus: 'granted',
    previewContent:
      'CAP TABLE SUMMARY (Pre-Money Seed):\n\n• Founders Common (Marcus Chen & Sarah Lin): 72.0%\n• Employee Option Pool (Reserved): 14.0%\n• Angel / Pre-Seed SAFE Convertible Notes: 14.0%\n• Target Seed Round Dilution: 15.0% on $14M Cap'
  },
  {
    id: 'doc-3',
    startupId: 'ent-1',
    title: 'US Patent 11,842,910 - Edge Neural Biomarker Inference Engine',
    category: 'Legal & IP',
    fileSize: '4.8 MB',
    lastUpdated: 'Aug 2026',
    isConfidential: true,
    accessStatus: 'locked',
    previewContent:
      'IP ASSIGNMENT & CLAIMS SUMMARY:\n\n• 100% assigned to NeuroFlow AI, Inc. (Delaware C-Corp).\n• Clean freedom-to-operate clearance confirmed by Wilson Sonsini Goodrich & Rosati.\n• Zero university claim or Bayh-Dole encumbrances.'
  },
  {
    id: 'doc-4',
    startupId: 'ent-1',
    title: 'Stanford Health Care Enterprise Pilot Contract & SLA',
    category: 'Customer Traction',
    fileSize: '1.2 MB',
    lastUpdated: 'Sep 2026',
    isConfidential: true,
    accessStatus: 'requested',
    previewContent:
      'ENTERPRISE AGREEMENT HIGHLIGHTS:\n\n• 3-Year term with 14 ICU wards deployed.\n• Annual contract value: $210,000 with automatic seat expansion triggers.\n• SLA uptime commitment: 99.98% at bedside gateway.'
  },
  // Kinetix Robotics
  {
    id: 'doc-5',
    startupId: 'ent-2',
    title: 'Kinetix Robotics 3PL Fulfillment Unit Economics',
    category: 'Financials',
    fileSize: '3.1 MB',
    lastUpdated: 'Oct 2026',
    isConfidential: true,
    accessStatus: 'locked',
    previewContent:
      'UNIT ECONOMICS PER PICKING CELL:\n\n• Hardware Build Cost: $34,000\n• Annual Robotics-as-a-Service (RaaS) fee: $48,000\n• Payback period: 8.5 months per deployed cell'
  },
  // VoltGrid
  {
    id: 'doc-6',
    startupId: 'ent-3',
    title: 'VoltGrid ERCOT Arbitrage Revenue Backtesting Audit',
    category: 'Financials',
    fileSize: '5.2 MB',
    lastUpdated: 'Oct 2026',
    isConfidential: true,
    accessStatus: 'locked',
    previewContent:
      'AUDIT RESULTS:\n\n• Tested across 1,440 hours of nodal volatility.\n• Realized arbitrage uplift: +38.4% above benchmark battery degradation curves.'
  }
];

export const INITIAL_SYNDICATES: import('../types').SyndicateAllocation[] = [
  {
    id: 'syn-1',
    startupId: 'ent-1',
    startupName: 'NeuroFlow AI',
    leadInvestorId: 'inv-1',
    leadInvestorName: 'Victoria Sterling',
    leadInvestorFirm: 'Apex Venture Capital',
    leadCheckSize: 1200000,
    totalRoundTarget: 2500000,
    minimumCoInvestCheck: 50000,
    coInvestors: [
      {
        investorId: 'inv-3',
        investorName: 'Aravind Patel',
        investorFirm: 'Nova Seed Collective',
        checkSize: 400000,
        date: '2026-10-25'
      },
      {
        investorId: 'inv-5',
        investorName: 'Dr. Samuel Vance',
        investorFirm: 'Quantum Syndicate',
        checkSize: 200000,
        date: '2026-10-27'
      }
    ]
  },
  {
    id: 'syn-2',
    startupId: 'ent-2',
    startupName: 'Kinetix Robotics',
    leadInvestorId: 'inv-1',
    leadInvestorName: 'Victoria Sterling',
    leadInvestorFirm: 'Apex Venture Capital',
    leadCheckSize: 2500000,
    totalRoundTarget: 6000000,
    minimumCoInvestCheck: 100000,
    coInvestors: [
      {
        investorId: 'inv-2',
        investorName: 'David Vance',
        investorFirm: 'Horizon Fund',
        checkSize: 1000000,
        date: '2026-10-20'
      }
    ]
  }
];

// Compatibility matching score calculation algorithm
export function calculateThesisMatch(
  investor: import('../types').InvestorProfile,
  startup: import('../types').EntrepreneurProfile
): { score: number; reasons: string[] } {
  let score = 50;
  const reasons: string[] = [];

  // Sector match
  if (investor.targetIndustries.includes(startup.industry)) {
    score += 25;
    reasons.push(`Direct sector match in ${startup.industry}`);
  } else {
    reasons.push(`Adjacent sector (${startup.industry})`);
  }

  // Stage match
  if (investor.targetStages.includes(startup.stage)) {
    score += 15;
    reasons.push(`Target stage match (${startup.stage})`);
  }

  // Check size fit
  if (startup.fundingNeeded >= investor.checkSizeMin && startup.fundingNeeded <= investor.checkSizeMax * 3) {
    score += 10;
    reasons.push(`Round size aligns with fund check size`);
  }

  return {
    score: Math.min(score, 98),
    reasons
  };
}
