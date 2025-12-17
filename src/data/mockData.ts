// Dossier Types
export interface DossierItem {
  id: string;
  title: string;
  type: 'REPORT' | 'MEMO' | 'BRIEF' | 'LOG' | 'BLUEPRINT' | 'TRANSCRIPT';
  date: string;
  classification: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface NodeData {
  id: string;
  label: string;
  type: 'PERSON' | 'ORG' | 'LOC' | 'FINANCE' | 'COMMS' | 'WEAPON';
  role?: string;
  threat?: number;
  details?: Record<string, string>;
  description?: string;
  dossier?: DossierItem[];
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  type?: 'standard' | 'comms' | 'financial';
}

// Helper for generating Dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// Dossier Content Generators
const generateDossierItems = (nodeType: string, label: string): DossierItem[] => {
  const items: DossierItem[] = [];
  const count = 6 + Math.floor(Math.random() * 5); // 6-10 items

  // MOFA Specific Dossiers
  if (label.toLowerCase().includes('mofa') || 
      label.toLowerCase().includes('ministry of foreign affairs') ||
      label.toLowerCase().includes('foreign secretary') ||
      label.toLowerCase().includes('asad majeed')) {
    return [
      {
        id: "MOFA-DOC-001",
        title: "LETTER TO FOREIGN SECRETARY - 124th NMC MEETING // OFFICIAL",
        type: "MEMO",
        date: getRandomDate(new Date(2025, 11, 1), new Date()),
        classification: "OFFICIAL // FOR OFFICIAL USE ONLY",
        tags: ["NMC", "Coordination"],
        summary: "Letter addressed to Foreign Secretary regarding 124th National Monitoring Committee (NMC) meeting scheduled from 5 January 2026. Coordination required with all ministries for agenda preparation and participation confirmation.",
        content: "SUBJECT: 124th NMC MEETING\nDATE: December 2025\n\n1. EXECUTIVE SUMMARY\nLetter addressed to FS regarding 124th NMC to be held from 5 January 2026.\n\n2. KEY REQUIREMENTS\n- All ministry participation required\n- Agenda preparation coordination\n- Inter-ministerial briefings\n\n3. REFERENCE\n📄 Letter addressed to FS regarding 124th NMC to be held from 5 January 2026.pdf"
      },
      {
        id: "MOFA-DOC-002",
        title: "COMMITTEE DIRECTIVE - INDONESIA PRESIDENT VISIT // CONFIDENTIAL",
        type: "BRIEF",
        date: getRandomDate(new Date(2025, 10, 1), new Date()),
        classification: "CONFIDENTIAL // NOFORN",
        tags: ["Indonesia", "State Visit"],
        summary: "Committee directive for President of Indonesia's state visit to Pakistan on 8-9 December 2025. Detailed protocol arrangements, security coordination, bilateral meeting agendas, and MoU signing ceremonies.",
        content: "SUBJECT: INDONESIA PRESIDENT VISIT\nDATE: December 8-9, 2025\n\n1. PROTOCOL ARRANGEMENTS\nPresidential-level security and protocol required.\n\n2. BILATERAL AGENDA\n- Trade agreements\n- Defense cooperation\n- Energy sector MoUs\n\n3. REFERENCE\n📄 Committee on the Visit of the President of Indonesia to Pakistan on 8_9 December 2025.pdf"
      },
      {
        id: "MOFA-DOC-003",
        title: "OFFICE MEMORANDUM - IRAN PRESIDENT VISIT MoU // SECRET",
        type: "MEMO",
        date: getRandomDate(new Date(2025, 9, 1), new Date()),
        classification: "SECRET // BILATERAL",
        tags: ["Iran", "MoU Implementation"],
        summary: "O.M. dated 03.10.2025 to all Secretaries regarding implementation of MoUs and Agreements signed during the visit of President of Iran. Multiple bilateral cooperation agreements across energy, trade, and security sectors.",
        content: "SUBJECT: IRAN MoU IMPLEMENTATION\nDATE: 03.10.2025\n\n1. IMPLEMENTATION DIRECTIVE\nAll Secretaries briefed on Iran MoU implementation.\n\n2. SECTORS COVERED\n- Energy cooperation\n- Trade expansion\n- Security frameworks\n\n3. REFERENCE\n📄 O.M. dated 03.10.2025 to Secretaries (MoU signed during Iran President visit).pdf"
      },
      {
        id: "MOFA-DOC-004",
        title: "PAK-RUSSIA IGC - 10th SESSION SIGNED MINUTES // CONFIDENTIAL",
        type: "REPORT",
        date: getRandomDate(new Date(2025, 10, 1), new Date()),
        classification: "CONFIDENTIAL // BILATERAL",
        tags: ["Russia", "IGC"],
        summary: "Signed Minutes of 10th Pakistan-Russia Inter-Governmental Commission meeting. Covers defense cooperation, energy sector collaboration, trade expansion, and technical assistance programs.",
        content: "SUBJECT: PAK-RUSSIA IGC 10th SESSION\n\n1. DEFENSE COOPERATION\nEnhanced military-technical cooperation agreements.\n\n2. ENERGY COLLABORATION\nPipeline projects and energy security frameworks.\n\n3. REFERENCE\n📄 Signed Minutes of 10th Pak_Russia IGC_compressed.pdf"
      },
      {
        id: "MOFA-DOC-005",
        title: "AGREEMENT - TRANSFER OF SENTENCED PERSONS // OFFICIAL",
        type: "BRIEF",
        date: getRandomDate(new Date(2025, 10, 20), new Date()),
        classification: "OFFICIAL // LEGAL AFFAIRS",
        tags: ["Legal", "Prisoner Transfer"],
        summary: "Final checked draft of Agreement on Transfer of Sentenced Persons. Bilateral prisoner exchange framework for humanitarian considerations. Legal Affairs Division coordinating with Ministry of Interior.",
        content: "SUBJECT: PRISONER TRANSFER AGREEMENT\n\n1. HUMANITARIAN FRAMEWORK\nBilateral prisoner exchange for humanitarian considerations.\n\n2. LEGAL COORDINATION\nLegal Affairs Division coordinating with Interior Ministry.\n\n3. REFERENCE\n📄 Agreement Transfer of Sentenced Persons_FINAL CHECKED 28.11.25.docx"
      },
      {
        id: "MOFA-DOC-006",
        title: "HUNGARY IMPLEMENTATION - O.M. DATED 17/04/2025 // OFFICIAL",
        type: "MEMO",
        date: getRandomDate(new Date(2025, 3, 17), new Date()),
        classification: "OFFICIAL",
        tags: ["Hungary", "Implementation"],
        summary: "Office Memorandum on implementation of Hungary cooperation agreements. Technical education programs, scholarship exchanges, and cultural cooperation initiatives.",
        content: "SUBJECT: HUNGARY COOPERATION\nDATE: 17/04/2025\n\n1. EDUCATION PROGRAMS\nTechnical education and scholarship exchanges.\n\n2. CULTURAL COOPERATION\nCultural exchange initiatives and programs.\n\n3. REFERENCE\n📄 O.M dated 17_04_2025_Hungary Implementation.pdf"
      }
    ];
  }

  const contentTemplates = {
    PERSON: [
      { title: "SURVEILLANCE LOG: SECTOR 4", type: "LOG", tags: ["Surveillance", "Movement"] },
      { title: "INTERCEPTED GSM CALL #9921", type: "TRANSCRIPT", tags: ["Sigint", "Voice"] },
      { title: "TRAVEL PATTERN ANALYSIS Q4", type: "REPORT", tags: ["Travel", "Pattern"] },
      { title: "ASSET FINANCIAL LINKAGES", type: "BRIEF", tags: ["Finance", "Audit"] },
      { title: "HUMINT FIELD REPORT: CONTACT", type: "MEMO", tags: ["Humint", "Field"] }
    ],
    ORG: [
      { title: "FUNDING STREAM ANALYSIS", type: "REPORT", tags: ["Finance", "Laundering"] },
      { title: "RECRUITMENT NETWORK MAP", type: "BRIEF", tags: ["HR", "Network"] },
      { title: "MEETING MINUTES: SHURA COUNCIL", type: "MEMO", tags: ["Leadership", "Strategy"] },
      { title: "PROCUREMENT LOGISTICS", type: "LOG", tags: ["Supply Chain", "Arms"] },
      { title: "FRONT COMPANY AUDIT", type: "REPORT", tags: ["Finance", "Cover"] }
    ],
    LOC: [
      { title: "SATELLITE IMAGERY ANALYSIS", type: "REPORT", tags: ["Imint", "Geo"] },
      { title: "PERIMETER SECURITY LAYOUT", type: "BLUEPRINT", tags: ["Infra", "Security"] },
      { title: "POWER CONSUMPTION PATTERNS", type: "LOG", tags: ["Utility", "Signature"] },
      { title: "LOCAL POPULATION SENTIMENT", type: "BRIEF", tags: ["Humint", "Social"] },
      { title: "ACCESS ROUTE VULNERABILITIES", type: "MEMO", tags: ["Tactical", "Entry"] }
    ],
    FINANCE: [
      { title: "SWIFT TRANSACTION LOGS", type: "LOG", tags: ["Bank", "Transfer"] },
      { title: "SHELL COMPANY REGISTRATION", type: "MEMO", tags: ["Legal", "Cover"] },
      { title: "CURRENCY EXCHANGE PATTERNS", type: "REPORT", tags: ["Forex", "Laundering"] },
      { title: "CRYPTOCURRENCY WALLET DUMP", type: "LOG", tags: ["Crypto", "Tech"] },
      { title: "AUDIT TRAIL: ACCOUNT 8812", type: "BRIEF", tags: ["Audit", "Trace"] }
    ],
    COMMS: [
      { title: "SIGNAL FREQUENCY ANALYSIS", type: "REPORT", tags: ["Sigint", "Tech"] },
      { title: "DECRYPTED MESSAGE BUFFER", type: "TRANSCRIPT", tags: ["Crypto", "Content"] },
      { title: "NETWORK TOPOLOGY MAP", type: "BLUEPRINT", tags: ["Infra", "Comms"] },
      { title: "CALL DURATION STATISTICS", type: "LOG", tags: ["Meta", "Analysis"] },
      { title: "DEVICE IMEI TRACKING", type: "MEMO", tags: ["Hardware", "Track"] }
    ],
    // Fallback for others
    WEAPON: [
      { title: "BALLISTIC ANALYSIS REPORT", type: "REPORT", tags: ["Forensics", "Ballistics"] },
      { title: "SUPPLY CHAIN TRACE", type: "LOG", tags: ["Logistics", "Origin"] },
      { title: "DEPLOYMENT SCHEMATIC", type: "BLUEPRINT", tags: ["Tactical", "Deploy"] }
    ]
  };

  const templates = (contentTemplates as any)[nodeType] || contentTemplates.PERSON;

  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    items.push({
      id: `DOC-${Math.floor(Math.random() * 10000)}`,
      title: `${template.title} // ${['CONFIDENTIAL', 'SECRET', 'TOP SECRET'][Math.floor(Math.random() * 3)]}`,
      type: template.type as any,
      date: getRandomDate(new Date(2024, 0, 1), new Date()),
      classification: "NOFORN",
      tags: template.tags,
      summary: `Document contains critical intelligence regarding ${label}. Analysis indicates high probability of correlation with ongoing operations. Key focus on ${template.tags.join(' and ')}. Recommended action: Continued monitoring.`,
      content: `FULL DECRYPTED CONTENT:\n\nSUBJECT: ${template.title}\nDATE: ${new Date().toISOString()}\n\n1. EXECUTIVE SUMMARY\nIntercepted data reveals significant activity related to ${label}. Multiple data points suggest coordinated efforts.\n\n2. KEY FINDINGS\n- Primary vector established via ${template.tags[0]}.\n- Secondary correlation link identified.\n- Amplitude of activity exceeds baseline by 45%.\n\n3. RAW DATA\n[REDACTED]... [REDACTED]...`
    });
  }
  return items;
};

