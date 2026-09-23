export interface OsintToolItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  url: string;
  cliCommand?: string;
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Open Source' | 'Commercial' | 'Paid';
  authRequired: boolean;
  badge?: string;
  apiAvailable?: boolean;
}

export interface OsintPipelineStage {
  id: string;
  name: string;
  short: string;
  desc: string;
  icon: string;
}

export const OSINT_PIPELINE_STAGES: OsintPipelineStage[] = [
  { id: 'discovery', name: '1. Search & Discovery', short: 'Discovery', desc: 'Surface search engines, meta-crawlers, and boolean query dorking', icon: 'Search' },
  { id: 'people', name: '2. People & Identity', short: 'People', desc: 'Username footprinting, people search engines, and background verification', icon: 'User' },
  { id: 'social', name: '3. Social Media Recon', short: 'Social', desc: 'Profile correlation, post history, social network scrapers, and analytics', icon: 'Share2' },
  { id: 'email', name: '4. Email & Phone Intel', short: 'Email/Phone', desc: 'Email permutation, deliverability, HLR lookup, and carrier routing', icon: 'Mail' },
  { id: 'domains', name: '5. Domain & DNS', short: 'Domains/DNS', desc: 'WHOIS history, certificate logs, subdomains, and DNS record trees', icon: 'Globe' },
  { id: 'infrastructure', name: '6. Internet Infrastructure & IoT', short: 'Infrastructure', desc: 'Open ports, service banners, BGP routing, ASN maps, and IoT engines', icon: 'Cpu' },
  { id: 'websites', name: '7. Website Tech & Headers', short: 'Web Tech', desc: 'CMS detection, JavaScript libraries, server configs, and SSL audits', icon: 'Code' },
  { id: 'images', name: '8. Image Forensics & Vision', short: 'Images', desc: 'Reverse image search, facial recognition, ELA forgery detection, and EXIF', icon: 'Image' },
  { id: 'video', name: '9. Video Forensics', short: 'Video', desc: 'Keyframe extraction, metadata carving, stream inspection, and subtitles', icon: 'Video' },
  { id: 'geolocation', name: '10. Geolocation & Maps', short: 'Geo/Maps', desc: 'Ground photography, street views, topographic mapping, and geocoding', icon: 'MapPin' },
  { id: 'satellite', name: '11. Satellite & Earth Observation', short: 'Satellite', desc: 'Multi-spectral bands, SAR radar, thermal hotspots, and high-res imagery', icon: 'Radio' },
  { id: 'aviation_maritime', name: '12. Flight & Maritime Tracking', short: 'Aero/Marine', desc: 'ADS-B aircraft transponders, AIS vessel beacons, and live ship radar', icon: 'Compass' },
  { id: 'chronolocation', name: '13. Chrono & Sun Calculations', short: 'Sun/Time', desc: 'Solar angles, shadow length calculations, and timeline reconstruction', icon: 'Clock' },
  { id: 'metadata', name: '14. Metadata, Files & Stego', short: 'Metadata/Files', desc: 'EXIF extraction, document author tags, steganography, and carving', icon: 'FileText' },
  { id: 'archives', name: '15. Web Archives & Historical', short: 'Archives', desc: 'Wayback snapshots, deleted pages, and permanent timestamp caches', icon: 'Clock' },
  { id: 'dfir', name: '16. Digital Forensics & Incident Response', short: 'DFIR/Memory', desc: 'Memory triage, disk artifacts, registry forensics, and packet capture', icon: 'Activity' },
  { id: 'threat_intel', name: '17. Threat Intel & Sandboxes', short: 'Threat Intel', desc: 'Malware analysis, dynamic sandboxes, YARA signatures, and IOC feeds', icon: 'ShieldAlert' },
  { id: 'siem_network', name: '18. Network & SIEM Audits', short: 'SIEM/Network', desc: 'Packet inspection, IDS/IPS rules, log correlation, and endpoint telemetry', icon: 'Network' },
  { id: 'code_secrets', name: '19. Code & Secrets Hunting', short: 'Code/Secrets', desc: 'Repo mining, leaked credentials, API keys, and AST static analysis', icon: 'Terminal' },
  { id: 'companies', name: '20. Company & Corporate Registries', short: 'Corporate', desc: 'Corporate filings, shareholder links, sanctions lists, and offshore leaks', icon: 'Building2' },
  { id: 'factcheck', name: '21. Fact-Checking & Verification', short: 'Fact-Check', desc: 'Disinformation debunking, claim verification, and newsroom toolkits', icon: 'CheckCircle2' },
  { id: 'news_media', name: '22. News & Event Monitoring', short: 'News/Media', desc: 'Global event streams, broadcast monitors, news APIs, and RSS aggregators', icon: 'Newspaper' },
  { id: 'academia_datasets', name: '23. Academia & Open Data', short: 'Open Data', desc: 'Scientific preprints, citations, government datasets, and public statistics', icon: 'GraduationCap' },
  { id: 'darkweb_breaches', name: '24. Dark-Web & Breach Data', short: 'DarkWeb/Breach', desc: 'Hidden services, compromised credential dumps, and darknet indices', icon: 'EyeOff' },
  { id: 'link_analysis', name: '25. Link Analysis & Investigation', short: 'Link Analysis', desc: 'Entity-relationship graphs, knowledge base lockers, and final dossier export', icon: 'Layers' }
];

