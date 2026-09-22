export interface IndiaCarrierProfile {
  id: string;
  name: string;
  brand: string;
  logoColor: string;
  tagline: string;
  type: 'Private MNO' | 'Govt of India PSU' | 'Enterprise / Infrastructure';
  founderOrParent: string;
  established: string;
  subscribers: string;
  marketShare: string;
  fiveGArchitecture: '5G Standalone (SA)' | '5G Non-Standalone (NSA)' | 'Indigenous 4G / 5G Ready' | '3G/4G Legacy Roaming';
  coreStrengths: string[];
  keyFrequencyBands: string[];
  apnSettings: {
    name: string;
    apn: string;
    authType: string;
    protocol: string;
    mmsc?: string;
  };
  mccMncSample: string[];
  ussdCodes: Array<{ code: string; label: string; description: string }>;
  customerSupport: {
    helpline: string;
    tollFree: string;
    whatsapp?: string;
    website: string;
    app: string;
  };
  mnpFormat: string;
  eSimSupport: boolean;
  d2dSatelliteSupport: boolean;
  overview: string;
}

export interface IndiaCircle {
  id: string;
  circleCode: string;
  name: string;
  category: 'Metro' | 'Category A' | 'Category B' | 'Category C';
  statesCovered: string[];
  keyCities: string[];
  dominantCarriers: string[];
  fiveGCoverage: string;
  stdCodes: string[];
  samplePrefixes: string[];
  mcc: string;
  mncSample: { jio: string; airtel: string; vi: string; bsnl: string };
  coordinates: { lat: number; lng: number };
}

export interface SancharSaathiTool {
  id: string;
  title: string;
  acronym: string;
  badge: string;
  description: string;
  regulatoryAuthority: string;
  howToUse: string[];
  officialPortal: string;
  legalLimitOrPenalty: string;
  iconName: string;
}

export interface SpectrumBandIndia {
  band: string;
  frequency: string;
  duplex: 'FDD' | 'TDD';
  keyHolders: string[];
  coverageProperty: string;
  speedCapability: string;
  idealUseCase: string;
}