export const initialNodes: { data: NodeData }[] = [
  // Central Node
  {
    data: {
      id: "T-1001",
      label: "Lt Gen Abdul Rehman Khan",
      type: "PERSON",
      role: "Commander, 10 Corps",
      threat: 95,
      description: "Primary target. High-ranking officer with confirmed links to non-state actors. Oversees cross-border infiltrations in sector 4.",
      details: {
        "Service Number": "PA-45211",
        "Unit": "10 Corps (Rawalpindi)",
        "Last Sigint": "2 mins ago",
        "Clearance": "Top Secret (Pak)",
        "Family": "3 children (2 in London)"
      },
      dossier: generateDossierItems('PERSON', 'Lt Gen Abdul Rehman Khan')
    }
  },

  // MOFA NETWORK - Central Node
  {
    data: {
      id: "ORG-MOFA-001",
      label: "Ministry of Foreign Affairs (MOFA)",
      type: "ORG",
      role: "Federal Ministry - Foreign Relations",
      threat: 48,
      description: "Pakistan's Ministry of Foreign Affairs responsible for diplomatic relations, international agreements, and bilateral cooperation. Currently handling high-level visits from Indonesia, Iran, and Russia.",
      details: {
        "Headquarters": "Constitution Avenue, Islamabad",
        "Foreign Secretary": "Dr. Asad Majeed Khan",
        "Active Delegations": "Indonesia, Iran, Russia, Hungary",
        "Last Major Activity": "Indonesia President Visit (Dec 8-9, 2025)",
        "Upcoming Event": "124th NMC Meeting (Jan 5, 2026)",
        "Current Agreements": "UNIDROIT, Prisoner Transfer, Pak-Russia IGC",
        "Classification": "Official Use Only"
      },
      dossier: generateDossierItems('ORG', 'Ministry of Foreign Affairs (MOFA)')
    }
  },

  // MOFA Foreign Secretary
  {
    data: {
      id: "MOFA-FS-001",
      label: "Dr. Asad Majeed Khan",
      type: "PERSON",
      role: "Foreign Secretary of Pakistan",
      threat: 35,
      description: "Career diplomat serving as Foreign Secretary. Previously Pakistan's Ambassador to USA (2019-2022). Currently overseeing critical bilateral visits including Indonesia President's visit and 124th NMC coordination.",
      details: {
        "Designation": "Foreign Secretary",
        "Service": "Pakistan Foreign Service",
        "Previous Posting": "Ambassador to United States",
        "Current Focus": "Indonesia Visit, NMC Meeting, Iran MoU Implementation",
        "Last Activity": "124th NMC Letter (Dec 2025)",
        "Clearance": "Top Secret - Diplomatic"
      },
      dossier: generateDossierItems('PERSON', 'Dr. Asad Majeed Khan')
    }
  },

  // Joint Secretary - East Asia (Indonesia Visit handler)
  {
    data: {
      id: "MOFA-JS-002",
      label: "Joint Secretary (East Asia)",
      type: "PERSON",
      role: "Joint Secretary - East Asia Division",
      threat: 30,
      description: "Managing Indonesia President's visit and bilateral cooperation. Coordinating with PM Office on high-level diplomatic engagements.",
      details: {
        "Designation": "Joint Secretary",
        "Division": "East Asia & Pacific",
        "Current Project": "Indonesia President Visit (Dec 8-9, 2025)",
        "Coordination": "PM Office, Protocol Division",
        "Last Activity": "Visit Directive (Nov 2025)",
        "Clearance": "Secret - Diplomatic"
      },
      dossier: generateDossierItems('PERSON', 'Joint Secretary (East Asia)')
    }
  },

  // Joint Secretary - Middle East (Iran MoU handler)
  {
    data: {
      id: "MOFA-JS-003",
      label: "Joint Secretary (Middle East)",
      type: "PERSON",
      role: "Joint Secretary - Middle East Division",
      threat: 32,
      description: "Overseeing Iran MoU implementation and agreements signed during Iranian President's visit. Coordinating with all ministries on implementation.",
      details: {
        "Designation": "Joint Secretary",
        "Division": "Middle East",
        "Current Project": "Iran President Visit MoU Implementation",
        "OM Reference": "O.M. dated 03.10.2025",
        "Last Activity": "Coordination with Secretaries (Oct 2025)",
        "Clearance": "Secret - Diplomatic"
      },
      dossier: generateDossierItems('PERSON', 'Joint Secretary (Middle East)')
    }
  },

  // Joint Secretary - Europe (Russia IGC handler)
  {
    data: {
      id: "MOFA-JS-001",
      label: "Joint Secretary (Europe)",
      type: "PERSON",
      role: "Joint Secretary - Europe Division",
      threat: 28,
      description: "Handles European affairs including Hungary implementation and UNIDROIT convention matters. Coordinates with Russia on IGC meetings.",
      details: {
        "Designation": "Joint Secretary",
        "Division": "Europe",
        "Current Projects": "Hungary Implementation, Pak-Russia IGC",
        "Last Meeting": "10th Pak-Russia IGC Session",
        "Clearance": "Secret - Diplomatic"
      },
      dossier: generateDossierItems('PERSON', 'Joint Secretary (Europe)')
    }
  },

  // MOFA Headquarters Location
  {
    data: {
      id: "LOC-MOFA-HQ",
      label: "MOFA Headquarters - Islamabad",
      type: "LOC",
      role: "Diplomatic HQ",
      threat: 25,
      description: "Main headquarters building on Constitution Avenue. Houses all divisions including Political, Economic, UN Affairs, and regional desks.",
      details: {
        "Address": "Constitution Avenue, Red Zone, Islamabad",
        "Security Level": "High - Armed Guards, Multi-layer Clearance",
        "Key Divisions": "Political, Economic, Legal, Protocol",
        "Meeting Rooms": "15+ (including 3 secure rooms)",
        "Last Surveillance": "Ongoing"
      },
      dossier: generateDossierItems('LOC', 'MOFA Headquarters - Islamabad')
    }
  },

  // Indonesia President Visit Event
  {
    data: {
      id: "EVENT-INDO-001",
      label: "Indonesia President Visit",
      type: "ORG",
      role: "State Visit Event",
      threat: 42,
      description: "High-level state visit by President of Indonesia to Pakistan on December 8-9, 2025. Multiple bilateral agreements and MoUs to be signed. Protocol Division coordinating security arrangements.",
      details: {
        "Date": "December 8-9, 2025",
        "Status": "Confirmed - Protocol Active",
        "Delegation Size": "45+ officials",
        "Security Level": "Presidential - Category A",
        "Agreements": "Trade, Defense, Energy MoUs",
        "Venue": "Aiwan-e-Sadr, PM House"
      },
      dossier: generateDossierItems('ORG', 'Indonesia President Visit')
    }
  },

  // Iran MoU Implementation
  {
    data: {
      id: "FINANCE-IRAN-001",
      label: "Iran MoU Implementation",
      type: "FINANCE",
      role: "Bilateral Agreement",
      threat: 38,
      description: "Implementation of MoUs and Agreements signed during Iranian President's visit. Multi-ministry coordination required for energy, trade, and security cooperation frameworks.",
      details: {
        "Reference": "O.M. dated 03.10.2025",
        "Ministries Involved": "15+ Federal Ministries",
        "Sectors": "Energy, Trade, Defense, Agriculture",
        "Implementation Timeline": "6 months",
        "Coordination": "All Secretaries briefed",
        "Status": "Active Implementation Phase"
      },
      dossier: generateDossierItems('FINANCE', 'Iran MoU Implementation')
    }
  },

  // 124th NMC Meeting
  {
    data: {
      id: "COMMS-NMC-001",
      label: "124th NMC Meeting",
      type: "COMMS",
      role: "National Monitoring Committee",
      threat: 35,
      description: "124th National Monitoring Committee meeting scheduled from January 5, 2026. Inter-ministerial coordination platform for policy implementation and monitoring.",
      details: {
        "Meeting Date": "January 5, 2026",
        "Participants": "All Federal Secretaries",
        "Agenda": "Policy Implementation Review",
        "Venue": "Cabinet Division, Islamabad",
        "Classification": "Official Use Only",
        "Coordination": "Foreign Secretary leading"
      },
      dossier: generateDossierItems('COMMS', '124th NMC Meeting')
    }
  },
  // Associates
  {
    data: {
      id: "P-002",
      label: "Maj Gen Ahmed Jabbar",
      type: "PERSON",
      role: "DG Analysis, ISI",
      threat: 88,
      description: "Director General of Analysis at ISI. Responsible for strategic planning of covert operations in the Kashmir valley. Intercepts suggest recent travel to forward operating bases.",
      details: { "Unit": "ISI Directorate S", "Clearance": "TS/SCI (Pak)", "Last Seen": "Islamabad H-8" },
      dossier: generateDossierItems('PERSON', 'Maj Gen Ahmed Jabbar')
    }
  },
  {
    data: {
      id: "P-003",
      label: "Brig Salman Butt",
      type: "PERSON",
      role: "Sector Commander",
      threat: 82,
      description: "Sector Commander for Kotli sector. Directly supervises launch pads for infiltration. Reports directly to Lt Gen Khan. Known hardliner.",
      details: { "Sector": "Kotli", "Command": "3rd Bde", "Status": "Active" },
      dossier: generateDossierItems('PERSON', 'Brig Salman Butt')
    }
  },
  {
    data: {
      id: "O-001",
      label: "ISI Directorate S",
      type: "ORG",
      role: "Covert Ops",
      threat: 90,
      description: "The secretive covert operations wing of the ISI. Focused on supporting non-state actors in neighboring regions. Primary source of funding and logistics.",
      details: { "HQ": "Islamabad", "Focus": "External Ops", "Budget": "Classified" },
      dossier: generateDossierItems('ORG', 'ISI Directorate S')
    }
  },
  {
    data: {
      id: "O-002",
      label: "Lashkar-e-Taiba",
      type: "ORG",
      role: "Proxy Group",
      threat: 95,
      description: "Proscribed militant organization operating out of Muridke. Maintains training camps in Muzaffarabad. Heavily funded by front charities.",
      details: { "Status": "Proscribed", "Leader": "Hafiz Saeed", "Strength": "Est. 2500" },
      dossier: generateDossierItems('ORG', 'Lashkar-e-Taiba')
    }
  },
  {
    data: {
      id: "L-001",
      label: "Rawalpindi GHQ",
      type: "LOC",
      role: "Military HQ",
      threat: 30,
      description: "General Headquarters of the Pakistan Army. Nerve center for all military operations. Highly secured facility with dual-layer perimeter.",
      details: { "Coordinates": "33.59° N, 73.04° E", "Secure Comms": "Active", "Surveillance": "High" },
      dossier: generateDossierItems('LOC', 'Rawalpindi GHQ')
    }
  },
  {
    data: {
      id: "F-001",
      label: "Dubai Hawala",
      type: "FINANCE",
      role: "Laundering",
      threat: 70,
      description: "Hawala network operating out of Deira, Dubai using gold traders as fronts. Primary channel for moving illicit funds to operational commanders.",
      details: { "Hub": "Deira", "Volume": "$4M/mo", "Front": "Al-Jadeed Jewelers" },
      dossier: generateDossierItems('FINANCE', 'Dubai Hawala')
    }
  },
];