export const OSINT_TOOLS_DIRECTORY: OsintToolItem[] = [
  // ==========================================
  // 1. Search & Discovery
  // ==========================================
  {
    id: 'google',
    name: 'Google Advanced Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Global flagship search engine with comprehensive dorking operators (filetype:, site:, inurl:, intext:, cache:).',
    url: 'https://www.google.com',
    tags: ['Search', 'Dorking', 'Global Index', 'Google'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Tier 1'
  },
  {
    id: 'bing',
    name: 'Microsoft Bing',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Advanced web indexing with distinct IP-based and subdomain indexing operators (ip:, feed:, contains:).',
    url: 'https://www.bing.com',
    tags: ['Search', 'Microsoft', 'Operators'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'brave-search',
    name: 'Brave Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Independent, privacy-first web index with zero tracking, zero profile creation, and Goggles custom ranking.',
    url: 'https://search.brave.com',
    tags: ['Privacy', 'Independent Index', 'Zero Logs'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Privacy Default'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Privacy-focused search engine preventing search leakage and targeted advertising tracking with !bang shortcuts.',
    url: 'https://duckduckgo.com',
    tags: ['Privacy', 'Bangs', 'No Tracking'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'yandex',
    name: 'Yandex Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Leading Eurasian search engine renowned for exceptional reverse image search and Cyrillic index breadth.',
    url: 'https://yandex.com',
    tags: ['Eurasia', 'Reverse Image', 'Deep Index'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Superior Image Recon'
  },
  {
    id: 'baidu',
    name: 'Baidu Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Dominant search engine for the Chinese Internet ecosystem and Mandarin-language digital footprinting.',
    url: 'https://www.baidu.com',
    tags: ['China', 'Mandarin', 'APAC'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'yahoo-search',
    name: 'Yahoo Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Long-standing web search portal offering customized news, localized discovery, and index syndication.',
    url: 'https://search.yahoo.com',
    tags: ['Search', 'Yahoo', 'News Index'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'startpage',
    name: 'Startpage',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Delivers Google search results with total privacy protection, anonymous view proxy, and zero logging.',
    url: 'https://www.startpage.com',
    tags: ['Proxy Search', 'Privacy', 'Google Mirror'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'kagi',
    name: 'Kagi Search',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Ad-free, customizable, privacy-first search engine with automated site domain weighting and lens filters.',
    url: 'https://kagi.com',
    tags: ['Premium Search', 'No Ads', 'Domain Weighting'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'mojeek',
    name: 'Mojeek',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Completely independent, crawler-based search engine with its own standalone index of billions of pages.',
    url: 'https://www.mojeek.com',
    tags: ['Independent Index', 'Crawler', 'UK-Based'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'qwant',
    name: 'Qwant',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'European privacy-focused search engine complying with strict EU GDPR standards and zero profiling.',
    url: 'https://www.qwant.com',
    tags: ['European', 'GDPR Compliant', 'Privacy'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'ecosia',
    name: 'Ecosia',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Eco-conscious search engine using ad revenue for global reforestation projects with privacy query handling.',
    url: 'https://www.ecosia.org',
    tags: ['Green Search', 'Privacy', 'Tree Planting'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'swisscows',
    name: 'Swisscows',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Switzerland-based semantic search engine operating on secure Swiss servers with zero data retention.',
    url: 'https://swisscows.com',
    tags: ['Swiss Privacy', 'Zero Data Storage', 'Semantic'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'searxng',
    name: 'SearXNG',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Open-source, self-hostable metasearch engine aggregating 70+ search services while protecting user privacy.',
    url: 'https://searx.space',
    cliCommand: 'docker run -d --name searxng -p 8080:8080 searxng/searxng',
    tags: ['Metasearch', 'Open Source', 'Self-Hosted'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Self-Hostable'
  },
  {
    id: 'yep',
    name: 'Yep Search (Ahrefs)',
    category: 'Search & Discovery',
    categorySlug: 'discovery',
    description: 'Independent search engine powered by the AhrefsBot global web crawler sharing 90% of ad revenue with creators.',
    url: 'https://yep.com',
    tags: ['Ahrefs Index', 'Crawler', 'Revenue Share'],
    pricing: 'Free',
    authRequired: false
  },

  // ==========================================
  // 2. People, Usernames, Phone & Identity Lookup
  // ==========================================
  {
    id: 'sherlock',
    name: 'Sherlock Project',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Hunt down social media accounts by username across 400+ social networks with high-speed async HTTP checks.',
    url: 'https://github.com/sherlock-project/sherlock',
    cliCommand: 'sherlock <target_username> --timeout 5 --print-found',
    tags: ['Usernames', 'Social Footprint', 'CLI Tool'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Industry Standard'
  },
  {
    id: 'maigret',
    name: 'Maigret',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Collect a digital dossier on a person by username across 2,500+ sites, parsing tags, links, and avatar matches.',
    url: 'https://github.com/soxoj/maigret',
    cliCommand: 'maigret <target_username> --all-sites --pdf',
    tags: ['Dossier Builder', '2500+ Sites', 'Deep Scan'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Comprehensive'
  },
  {
    id: 'whatsmyname',
    name: 'WhatsMyName Web',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Web-based and JSON-driven fast username enumeration across hundreds of curated web registries.',
    url: 'https://whatsmyname.app',
    tags: ['Web UI', 'Fast Enum', 'Curated Rules'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'blackbird',
    name: 'Blackbird OSINT',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Fast async OSINT tool to search for accounts by username across 500+ websites with exportable PDF report.',
    url: 'https://github.com/p1ngul1n0/blackbird',
    cliCommand: 'python blackbird.py -u <target_username> --web',
    tags: ['Async Python', 'Fast', 'Export PDF'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'social-analyzer',
    name: 'Social Analyzer',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'API, CLI, and Web application for analyzing & finding a person profile across 1000+ social media sites.',
    url: 'https://github.com/qeeqbox/social-analyzer',
    cliCommand: 'social-analyzer --username "<target>" --logs --extract',
    tags: ['Profile Analysis', '1000+ Platforms', 'Extraction Engine'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'namechk',
    name: 'Namechk',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Check brand and username availability and footprinting across prominent social domains and TLDs.',
    url: 'https://namechk.com',
    tags: ['Brand OSINT', 'Social Checks', 'Domain Availability'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'knowem',
    name: 'KnowEm Brand & Identity',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Search 500+ popular social networks, over 150 domain names, and the USPTO trademark database.',
    url: 'https://knowem.com',
    tags: ['Trademarks', 'Brands', 'Social Networks'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'namecheckup',
    name: 'NameCheckup',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Real-time username search engine across top social platforms and domain registries.',
    url: 'https://namecheckup.com',
    tags: ['Username Check', 'Domain Names', 'Fast Search'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'usersearch',
    name: 'UserSearch.org',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Free OSINT tool to find someone by username, email, phone number, or crypto wallet address.',
    url: 'https://usersearch.org',
    tags: ['People Finder', 'Crypto Wallets', 'Reverse Username'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'peekyou',
    name: 'PeekYou',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'People search engine aggregating individuals across public records, news sources, and social websites.',
    url: 'https://www.peekyou.com',
    tags: ['People Search', 'Public Records', 'Social Score'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'thatsthem',
    name: 'ThatsThem Search',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Comprehensive 100% free people search engine covering reverse address, phone, email, and VIN lookup.',
    url: 'https://thatsthem.com',
    tags: ['Reverse Address', 'Phone Lookup', 'VIN Search'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'pipl',
    name: 'Pipl Identity Resolution',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Enterprise-grade identity resolution platform matching fractured data points to real humans globally.',
    url: 'https://pipl.com',
    tags: ['Enterprise Identity', 'Deep Web Records', 'Fraud Prevention'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'spokeo',
    name: 'Spokeo People Search',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Public records search platform aggregating white pages listings, public records, and social network accounts.',
    url: 'https://www.spokeo.com',
    tags: ['Public Records', 'White Pages', 'Reverse Phone'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'beenverified',
    name: 'BeenVerified',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Background check platform offering criminal records, court records, property records, and vehicle lookups.',
    url: 'https://www.beenverified.com',
    tags: ['Background Check', 'Criminal Records', 'Court Records'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'truepeoplesearch',
    name: 'TruePeopleSearch',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Free public directory providing reverse phone lookups, home addresses, family members, and associates.',
    url: 'https://www.truepeoplesearch.com',
    tags: ['Free Lookup', 'Address History', 'Associates'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'whitepages',
    name: 'Whitepages',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'The premier consumer and business directory for contact details, background checks, and tenant screening.',
    url: 'https://www.whitepages.com',
    tags: ['Directory', 'Landline/Mobile', 'Addresses'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'fastpeoplesearch',
    name: 'FastPeopleSearch',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Instant and accurate 100% free people lookup service covering millions of US public records.',
    url: 'https://www.fastpeoplesearch.com',
    tags: ['Instant Search', 'Free Records', 'Phone Numbers'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'truecaller',
    name: 'Truecaller Global Registry',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'World\'s largest crowdsourced caller identification platform mapping phone numbers to verified identities.',
    url: 'https://www.truecaller.com',
    tags: ['Caller ID', 'Spam Score', 'Global Directory'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Top Caller DB'
  },
  {
    id: 'numverify',
    name: 'NumVerify Global Phone API',
    category: 'People & Identity',
    categorySlug: 'email',
    description: 'Real-time phone number validation and lookup covering 232 countries with carrier, line type, and location.',
    url: 'https://numverify.com',
    tags: ['Phone Validation', 'Carrier API', '232 Countries'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'numlookup',
    name: 'NumLookup',
    category: 'People & Identity',
    categorySlug: 'email',
    description: 'Free reverse phone lookup tool allowing instant owner identification with zero registration.',
    url: 'https://www.numlookup.com',
    tags: ['Free Reverse Phone', 'Carrier Check', 'Owner Name'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'callersmart',
    name: 'CallerSmart',
    category: 'People & Identity',
    categorySlug: 'email',
    description: 'Crowdsourced phone book community helping track mystery callers, telemarketers, and spam numbers.',
    url: 'https://www.callersmart.com',
    tags: ['Community Phonebook', 'Spam Tracking', 'Mystery Callers'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'sync-me',
    name: 'Sync.ME',
    category: 'People & Identity',
    categorySlug: 'email',
    description: 'Reverse phone lookup engine and social sync identifying callers and matching them with social profiles.',
    url: 'https://sync.me',
    tags: ['Social Sync', 'Caller ID', 'Profile Matching'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'spydialer',
    name: 'SpyDialer',
    category: 'People & Identity',
    categorySlug: 'email',
    description: 'Free reverse phone lookup that listens to voicemail greetings to verify the exact person on the line.',
    url: 'https://www.spydialer.com',
    tags: ['Voicemail Eavesdrop', 'Reverse Lookup', 'Free'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'searchpeoplefree',
    name: 'SearchPeopleFree',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Direct database for uncovering public records, relatives, criminal history, and past residences.',
    url: 'https://www.searchpeoplefree.com',
    tags: ['Free Public Records', 'Relatives', 'Residence History'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'radaris',
    name: 'Radaris Public Intelligence',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Comprehensive public record and background check aggregator searching government and social data.',
    url: 'https://radaris.com',
    tags: ['Public Intelligence', 'Court Documents', 'Property Deeds'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'peoplefinders',
    name: 'PeopleFinders',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'One of the oldest and most extensive background check and public record repositories in North America.',
    url: 'https://www.peoplefinders.com',
    tags: ['Background Checks', 'Public Records', 'Contact Info'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'instantcheckmate',
    name: 'Instant Checkmate',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Specialized background check service scouring police records, arrest histories, and civil court dockets.',
    url: 'https://www.instantcheckmate.com',
    tags: ['Police Records', 'Arrest Records', 'Court Dockets'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'socialcatfish',
    name: 'Social Catfish',
    category: 'People & Identity',
    categorySlug: 'people',
    description: 'Online investigation service specializing in verifying identities, detecting romance scammers, and reverse image lookups.',
    url: 'https://socialcatfish.com',
    tags: ['Catfish Verification', 'Romance Scams', 'Reverse Photo'],
    pricing: 'Freemium',
    authRequired: true
  },

  // ==========================================
  // 3. Social Media OSINT & Scrapers
  // ==========================================
  {
    id: 'social-searcher',
    name: 'Social Searcher',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Free real-time social media search engine monitoring Twitter, Facebook, YouTube, Instagram, and Reddit.',
    url: 'https://www.social-searcher.com',
    tags: ['Real-Time Social', 'Sentiment Analysis', 'Multi-Network'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'social-blade',
    name: 'Social Blade Analytics',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Track user statistics, subscriber growth, and engagement velocity across YouTube, Twitch, Twitter, and TikTok.',
    url: 'https://socialblade.com',
    tags: ['Growth Tracking', 'Subscriber Velocity', 'Influencer Metrics'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'twint',
    name: 'Twint Twitter Scraper',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Advanced Twitter scraping tool written in Python that allows for scraping Tweets from specific profiles without API limits.',
    url: 'https://github.com/twintproject/twint',
    cliCommand: 'twint -u <username> --since 2020-01-01',
    tags: ['Twitter Scraper', 'No API Limits', 'Python'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'instaloader',
    name: 'Instaloader',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Download public and private Instagram profiles, hashtags, stories, reels, comments, and geotagged posts.',
    url: 'https://github.com/instaloader/instaloader',
    cliCommand: 'instaloader profile <target_instagram_handle>',
    tags: ['Instagram OSINT', 'Post Scraper', 'Stories & Highlights'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'twscrape',
    name: 'Twscrape',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Modern Twitter/X API scraper utilizing authenticated account pools to extract tweets, followers, and retweets.',
    url: 'https://github.com/vladkens/twscrape',
    cliCommand: 'twscrape search "from:target_handle" --limit 50',
    tags: ['Twitter/X Scraper', 'Account Pool', 'Modern Async'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'nitter',
    name: 'Nitter (Privacy Twitter Viewer)',
    category: 'Social Media Recon',
    categorySlug: 'social',
    description: 'Free and open source alternative Twitter front-end focused on privacy and performance without JavaScript or tracking.',
    url: 'https://nitter.net',
    tags: ['Privacy Twitter', 'No JS Required', 'Fast Scraping'],
    pricing: 'Open Source',
    authRequired: false
  },

  // ==========================================
  // 4. Email Intelligence & Permutations
  // ==========================================
  {
    id: 'hunter-io',
    name: 'Hunter.io',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Domain email search engine discovering professional email addresses, email patterns, and verification status.',
    url: 'https://hunter.io',
    tags: ['Email Hunter', 'Pattern Matcher', 'Corporate Email'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'snov-io',
    name: 'Snov.io Email Finder',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Prospecting platform providing email warmups, bulk email verification, and company domain email extraction.',
    url: 'https://snov.io',
    tags: ['Email Verification', 'Domain Scraper', 'Prospecting'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'apollo-io',
    name: 'Apollo.io B2B Intelligence',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Database of 275+ million contacts and 73+ million companies with verified business emails and direct dials.',
    url: 'https://www.apollo.io',
    tags: ['B2B Contacts', 'Direct Dials', 'Corporate Intel'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'clearbit',
    name: 'Clearbit Enrichment (HubSpot)',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Data engine turning email addresses and domain names into complete company and executive profile dossiers.',
    url: 'https://clearbit.com',
    tags: ['Data Enrichment', 'Company APIs', 'Executive Data'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'rocketreach',
    name: 'RocketReach',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Real-time verified email and phone number finder for 700+ million professionals worldwide.',
    url: 'https://rocketreach.co',
    tags: ['Executive Finder', 'Direct Mobile', 'Real-Time Verification'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'voila-norbert',
    name: 'Voila Norbert',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Accurate corporate email finder using corporate domain algorithms and SMTP ping validation.',
    url: 'https://www.voilanorbert.com',
    tags: ['Email Accuracy', 'SMTP Validation', 'Lead Enrichment'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'email-permutator',
    name: 'Email Permutator',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Generate all common corporate email address variations from first name, last name, and domain.',
    url: 'https://emailpermutator.com',
    tags: ['Email Permutations', 'Name Permutation', 'Pattern Generator'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'emailrep',
    name: 'EmailRep.io',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'AI-driven email address reputation scoring API detecting burner emails, spam history, and linked accounts.',
    url: 'https://emailrep.io',
    cliCommand: 'curl -s https://emailrep.io/<target_email>',
    tags: ['Email Reputation', 'Burner Detection', 'Spam Score'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'gravatar',
    name: 'Gravatar Reverse MD5',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Globally recognized avatars associated with MD5 hashed email addresses revealing usernames and real names.',
    url: 'https://en.gravatar.com',
    tags: ['Gravatar Profile', 'MD5 Hashing', 'Avatar Matching'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'epieos',
    name: 'Epieos',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Reverse email OSINT lookup without notifying the target across Google, Skype, Microsoft, and LinkedIn records.',
    url: 'https://epieos.com',
    tags: ['Reverse Email', 'Google Account', 'Silent Query'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'holehe',
    name: 'Holehe',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Checks if an email is attached to an account on 120+ sites (Twitter, Instagram, Imgur) without alerting the target.',
    url: 'https://github.com/megadose/holehe',
    cliCommand: 'holehe <target_email@domain.com>',
    tags: ['Email Footprint', 'Silent Enum', '120+ Sites'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Essential Email Tool'
  },
  {
    id: 'ghunt',
    name: 'GHunt',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Investigate Google accounts (Gmail, Google Maps reviews, Google Photos, Gaia ID, YouTube channel, Hangouts).',
    url: 'https://github.com/mxrch/GHunt',
    cliCommand: 'ghunt email <target@gmail.com>',
    tags: ['Google Accounts', 'Gaia ID', 'Maps Reviews'],
    pricing: 'Open Source',
    authRequired: true,
    badge: 'Google Ecosystem'
  },
  {
    id: 'phoneinfoga',
    name: 'PhoneInfoga',
    category: 'Email & Phone Intel',
    categorySlug: 'email',
    description: 'Advanced phone number reconnaissance scanner extracting carrier, line type, country format, and search engine footprint.',
    url: 'https://github.com/sundowndev/phoneinfoga',
    cliCommand: 'phoneinfoga scan -n "+14155552671"',
    tags: ['Telecom Recon', 'Number Scanner', 'Carrier Lookup'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Top Phone Recon'
  },

  // ==========================================
  // 5. Domain, DNS & Network Topologies
  // ==========================================
  {
    id: 'whois',
    name: 'WHOIS / ICANN Lookup',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Official ICANN registry protocol for domain ownership, registration dates, expiration, nameservers, and registrar data.',
    url: 'https://lookup.icann.org',
    cliCommand: 'whois <target_domain.com>',
    tags: ['WHOIS', 'Registrar', 'ICANN'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'securitytrails',
    name: 'SecurityTrails',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Extensive historical DNS data, current and past WHOIS records, subdomains, and IP neighbor relationships.',
    url: 'https://securitytrails.com',
    tags: ['Historical DNS', 'Subdomains', 'IP Neighbors'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Historical DNS Master'
  },
  {
    id: 'dnsdumpster',
    name: 'DNSDumpster',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Domain research tool that finds subdomains, maps host records, and visualizes network topology graphs.',
    url: 'https://dnsdumpster.com',
    tags: ['Subdomain Enum', 'Mapping', 'Topology Graph'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'viewdns',
    name: 'ViewDNS.info',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Multi-tool suite offering reverse IP lookup, reverse whois, DNS record queries, traceroute, and port scans.',
    url: 'https://viewdns.info',
    tags: ['Reverse IP', 'Reverse Whois', 'DNS Multi-Tool'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'dnslytics',
    name: 'DNSlytics',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Investigate IP addresses, domains, and providers through shared Google Analytics IDs, AdSense, and ASN graphs.',
    url: 'https://dnslytics.com',
    tags: ['Shared Analytics', 'AdSense Matching', 'Reverse IP'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'crt-sh',
    name: 'crt.sh Certificate Search',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Public Certificate Transparency search database revealing subdomains and TLS certificates historically issued.',
    url: 'https://crt.sh',
    tags: ['Certificate Transparency', 'Subdomains', 'SSL Logs'],
    pricing: 'Free',
    authRequired: false,
    badge: 'CT Log Index'
  },
  {
    id: 'certspotter',
    name: 'CertSpotter',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Monitors Certificate Transparency logs to discover newly issued TLS certificates and unauthorized subdomain creation.',
    url: 'https://sslmate.com/certspotter/',
    tags: ['CT Monitoring', 'SSL Auditing', 'Subdomain Watch'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'dnsrecon',
    name: 'DNSRecon',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Python script for DNS enumeration, zone transfers, wildcard resolution, PTR records, and SRV record enumeration.',
    url: 'https://github.com/darkoperator/dnsrecon',
    cliCommand: 'dnsrecon -d <target_domain.com> -t std',
    tags: ['DNS Enumeration', 'Zone Transfers', 'SRV Records'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'dnsenum',
    name: 'DNSenum',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'Multithreaded perl script to enumerate DNS information of a domain and discover non-contiguous IP blocks.',
    url: 'https://github.com/fwaeytens/dnsenum',
    cliCommand: 'dnsenum --enum <target_domain.com>',
    tags: ['DNS Multithread', 'IP Blocks', 'Dictionary Attack'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'fierce',
    name: 'Fierce DNS Recon',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'A lightweight DNS reconnaissance tool for locating non-contiguous IP space and hostnames across subnets.',
    url: 'https://github.com/mschwager/fierce',
    cliCommand: 'fierce --domain <target_domain.com>',
    tags: ['Fierce DNS', 'Subnet Recon', 'Host Discovery'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'massdns',
    name: 'MassDNS High-Performance Resolver',
    category: 'Domain & DNS',
    categorySlug: 'domains',
    description: 'High-performance DNS stub resolver capable of resolving millions of domain names per second.',
    url: 'https://github.com/blechschmidt/massdns',
    cliCommand: 'massdns -r resolvers.txt -t A subdomains.txt',
    tags: ['High Speed DNS', 'Millions/Sec', 'C-Based'],
    pricing: 'Open Source',
    authRequired: false
  },

  // ==========================================
  // 6. Internet Infrastructure, Ports & IoT
  // ==========================================
  {
    id: 'shodan',
    name: 'Shodan',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'The world\'s first search engine for Internet-connected devices, industrial control systems, webcams, and open ports.',
    url: 'https://www.shodan.io',
    cliCommand: 'shodan host <target_ip>',
    tags: ['IoT', 'Banners', 'Ports', 'ICS/SCADA'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Gold Standard'
  },
  {
    id: 'censys',
    name: 'Censys Search',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Search engine for Internet-connected hosts, certificates, services, and cloud assets with daily port telemetry.',
    url: 'https://censys.io',
    tags: ['Host Scanner', 'Certificates', 'Cloud Assets'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Enterprise Scanner'
  },
  {
    id: 'fofa',
    name: 'FOFA Pro',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Cyberspace search engine mapping assets, web apps, vulnerabilities, and hardware signatures globally.',
    url: 'https://en.fofa.info',
    tags: ['Cyberspace Mapping', 'Vulnerabilities', 'Asset Search'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'zoomeye',
    name: 'ZoomEye Cyberspace Search',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Global cyberspace mapping system tracking components, services, and vulnerabilities across IP ranges.',
    url: 'https://www.zoomeye.org',
    tags: ['Cyberspace Map', 'Component Search', 'Vulnerabilities'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'netlas',
    name: 'Netlas.io',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Internet intelligence platform for discovering and analyzing external attack surfaces, IP addresses, and certificates.',
    url: 'https://netlas.io',
    tags: ['Attack Surface', 'Certificates', 'Domain Graphs'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'criminal-ip',
    name: 'Criminal IP',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Cyber threat intelligence search engine analyzing malicious IP addresses, phishing domains, and exposed ICS.',
    url: 'https://www.criminalip.io',
    tags: ['Threat Search', 'Phishing Domains', 'ICS Exposure'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'binaryedge',
    name: 'BinaryEdge',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Scans the entire Internet and creates real-time threat intelligence feeds covering honeypots, leaks, and ports.',
    url: 'https://www.binaryedge.io',
    tags: ['Honeypots', 'Threat Feeds', 'Internet Mapping'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'leakix',
    name: 'LeakIX',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Search engine aggregating open services, public database leaks, vulnerable software instances, and exposures.',
    url: 'https://leakix.net',
    tags: ['Open Databases', 'Exposures', 'Vulnerabilities'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'onyphe',
    name: 'ONYPHE Cyber Recon',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Cyber Defense Search Engine collecting cyber-threat intelligence data sourced from open sources and active scanning.',
    url: 'https://www.onyphe.io',
    tags: ['Threat Feeds', 'Darknet Data', 'Vulnerability Scans'],
    pricing: 'Freemium',
    authRequired: true
  },
  {
    id: 'greynoise',
    name: 'GreyNoise Visualizer',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Analyzes omnidirectional Internet scan traffic to differentiate between malicious actors and benign Internet noise.',
    url: 'https://viz.greynoise.io',
    tags: ['Internet Noise', 'Scanner ID', 'Threat Intelligence'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'nmap',
    name: 'Nmap (Network Mapper)',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'The world\'s premier network exploration tool and security / port scanner with NSE Lua scripting engine.',
    url: 'https://nmap.org',
    cliCommand: 'nmap -sV -sC -Pn <target_ip>',
    tags: ['Port Scanner', 'NSE Scripts', 'Network Mapping'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Legendary Scanner'
  },
  {
    id: 'masscan',
    name: 'Masscan (Internet Scale Scanner)',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'TCP port scanner that can transmit 10 million packets per second, scanning the entire Internet in under 6 minutes.',
    url: 'https://github.com/robertdavidgraham/masscan',
    cliCommand: 'masscan -p80,443 <subnet_cidr> --rate=10000',
    tags: ['Ultra Fast', 'Async SYN', 'Internet Scale'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'rustscan',
    name: 'RustScan (Modern Port Scanner)',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'The modern port scanner written in Rust that scans all 65k ports in under 3 seconds and pipes into Nmap.',
    url: 'https://github.com/RustScan/RustScan',
    cliCommand: 'rustscan -a <target_ip> -- -sC -sV',
    tags: ['Rust Core', '65k Ports in 3s', 'Adaptive Rate'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'naabu',
    name: 'Naabu Port Scanner (ProjectDiscovery)',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Fast port scanner written in Go focused on reliability and simplicity with multi-format integration.',
    url: 'https://github.com/projectdiscovery/naabu',
    cliCommand: 'naabu -host <target_domain.com>',
    tags: ['ProjectDiscovery', 'Fast SYN/CONNECT', 'Go Tool'],
    pricing: 'Open Source',
    authRequired: false
  },

  // ==========================================
  // 7. BGP, IP Routing & Telecom Databases
  // ==========================================
  {
    id: 'bgp-he-net',
    name: 'Hurricane Electric BGP Toolkit',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'The definitive BGP routing and AS peering toolkit mapping routing peers, prefix announcements, and IP WHOIS.',
    url: 'https://bgp.he.net',
    tags: ['BGP Routes', 'AS Peering', 'Prefix Graphs'],
    pricing: 'Free',
    authRequired: false,
    badge: 'BGP Standard'
  },
  {
    id: 'bgpview',
    name: 'BGPView API & Portal',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Search ASN, IP prefix, IXP, and country allocations with free JSON REST APIs.',
    url: 'https://bgpview.io',
    tags: ['BGP REST API', 'ASN Prefixes', 'IXP Mapping'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'peeringdb',
    name: 'PeeringDB',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Freely available, user-maintained database of networks, IXPs, and data centers.',
    url: 'https://www.peeringdb.com',
    tags: ['Interconnection', 'IXP Facilities', 'Data Centers'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'ipinfo-io',
    name: 'IPinfo.io',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Comprehensive IP address data including accurate geolocation, ASN, company, mobile carrier, and VPN detection.',
    url: 'https://ipinfo.io',
    cliCommand: 'curl ipinfo.io/<target_ip>',
    tags: ['IP Geolocation', 'Carrier Data', 'VPN Detection'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'ip2location',
    name: 'IP2Location',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Non-intrusive IP geolocation technology that identifies visitor geographical location, proxy type, and ISP.',
    url: 'https://www.ip2location.com',
    tags: ['IP Location', 'Proxy Detection', 'ISP Name'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'maxmind',
    name: 'MaxMind GeoIP2',
    category: 'Internet Infrastructure',
    categorySlug: 'infrastructure',
    description: 'Industry-standard GeoIP2 and minFraud intelligence databases for IP intelligence and digital fraud defense.',
    url: 'https://www.maxmind.com',
    tags: ['GeoIP Standard', 'Fraud Score', 'Location Accuracy'],
    pricing: 'Freemium',
    authRequired: false
  },

  // ==========================================
  // 8. Image Forensics & Reverse Vision
  // ==========================================
  {
    id: 'google-lens',
    name: 'Google Lens',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Visual search engine utilizing computer vision to identify objects, landmarks, text, faces, and related images.',
    url: 'https://lens.google.com',
    tags: ['Visual Search', 'Object Detection', 'OCR'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Vision Standard'
  },
  {
    id: 'tineye',
    name: 'TinEye Reverse Image Search',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Image search engine finding modified versions, higher-resolution copies, and original upload dates of photos.',
    url: 'https://tineye.com',
    tags: ['Reverse Image', 'Image Modifications', 'Oldest Match'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'pimeyes',
    name: 'PimEyes Facial Search',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Face recognition search engine searching the open web for photos of specific individuals.',
    url: 'https://pimeyes.com',
    tags: ['Facial Recognition', 'Reverse Face', 'High Accuracy'],
    pricing: 'Commercial',
    authRequired: true,
    badge: 'Face Recognition'
  },
  {
    id: 'facecheck-id',
    name: 'FaceCheck.ID',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Facial recognition search engine cross-referencing photos with mugshots, scammer registries, and social profiles.',
    url: 'https://facecheck.id',
    tags: ['Face Search', 'Scammer Check', 'Mugshots'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'fotoforensics',
    name: 'FotoForensics ELA',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Digital image forensics service providing Error Level Analysis (ELA), metadata inspection, and edit detection.',
    url: 'https://fotoforensics.com',
    tags: ['Error Level Analysis', 'Forgery Detection', 'Forensics'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'forensically',
    name: 'Forensically (Jonas Wagner)',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'In-browser suite for digital photo forensics: clone detection, error level analysis, noise analysis, and luminance gradient.',
    url: 'https://29a.ch/photo-forensics/',
    tags: ['In-Browser Forensics', 'Clone Detection', 'Noise Analysis'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'saucenao',
    name: 'SauceNAO Reverse Search',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Reverse image search engine specialized in anime, artwork, digital illustration, and manga sources.',
    url: 'https://saucenao.com',
    tags: ['Art Matching', 'Illustration Search', 'Pixel Match'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'reveye',
    name: 'RevEye Multi Reverse Image',
    category: 'Image Forensics & Vision',
    categorySlug: 'images',
    description: 'Simultaneously query Google, Bing, Yandex, TinEye, and Baidu with a single click.',
    url: 'https://chrome.google.com/webstore/detail/reveye-reverse-image-sear/keaaclcjhehbbapnphnmpiklalfhelgf',
    tags: ['Multi-Engine', '1-Click Search', 'Browser Extension'],
    pricing: 'Free',
    authRequired: false
  },

  // ==========================================
  // 9. Video Forensics & Fact Checking
  // ==========================================
  {
    id: 'invid-weverify',
    name: 'InVID / WeVerify Verification Plugin',
    category: 'Video Forensics',
    categorySlug: 'video',
    description: 'Browser extension and suite for journalists and investigators to verify videos, extract keyframes, and read metadata.',
    url: 'https://www.invid-project.eu',
    tags: ['Video Keyframes', 'Verification', 'Fact-Checking'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Journalism Gold Standard'
  },
  {
    id: 'yt-dataviewer',
    name: 'Amnesty International YouTube DataViewer',
    category: 'Video Forensics',
    categorySlug: 'video',
    description: 'Extract exact upload timestamps down to the second and reverse-search video thumbnail keyframes.',
    url: 'https://citizenevidence.amnestyusa.org',
    tags: ['Exact Timestamp', 'Thumbnail Extraction', 'Human Rights'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'ffmpeg',
    name: 'FFmpeg Audio/Video Swiss Army Knife',
    category: 'Video Forensics',
    categorySlug: 'video',
    description: 'Complete cross-platform solution to record, convert, extract frames, and analyze multimedia streams.',
    url: 'https://ffmpeg.org',
    cliCommand: 'ffmpeg -i <video.mp4> -r 1 -f image2 keyframe_%03d.png',
    tags: ['Frame Extraction', 'Audio Spectral', 'CLI Master'],
    pricing: 'Open Source',
    authRequired: false
  },

  // ==========================================
  // 10. Geolocation, Satellite & Earth Observation
  // ==========================================
  {
    id: 'google-earth',
    name: 'Google Earth & Web',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Global 3D virtual globe rendering high-resolution satellite imagery, 3D terrain, historical aerial imagery, and street view.',
    url: 'https://earth.google.com/web/',
    tags: ['3D Globe', 'Historical Imagery', 'Photogrammetry'],
    pricing: 'Free',
    authRequired: false,
    badge: '3D Globe'
  },
  {
    id: 'sentinel-hub',
    name: 'Sentinel Hub / EO Browser',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Explore satellite data from Copernicus Sentinel-1/2/3, Landsat, MODIS with infrared, NDVI, and thermal bands.',
    url: 'https://apps.sentinel-hub.com/eo-browser/',
    tags: ['Copernicus', 'Multi-Spectral', 'Near Real-time'],
    pricing: 'Freemium',
    authRequired: false,
    badge: 'Multi-Spectral Satellite'
  },
  {
    id: 'nasa-worldview',
    name: 'NASA Worldview',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Interactive browsing of global, full-resolution satellite imagery showing wildfires, dust storms, ice caps, and thermal spots.',
    url: 'https://worldview.earthdata.nasa.gov',
    tags: ['NASA Imagery', 'Wildfires', 'Thermal Hotspots'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'nasa-firms',
    name: 'NASA FIRMS (Fire Information for Resource Management)',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Near real-time active fire data from MODIS and VIIRS satellites pinpointing thermal anomalies across the globe within 3 hours.',
    url: 'https://firms.modaps.eosdis.nasa.gov',
    tags: ['Active Fires', 'Thermal Anomalies', 'Near Real-Time'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'planet-explorer',
    name: 'Planet Explorer',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Daily high-resolution 3m multispectral satellite imagery monitoring global changes on an everyday cadence.',
    url: 'https://www.planet.com/explorer/',
    tags: ['Daily PlanetScope', '3m Resolution', 'Constellation'],
    pricing: 'Commercial',
    authRequired: true
  },
  {
    id: 'zoom-earth',
    name: 'Zoom Earth Live Satellite',
    category: 'Satellite & Earth Observation',
    categorySlug: 'satellite',
    description: 'Live interactive weather map and satellite imagery updated every 10 minutes from NOAA GOES and Himawari.',
    url: 'https://zoom.earth',
    tags: ['Live Weather', 'Storm Tracking', '10min Updates'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'flightradar24',
    name: 'Flightradar24 Live ADS-B',
    category: 'Flight & Maritime Tracking',
    categorySlug: 'aviation_maritime',
    description: 'Real-time global flight tracker showing live air traffic, tail numbers, altitudes, and historical flight playback.',
    url: 'https://www.flightradar24.com',
    tags: ['Live Air Traffic', 'Tail Numbers', 'ADS-B Network'],
    pricing: 'Freemium',
    authRequired: false,
    badge: 'Aviation Standard'
  },
  {
    id: 'adsb-exchange',
    name: 'ADS-B Exchange (Unfiltered Flight Tracker)',
    category: 'Flight & Maritime Tracking',
    categorySlug: 'aviation_maritime',
    description: 'Co-op unfiltered ADS-B tracker tracking military, government, VIP, and private aircraft with zero censorship or blocking.',
    url: 'https://globe.adsbexchange.com',
    tags: ['Unfiltered ADS-B', 'Military Tracking', 'Zero Censorship'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Military & Gov Tracking'
  },
  {
    id: 'marinetraffic',
    name: 'MarineTraffic Live AIS',
    category: 'Flight & Maritime Tracking',
    categorySlug: 'aviation_maritime',
    description: 'Real-time global tracking of ships, yachts, cargo vessels, and ports using terrestrial and satellite AIS networks.',
    url: 'https://www.marinetraffic.com',
    tags: ['Vessel Tracking', 'Ship AIS', 'Port Traffic'],
    pricing: 'Freemium',
    authRequired: false,
    badge: 'Maritime Standard'
  },
  {
    id: 'vesselfinder',
    name: 'VesselFinder',
    category: 'Flight & Maritime Tracking',
    categorySlug: 'aviation_maritime',
    description: 'Free vessel tracking and port call database monitoring positions of over 300,000 ships worldwide daily.',
    url: 'https://www.vesselfinder.com',
    tags: ['Vessel Calls', 'Port Schedules', 'Free AIS'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'suncalc',
    name: 'SunCalc (Solar Angles & Shadow Calculator)',
    category: 'Chrono & Sun Calculations',
    categorySlug: 'chronolocation',
    description: 'Calculates sun movement, solar angles, sunlight phases, and shadow lengths for any coordinate at any exact timestamp.',
    url: 'https://www.suncalc.org',
    tags: ['Shadow Lengths', 'Solar Altitude', 'Chronolocation'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Chronolocation Master'
  },
  {
    id: 'what3words',
    name: 'What3Words',
    category: 'Geolocation & Maps',
    categorySlug: 'geolocation',
    description: 'Divides the entire planet into a grid of 3m x 3m squares, assigning each square a unique combination of 3 words.',
    url: 'https://what3words.com',
    tags: ['3m Grid', '3-Word Address', 'Precise Location'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'geospy',
    name: 'GeoSpy AI Geolocation',
    category: 'Geolocation & Maps',
    categorySlug: 'geolocation',
    description: 'AI-powered image geolocation predicting coordinates from landscape, architectural, vegetation, and lighting cues.',
    url: 'https://geospy.ai',
    tags: ['AI Geolocation', 'Visual Clues', 'Coordinate Estimation'],
    pricing: 'Freemium',
    authRequired: false
  },

  // ==========================================
  // 11. Metadata, Forensics & Steganography
  // ==========================================
  {
    id: 'exiftool',
    name: 'ExifTool by Phil Harvey',
    category: 'Metadata, Files & Stego',
    categorySlug: 'metadata',
    description: 'The definitive command-line application for reading, writing, and modifying metadata in images, audio, video, and PDFs.',
    url: 'https://exiftool.org',
    cliCommand: 'exiftool -a -u -g1 <target_file.jpg>',
    tags: ['EXIF Reader', 'File Forensics', 'Definitive Standard'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Forensic Gold Standard'
  },
  {
    id: 'binwalk',
    name: 'Binwalk Firmware & Binary Carving',
    category: 'Metadata, Files & Stego',
    categorySlug: 'metadata',
    description: 'Fast, easy to use tool for analyzing, reverse engineering, and extracting firmware images and embedded file systems.',
    url: 'https://github.com/ReFirmLabs/binwalk',
    cliCommand: 'binwalk -e -M <firmware_or_image>',
    tags: ['Firmware Carving', 'Embedded Files', 'Reverse Engineering'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'stegseek',
    name: 'StegSeek (Lightning Fast Steghide Cracker)',
    category: 'Metadata, Files & Stego',
    categorySlug: 'metadata',
    description: 'The world\'s fastest steghide cracker, capable of cracking passwords for hidden steganographic data in milliseconds.',
    url: 'https://github.com/RickdeJager/stegseek',
    cliCommand: 'stegseek <stego.jpg> rockyou.txt',
    tags: ['Steg Cracking', 'Steganography', 'Wordlist Attack'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'cyberchef',
    name: 'CyberChef (The Cyber Swiss Army Knife)',
    category: 'Metadata, Files & Stego',
    categorySlug: 'metadata',
    description: 'GCHQ\'s web app for encryption, encoding, compression, hashing, hex dumping, and data parsing operations.',
    url: 'https://gchq.github.io/CyberChef/',
    tags: ['GCHQ Tool', 'Encoding/Decoding', 'Hex Dumps', 'Crypto'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Swiss Army Knife'
  },

  // ==========================================
  // 12. Threat Intelligence, Sandboxes & IOCs
  // ==========================================
  {
    id: 'virustotal',
    name: 'VirusTotal',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Analyze suspicious files, domains, IPs, and URLs with 70+ antivirus engines and sandbox analyzers.',
    url: 'https://www.virustotal.com',
    tags: ['Malware Sandbox', '70+ Antivirus Engines', 'IOCs'],
    pricing: 'Freemium',
    authRequired: false,
    badge: 'Malware Standard'
  },
  {
    id: 'any-run',
    name: 'ANY.RUN Interactive Malware Sandbox',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Interactive cloud sandbox analyzing dynamic malware behavior, network traffic, process trees, and registry modifications in real time.',
    url: 'https://any.run',
    tags: ['Interactive Sandbox', 'Process Trees', 'Dynamic Analysis'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Interactive Sandbox'
  },
  {
    id: 'hybrid-analysis',
    name: 'Hybrid Analysis (CrowdStrike Falcon)',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Free automated malware analysis service powered by Payload Security and Falcon Sandbox technology.',
    url: 'https://www.hybrid-analysis.com',
    tags: ['Falcon Sandbox', 'Memory Dumps', 'Threat Scores'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'abuseipdb',
    name: 'AbuseIPDB',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'IP address abuse database to check and report malicious IPs involved in spamming, hacking attempts, and DDoS.',
    url: 'https://www.abuseipdb.com',
    tags: ['IP Reputation', 'Malicious Reports', 'Blacklist'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'urlhaus',
    name: 'URLhaus by abuse.ch',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Community-driven project sharing malicious URLs that are actively used for malware distribution.',
    url: 'https://urlhaus.abuse.ch',
    tags: ['Malware URLs', 'Abuse.ch', 'Threat Feeds'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'threatfox',
    name: 'ThreatFox by abuse.ch',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Free platform to share indicators of compromise (IOCs) with the security community (IP:port, domain, payload hashes).',
    url: 'https://threatfox.abuse.ch',
    tags: ['IOC Database', 'C2 Servers', 'Payload Hashes'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'misp',
    name: 'MISP Open Source Threat Sharing',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Threat intelligence platform for gathering, sharing, storing and correlating Indicators of Compromise.',
    url: 'https://www.misp-project.org',
    tags: ['Threat Sharing', 'IOC Correlation', 'OpenCTI Integration'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'mitre-attack',
    name: 'MITRE ATT&CK Matrix',
    category: 'Threat Intel & Sandboxes',
    categorySlug: 'threat_intel',
    description: 'Globally-accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations.',
    url: 'https://attack.mitre.org',
    tags: ['TTP Matrix', 'Adversary Tactics', 'Security Standard'],
    pricing: 'Free',
    authRequired: false,
    badge: 'Industry TTPs'
  },

  // ==========================================
  // 13. Corporate, Business & Offshore Leaks
  // ==========================================
  {
    id: 'opencorporates',
    name: 'OpenCorporates',
    category: 'Company & Corporate Registries',
    categorySlug: 'companies',
    description: 'The largest open database of companies in the world containing over 200 million corporate entities across global jurisdictions.',
    url: 'https://opencorporates.com',
    tags: ['Company Registry', 'Global Entities', 'Shareholders'],
    pricing: 'Free',
    authRequired: false,
    badge: '200M+ Companies'
  },
  {
    id: 'sec-edgar',
    name: 'SEC EDGAR Database',
    category: 'Company & Corporate Registries',
    categorySlug: 'companies',
    description: 'Official US Securities and Exchange Commission filing archive (10-K, 10-Q, 8-K, insider transactions, proxy statements).',
    url: 'https://www.sec.gov/edgar/searchedgar/companysearch',
    tags: ['SEC Filings', 'Corporate Disclosures', 'Executive Stock'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'icij-offshore',
    name: 'ICIJ Offshore Leaks Database',
    category: 'Company & Corporate Registries',
    categorySlug: 'companies',
    description: 'Search 810,000+ offshore entities from the Panama Papers, Paradise Papers, Pandora Papers, and Bahamas Leaks.',
    url: 'https://offshoreleaks.icij.org',
    tags: ['Panama Papers', 'Pandora Papers', 'Offshore Networks'],
    pricing: 'Free',
    authRequired: false,
    badge: 'ICIJ Leaks'
  },
  {
    id: 'occrp-aleph',
    name: 'OCCRP Aleph Investigation Data',
    category: 'Company & Corporate Registries',
    categorySlug: 'companies',
    description: 'Global database of public records, leaks, court documents, and company registries curated for investigative reporters.',
    url: 'https://aleph.occrp.org',
    tags: ['Investigative Archive', 'Court Records', 'Cross-Border Leaks'],
    pricing: 'Free',
    authRequired: false
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase Enterprise Data',
    category: 'Company & Corporate Registries',
    categorySlug: 'companies',
    description: 'Leading database of business information, venture capital funding rounds, founders, leadership, and M&A deals.',
    url: 'https://www.crunchbase.com',
    tags: ['Venture Capital', 'Startups', 'Funding Rounds'],
    pricing: 'Freemium',
    authRequired: true
  },

  // ==========================================
  // 14. Link Analysis, Graph Systems & Frameworks
  // ==========================================
  {
    id: 'maltego',
    name: 'Maltego CE / Pro',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Comprehensive software for open-source intelligence and forensics that renders entity relationship graphs with transforms.',
    url: 'https://www.maltego.com',
    tags: ['Node Graph', 'Transforms', 'Link Analysis'],
    pricing: 'Freemium',
    authRequired: true,
    badge: 'Link Analysis Titan'
  },
  {
    id: 'spiderfoot',
    name: 'SpiderFoot OSINT Automation',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Open source intelligence automation tool integrating with over 200 data sources to map digital assets and footprints.',
    url: 'https://www.spiderfoot.net',
    cliCommand: 'sf.py -l 127.0.0.1:5001',
    tags: ['Automation', '200+ Modules', 'Attack Surface'],
    pricing: 'Open Source',
    authRequired: false,
    badge: 'Automation Powerhouse'
  },
  {
    id: 'gephi',
    name: 'Gephi Graph Visualization',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'The leading visualization and exploration software for all kinds of graphs and networks (social, infrastructure, financial).',
    url: 'https://gephi.org',
    tags: ['Graph Layouts', 'Community Detection', 'Network Analysis'],
    pricing: 'Open Source',
    authRequired: false
  },
  {
    id: 'neo4j',
    name: 'Neo4j Graph Database',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Enterprise native graph database powering complex entity relationships, Cypher queries, and graph data science.',
    url: 'https://neo4j.com',
    tags: ['Graph Database', 'Cypher Query', 'Entity Relationships'],
    pricing: 'Freemium',
    authRequired: false
  },
  {
    id: 'hunchly',
    name: 'Hunchly (The OSINT Web Capture Tool)',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Automatically captures, hashes, and organizes every web page you visit during an investigation for court-ready evidence.',
    url: 'https://www.hunch.ly',
    tags: ['Evidence Locker', 'Hash Proof', 'Court Ready'],
    pricing: 'Commercial',
    authRequired: true,
    badge: 'Court-Ready Evidence'
  },
  {
    id: 'i2-analysts-notebook',
    name: 'IBM i2 Analyst\'s Notebook',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Industry-standard visual analysis environment utilized by law enforcement and intelligence agencies globally.',
    url: 'https://i2group.com/analysts-notebook',
    tags: ['Law Enforcement', 'Visual Link Analysis', 'Enterprise Recon'],
    pricing: 'Commercial',
    authRequired: true,
    badge: 'Gov/Defense Standard'
  },
  {
    id: 'palantir-gotham',
    name: 'Palantir Gotham / Foundry',
    category: 'Link Analysis & Investigation',
    categorySlug: 'link_analysis',
    description: 'Enterprise intelligence platform integrating structured and unstructured data to provide semantic graph operations.',
    url: 'https://www.palantir.com/platforms/gotham/',
    tags: ['Semantic Graph', 'Defense Intel', 'Multi-Source Fusion'],
    pricing: 'Commercial',
    authRequired: true
  }
];