export const INDIA_CARRIERS: IndiaCarrierProfile[] = [
  {
    id: 'jio',
    name: 'Reliance Jio Infocomm Limited',
    brand: 'Jio True 5G',
    logoColor: 'from-blue-600 to-indigo-700',
    tagline: 'Digital Life • India ka Apna 5G',
    type: 'Private MNO',
    founderOrParent: 'Reliance Industries (Mukesh Ambani / Akash Ambani)',
    established: 'September 2016 (Commercial Launch)',
    subscribers: '485.4 Million',
    marketShare: '41.5% (India #1)',
    fiveGArchitecture: '5G Standalone (SA)',
    coreStrengths: [
      'Pure 5G Standalone (SA) architecture without relying on legacy 4G core',
      'Exclusive 700 MHz (Band n28) spectrum for superior indoor penetration and deep rural reach',
      'Voice over New Radio (VoNR) native ultra-clear audio routing over 5G',
      'JioAirFiber Fixed Wireless Access (FWA) optical high-speed alternative',
      'JioBharat 4G platform bringing affordable internet to 250M feature phone users',
      'Jio Cloud PC, JioBrain AI framework, and indigenous 5G telecom stack'
    ],
    keyFrequencyBands: [
      'n28 (700 MHz - FDD)',
      'n78 (3300-3600 MHz C-Band TDD)',
      'n258 (26 GHz mmWave)',
      'Band 3 (1800 MHz)',
      'Band 5 (850 MHz)',
      'Band 40 (2300 MHz)'
    ],
    apnSettings: {
      name: 'Jio 5G Internet',
      apn: 'jionet',
      authType: 'None / PAP',
      protocol: 'IPv4/IPv6'
    },
    mccMncSample: ['MCC 405 MNC 854', 'MCC 405 MNC 855', 'MCC 405 MNC 856', 'MCC 405 MNC 874'],
    ussdCodes: [
      { code: '*333#', label: 'Main Balance & Plan Info', description: 'Dial to view current active plan, validity date, and balance summary.' },
      { code: 'SMS "MY PLAN" to 199', label: 'Check High-Speed Data Balance', description: 'Instant SMS breakdown of daily high-speed 5G/4G remaining quota.' },
      { code: 'SMS "START" to 1925', label: 'Activate Data Services', description: 'Ensure mobile internet packet data routing is enabled on SIM.' },
      { code: '*1#', label: 'Know Your Jio Number', description: 'Displays the 10-digit MSISDN registered to this physical SIM or eSIM slot.' },
      { code: 'Dial 1991', label: 'Jio Automated Voice IVR', description: 'Check remaining daily data, recharge offers, and validity in regional language.' }
    ],
    customerSupport: {
      helpline: '198 (Complaints) / 199 (Queries)',
      tollFree: '1800-889-9999',
      whatsapp: '+91 70007 70007',
      website: 'https://www.jio.com',
      app: 'MyJio (iOS / Android)'
    },
    mnpFormat: 'SMS "PORT <10-digit number>" to 1900',
    eSimSupport: true,
    d2dSatelliteSupport: true,
    overview: 'Reliance Jio revolutionized global telecommunications by introducing free VoLTE voice calls and the lowest gigabyte pricing globally. Today, Jio operates the world\'s fastest and largest single-country 5G Standalone network, serving over 485 million subscribers across all 22 Indian Telecom Circles.'
  },
  {
    id: 'airtel',
    name: 'Bharti Airtel Limited',
    brand: 'Airtel 5G Plus',
    logoColor: 'from-red-600 to-rose-700',
    tagline: '175 Million 5G Users • The Smartest Network',
    type: 'Private MNO',
    founderOrParent: 'Bharti Enterprises (Sunil Bharti Mittal / Gopal Vittal)',
    established: 'July 1995 (India\'s Oldest Private Telco)',
    subscribers: '395.2 Million',
    marketShare: '33.4% (India #2)',
    fiveGArchitecture: '5G Non-Standalone (NSA)',
    coreStrengths: [
      '5G NSA deployment offering maximum device compatibility across 100% of 5G smartphones',
      'Dynamic Spectrum Sharing (DSS) seamlessly combining 4G and 5G mid-band spectrum',
      'Industry-leading ARPU (Average Revenue Per User) driven by premium postpaid & family plans',
      'Airtel Payments Bank - seamless integration of banking, Fastag, and UPI with mobile line',
      'Airtel Wi-Fi Calling (VoWiFi) across all major domestic & home broadband routers',
      'Airtel Xstream Play ecosystem and Xstream AirFiber FWA in 500+ cities'
    ],
    keyFrequencyBands: [
      'n78 (3500 MHz C-Band TDD)',
      'n8 (900 MHz re-farmed FDD)',
      'Band 1 (2100 MHz)',
      'Band 3 (1800 MHz)',
      'Band 8 (900 MHz)',
      'Band 40 (2300 MHz)',
      'Band 41 (2500 MHz)'
    ],
    apnSettings: {
      name: 'Airtel Internet',
      apn: 'airtelgprs.com',
      authType: 'PAP / CHAP',
      protocol: 'IPv4/IPv6',
      mmsc: 'http://100.1.201.171:8000'
    },
    mccMncSample: ['MCC 404 MNC 45', 'MCC 404 MNC 31', 'MCC 404 MNC 70', 'MCC 405 MNC 52'],
    ussdCodes: [
      { code: '*121#', label: 'Airtel Self-Care Portal', description: 'Comprehensive USSD menu for balances, offers, value added services, and 5G status.' },
      { code: '*123#', label: 'Main Balance & Validity', description: 'Instant popup showing talktime balance, validity expiry date, and plan name.' },
      { code: '*121*1#', label: 'Mobile Number Check', description: 'Displays your SIM card mobile number, IMSI circle, and active SIM slot index.' },
      { code: '*121*2#', label: 'Net Balance & 5G Quota', description: 'Check remaining daily high-speed 4G data balance and unlimited 5G claim eligibility.' },
      { code: '*282#', label: 'Instant Own Number Caller', description: 'Shows your 10-digit mobile number on screen instantly without deductions.' }
    ],
    customerSupport: {
      helpline: '198 (Complaints) / 121 (Queries)',
      tollFree: '1800-103-4444',
      whatsapp: '+91 99000 00000',
      website: 'https://www.airtel.in',
      app: 'Airtel Thanks (iOS / Android)'
    },
    mnpFormat: 'SMS "PORT <10-digit number>" to 1900',
    eSimSupport: true,
    d2dSatelliteSupport: true,
    overview: 'Bharti Airtel is India’s premier multinational telecommunications powerhouse with extensive operations spanning India, South Asia, and 14 African nations. Airtel 5G Plus utilizes Non-Standalone technology to deliver lightning-fast data speeds while maintaining battery-efficient network fallback.'
  },
  {
    id: 'vi',
    name: 'Vodafone Idea Limited',
    brand: 'Vi (Vodafone Idea)',
    logoColor: 'from-amber-600 via-red-600 to-purple-700',
    tagline: 'Together for Tomorrow • GIGAnet 4G/5G',
    type: 'Private MNO',
    founderOrParent: 'Aditya Birla Group & Vodafone Group Plc (Govt of India ~23% stake)',
    established: 'August 2018 (Merger of Vodafone India & Idea Cellular)',
    subscribers: '215.1 Million',
    marketShare: '18.2% (India #3)',
    fiveGArchitecture: '5G Non-Standalone (NSA)',
    coreStrengths: [
      'GIGAnet architecture with AI-powered Massive MIMO dynamic traffic orchestration',
      'Vi Hero Unlimited features: "Binge All Night" (Unlimited data 12 AM to 6 AM with no quota deduction)',
      '"Weekend Data Rollover" (Carry forward unused weekday data to Saturday & Sunday)',
      '"Data Delight" (Up to 2GB emergency backup data monthly at zero additional charge)',
      'Vi REDX premium postpaid tier with complimentary airport lounge access and international roaming',
      'Vi 5G commercial rollout scaling across key metropolitan clusters and high-density industrial corridors'
    ],
    keyFrequencyBands: [
      'n78 (3300 MHz 5G TDD)',
      'n258 (26 GHz mmWave)',
      'Band 1 (2100 MHz)',
      'Band 3 (1800 MHz)',
      'Band 8 (900 MHz)',
      'Band 41 (2500 MHz TDD)'
    ],
    apnSettings: {
      name: 'Vi GIGAnet',
      apn: 'www',
      authType: 'None',
      protocol: 'IPv4/IPv6'
    },
    mccMncSample: ['MCC 404 MNC 20', 'MCC 404 MNC 04', 'MCC 404 MNC 11', 'MCC 404 MNC 27'],
    ussdCodes: [
      { code: '*199#', label: 'Vi Main Menu & Account Info', description: 'Full USSD dashboard for active balance, data balance, best offers, and VAS control.' },
      { code: '*199*2*1#', label: 'Detailed Data Usage Breakdown', description: 'Check remaining daily allowance, night binge status, and rollover balance.' },
      { code: '*199*1*1#', label: 'Know Your Mobile Number', description: 'Instant screen display of your 10-digit Vi mobile number.' },
      { code: '*141#', label: 'Emergency Loan & Data Talktime', description: 'Request emergency talktime credit or 1GB data loan when main balance is exhausted.' },
      { code: '*111#', label: 'Flash Account Summary', description: 'Check main plan validity expiry date and core account talktime.' }
    ],
    customerSupport: {
      helpline: '198 (Complaints) / 199 (Queries)',
      tollFree: '1800-123-4567',
      whatsapp: '+91 96542 97000',
      website: 'https://www.myvi.in',
      app: 'Vi App (iOS / Android)'
    },
    mnpFormat: 'SMS "PORT <10-digit number>" to 1900',
    eSimSupport: true,
    d2dSatelliteSupport: false,
    overview: 'Formed through the historic merger of Vodafone India and Idea Cellular, Vodafone Idea (Vi) holds extensive sub-GHz spectrum in 17 priority circles. Vi is recognized for popular consumer data features like Binge All Night and Weekend Rollover.'
  },
  {
    id: 'bsnl',
    name: 'Bharat Sanchar Nigam Limited',
    brand: 'BSNL 4G / 5G (Bharat Sanchar)',
    logoColor: 'from-emerald-600 to-teal-800',
    tagline: 'Connecting India • Faster than Ever',
    type: 'Govt of India PSU',
    founderOrParent: 'Department of Telecommunications (Ministry of Communications, GoI)',
    established: 'October 2000 (Successor to Department of Telecom Services)',
    subscribers: '86.5 Million',
    marketShare: '7.3% (Pan-India excl. Delhi/Mumbai)',
    fiveGArchitecture: 'Indigenous 4G / 5G Ready',
    coreStrengths: [
      '100% Indigenous "Make in India" 4G/5G Telecom Stack built by TCS, Tejas Networks & C-DOT',
      'Over 100,000 native 4G towers deployed across remote borders, tribal regions, and islands',
      'Direct-to-Device (D2D) satellite communication trials for zero-deadzone emergency alerts',
      'Bharat AirFibre & Bharat Fibre (FTTH) delivering rural high-speed broadband connectivity',
      'Lowest tariff cost per day in the Indian market with long-validity 365-day plans',
      'Strategic national security provider for Indian Armed Forces, Railways, and Disaster Management'
    ],
    keyFrequencyBands: [
      'Band 1 (2100 MHz - 4G LTE)',
      'Band 8 (900 MHz - Rural 4G LTE)',
      'Band 41 (2500 MHz)',
      '700 MHz & 3.5 GHz (Reserved by Govt for BSNL 5G Rollout)'
    ],
    apnSettings: {
      name: 'BSNL GPRS',
      apn: 'bsnlnet',
      authType: 'PAP',
      protocol: 'IPv4'
    },
    mccMncSample: ['MCC 404 MNC 34', 'MCC 404 MNC 38', 'MCC 404 MNC 51', 'MCC 404 MNC 53', 'MCC 404 MNC 71'],
    ussdCodes: [
      { code: '*123#', label: 'Main Balance & Expiry Date', description: 'Displays your current account balance, active GP1/GP2 grace status, and validity.' },
      { code: '*124#', label: 'BSNL Self-Care Portal', description: 'Comprehensive USSD menu for STV recharges, balance inquiry, and special tariffs.' },
      { code: '*123*1#', label: 'Detailed 4G/3G Data Balance', description: 'SMS / USSD push breakdown of remaining GBs and nightly promotional packs.' },
      { code: '*1# or *222#', label: 'Check BSNL SIM Number', description: 'Displays your active 10-digit BSNL telephone number and IMSI series.' },
      { code: '*123*2#', label: 'Voice Minutes & SMS Quota', description: 'Check remaining off-net and on-net voice minutes and free national SMS count.' }
    ],
    customerSupport: {
      helpline: '1503 (From BSNL) / 1800-180-1503 (Any Network)',
      tollFree: '1800-345-1500',
      whatsapp: '+91 1800-180-1503',
      website: 'https://www.bsnl.co.in',
      app: 'BSNL SelfCare (iOS / Android)'
    },
    mnpFormat: 'SMS "PORT <10-digit number>" to 1900',
    eSimSupport: false,
    d2dSatelliteSupport: true,
    overview: 'BSNL is India\'s state-owned telecommunications enterprise. Under the Government of India\'s ₹1.64 Lakh Crore revival package, BSNL is deploying a completely sovereign, indigenous 4G/5G technology stack developed by Tata Consultancy Services (TCS) and C-DOT.'
  },
  {
    id: 'mtnl',
    name: 'Mahanagar Telephone Nigam Limited',
    brand: 'MTNL (Dolphin / Trump)',
    logoColor: 'from-cyan-700 to-blue-900',
    tagline: 'Transparency Makes Us Different',
    type: 'Govt of India PSU',
    founderOrParent: 'Department of Telecommunications (Govt of India)',
    established: 'April 1986',
    subscribers: '2.4 Million (Metro Delhi & Mumbai)',
    marketShare: '~0.2% (Metro Specific)',
    fiveGArchitecture: '3G/4G Legacy Roaming',
    coreStrengths: [
      'Strategic metro network coverage across National Capital Region (Delhi/NCR) & Mumbai',
      'Synergized network sharing and operational handover agreements with BSNL 4G',
      'Extensive underground copper and optical fiber landline infrastructure across metro hubs',
      'Government enterprise communications provider for Central Ministries and Parliament'
    ],
    keyFrequencyBands: [
      'Band 1 (2100 MHz)',
      'Band 8 (900 MHz)',
      'Band 3 (1800 MHz)'
    ],
    apnSettings: {
      name: 'MTNL 3G/4G',
      apn: 'mtnl.net',
      authType: 'None',
      protocol: 'IPv4'
    },
    mccMncSample: ['MCC 404 MNC 68 (Delhi)', 'MCC 404 MNC 69 (Mumbai)'],
    ussdCodes: [
      { code: '*123#', label: 'Check MTNL Prepaid Balance', description: 'Shows main balance and validity for Delhi & Mumbai Dolphin subscribers.' },
      { code: '*444#', label: 'Data Pack & 3G/4G Status', description: 'Inquire active internet plans and free byte quota.' }
    ],
    customerSupport: {
      helpline: '1503 (Delhi) / 1503 (Mumbai)',
      tollFree: '1800-22-1503',
      website: 'https://www.mtnl.in',
      app: 'MyMTNL (Android)'
    },
    mnpFormat: 'SMS "PORT <10-digit number>" to 1900',
    eSimSupport: false,
    d2dSatelliteSupport: false,
    overview: 'MTNL was established in 1986 to spearhead telecommunication services in India\'s two largest economic hubs: New Delhi and Mumbai. MTNL works in close operational integration with BSNL to deliver converged telecom services.'
  },
  {
    id: 'railtel',
    name: 'RailTel Corporation of India Limited',
    brand: 'RailWire (RailTel)',
    logoColor: 'from-orange-600 to-amber-700',
    tagline: 'Transforming Indian Railways into Digital Hubs',
    type: 'Enterprise / Infrastructure',
    founderOrParent: 'Ministry of Railways, Government of India (Miniratna PSU)',
    established: 'September 2000',
    subscribers: '6,100+ Railway Stations & Enterprise Telecom',
    marketShare: 'Dominant Railway Telecom Infrastructure',
    fiveGArchitecture: 'Indigenous 4G / 5G Ready',
    coreStrengths: [
      'Over 61,000+ Route Kilometers of exclusive Optical Fiber along Indian Railway tracks',
      'Free high-speed RailWire Station Wi-Fi across 6,100+ railway stations throughout India',
      'Kavach (Train Collision Avoidance System) wireless radio backhaul infrastructure',
      'Data Centers in Gurugram and Secunderabad powering railway ticketing and national cloud'
    ],
    keyFrequencyBands: ['700 MHz (Dedicated Railway LTE & Safety Band)'],
    apnSettings: {
      name: 'RailWire Broadband',
      apn: 'railwire.co.in',
      authType: 'None',
      protocol: 'IPv4/IPv6'
    },
    mccMncSample: ['Private Railway Enterprise Subnet'],
    ussdCodes: [
      { code: 'N/A (Broadband / Enterprise)', label: 'RailWire Portal Login', description: 'Log in via railwire.co.in captive station portal.' }
    ],
    customerSupport: {
      helpline: '1800-103-9139',
      tollFree: '1800-103-9139',
      website: 'https://www.railtelindia.com',
      app: 'RailWire App'
    },
    mnpFormat: 'Enterprise Dedicated',
    eSimSupport: false,
    d2dSatelliteSupport: true,
    overview: 'RailTel is a Miniratna Central Public Sector Undertaking and one of the largest neutral telecom infrastructure providers in India, operating an optical fiber network alongside 70% of the country’s railway lines.'
  }
];