export const initialEdges: { data: EdgeData }[] = [
  // Original Military Network
  { data: { id: "e1", source: "T-1001", target: "P-002", label: "COMMANDS" } },
  { data: { id: "e2", source: "T-1001", target: "P-003", label: "COMMANDS" } },
  { data: { id: "e3", source: "P-002", target: "O-001", label: "DIRECTS" } },
  { data: { id: "e4", source: "O-001", target: "O-002", label: "HANDLES" } },
  { data: { id: "e5", source: "T-1001", target: "L-001", label: "STATIONED_AT" } },
  { data: { id: "e6", source: "T-1001", target: "F-001", label: "FUNDS" } },

  // MOFA Network Connections
  { data: { id: "e7", source: "MOFA-FS-001", target: "ORG-MOFA-001", label: "HEADS" } },
  { data: { id: "e8", source: "MOFA-JS-001", target: "ORG-MOFA-001", label: "WORKS_AT" } },
  { data: { id: "e9", source: "MOFA-JS-002", target: "ORG-MOFA-001", label: "WORKS_AT" } },
  { data: { id: "e10", source: "MOFA-JS-003", target: "ORG-MOFA-001", label: "WORKS_AT" } },
  { data: { id: "e11", source: "ORG-MOFA-001", target: "LOC-MOFA-HQ", label: "OPERATES_FROM" } },
  
  // MOFA Project Connections
  { data: { id: "e12", source: "MOFA-JS-002", target: "EVENT-INDO-001", label: "COORDINATES" } },
  { data: { id: "e13", source: "MOFA-JS-003", target: "FINANCE-IRAN-001", label: "IMPLEMENTS" } },
  { data: { id: "e14", source: "MOFA-FS-001", target: "COMMS-NMC-001", label: "CHAIRS" } },
  
  // Cross-Network Intelligence Liaison
  { data: { id: "e15", source: "ORG-MOFA-001", target: "T-1001", label: "COORDINATES_WITH" } },
  { data: { id: "e16", source: "ORG-MOFA-001", target: "O-001", label: "INTELLIGENCE_LIAISON" } },
];

