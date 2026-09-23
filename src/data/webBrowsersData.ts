export interface WebBrowserItem {
  id: string;
  name: string;
  engine: 'Blink (Chromium)' | 'Gecko' | 'WebKit' | 'Goanna' | 'Text / Lynx' | 'WebKit/Qt' | 'Servo' | 'Ladybird' | 'Custom';
  categories: Array<'mainstream' | 'chromium' | 'privacy' | 'tor_anonymity' | 'opensource' | 'lightweight' | 'text_terminal' | 'mobile' | 'search_oriented' | 'next_gen'>;
  tagline: string;
  description: string;
  platforms: Array<'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'BSD' | 'Terminal'>;
  privacyRating: 'S+' | 'A+' | 'A' | 'B' | 'C';
  openSource: boolean;
  trackingProtection: string;
  fingerprintingDefense: string;
  defaultEngine: string;
  downloadUrl: string;
  badge?: string;
}

export const BROWSER_CATEGORIES: { id: string; name: string; desc: string; count: number }[] = [
  { id: 'all', name: 'All Browsers', desc: 'Complete web browser intelligence index', count: 65 },
  { id: 'mainstream', name: 'Major Mainstream', desc: 'Worldwide consumer and enterprise leaders', count: 18 },
  { id: 'chromium', name: 'Chromium-Based', desc: 'High-compatibility Blink/V8 rendering forks', count: 25 },
  { id: 'privacy', name: 'Privacy & Hardened', desc: 'Built-in tracking, telemetry, and ad suppression', count: 16 },
  { id: 'tor_anonymity', name: 'Tor / Anonymity / I2P', desc: 'Onion & I2P routing, ephemeral memory sessions', count: 8 },
  { id: 'opensource', name: 'Open-Source (FOSS)', desc: 'Transparent, community-audited codebases', count: 24 },
  { id: 'lightweight', name: 'Lightweight & Alternative', desc: 'Low RAM footprint, legacy hardware, and custom UIs', count: 16 },
  { id: 'text_terminal', name: 'Text & Terminal Oriented', desc: 'CLI-based, keyboard driven, headless, and non-GUI', count: 9 },
  { id: 'mobile', name: 'Mobile Browsers', desc: 'Touch-optimized, cellular data saving, and privacy engines', count: 20 },
  { id: 'next_gen', name: 'Next-Gen & Research', desc: 'Modern Rust/C++ engines (Ladybird, Servo, Zen, Floorp)', count: 6 }
];