export const INDIA_TELECOM_CIRCLES: IndiaCircle[] = [
  {
    id: 'delhi',
    circleCode: 'DL',
    name: 'Delhi & NCR (National Capital Region)',
    category: 'Metro',
    statesCovered: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'],
    keyCities: ['New Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'],
    dominantCarriers: ['Reliance Jio (45%)', 'Bharti Airtel (40%)', 'Vodafone Idea (13%)', 'MTNL (2%)'],
    fiveGCoverage: '99.8% (Full 5G SA/NSA saturation)',
    stdCodes: ['011', '0120', '0124'],
    samplePrefixes: ['9810', '9811', '9818', '9871', '9899', '9910', '9999', '9650', '8800', '7042'],
    mcc: '404',
    mncSample: { jio: '405-854', airtel: '404-10', vi: '404-11', bsnl: '404-68 (MTNL)' },
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 'mumbai',
    circleCode: 'MU',
    name: 'Mumbai Metropolitan Region',
    category: 'Metro',
    statesCovered: ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Navi Mumbai'],
    keyCities: ['South Mumbai', 'Bandra', 'Andheri', 'Thane', 'Navi Mumbai'],
    dominantCarriers: ['Reliance Jio (44%)', 'Bharti Airtel (36%)', 'Vodafone Idea (18%)', 'MTNL (2%)'],
    fiveGCoverage: '99.5% (Extensive 5G SA/NSA coverage)',
    stdCodes: ['022'],
    samplePrefixes: ['9820', '9821', '9819', '9833', '9869', '9892', '9920', '9930', '9769', '7738'],
    mcc: '404',
    mncSample: { jio: '405-855', airtel: '404-92', vi: '404-20', bsnl: '404-69 (MTNL)' },
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'kolkata',
    circleCode: 'KO',
    name: 'Kolkata Metro',
    category: 'Metro',
    statesCovered: ['Kolkata Municipal Corp', 'Howrah', 'Hooghly parts'],
    keyCities: ['Kolkata', 'Howrah', 'Salt Lake', 'New Town'],
    dominantCarriers: ['Reliance Jio (42%)', 'Bharti Airtel (38%)', 'Vodafone Idea (15%)', 'BSNL (5%)'],
    fiveGCoverage: '98.9%',
    stdCodes: ['033'],
    samplePrefixes: ['9830', '9831', '9836', '9874', '9903', '9051', '8981', '7003'],
    mcc: '404',
    mncSample: { jio: '405-856', airtel: '404-31', vi: '404-30', bsnl: '404-71' },
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: 'maharashtra_goa',
    circleCode: 'MH',
    name: 'Maharashtra & Goa (excl. Mumbai)',
    category: 'Category A',
    statesCovered: ['Maharashtra (Rest of)', 'Goa'],
    keyCities: ['Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Panaji', 'Margao'],
    dominantCarriers: ['Reliance Jio (42%)', 'Bharti Airtel (32%)', 'Vodafone Idea (20%)', 'BSNL (6%)'],
    fiveGCoverage: '95.4%',
    stdCodes: ['020', '0712', '0253', '0832'],
    samplePrefixes: ['9822', '9823', '9850', '9860', '9890', '9922', '9960', '9422', '7774'],
    mcc: '404',
    mncSample: { jio: '405-857', airtel: '404-90', vi: '404-27', bsnl: '404-51' },
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 'gujarat',
    circleCode: 'GJ',
    name: 'Gujarat & Daman, Diu, Dadra',
    category: 'Category A',
    statesCovered: ['Gujarat', 'Daman and Diu', 'Dadra and Nagar Haveli'],
    keyCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar'],
    dominantCarriers: ['Reliance Jio (46%)', 'Vodafone Idea (27%)', 'Bharti Airtel (22%)', 'BSNL (5%)'],
    fiveGCoverage: '97.2%',
    stdCodes: ['079', '0261', '0265', '0281'],
    samplePrefixes: ['9824', '9825', '9879', '9898', '9909', '9925', '9974', '9426', '7600'],
    mcc: '404',
    mncSample: { jio: '405-858', airtel: '404-98', vi: '404-24', bsnl: '404-53' },
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: 'karnataka',
    circleCode: 'KA',
    name: 'Karnataka (Silicon Valley Circle)',
    category: 'Category A',
    statesCovered: ['Karnataka'],
    keyCities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
    dominantCarriers: ['Bharti Airtel (43%)', 'Reliance Jio (41%)', 'Vodafone Idea (11%)', 'BSNL (5%)'],
    fiveGCoverage: '98.1%',
    stdCodes: ['080', '0821', '0824', '0836'],
    samplePrefixes: ['9844', '9845', '9880', '9886', '9900', '9945', '9980', '9448', '8050'],
    mcc: '404',
    mncSample: { jio: '405-862', airtel: '404-45', vi: '404-44', bsnl: '404-57' },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'tamilnadu',
    circleCode: 'TN',
    name: 'Tamil Nadu (including Chennai)',
    category: 'Category A',
    statesCovered: ['Tamil Nadu', 'Puducherry'],
    keyCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    dominantCarriers: ['Bharti Airtel (41%)', 'Reliance Jio (39%)', 'Vodafone Idea (13%)', 'BSNL (7%)'],
    fiveGCoverage: '97.0%',
    stdCodes: ['044', '0422', '0452', '0431'],
    samplePrefixes: ['9840', '9841', '9842', '9843', '9884', '9894', '9940', '9941', '9443', '7299'],
    mcc: '404',
    mncSample: { jio: '405-864', airtel: '404-94', vi: '404-43', bsnl: '404-72' },
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'andhra_telangana',
    circleCode: 'AP',
    name: 'Andhra Pradesh & Telangana',
    category: 'Category A',
    statesCovered: ['Andhra Pradesh', 'Telangana'],
    keyCities: ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Warangal', 'Guntur'],
    dominantCarriers: ['Reliance Jio (43%)', 'Bharti Airtel (40%)', 'Vodafone Idea (11%)', 'BSNL (6%)'],
    fiveGCoverage: '96.8%',
    stdCodes: ['040', '0891', '0866', '0870'],
    samplePrefixes: ['9848', '9849', '9866', '9885', '9908', '9948', '9989', '9440', '7382'],
    mcc: '404',
    mncSample: { jio: '405-859', airtel: '404-49', vi: '404-07', bsnl: '404-58' },
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 'kerala',
    circleCode: 'KL',
    name: 'Kerala & Lakshadweep',
    category: 'Category B',
    statesCovered: ['Kerala', 'Lakshadweep'],
    keyCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    dominantCarriers: ['Reliance Jio (38%)', 'Bharti Airtel (36%)', 'Vodafone Idea (16%)', 'BSNL (10%)'],
    fiveGCoverage: '96.2%',
    stdCodes: ['0484', '0471', '0495', '0487'],
    samplePrefixes: ['9846', '9847', '9895', '9946', '9947', '9995', '9447', '8547'],
    mcc: '404',
    mncSample: { jio: '405-863', airtel: '404-95', vi: '404-46', bsnl: '404-59' },
    coordinates: { lat: 9.9312, lng: 76.2673 }
  },
  {
    id: 'punjab',
    circleCode: 'PB',
    name: 'Punjab & Chandigarh',
    category: 'Category B',
    statesCovered: ['Punjab', 'Chandigarh (UT)'],
    keyCities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    dominantCarriers: ['Reliance Jio (44%)', 'Bharti Airtel (38%)', 'Vodafone Idea (12%)', 'BSNL (6%)'],
    fiveGCoverage: '95.0%',
    stdCodes: ['0172', '0161', '0183', '0181'],
    samplePrefixes: ['9814', '9815', '9872', '9876', '9888', '9914', '9915', '9417', '7837'],
    mcc: '404',
    mncSample: { jio: '405-866', airtel: '404-02', vi: '404-04', bsnl: '404-55' },
    coordinates: { lat: 30.7333, lng: 76.7794 }
  },
  {
    id: 'haryana',
    circleCode: 'HR',
    name: 'Haryana (excl. NCR)',
    category: 'Category B',
    statesCovered: ['Haryana'],
    keyCities: ['Ambala', 'Panipat', 'Karnal', 'Rohtak', 'Hisar'],
    dominantCarriers: ['Reliance Jio (43%)', 'Bharti Airtel (34%)', 'Vodafone Idea (17%)', 'BSNL (6%)'],
    fiveGCoverage: '94.5%',
    stdCodes: ['0171', '0180', '0184', '01262'],
    samplePrefixes: ['9812', '9813', '9896', '9991', '9992', '9996', '9416', '7206'],
    mcc: '404',
    mncSample: { jio: '405-860', airtel: '404-97', vi: '404-12', bsnl: '404-38' },
    coordinates: { lat: 29.9695, lng: 76.8783 }
  },
  {
    id: 'up_east',
    circleCode: 'UE',
    name: 'Uttar Pradesh (East)',
    category: 'Category B',
    statesCovered: ['Eastern Uttar Pradesh'],
    keyCities: ['Lucknow', 'Varanasi', 'Prayagraj (Allahabad)', 'Gorakhpur', 'Ayodhya', 'Kanpur'],
    dominantCarriers: ['Reliance Jio (45%)', 'Bharti Airtel (35%)', 'Vodafone Idea (13%)', 'BSNL (7%)'],
    fiveGCoverage: '93.8%',
    stdCodes: ['0522', '0542', '0532', '0551', '0512'],
    samplePrefixes: ['9839', '9838', '9935', '9936', '9918', '9919', '9415', '9450', '8004'],
    mcc: '404',
    mncSample: { jio: '405-870', airtel: '404-96', vi: '404-86', bsnl: '404-54' },
    coordinates: { lat: 26.8467, lng: 80.9462 }
  },
  {
    id: 'up_west',
    circleCode: 'UW',
    name: 'Uttar Pradesh (West) & Uttarakhand',
    category: 'Category B',
    statesCovered: ['Western UP', 'Uttarakhand'],
    keyCities: ['Meerut', 'Agra', 'Aligarh', 'Bareilly', 'Dehradun', 'Haridwar'],
    dominantCarriers: ['Reliance Jio (42%)', 'Bharti Airtel (36%)', 'Vodafone Idea (16%)', 'BSNL (6%)'],
    fiveGCoverage: '94.2%',
    stdCodes: ['0121', '0562', '0571', '0581', '0135'],
    samplePrefixes: ['9837', '9897', '9927', '9997', '9412', '9758', '8958'],
    mcc: '404',
    mncSample: { jio: '405-871', airtel: '404-93', vi: '404-14', bsnl: '404-74' },
    coordinates: { lat: 28.9845, lng: 77.7064 }
  },
  {
    id: 'rajasthan',
    circleCode: 'RJ',
    name: 'Rajasthan',
    category: 'Category B',
    statesCovered: ['Rajasthan'],
    keyCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
    dominantCarriers: ['Reliance Jio (44%)', 'Bharti Airtel (34%)', 'Vodafone Idea (16%)', 'BSNL (6%)'],
    fiveGCoverage: '93.0%',
    stdCodes: ['0141', '0291', '0294', '0744', '0151'],
    samplePrefixes: ['9828', '9829', '9887', '9928', '9929', '9982', '9414', '7737'],
    mcc: '404',
    mncSample: { jio: '405-867', airtel: '404-06', vi: '404-19', bsnl: '404-64' },
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'mp_cg',
    circleCode: 'MP',
    name: 'Madhya Pradesh & Chhattisgarh',
    category: 'Category B',
    statesCovered: ['Madhya Pradesh', 'Chhattisgarh'],
    keyCities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Raipur', 'Bilaspur'],
    dominantCarriers: ['Reliance Jio (45%)', 'Bharti Airtel (35%)', 'Vodafone Idea (13%)', 'BSNL (7%)'],
    fiveGCoverage: '92.6%',
    stdCodes: ['0755', '0731', '0761', '0751', '0771'],
    samplePrefixes: ['9826', '9827', '9893', '9926', '9977', '9981', '9425', '7869'],
    mcc: '404',
    mncSample: { jio: '405-865', airtel: '404-91', vi: '404-78', bsnl: '404-76' },
    coordinates: { lat: 23.2599, lng: 77.4126 }
  },
  {
    id: 'west_bengal',
    circleCode: 'WB',
    name: 'West Bengal & Sikkim (excl. Kolkata)',
    category: 'Category B',
    statesCovered: ['West Bengal (Rest of)', 'Sikkim', 'Andaman and Nicobar'],
    keyCities: ['Siliguri', 'Durgapur', 'Asansol', 'Kharagpur', 'Gangtok', 'Port Blair'],
    dominantCarriers: ['Reliance Jio (43%)', 'Bharti Airtel (36%)', 'Vodafone Idea (13%)', 'BSNL (8%)'],
    fiveGCoverage: '91.8%',
    stdCodes: ['0353', '0343', '0341', '03222', '03592', '03192'],
    samplePrefixes: ['9832', '9800', '9732', '9733', '9434', '7602', '8972'],
    mcc: '404',
    mncSample: { jio: '405-872', airtel: '404-16', vi: '404-28', bsnl: '404-73' },
    coordinates: { lat: 26.7271, lng: 88.3953 }
  },
  {
    id: 'bihar_jharkhand',
    circleCode: 'BR',
    name: 'Bihar & Jharkhand',
    category: 'Category C',
    statesCovered: ['Bihar', 'Jharkhand'],
    keyCities: ['Patna', 'Ranchi', 'Gaya', 'Jamshedpur', 'Dhanbad', 'Muzaffarpur', 'Bhagalpur'],
    dominantCarriers: ['Reliance Jio (46%)', 'Bharti Airtel (38%)', 'Vodafone Idea (9%)', 'BSNL (7%)'],
    fiveGCoverage: '93.5%',
    stdCodes: ['0612', '0651', '0631', '0657', '0326'],
    samplePrefixes: ['9835', '9934', '9939', '9955', '9431', '7004', '7631', '6201', '8210'],
    mcc: '404',
    mncSample: { jio: '405-869', airtel: '404-03', vi: '404-89', bsnl: '404-62' },
    coordinates: { lat: 25.5941, lng: 85.1376 }
  },
  {
    id: 'odisha',
    circleCode: 'OR',
    name: 'Odisha',
    category: 'Category C',
    statesCovered: ['Odisha'],
    keyCities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
    dominantCarriers: ['Reliance Jio (47%)', 'Bharti Airtel (37%)', 'Vodafone Idea (8%)', 'BSNL (8%)'],
    fiveGCoverage: '92.1%',
    stdCodes: ['0674', '0671', '0661', '0680', '0663'],
    samplePrefixes: ['9861', '9937', '9938', '9437', '9438', '7008', '8249'],
    mcc: '404',
    mncSample: { jio: '405-868', airtel: '404-70', vi: '404-75', bsnl: '404-75' },
    coordinates: { lat: 20.2961, lng: 85.8245 }
  },
  {
    id: 'assam',
    circleCode: 'AS',
    name: 'Assam',
    category: 'Category C',
    statesCovered: ['Assam'],
    keyCities: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur', 'Nagaon'],
    dominantCarriers: ['Bharti Airtel (44%)', 'Reliance Jio (41%)', 'BSNL (10%)', 'Vodafone Idea (5%)'],
    fiveGCoverage: '90.5%',
    stdCodes: ['0361', '0373', '03842', '0376', '03712'],
    samplePrefixes: ['9864', '9854', '9954', '9957', '9435', '7002', '8638'],
    mcc: '404',
    mncSample: { jio: '405-873', airtel: '404-05', vi: '404-88', bsnl: '404-81' },
    coordinates: { lat: 26.1445, lng: 91.7362 }
  },
  {
    id: 'northeast',
    circleCode: 'NE',
    name: 'North East (6 Sister States)',
    category: 'Category C',
    statesCovered: ['Meghalaya', 'Tripura', 'Mizoram', 'Nagaland', 'Manipur', 'Arunachal Pradesh'],
    keyCities: ['Shillong', 'Agartala', 'Aizawl', 'Kohima', 'Imphal', 'Itanagar'],
    dominantCarriers: ['Bharti Airtel (46%)', 'Reliance Jio (40%)', 'BSNL (11%)', 'Vodafone Idea (3%)'],
    fiveGCoverage: '88.4%',
    stdCodes: ['0364', '0381', '0389', '0370', '0385', '0360'],
    samplePrefixes: ['9862', '9856', '9436', '8974', '7005', '9612'],
    mcc: '404',
    mncSample: { jio: '405-874', airtel: '404-40', vi: '404-87', bsnl: '404-77' },
    coordinates: { lat: 25.5788, lng: 91.8933 }
  },
  {
    id: 'jammu_kashmir',
    circleCode: 'JK',
    name: 'Jammu & Kashmir and Ladakh',
    category: 'Category C',
    statesCovered: ['UT of Jammu and Kashmir', 'UT of Ladakh'],
    keyCities: ['Srinagar', 'Jammu', 'Leh', 'Kargil', 'Anantnag', 'Udhampur'],
    dominantCarriers: ['Bharti Airtel (45%)', 'Reliance Jio (43%)', 'BSNL (10%)', 'Vodafone Idea (2%)'],
    fiveGCoverage: '89.2% (High Altitude Base Stations)',
    stdCodes: ['0194', '0191', '01982', '01985'],
    samplePrefixes: ['9858', '9906', '9419', '7006', '8899'],
    mcc: '404',
    mncSample: { jio: '405-861', airtel: '404-80', vi: '404-01', bsnl: '404-60' },
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: 'himachal',
    circleCode: 'HP',
    name: 'Himachal Pradesh',
    category: 'Category C',
    statesCovered: ['Himachal Pradesh'],
    keyCities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Manali'],
    dominantCarriers: ['Bharti Airtel (43%)', 'Reliance Jio (42%)', 'BSNL (11%)', 'Vodafone Idea (4%)'],
    fiveGCoverage: '91.0%',
    stdCodes: ['0177', '01892', '01905', '01792'],
    samplePrefixes: ['9816', '9817', '9418', '9805', '8219'],
    mcc: '404',
    mncSample: { jio: '405-861', airtel: '404-08', vi: '404-18', bsnl: '404-75' },
    coordinates: { lat: 31.1048, lng: 77.1734 }
  }
];