const firstNames = ["Ahmed", "Bilal", "Hamza", "Yusuf", "Ibrahim", "Tariq", "Zaid", "Omar"];
const lastNames = ["Khan", "Malik", "Shah", "Bhatti", "Raja", "Aziz", "Mir", "Dar"];
const locs = ["Muzaffarabad", "Neelum Valley", "Bhimber", "Sialkot", "Lahore", "Karachi"];
const orgs = ["Al-Khidmat Trust", "Falcon Trading", "Green Crescent", "Kashmir Relief Fund"];

// Search function to filter nodes based on query
export const searchNodes = (query: string) => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return { nodes: initialNodes, edges: initialEdges };
  }

  // Define search groups
  const searchGroups = {
    // Abdul Rehman Khan Military Network
    abdul: ['T-1001', 'P-002', 'P-003', 'O-001', 'O-002', 'L-001', 'F-001'],
    military: ['T-1001', 'P-002', 'P-003', 'O-001', 'O-002', 'L-001', 'F-001'],
    isi: ['P-002', 'O-001', 'O-002', 'T-1001'],
    
    // MOFA Network
    mofa: ['ORG-MOFA-001', 'MOFA-FS-001', 'MOFA-JS-001', 'MOFA-JS-002', 'MOFA-JS-003', 'LOC-MOFA-HQ', 'EVENT-INDO-001', 'FINANCE-IRAN-001', 'COMMS-NMC-001'],
    'foreign affairs': ['ORG-MOFA-001', 'MOFA-FS-001', 'MOFA-JS-001', 'MOFA-JS-002', 'MOFA-JS-003'],
    'asad majeed': ['MOFA-FS-001', 'ORG-MOFA-001', 'COMMS-NMC-001'],
    indonesia: ['MOFA-JS-002', 'EVENT-INDO-001', 'ORG-MOFA-001'],
    iran: ['MOFA-JS-003', 'FINANCE-IRAN-001', 'ORG-MOFA-001'],
    russia: ['MOFA-JS-001', 'ORG-MOFA-001'],
    nmc: ['COMMS-NMC-001', 'MOFA-FS-001', 'ORG-MOFA-001']
  };

  // Find matching node IDs
  let matchingNodeIds: string[] = [];
  
  // Check for exact group matches first
  for (const [key, nodeIds] of Object.entries(searchGroups)) {
    if (searchTerm.includes(key)) {
      matchingNodeIds = [...new Set([...matchingNodeIds, ...nodeIds])];
    }
  }

  // If no group match, search in node labels and descriptions
  if (matchingNodeIds.length === 0) {
    matchingNodeIds = initialNodes
      .filter(node => 
        node.data.label.toLowerCase().includes(searchTerm) ||
        node.data.description?.toLowerCase().includes(searchTerm) ||
        node.data.role?.toLowerCase().includes(searchTerm)
      )
      .map(node => node.data.id);
  }

  // Filter nodes
  const filteredNodes = initialNodes.filter(node => 
    matchingNodeIds.includes(node.data.id)
  );

  // Filter edges to only include connections between filtered nodes
  const filteredEdges = initialEdges.filter(edge => 
    matchingNodeIds.includes(edge.data.source) && 
    matchingNodeIds.includes(edge.data.target)
  );

  return { 
    nodes: filteredNodes, 
    edges: filteredEdges,
    searchTerm: searchTerm,
    matchCount: filteredNodes.length
  };
};