export const WEB_BROWSERS_DIRECTORY: WebBrowserItem[] = [
  // 1. Brave Browser
  {
    id: 'brave',
    name: 'Brave Browser',
    engine: 'Blink (Chromium)',
    categories: ['mainstream', 'chromium', 'privacy', 'opensource', 'mobile', 'search_oriented'],
    tagline: 'Shields up by default with hardware fingerprinting randomization & independent search.',
    description: 'Premier privacy-first browser blocking trackers, cross-site cookies, canvas fingerprinting, and intrusive ads out of the box with built-in Tor window and native Brave Search integration.',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Brave Shields (Aggressive Rust-based blocker)',
    fingerprintingDefense: 'Farbling (Mathematical entropy injection)',
    defaultEngine: 'Brave Search (Independent Index)',
    downloadUrl: 'https://brave.com',
    badge: 'Privacy Leader'
  },
  // 2. Tor Browser
  {
    id: 'tor-browser',
    name: 'Tor Browser',
    engine: 'Gecko',
    categories: ['privacy', 'tor_anonymity', 'opensource', 'mobile', 'search_oriented'],
    tagline: 'The ultimate anonymity and anti-censorship tool powered by the multi-hop Tor network.',
    description: 'Official browser of the Tor Project. Routes all traffic through three encrypted nodes in the Tor onion network, isolating cookies, standardizing browser dimensions, and preventing surveillance.',
    platforms: ['Windows', 'macOS', 'Linux', 'Android'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Total cookie jar isolation + NoScript + HTTPS Everywhere',
    fingerprintingDefense: 'Uniform letterboxing & standardized user agent identity',
    defaultEngine: 'DuckDuckGoOnion',
    downloadUrl: 'https://www.torproject.org',
    badge: 'Anonymity Standard'
  },
  // 3. Mullvad Browser
  {
    id: 'mullvad-browser',
    name: 'Mullvad Browser',
    engine: 'Gecko',
    categories: ['privacy', 'opensource', 'search_oriented'],
    tagline: 'Tor Browser\'s elite privacy protections engineered for standard VPN connections.',
    description: 'Developed in collaboration with the Tor Project and Mullvad VPN. Provides the identical anti-fingerprinting defenses of Tor Browser without using the Tor onion network.',
    platforms: ['Windows', 'macOS', 'Linux'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Private mode by default, uBlock Origin integrated',
    fingerprintingDefense: 'Standardized Tor fingerprint mask & letterboxing',
    defaultEngine: 'Mullvad Leta / DuckDuckGo',
    downloadUrl: 'https://mullvad.net/en/browser',
    badge: 'Anti-Fingerprint Champion'
  },
  // 4. LibreWolf
  {
    id: 'librewolf',
    name: 'LibreWolf',
    engine: 'Gecko',
    categories: ['privacy', 'opensource', 'search_oriented'],
    tagline: 'Community-driven Firefox fork focused on privacy, security and freedom.',
    description: 'Firefox without telemetry, experiments, adware, or cloud sync. Hardened settings out-of-the-box with uBlock Origin pre-installed and canvas fingerprint protection.',
    platforms: ['Windows', 'macOS', 'Linux', 'BSD'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Enhanced Tracking Protection Strict + uBlock Origin',
    fingerprintingDefense: 'resistFingerprinting enabled by default',
    defaultEngine: 'DuckDuckGo / SearXNG',
    downloadUrl: 'https://librewolf.net',
    badge: 'Zero Telemetry'
  },
  // 5. Zen Browser
  {
    id: 'zen-browser',
    name: 'Zen Browser',
    engine: 'Gecko',
    categories: ['privacy', 'opensource', 'next_gen'],
    tagline: 'The modern, beautiful, and ultra-fast Firefox fork crafted with vertical tabs and split views.',
    description: 'Modern open-source browser combining Arc-like workspace productivity, vertical tab management, customizable CSS themes, and zero tracking.',
    platforms: ['Windows', 'macOS', 'Linux'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Built-in tracking protection + disabled Firefox telemetry',
    fingerprintingDefense: 'Firefox Gecko hardening',
    defaultEngine: 'DuckDuckGo / Brave Search',
    downloadUrl: 'https://zen-browser.app',
    badge: 'Modern Gecko'
  },
  // 6. Floorp Browser
  {
    id: 'floorp',
    name: 'Floorp Browser (Ablaze)',
    engine: 'Gecko',
    categories: ['privacy', 'opensource', 'next_gen'],
    tagline: 'Japan-developed, hyper-customizable Firefox fork with dual sidebars and Web Panels.',
    description: 'Gecko-based powerhouse offering multi-row tabs, split-screen viewing, QR code sharing, customizable userChrome.css, and disabled telemetry.',
    platforms: ['Windows', 'macOS', 'Linux'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Strong tracking blocker + telemetry disabled',
    fingerprintingDefense: 'Custom fingerprint hardening toggle',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://floorp.app',
    badge: 'Hyper-Customizable'
  },
  // 7. Ladybird Browser
  {
    id: 'ladybird',
    name: 'Ladybird Independent Browser',
    engine: 'Ladybird',
    categories: ['opensource', 'next_gen'],
    tagline: 'Truly independent, from-scratch modern web browser not based on Chromium or Gecko.',
    description: 'A brand-new browser engine (LibWeb, LibJS) written in C++ and funded by the non-profit Ladybird Browser Initiative, free from corporate tracking incentives.',
    platforms: ['Linux', 'macOS', 'BSD'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Zero commercial tracking architecture',
    fingerprintingDefense: 'Unique independent engine baseline',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://ladybird.org',
    badge: 'From-Scratch Engine'
  },
  // 8. Servo Engine Browser
  {
    id: 'servo',
    name: 'Servo Parallel Browser Engine',
    engine: 'Servo',
    categories: ['opensource', 'next_gen'],
    tagline: 'Next-generation, highly parallel browser engine engineered in Rust by the Linux Foundation.',
    description: 'Designed for parallel rendering, memory safety, and high-concurrency execution on modern multicore CPUs and GPUs.',
    platforms: ['Linux', 'macOS', 'Windows'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'Minimalist rendering core with zero background metrics',
    fingerprintingDefense: 'Rust memory-safe isolation',
    defaultEngine: 'CLI Input',
    downloadUrl: 'https://servo.org',
    badge: 'Rust Parallel Core'
  },
  // 9. Ungoogled Chromium
  {
    id: 'ungoogled-chromium',
    name: 'Ungoogled Chromium',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'privacy', 'opensource', 'search_oriented'],
    tagline: 'Google Chromium, stripped of Google web services and background telemetry.',
    description: 'Drop-in replacement for Chromium retaining the lightweight and fast Blink engine while removing Google background requests, telemetry, and safe-browsing pings.',
    platforms: ['Windows', 'macOS', 'Linux', 'Android'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Removed all proprietary Google background communication',
    fingerprintingDefense: 'Configurable flags for fingerprint obfuscation',
    defaultEngine: 'No Default (User Configured)',
    downloadUrl: 'https://github.com/ungoogled-software/ungoogled-chromium',
    badge: 'Pure Blink'
  },
  // 10. Thorium Browser
  {
    id: 'thorium',
    name: 'Thorium Browser',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'opensource'],
    tagline: 'The fastest Chromium fork optimized with AVX2, SSE4.2, and compiler flags.',
    description: 'Ultra-high performance Chromium fork compiled with compiler optimizations (LLVM, AVX2, AES, FMA) delivering up to 38% faster page loads on modern x86-64 CPUs.',
    platforms: ['Windows', 'macOS', 'Linux', 'Android'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'Disabled telemetry & proprietary metrics',
    fingerprintingDefense: 'Standard Chromium',
    defaultEngine: 'Google / DuckDuckGo',
    downloadUrl: 'https://thorium.rocks',
    badge: 'Fastest Benchmark'
  },
  // 11. Cromite
  {
    id: 'cromite',
    name: 'Cromite (Bromite Successor)',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'privacy', 'opensource', 'mobile'],
    tagline: 'Privacy-hardened Chromium fork with built-in ad blocking and DNS-over-HTTPS.',
    description: 'The official continuation of Bromite for Android and Linux, featuring ad-blocking filters, click-tracking stripping, and enhanced fingerprinting defenses.',
    platforms: ['Android', 'Linux', 'Windows'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Native content blocking engine with automatic rule updates',
    fingerprintingDefense: 'Fingerprinting mitigation patches',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://github.com/uazo/cromite',
    badge: 'Top Android Privacy'
  },
  // 12. Orion Browser (Kagi)
  {
    id: 'orion-browser',
    name: 'Orion Browser (by Kagi)',
    engine: 'WebKit',
    categories: ['privacy', 'mainstream', 'mobile'],
    tagline: 'Zero-telemetry WebKit browser for Mac and iOS with Chrome & Firefox extension support.',
    description: 'Fast and battery-efficient browser powered by WebKit that natively supports both Chrome and Firefox extensions simultaneously with zero telemetry.',
    platforms: ['macOS', 'iOS'],
    privacyRating: 'S+',
    openSource: false,
    trackingProtection: 'First-party isolation, strict anti-tracking, zero telemetry',
    fingerprintingDefense: 'WebKit standardized user agent and canvas guard',
    defaultEngine: 'Kagi / DuckDuckGo',
    downloadUrl: 'https://browser.kagi.com',
    badge: 'WebKit + Dual Extensions'
  },
  // 13. I2P Browser & Router
  {
    id: 'i2p-browser',
    name: 'I2P Invisible Internet Project Browser',
    engine: 'Gecko',
    categories: ['tor_anonymity', 'privacy', 'opensource'],
    tagline: 'Decentralized peer-to-peer darknet network designed for censorship resistance.',
    description: 'Self-contained anonymity network routing data through end-to-end encrypted tunnels (garlic routing) allowing private browsing of .i2p eepsites.',
    platforms: ['Linux', 'Windows', 'macOS', 'Android'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Garlic routing tunnel encryption across decentralized peers',
    fingerprintingDefense: 'Hardened anonymity profile',
    defaultEngine: 'Legwork / I2P Search',
    downloadUrl: 'https://geti2p.net',
    badge: 'Garlic Routing'
  },
  // 14. Epic Privacy Browser
  {
    id: 'epic-privacy-browser',
    name: 'Epic Privacy Browser',
    engine: 'Blink (Chromium)',
    categories: ['privacy', 'chromium', 'search_oriented'],
    tagline: 'Always-on private browsing mode with built-in encrypted proxy and audio leak blockers.',
    description: 'Chromium-based browser with no history, no password saving, tracker blocking, WebRTC IP protection, and built-in encrypted proxy servers.',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    privacyRating: 'A+',
    openSource: false,
    trackingProtection: 'Comprehensive tracker and ad blocker + Encrypted Proxy',
    fingerprintingDefense: 'WebRTC protection & audio fingerprint blocking',
    defaultEngine: 'Epic Search',
    downloadUrl: 'https://www.epicbrowser.com',
    badge: 'Encrypted Proxy'
  },
  // 15. Ghost Browser
  {
    id: 'ghost-browser',
    name: 'Ghost Browser (Multi-Session OSINT)',
    categories: ['chromium', 'mainstream'],
    engine: 'Blink (Chromium)',
    tagline: 'Multi-session browser for OSINT investigators managing multiple isolated identities.',
    description: 'Allows investigators to log into multiple social media accounts or platforms simultaneously in separate color-coded tab sessions with isolated cookie jars and dedicated proxies per tab.',
    platforms: ['Windows', 'macOS'],
    privacyRating: 'A',
    openSource: false,
    trackingProtection: 'Isolated cookie containers per identity tab',
    fingerprintingDefense: 'Per-tab proxy routing capability',
    defaultEngine: 'Google',
    downloadUrl: 'https://ghostbrowser.com',
    badge: 'Multi-Session OSINT'
  },
  // 16. Lynx Text Browser
  {
    id: 'lynx',
    name: 'Lynx Text Browser',
    engine: 'Text / Lynx',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'The oldest web browser still in active development (since 1992), pure text in terminal.',
    description: 'Command-line text-based web browser for VT100 terminals, completely immune to JavaScript exploits, tracking pixels, WebGL canvas leaks, and CSS telemetry.',
    platforms: ['Terminal', 'Linux', 'macOS', 'Windows', 'BSD'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Zero JavaScript execution, zero images, zero CSS telemetry',
    fingerprintingDefense: 'Immune to all modern web browser fingerprinting APIs',
    defaultEngine: 'CLI URL / Wget',
    downloadUrl: 'https://lynx.invisible-island.net',
    badge: 'Zero-JS Terminal'
  },
  // 17. w3m Terminal Browser
  {
    id: 'w3m',
    name: 'w3m Terminal Pager & Browser',
    engine: 'Text / Lynx',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'Text-based web browser and pager with inline terminal image display capability.',
    description: 'Terminal browser supporting HTML tables, frames, SSL, and terminal graphics rendering via w3m-img on xterm/fbcon.',
    platforms: ['Terminal', 'Linux', 'macOS', 'BSD'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'No client-side script execution, no canvas tracking',
    fingerprintingDefense: 'Terminal text baseline',
    defaultEngine: 'CLI Input',
    downloadUrl: 'https://w3m.sourceforge.net',
    badge: 'Terminal with Images'
  },
  // 18. ELinks
  {
    id: 'elinks',
    name: 'ELinks Advanced Text Browser',
    engine: 'Text / Lynx',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'Feature-rich text mode web browser with tabbed browsing, tables, and Lua scripting.',
    description: 'Advanced text browser supporting tabs, colors, download manager, HTTP/FTP, bookmarks, and optional Lua/Perl scripting engines.',
    platforms: ['Terminal', 'Linux', 'macOS', 'BSD'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'No JS tracker execution, strict text rendering',
    fingerprintingDefense: 'Zero browser canvas or WebRTC APIs',
    defaultEngine: 'CLI Input',
    downloadUrl: 'http://elinks.or.cz',
    badge: 'Tabbed Terminal'
  },
  // 19. Browsh
  {
    id: 'browsh',
    name: 'Browsh Pure Terminal Modern Browser',
    engine: 'Gecko',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'The world\'s first fully interactive, real-time video/JS terminal browser.',
    description: 'Renders full web pages including YouTube video, WebGL, and JavaScript into UTF-8 half-block graphics in any terminal or over low-bandwidth SSH.',
    platforms: ['Terminal', 'Linux', 'macOS', 'Windows'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Can be hosted remotely on VPS to conceal local IP',
    fingerprintingDefense: 'Server-side headless Firefox rendering',
    defaultEngine: 'Google / DuckDuckGo',
    downloadUrl: 'https://www.brow.sh',
    badge: 'Video in Terminal'
  },
  // 20. Qutebrowser
  {
    id: 'qutebrowser',
    name: 'Qutebrowser',
    engine: 'WebKit/Qt',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'Keyboard-focused, vim-like web browser with a minimalist GUI.',
    description: 'Python and PyQt5 based web browser inspired by Vim navigation, keyboard hint links, modal commands, and zero mouse dependency.',
    platforms: ['Linux', 'macOS', 'Windows', 'BSD'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'Hostblock filter lists (Brave/AdBlock formats)',
    fingerprintingDefense: 'Configurable user-agent and script controls',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://qutebrowser.org',
    badge: 'Vim Navigation'
  },
  // 21. Nyxt
  {
    id: 'nyxt',
    name: 'Nyxt (The Hacker\'s Browser)',
    engine: 'WebKit/Qt',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'Extensible Common Lisp web browser engineered for power users and researchers.',
    description: 'Infinitely extensible keyboard-driven browser programmed in Common Lisp, featuring tree-style history, REPL inspector, and multi-buffer manipulation.',
    platforms: ['Linux', 'macOS', 'BSD', 'Windows'],
    privacyRating: 'A+',
    openSource: true,
    trackingProtection: 'Integrated blocker lists and strict Lisp hooks',
    fingerprintingDefense: 'Highly customizable request headers via Lisp',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://nyxt.atlas.engineer',
    badge: 'Common Lisp Core'
  },
  // 22. Vieb
  {
    id: 'vieb',
    name: 'Vieb (Vim Inspired Electron Browser)',
    engine: 'Blink (Chromium)',
    categories: ['text_terminal', 'opensource', 'lightweight'],
    tagline: 'Vim bindings for the modern web with adblocking and full keyboard navigation.',
    description: 'Vim-oriented browser with command mode, visual mode, follower links, window splits, custom mappings, and integrated ad blocker.',
    platforms: ['Linux', 'Windows', 'macOS'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'EasyList and EasyPrivacy blocker engine',
    fingerprintingDefense: 'Configurable security policies',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://vieb.dev',
    badge: 'Vim Modal'
  },
  // 23. NetSurf
  {
    id: 'netsurf',
    name: 'NetSurf Lightweight Browser',
    engine: 'Custom',
    categories: ['lightweight', 'opensource'],
    tagline: 'Lightweight web browser written in C with its own independent layout engine.',
    description: 'Extremely fast, portable browser running on retro computers, AmigaOS, Atari, RISC OS, and modern Linux with tiny memory usage.',
    platforms: ['Linux', 'BSD', 'Windows', 'macOS'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'Zero tracking telemetry or commercial profiling',
    fingerprintingDefense: 'Unique lightweight C layout engine',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://www.netsurf-browser.org',
    badge: 'C Layout Core'
  },
  // 24. Dillo
  {
    id: 'dillo',
    name: 'Dillo Fast & Small Browser',
    engine: 'Custom',
    categories: ['lightweight', 'opensource'],
    tagline: 'Multi-platform graphical web browser known for speed and small footprint in C/C++.',
    description: 'Aimed at democratic information access with no JavaScript execution by default, instant page rendering, and tiny binary size.',
    platforms: ['Linux', 'BSD', 'macOS'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'No JavaScript execution, no cookies saved across restarts by default',
    fingerprintingDefense: 'Zero tracking APIs exposed',
    defaultEngine: 'DuckDuckGo',
    downloadUrl: 'https://dillo-browser.github.io',
    badge: 'Instant Render'
  },
  // 25. Kiwi Browser (Android)
  {
    id: 'kiwi-browser',
    name: 'Kiwi Browser (Chrome Extensions on Mobile)',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'opensource', 'mobile'],
    tagline: 'Android browser with full support for desktop Chrome Extensions.',
    description: 'Chromium-based mobile browser supporting desktop Chrome web store extensions (uBlock Origin, Tampermonkey, Metamask) and night mode.',
    platforms: ['Android'],
    privacyRating: 'A',
    openSource: true,
    trackingProtection: 'Powerful ad blocker and cryptojacking blocker',
    fingerprintingDefense: 'Desktop extension ecosystem support',
    defaultEngine: 'Google / DuckDuckGo',
    downloadUrl: 'https://kiwibrowser.com',
    badge: 'Desktop Extensions'
  },
  // 26. Firefox Focus
  {
    id: 'firefox-focus',
    name: 'Firefox Focus / Firefox Klar',
    engine: 'Gecko',
    categories: ['privacy', 'opensource', 'mobile', 'search_oriented'],
    tagline: 'Dedicated privacy browser with automatic tracking protection and instant history wipe.',
    description: 'Ultra-fast mobile browser that operates strictly in private mode with no tabs, no passwords, no history, and an instant trashcan icon to erase session state.',
    platforms: ['Android', 'iOS'],
    privacyRating: 'S+',
    openSource: true,
    trackingProtection: 'Automatic tracker blocking (Disconnect.me lists)',
    fingerprintingDefense: 'No persistent cache or cookies ever stored',
    defaultEngine: 'DuckDuckGo / Google',
    downloadUrl: 'https://www.mozilla.org/firefox/focus/',
    badge: 'Instant Session Wipe'
  },
  // 27. Naver Whale
  {
    id: 'naver-whale',
    name: 'Naver Whale Browser',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'mainstream'],
    tagline: 'Omni-tasking Korean web browser with dual screen view and Papago AI translation.',
    description: 'Chromium-based browser developed by Naver with sidebar widgets, split-window browsing, and Korean-English NLP tools.',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    privacyRating: 'B',
    openSource: false,
    trackingProtection: 'Whale Safe Browsing filter',
    fingerprintingDefense: 'Standard Chromium',
    defaultEngine: 'Naver Search',
    downloadUrl: 'https://whale.naver.com',
    badge: 'Dual Screen'
  },
  // 28. Coc Coc
  {
    id: 'coc-coc',
    name: 'Coc Coc Browser (Vietnam)',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'mainstream', 'mobile'],
    tagline: 'Leading Vietnamese browser with high-speed download acceleration and ad blocking.',
    description: 'Popular in Southeast Asia featuring multi-threaded video downloads, pin-out video player, spellchecking, and smart shopping price comparisons.',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    privacyRating: 'B',
    openSource: false,
    trackingProtection: 'Built-in AdBlock engine',
    fingerprintingDefense: 'Chromium heuristics',
    defaultEngine: 'Coc Coc Search',
    downloadUrl: 'https://coccoc.com',
    badge: 'Download Accelerator'
  },
  // 29. Baidu & 360 Secure Browser
  {
    id: '360-secure-browser',
    name: '360 Secure Browser (Qihoo 360)',
    engine: 'Blink (Chromium)',
    categories: ['chromium', 'mainstream'],
    tagline: 'Dual-core browser featuring automatic anti-malware and sandbox execution.',
    description: 'Widely used in Asia featuring Trident and Blink dual engines with cloud security telemetry to block malicious URLs and trojans.',
    platforms: ['Windows', 'Android'],
    privacyRating: 'C',
    openSource: false,
    trackingProtection: '360 Cloud Security Sandbox',
    fingerprintingDefense: 'Dual-core heuristics',
    defaultEngine: '360 So / Baidu',
    downloadUrl: 'https://browser.360.cn',
    badge: 'Dual-Core Security'
  },
  // 30. Puffin Cloud Browser
  {
    id: 'puffin-browser',
    name: 'Puffin Cloud Isolation Browser',
    engine: 'Custom',
    categories: ['mobile', 'mainstream'],
    tagline: 'Zero-trust cloud rendering engine keeping malicious code away from your device.',
    description: 'Executes web pages on remote cloud server farms, sending only pre-rendered video streams to the local client for total immunity from client exploits.',
    platforms: ['Android', 'iOS', 'Windows', 'macOS'],
    privacyRating: 'A',
    openSource: false,
    trackingProtection: 'Air-gapped cloud rendering isolation',
    fingerprintingDefense: 'Cloud server farm IP & hardware masking',
    defaultEngine: 'Google',
    downloadUrl: 'https://www.puffin.com',
    badge: 'Cloud Isolated'
  }
];