export const SANCHAR_SAATHI_SUITE: SancharSaathiTool[] = [
  {
    id: 'tafcop',
    title: 'TAF-COP Portal (SIM Count & Identity Guard)',
    acronym: 'TAF-COP',
    badge: 'Legal Limit: 9 SIMs (6 in J&K/NE)',
    description: 'Telecom Analytics for Fraud management and Consumer Protection portal operated by Department of Telecommunications (DoT). Allows any Indian citizen to verify all mobile SIM numbers registered under their Aadhaar or identity document.',
    regulatoryAuthority: 'Department of Telecommunications (DoT), Government of India',
    howToUse: [
      '1. Visit official portal: tafcop.sancharsaathi.gov.in',
      '2. Enter your primary 10-digit mobile number and receive Aadhaar OTP',
      '3. View list of all active phone numbers issued against your identity documents across Jio, Airtel, Vi, and BSNL',
      '4. If you see an unknown or fraudulent number, select "Not My Number" or "Not Required" and click Report',
      '5. Telco initiates re-verification or disconnects unauthorized connection within 30 days.'
    ],
    officialPortal: 'https://tafcop.sancharsaathi.gov.in',
    legalLimitOrPenalty: 'Maximum 9 connections per individual nationwide (Strict limit of 6 in J&K, Assam & North East). Holding excess unlinked SIMs invites fine up to ₹50,000 for first offence and ₹2,00,000 for repeated violations under the Telecommunications Act 2023.',
    iconName: 'UserCheck'
  },
  {
    id: 'ceir',
    title: 'CEIR Portal (Central Equipment Identity Register)',
    acronym: 'CEIR',
    badge: 'Pan-India IMEI Blacklist & Trace',
    description: 'A multi-operator database that blocks and tracks lost or stolen smartphones using their 15-digit IMEI numbers across all Indian mobile network operators simultaneously.',
    regulatoryAuthority: 'DoT & Centre for Development of Telematics (C-DOT)',
    howToUse: [
      '1. File an e-FIR / police report at nearest police station or cyber crime portal',
      '2. Get a duplicate SIM card from your telecom operator for the lost number',
      '3. Go to ceir.sancharsaathi.gov.in -> Select "Block Stolen/Lost Mobile"',
      '4. Enter IMEI 1 & IMEI 2, mobile number, lost date/location, and upload police report copy',
      '5. The handset is immediately blacklisted nationwide. If any thief inserts another SIM, police receives an automated BTS tower trace ping.'
    ],
    officialPortal: 'https://ceir.sancharsaathi.gov.in',
    legalLimitOrPenalty: 'Tampering with or flashing a phone\'s IMEI number is a punishable criminal offence with imprisonment up to 3 years under section 25 of the Indian Telegraph Act / Telecommunications Act.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'dnd1909',
    title: 'TRAI DND 1909 (Do Not Disturb) Registry',
    acronym: 'TRAI DND',
    badge: 'Stop Spam Telemarketers',
    description: 'National Customer Preference Register (NCPR) governed by Telecom Regulatory Authority of India (TRAI). Empowers consumers to block unsolicited commercial communications, promotional calls, and robo-marketing SMS.',
    regulatoryAuthority: 'Telecom Regulatory Authority of India (TRAI)',
    howToUse: [
      '1. Fully Block All Promo Calls/SMS: Send SMS "START 0" to 1909 (Free of cost)',
      '2. Block Specific Categories (Banking, Real Estate, Education): Send SMS "START <Category Code>" to 1909 (e.g. START 1 for Banking, START 2 for Real Estate)',
      '3. Report Spam Call/SMS: Send SMS "COMP TEL NO XXXXXXXXXX, dd/mm/yy, Brief description" to 1909 within 3 days of receiving the spam',
      '4. Or install TRAI DND 3.0 App on Android / iOS to report in 1-tap.'
    ],
    officialPortal: 'https://trai.gov.in',
    legalLimitOrPenalty: 'Unregistered telemarketers making commercial calls face disconnection of all telecom resources and blacklisting for up to 2 years, with telecom operators liable for heavy fines by TRAI.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'chakshu',
    title: 'Chakshu (Digital Fraud & Scam Reporting)',
    acronym: 'Chakshu',
    badge: 'Report Digital Arrest & KYC Scams',
    description: 'A citizen-centric facility on Sanchar Saathi to report suspected fraudulent communications received over phone calls, SMS, or WhatsApp regarding fake electricity disconnection, digital arrest, courier customs, lottery, or fake job offers.',
    regulatoryAuthority: 'Department of Telecommunications (DoT)',
    howToUse: [
      '1. Open sancharsaathi.gov.in -> Click on "Chakshu - Report Suspected Fraud"',
      '2. Select Medium: Call, SMS, or WhatsApp',
      '3. Select Category: Impersonation as Police/CBI (Digital Arrest), Fake KYC update, Electricity bill, Sextortion, Job/Lottery scam',
      '4. Provide fraud caller\'s phone number, date/time, screenshot, and audio recording if available',
      '5. DoT AI engine analyzes caller patterns and blocks fraudulent numbers across all telco switches.'
    ],
    officialPortal: 'https://sancharsaathi.gov.in/Chakshu',
    legalLimitOrPenalty: 'Fraudulent callers face immediate cancellation of SIM cards, blacklisting of device IMEIs, freezing of linked bank accounts with I4C (Indian Cyber Crime Coordination Centre), and criminal prosecution.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'mnp',
    title: 'MNP (Mobile Number Portability) Procedure',
    acronym: 'MNP 1900',
    badge: 'Switch Operator Without Changing Number',
    description: 'TRAI-regulated process enabling mobile users to switch between Jio, Airtel, Vi, and BSNL while retaining their exact 10-digit phone number.',
    regulatoryAuthority: 'TRAI & MNP Interconnection Telecom Solutions',
    howToUse: [
      '1. Send SMS "PORT <10-digit Mobile Number>" to 1900 from your existing SIM',
      '2. Receive an 8-character Unique Porting Code (UPC) via SMS from 1901',
      '3. UPC Validity: 4 days across all standard circles (30 days for Jammu & Kashmir, Assam, and North East)',
      '4. Visit destination operator store (or order home delivery), present UPC & Aadhaar biometric verification',
      '5. New SIM activates within 3 to 5 working days with negligible downtime (typically 2 hours at midnight).'
    ],
    officialPortal: 'https://trai.gov.in/faqcategory/mobile-number-portability-mnp',
    legalLimitOrPenalty: 'Rule: SIM must be at least 90 days old with previous operator before porting is permitted. Postpaid subscribers must clear all outstanding unbilled charges.',
    iconName: 'RefreshCw'
  }
];