// Helper to generate random expansion nodes
export const generateExpansion = (sourceId: string) => {
  const newNodes = [];
  const newEdges = [];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 new nodes

  for (let i = 0; i < count; i++) {
    const id = `N-${Math.floor(Math.random() * 100000)}`;
    const types = ['PERSON', 'FINANCE', 'COMMS', 'LOC', 'ORG'] as const;
    const type = types[Math.floor(Math.random() * types.length)];

    let label = "";
    let role = "";
    let description = "";
    let details = {};

    switch (type) {
      case 'PERSON':
        label = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        role = Math.random() > 0.5 ? "Field Operative" : "Courier";
        description = `Suspected ${role.toLowerCase()} linked to the target network. Frequent travel to border regions detected.`;
        details = { "Origin": locs[Math.floor(Math.random() * locs.length)], "Status": "Under Surveillance" };
        break;
      case 'LOC':
        label = `Safe House ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`;
        role = "Hideout";
        description = "Residential compound used for temporary lodging of operatives. High footfall during night hours.";
        details = { "Region": locs[Math.floor(Math.random() * locs.length)], "Owner": "Unknown" };
        break;
      case 'FINANCE':
        label = `Account #${Math.floor(Math.random() * 10000)}`;
        role = "Transaction";
        description = "Suspicious financial transfer flagged by monitoring algorithms. Consistent with funding patterns.";
        details = { "Bank": "Habib Bank", "Amount": `$${Math.floor(Math.random() * 50)}k` };
        break;
      case 'ORG':
        label = orgs[Math.floor(Math.random() * orgs.length)];
        role = "Front";
        description = "NGO or commercial entity suspected of diverting funds to militants.";
        details = { "Reg": "Punjab", "Activity": "Suspicious" };
        break;
      case 'COMMS':
        label = `Signal ${Math.floor(Math.random() * 999)}`;
        role = "Intercept";
        description = "Encrypted communication burst intercepted from target location.";
        details = { "Type": "GSM", "Duration": "45s" };
        break;
    }

    newNodes.push({
      data: {
        id,
        label,
        type,
        role,
        threat: Math.floor(Math.random() * 60) + 20,
        description,
        details: {
          ...details,
          "Discovered": new Date().toLocaleTimeString(),
          "Confidence": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
        },
        dossier: generateDossierItems(type, label)
      }
    });

    newEdges.push({
      data: {
        id: `${sourceId}-${id}`,
        source: sourceId,
        target: id,
        label: ["CONTACTED", "VISITED", "FUNDED", "LINKED"][Math.floor(Math.random() * 4)]
      }
    });
  }

  return { nodes: newNodes, edges: newEdges };
};