export const INDIA_5G_SPECTRUM_SPECS: SpectrumBandIndia[] = [
  {
    band: 'n28',
    frequency: '700 MHz (FDD: 703–748 MHz / 758–803 MHz)',
    duplex: 'FDD',
    keyHolders: ['Reliance Jio (10 MHz pan-India)'],
    coverageProperty: 'Supreme indoor penetration, 15+ km per tower range, ideal for rural & dense concrete buildings',
    speedCapability: 'Up to 150–300 Mbps',
    idealUseCase: 'Deep indoor 5G coverage, rural broadband, underground basements, and baseline 5G SA signal stability'
  },
  {
    band: 'n78',
    frequency: '3300–3670 MHz (Mid-Band C-Band)',
    duplex: 'TDD',
    keyHolders: ['Reliance Jio (130 MHz)', 'Bharti Airtel (100 MHz)', 'Vodafone Idea (50 MHz)', 'BSNL (Reserved)'],
    coverageProperty: 'High capacity, 1.5–3 km tower radius, balances great speed with citywide coverage',
    speedCapability: '500 Mbps – 1.2 Gbps',
    idealUseCase: 'High-speed mobile data, 4K/8K video streaming, cloud gaming, dense metro clusters, and FWA AirFiber'
  },
  {
    band: 'n258',
    frequency: '26 GHz (24.25–27.5 GHz mmWave)',
    duplex: 'TDD',
    keyHolders: ['Reliance Jio (1000 MHz)', 'Bharti Airtel (800 MHz)', 'Vodafone Idea (200–800 MHz)'],
    coverageProperty: 'Extreme line-of-sight density, 200–500m radius, easily blocked by walls and foliage',
    speedCapability: '2 Gbps – 4.5 Gbps',
    idealUseCase: 'Stadiums, airports, tech parks, smart factory robotics, enterprise private 5G networks, and ultra-dense venues'
  },
  {
    band: 'Band 40 (n40)',
    frequency: '2300 MHz (TD-LTE)',
    duplex: 'TDD',
    keyHolders: ['Reliance Jio (40 MHz)', 'Bharti Airtel (40 MHz)'],
    coverageProperty: 'Urban high-capacity layer with heavy spectrum efficiency',
    speedCapability: '100–250 Mbps',
    idealUseCase: 'Primary 4G/5G data carrier aggregation layer in Tier 1 & Tier 2 cities'
  },
  {
    band: 'Band 3 (n3)',
    frequency: '1800 MHz (FDD)',
    duplex: 'FDD',
    keyHolders: ['Bharti Airtel', 'Reliance Jio', 'Vodafone Idea', 'BSNL'],
    coverageProperty: 'Pan-India workhorse band for combined 4G LTE and dynamic 5G refarming',
    speedCapability: '80–200 Mbps',
    idealUseCase: 'Universal smartphone compatibility, seamless voice calling VoLTE/VoNR, and dual-SIM stability'
  },
  {
    band: 'Band 8 (n8)',
    frequency: '900 MHz (FDD)',
    duplex: 'FDD',
    keyHolders: ['Bharti Airtel', 'Vodafone Idea', 'BSNL'],
    coverageProperty: 'Excellent sub-GHz propagation for wide rural coverage and indoor voice clarity',
    speedCapability: '40–100 Mbps',
    idealUseCase: 'Rural 4G data coverage, VoWiFi handovers, and 2G/4G voice stability'
  }
];

export const INDIA_PREFIX_MAP: Array<{ prefix: string; circle: string; carrier: string; region: string }> = [
  // Delhi
  { prefix: '9810', circle: 'Delhi & NCR', carrier: 'Bharti Airtel', region: 'New Delhi' },
  { prefix: '9811', circle: 'Delhi & NCR', carrier: 'Vodafone Idea', region: 'New Delhi' },
  { prefix: '9818', circle: 'Delhi & NCR', carrier: 'Bharti Airtel', region: 'Noida / Gurgaon' },
  { prefix: '9871', circle: 'Delhi & NCR', carrier: 'Bharti Airtel', region: 'New Delhi' },
  { prefix: '9899', circle: 'Delhi & NCR', carrier: 'Vodafone Idea', region: 'Ghaziabad' },
  { prefix: '9910', circle: 'Delhi & NCR', carrier: 'Bharti Airtel', region: 'New Delhi' },
  { prefix: '9999', circle: 'Delhi & NCR', carrier: 'Vodafone Idea', region: 'New Delhi' },
  { prefix: '7042', circle: 'Delhi & NCR', carrier: 'Reliance Jio', region: 'New Delhi' },
  { prefix: '8800', circle: 'Delhi & NCR', carrier: 'Reliance Jio', region: 'Gurugram' },
  
  // Mumbai
  { prefix: '9820', circle: 'Mumbai', carrier: 'Bharti Airtel', region: 'Mumbai City' },
  { prefix: '9821', circle: 'Mumbai', carrier: 'Vodafone Idea', region: 'South Mumbai' },
  { prefix: '9819', circle: 'Mumbai', carrier: 'Vodafone Idea', region: 'Andheri' },
  { prefix: '9833', circle: 'Mumbai', carrier: 'Vodafone Idea', region: 'Thane' },
  { prefix: '9869', circle: 'Mumbai', carrier: 'MTNL / BSNL', region: 'Mumbai Metro' },
  { prefix: '9920', circle: 'Mumbai', carrier: 'Vodafone Idea', region: 'Bandra' },
  { prefix: '7738', circle: 'Mumbai', carrier: 'Reliance Jio', region: 'Navi Mumbai' },
  { prefix: '9930', circle: 'Mumbai', carrier: 'Bharti Airtel', region: 'Mumbai' },

  // Karnataka
  { prefix: '9844', circle: 'Karnataka', carrier: 'Vodafone Idea', region: 'Bengaluru' },
  { prefix: '9845', circle: 'Karnataka', carrier: 'Bharti Airtel', region: 'Bengaluru / Mysuru' },
  { prefix: '9880', circle: 'Karnataka', carrier: 'Bharti Airtel', region: 'Bengaluru Tech Corridor' },
  { prefix: '9886', circle: 'Karnataka', carrier: 'Vodafone Idea', region: 'Mangaluru' },
  { prefix: '9900', circle: 'Karnataka', carrier: 'Bharti Airtel', region: 'Bengaluru' },
  { prefix: '9448', circle: 'Karnataka', carrier: 'BSNL', region: 'Hubballi / Belagavi' },
  { prefix: '8050', circle: 'Karnataka', carrier: 'Reliance Jio', region: 'Electronic City' },

  // Maharashtra & Goa
  { prefix: '9822', circle: 'Maharashtra & Goa', carrier: 'Vodafone Idea', region: 'Pune' },
  { prefix: '9823', circle: 'Maharashtra & Goa', carrier: 'Vodafone Idea', region: 'Nagpur' },
  { prefix: '9850', circle: 'Maharashtra & Goa', carrier: 'Bharti Airtel', region: 'Pune / Nashik' },
  { prefix: '9860', circle: 'Maharashtra & Goa', carrier: 'Bharti Airtel', region: 'Aurangabad' },
  { prefix: '9422', circle: 'Maharashtra & Goa', carrier: 'BSNL', region: 'Panaji / Goa' },
  { prefix: '7774', circle: 'Maharashtra & Goa', carrier: 'Reliance Jio', region: 'Pune Hinjawadi' },

  // Gujarat
  { prefix: '9824', circle: 'Gujarat', carrier: 'Vodafone Idea', region: 'Surat' },
  { prefix: '9825', circle: 'Gujarat', carrier: 'Vodafone Idea', region: 'Ahmedabad' },
  { prefix: '9879', circle: 'Gujarat', carrier: 'Vodafone Idea', region: 'Vadodara' },
  { prefix: '9898', circle: 'Gujarat', carrier: 'Bharti Airtel', region: 'Rajkot' },
  { prefix: '9426', circle: 'Gujarat', carrier: 'BSNL', region: 'Gandhinagar' },
  { prefix: '7600', circle: 'Gujarat', carrier: 'Reliance Jio', region: 'SG Highway Ahmedabad' },

  // Tamil Nadu
  { prefix: '9840', circle: 'Tamil Nadu', carrier: 'Bharti Airtel', region: 'Chennai City' },
  { prefix: '9841', circle: 'Tamil Nadu', carrier: 'Vodafone Idea', region: 'Chennai Central' },
  { prefix: '9842', circle: 'Tamil Nadu', carrier: 'Vodafone Idea', region: 'Coimbatore' },
  { prefix: '9843', circle: 'Tamil Nadu', carrier: 'Vodafone Idea', region: 'Madurai' },
  { prefix: '9443', circle: 'Tamil Nadu', carrier: 'BSNL', region: 'Tiruchirappalli' },
  { prefix: '7299', circle: 'Tamil Nadu', carrier: 'Reliance Jio', region: 'OMR Chennai' },

  // Andhra Pradesh & Telangana
  { prefix: '9848', circle: 'Andhra Pradesh & Telangana', carrier: 'Vodafone Idea', region: 'Hyderabad' },
  { prefix: '9849', circle: 'Andhra Pradesh & Telangana', carrier: 'Bharti Airtel', region: 'Secunderabad / Hitech City' },
  { prefix: '9866', circle: 'Andhra Pradesh & Telangana', carrier: 'Bharti Airtel', region: 'Visakhapatnam' },
  { prefix: '9440', circle: 'Andhra Pradesh & Telangana', carrier: 'BSNL', region: 'Vijayawada' },
  { prefix: '7382', circle: 'Andhra Pradesh & Telangana', carrier: 'Reliance Jio', region: 'Gachibowli Hyderabad' },

  // Kolkata
  { prefix: '9830', circle: 'Kolkata', carrier: 'Bharti Airtel', region: 'Kolkata Central' },
  { prefix: '9831', circle: 'Kolkata', carrier: 'Vodafone Idea', region: 'Howrah' },
  { prefix: '9433', circle: 'Kolkata', carrier: 'BSNL', region: 'Salt Lake Kolkata' },
  { prefix: '7003', circle: 'Kolkata', carrier: 'Reliance Jio', region: 'New Town Kolkata' },

  // UP East
  { prefix: '9839', circle: 'UP (East)', carrier: 'Vodafone Idea', region: 'Lucknow' },
  { prefix: '9838', circle: 'UP (East)', carrier: 'Vodafone Idea', region: 'Kanpur' },
  { prefix: '9935', circle: 'UP (East)', carrier: 'Bharti Airtel', region: 'Varanasi' },
  { prefix: '9415', circle: 'UP (East)', carrier: 'BSNL', region: 'Prayagraj (Allahabad)' },
  { prefix: '8004', circle: 'UP (East)', carrier: 'Reliance Jio', region: 'Gomti Nagar Lucknow' },

  // Bihar & Jharkhand
  { prefix: '9835', circle: 'Bihar & Jharkhand', carrier: 'Bharti Airtel', region: 'Patna' },
  { prefix: '9934', circle: 'Bihar & Jharkhand', carrier: 'Bharti Airtel', region: 'Ranchi' },
  { prefix: '9431', circle: 'Bihar & Jharkhand', carrier: 'BSNL', region: 'Gaya / Jamshedpur' },
  { prefix: '7004', circle: 'Bihar & Jharkhand', carrier: 'Reliance Jio', region: 'Bailey Road Patna' },
  { prefix: '6201', circle: 'Bihar & Jharkhand', carrier: 'Reliance Jio', region: 'Dhanbad / Muzaffarpur' },

  // Kerala
  { prefix: '9846', circle: 'Kerala', carrier: 'Vodafone Idea', region: 'Kochi' },
  { prefix: '9847', circle: 'Kerala', carrier: 'Vodafone Idea', region: 'Thiruvananthapuram' },
  { prefix: '9447', circle: 'Kerala', carrier: 'BSNL', region: 'Kozhikode' },
  { prefix: '8547', circle: 'Kerala', carrier: 'Reliance Jio', region: 'Ernakulam' },

  // Punjab
  { prefix: '9814', circle: 'Punjab', carrier: 'Vodafone Idea', region: 'Ludhiana' },
  { prefix: '9815', circle: 'Punjab', carrier: 'Bharti Airtel', region: 'Chandigarh' },
  { prefix: '9417', circle: 'Punjab', carrier: 'BSNL', region: 'Amritsar' },
  { prefix: '7837', circle: 'Punjab', carrier: 'Reliance Jio', region: 'Jalandhar' }
];
