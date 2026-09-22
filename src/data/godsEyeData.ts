export interface StrategicInstallation {
  id: string;
  name: string;
  category: 'airbase' | 'naval' | 'radar' | 'intelligence' | 'command' | 'spaceport';
  country: string;
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  description: string;
  classification: string;
  activeSensors: string[];
}

export interface AircraftTarget {
  id: string;
  callsign: string;
  operator: string;
  aircraftType: string;
  coordinates: [number, number]; // [lat, lng]
  altitudeFt: number;
  speedKts: number;
  headingDeg: number;
  squawk: string;
  origin: string;
  destination: string;
  category: 'commercial' | 'military' | 'private' | 'recon';
}

export interface MaritimeTarget {
  id: string;
  name: string;
  mmsi: string;
  vesselType: 'cargo' | 'tanker' | 'naval' | 'passenger' | 'patrol';
  flag: string;
  coordinates: [number, number]; // [lat, lng]
  speedKts: number;
  headingDeg: number;
  lengthMeters: number;
  destination: string;
  draftMeters: number;
}

export interface SatelliteTarget {
  id: string;
  name: string;
  noradId: number;
  category: 'space_station' | 'spy_recon' | 'broadband' | 'navigation' | 'weather';
  coordinates: [number, number]; // [lat, lng]
  altitudeKm: number;
  velocityKmS: number;
  inclinationDeg: number;
  periodMinutes: number;
  operator: string;
}

export interface EarthquakeTarget {
  id: string;
  magnitude: number;
  depthKm: number;
  locationName: string;
  coordinates: [number, number]; // [lat, lng]
  timestamp: string;
  alertLevel: 'green' | 'yellow' | 'orange' | 'red';
  tsunami: boolean;
}

export interface SurveillanceCamera {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  streamUrl: string;
  snapshotUrl: string;
  aspectRatio: string;
  type: 'traffic' | 'port' | 'skyline' | 'pedestrian';
  feedType?: 'mp4' | 'm3u8' | 'jpeg';
  provider?: string;
  headingDeg?: number;
  pitchDeg?: number;
  fovDeg?: number;
  rangeM?: number;
  mountHeightM?: number;
}

export interface Tactical3DModel {
  id: string;
  name: string;
  fileName: string;
  path: string;
  fileSize: string;
  category: 'airliner' | 'jet' | 'turboprop' | 'helicopter' | 'drone' | 'trainer' | 'vessel';
  creator: string;
  license: string;
  description: string;
  orientationConvention: string;
}

export interface ThermalHotspot {
  id: string;
  coordinates: [number, number];
  brightTi4: number; // Kelvin
  brightTi5: number; // Kelvin
  frp: number; // Fire Radiative Power (MW)
  confidence: string;
  satellite: string;
  instrument: string;
  acqDate: string;
  acqTime: string;
  dayNight: string;
}

export interface RadioStreamTarget {
  id: string;
  name: string;
  category: 'atc' | 'military' | 'marine' | 'emergency';
  frequency: string;
  location: string;
  streamUrl: string;
  description: string;
}

// Curated Strategic Facilities
export const STRATEGIC_INSTALLATIONS: StrategicInstallation[] = [
  {
    id: 'area-51',
    name: 'Homey Airport / Area 51',
    category: 'intelligence',
    country: 'United States',
    coordinates: [37.2431, -115.7930],
    elevationMeters: 1360,
    description: 'Highly classified United States Air Force facility within the Nevada Test and Training Range.',
    classification: 'TOP SECRET // SCI',
    activeSensors: ['AN/FPS-117 Radar', 'Infrared Perimeter Arrays', 'SATCOM Intercept']
  },
  {
    id: 'pentagon',
    name: 'The Pentagon (DoD HQ)',
    category: 'command',
    country: 'United States',
    coordinates: [38.8719, -77.0563],
    elevationMeters: 12,
    description: 'Headquarters of the United States Department of Defense, Arlington, Virginia.',
    classification: 'NATIONAL COMMAND AUTHORITY',
    activeSensors: ['NMCC Command Uplink', 'Air Defense Shield', 'Secure Fiber Grid']
  },
  {
    id: 'cheyenne-mountain',
    name: 'Cheyenne Mountain Complex (NORAD)',
    category: 'command',
    country: 'United States',
    coordinates: [38.7442, -104.8467],
    elevationMeters: 2135,
    description: 'NORAD and USNORTHCOM Alternate Command Facility built 2,000 feet beneath solid granite.',
    classification: 'CRITICAL DEFENSE INFRASTRUCTURE',
    activeSensors: ['BMEWS Early Warning', 'EMP Hardened Comms', 'Ballistic Trajectory Arrays']
  },
  {
    id: 'pine-gap',
    name: 'Joint Defence Facility Pine Gap',
    category: 'intelligence',
    country: 'Australia / US',
    coordinates: [-23.7989, 133.7372],
    elevationMeters: 585,
    description: 'Signals intelligence satellite ground station operated jointly by Australia and the United States (CIA/NSA).',
    classification: 'FIVE EYES TOP SECRET',
    activeSensors: ['38 Radomes', 'Geostationary SIGINT Downlinks', 'Telemetry Intercept']
  },
  {
    id: 'raf-menwith-hill',
    name: 'RAF Menwith Hill',
    category: 'intelligence',
    country: 'United Kingdom',
    coordinates: [53.9997, -1.6883],
    elevationMeters: 220,
    description: 'Massive satellite communications and intelligence-gathering base operated with the US NSA.',
    classification: 'ECHELON PRIMARY GROUND STATION',
    activeSensors: ['33 Giant Radomes', 'Comint Intercept Matrix', 'Space Comms Array']
  },
  {
    id: 'diego-garcia',
    name: 'Camp Thunder Cove (Diego Garcia)',
    category: 'naval',
    country: 'BIOT / US Navy',
    coordinates: [-7.3195, 72.4228],
    elevationMeters: 3,
    description: 'Strategic military naval and bomber support installation situated in the central Indian Ocean.',
    classification: 'EXPEDITIONARY FLEET STRIKE',
    activeSensors: ['GEODSS Optical Space Track', 'Deepwater Submarine Berth', 'B-2 Bomber Shelters']
  },
  {
    id: 'taipei-101',
    name: 'Taipei 101 & Taiwan Strategic Strait Hub',
    category: 'radar',
    country: 'Taiwan',
    coordinates: [25.0339, 121.5645],
    elevationMeters: 508,
    description: 'Key strategic observation node overlooking the Northern Taiwan Strait maritime corridor.',
    classification: 'STRATEGIC SURVEILLANCE SECTOR',
    activeSensors: ['Leshan PAVE PAWS Radar Node', 'Coastal Maritime AIS', 'Early Warning Comms']
  },
  {
    id: 'strait-of-hormuz',
    name: 'Strait of Hormuz Naval Chokepoint',
    category: 'naval',
    country: 'Oman / Iran Corridor',
    coordinates: [26.5667, 56.2500],
    elevationMeters: 0,
    description: 'World’s most critical petroleum transit chokepoint through which ~21% of global petroleum consumption passes.',
    classification: 'MARITIME CHOKEPOINT PRIORITY 1',
    activeSensors: ['Surface Search Radar', 'AIS Vessel Trackers', 'Sub-Surface Sonar Buoys']
  }
];

// Live Simulated & Real Flights
export const INITIAL_AIRCRAFT: AircraftTarget[] = [
  {
    id: 'AF-882',
    callsign: 'AFR882',
    operator: 'Air France',
    aircraftType: 'Boeing 777-328(ER)',
    coordinates: [48.8566, 2.3522],
    altitudeFt: 34000,
    speedKts: 485,
    headingDeg: 284,
    squawk: '7104',
    origin: 'CDG (Paris)',
    destination: 'JFK (New York)',
    category: 'commercial'
  },
  {
    id: 'USAF-REAPER-01',
    callsign: 'VIPER11',
    operator: 'USAF 432nd Wing',
    aircraftType: 'General Atomics MQ-9A Reaper',
    coordinates: [36.2333, -115.0342],
    altitudeFt: 22500,
    speedKts: 180,
    headingDeg: 145,
    squawk: '1200',
    origin: 'Creech AFB',
    destination: 'Nevada Test Range (Orbit)',
    category: 'recon'
  },
  {
    id: 'BAW-178',
    callsign: 'BAW178',
    operator: 'British Airways',
    aircraftType: 'Airbus A350-1041',
    coordinates: [51.5074, -0.1278],
    altitudeFt: 38000,
    speedKts: 512,
    headingDeg: 260,
    squawk: '4221',
    origin: 'LHR (London)',
    destination: 'LAX (Los Angeles)',
    category: 'commercial'
  },
  {
    id: 'VIP-G650',
    callsign: 'N777GL',
    operator: 'Executive Air Fleet',
    aircraftType: 'Gulfstream G650ER',
    coordinates: [40.7128, -74.0060],
    altitudeFt: 43000,
    speedKts: 540,
    headingDeg: 62,
    squawk: '2350',
    origin: 'TEB (Teterboro)',
    destination: 'GVA (Geneva)',
    category: 'private'
  },
  {
    id: 'USAF-C17',
    callsign: 'RCH441',
    operator: 'US Air Mobility Command',
    aircraftType: 'Boeing C-17A Globemaster III',
    coordinates: [35.6762, 139.6503],
    altitudeFt: 31000,
    speedKts: 450,
    headingDeg: 190,
    squawk: '6211',
    origin: 'Yokota AB (Japan)',
    destination: 'Kadena AB (Okinawa)',
    category: 'military'
  },
  {
    id: 'UAE-001',
    callsign: 'UAE001',
    operator: 'Emirates',
    aircraftType: 'Airbus A380-842',
    coordinates: [25.2048, 55.2708],
    altitudeFt: 29000,
    speedKts: 495,
    headingDeg: 310,
    squawk: '3514',
    origin: 'DXB (Dubai)',
    destination: 'LHR (London Heathrow)',
    category: 'commercial'
  }
];

// Live Maritime Vessels
export const INITIAL_VESSELS: MaritimeTarget[] = [
  {
    id: 'EVER-GIVEN-CLASS',
    name: 'EVER ART (Ultra Large Container)',
    mmsi: '352001258',
    vesselType: 'cargo',
    flag: 'Panama',
    coordinates: [29.9792, 32.5599], // Suez corridor
    speedKts: 14.8,
    headingDeg: 348,
    lengthMeters: 400,
    destination: 'Rotterdam Port',
    draftMeters: 16.2
  },
  {
    id: 'USS-GERALD-FORD',
    name: 'USS Gerald R. Ford (CVN-78)',
    mmsi: '368999001',
    vesselType: 'naval',
    flag: 'United States',
    coordinates: [35.5000, 18.2000], // Mediterranean Sea
    speedKts: 26.4,
    headingDeg: 110,
    lengthMeters: 337,
    destination: 'Patrol Sector Foxtrot',
    draftMeters: 12.0
  },
  {
    id: 'TI-OCEANIA',
    name: 'TI OCEANIA (Ultra Large Crude Carrier)',
    mmsi: '538001614',
    vesselType: 'tanker',
    flag: 'Marshall Islands',
    coordinates: [26.2000, 56.4000], // Strait of Hormuz
    speedKts: 11.2,
    headingDeg: 195,
    lengthMeters: 380,
    destination: 'Singapore Anchorage',
    draftMeters: 24.5
  },
  {
    id: 'BERGE-BULKER',
    name: 'BERGE EVEREST (Valemax Ore Carrier)',
    mmsi: '235088451',
    vesselType: 'cargo',
    flag: 'United Kingdom',
    coordinates: [-12.0000, 45.0000], // Indian Ocean
    speedKts: 13.5,
    headingDeg: 65,
    lengthMeters: 361,
    destination: 'Qingdao Port',
    draftMeters: 23.0
  }
];

// Live Satellites with Orbit Specifications
export const SATELLITE_CONSTELLATIONS: SatelliteTarget[] = [
  {
    id: 'ISS-ZARYA',
    name: 'ISS (International Space Station)',
    noradId: 25544,
    category: 'space_station',
    coordinates: [18.4201, -44.2981],
    altitudeKm: 418.5,
    velocityKmS: 7.66,
    inclinationDeg: 51.64,
    periodMinutes: 92.9,
    operator: 'NASA / ESA / JAXA / CSA / Roscosmos'
  },
  {
    id: 'STARLINK-G7-1',
    name: 'STARLINK-31048 (Direct-to-Cell V2)',
    noradId: 58821,
    category: 'broadband',
    coordinates: [42.1120, -78.4321],
    altitudeKm: 550.2,
    velocityKmS: 7.58,
    inclinationDeg: 53.05,
    periodMinutes: 95.2,
    operator: 'SpaceX'
  },
  {
    id: 'USA-290-KEYHOLE',
    name: 'USA-290 (KH-11 KENNEN Block IV Recon)',
    noradId: 43941,
    category: 'spy_recon',
    coordinates: [37.1120, 126.9800],
    altitudeKm: 395.0,
    velocityKmS: 7.71,
    inclinationDeg: 97.9,
    periodMinutes: 91.8,
    operator: 'National Reconnaissance Office (NRO)'
  },
  {
    id: 'TIANHE-CSS',
    name: 'Tiangong Space Station (CSS)',
    noradId: 48274,
    category: 'space_station',
    coordinates: [-22.4000, 115.6000],
    altitudeKm: 388.0,
    velocityKmS: 7.68,
    inclinationDeg: 41.47,
    periodMinutes: 92.3,
    operator: 'China Manned Space Agency (CMSA)'
  },
  {
    id: 'NOAA-20',
    name: 'NOAA-20 / JPSS-1 (VIIRS Thermal Scanner)',
    noradId: 43013,
    category: 'weather',
    coordinates: [64.2000, -21.9000],
    altitudeKm: 824.0,
    velocityKmS: 7.43,
    inclinationDeg: 98.7,
    periodMinutes: 101.4,
    operator: 'NOAA / NASA EOSDIS'
  }
];

// Real-time Global Earthquakes
export const INITIAL_EARTHQUAKES: EarthquakeTarget[] = [
  {
    id: 'us7000nvl1',
    magnitude: 6.4,
    depthKm: 28.5,
    locationName: 'Near Coast of Northern Honshu, Japan',
    coordinates: [38.4500, 142.1000],
    timestamp: '14 min ago',
    alertLevel: 'yellow',
    tsunami: false
  },
  {
    id: 'us7000nvl2',
    magnitude: 5.8,
    depthKm: 12.0,
    locationName: 'Mindanao, Philippines',
    coordinates: [7.9800, 126.1500],
    timestamp: '42 min ago',
    alertLevel: 'green',
    tsunami: false
  },
  {
    id: 'us7000nvl3',
    magnitude: 7.1,
    depthKm: 10.0,
    locationName: 'Tonga Trench Marine Corridor',
    coordinates: [-21.2000, -174.5000],
    timestamp: '2 hours ago',
    alertLevel: 'orange',
    tsunami: true
  },
  {
    id: 'us7000nvl4',
    magnitude: 4.9,
    depthKm: 8.2,
    locationName: 'Ridgecrest Fault Zone, California',
    coordinates: [35.7500, -117.5800],
    timestamp: '3 hours ago',
    alertLevel: 'green',
    tsunami: false
  }
];

// Live Public CCTV & Recon Surveillance Cameras
export const SURVEILLANCE_CAMERAS: SurveillanceCamera[] = [
  {
    id: 'tokyo-shinjuku-east-1',
    name: 'Shinjuku Crossing East Cam',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [35.689614, 139.700523],
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    snapshotUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'pedestrian',
    feedType: 'mp4',
    provider: 'Pilot Feed Pack',
    headingDeg: 242,
    pitchDeg: -19,
    fovDeg: 66,
    rangeM: 560,
    mountHeightM: 29
  },
  {
    id: 'tokyo-shinjuku-west-2',
    name: 'Shinjuku Station West Cam',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [35.690976, 139.699237],
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    snapshotUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'traffic',
    feedType: 'mp4',
    provider: 'Pilot Feed Pack',
    headingDeg: 128,
    pitchDeg: -17,
    fovDeg: 72,
    rangeM: 600,
    mountHeightM: 32
  },
  {
    id: 'tokyo-shibuya-scramble',
    name: 'Shibuya Scramble North Cam',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [35.659695, 139.700539],
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    snapshotUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'pedestrian',
    feedType: 'mp4',
    provider: 'Pilot Feed Pack',
    headingDeg: 26,
    pitchDeg: -20,
    fovDeg: 74,
    rangeM: 610,
    mountHeightM: 30
  },
  {
    id: 'cctv-shibuya',
    name: 'Shibuya Scramble Crossing HD Cam',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [35.6595, 139.7005],
    streamUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'pedestrian'
  },
  {
    id: 'cctv-times-sq',
    name: 'Times Square Broadway 46th St Live',
    city: 'New York',
    country: 'United States',
    coordinates: [40.7580, -73.9855],
    streamUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'pedestrian'
  },
  {
    id: 'cctv-tower-bridge',
    name: 'Tower Bridge & Thames Rivercam',
    city: 'London',
    country: 'United Kingdom',
    coordinates: [51.5055, -0.0754],
    streamUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'port'
  },
  {
    id: 'cctv-eiffel-tower',
    name: 'Champ de Mars & Trocadéro Cam',
    city: 'Paris',
    country: 'France',
    coordinates: [48.8584, 2.2945],
    streamUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'skyline'
  },
  {
    id: 'cctv-dubai-marina',
    name: 'Dubai Marina & Palm Jumeirah Skyline',
    city: 'Dubai',
    country: 'United Arab Emirates',
    coordinates: [25.0805, 55.1403],
    streamUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'skyline'
  },
  {
    id: 'cctv-sydney-harbour',
    name: 'Sydney Opera House & Harbour Traffic',
    city: 'Sydney',
    country: 'Australia',
    coordinates: [-33.8568, 151.2153],
    streamUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80',
    snapshotUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    type: 'port'
  }
];

// Live Air Traffic Control & Recon Scanner Radio Channels
export const RADIO_CHANNELS: RadioStreamTarget[] = [
  {
    id: 'jfk-tower',
    name: 'JFK Tower Primary',
    category: 'atc',
    frequency: '119.100 MHz',
    location: 'John F. Kennedy Intl, New York',
    streamUrl: 'https://s1-fmt2.broadcastify.com/live/jfk_tower',
    description: 'Active Tower Control for runways 4L/22R, 13L/31R, and international departures.'
  },
  {
    id: 'lhr-director',
    name: 'Heathrow Director / Final Approach',
    category: 'atc',
    frequency: '119.725 MHz',
    location: 'London Heathrow, UK',
    streamUrl: 'https://s1-fmt2.broadcastify.com/live/lhr_approach',
    description: 'ILS Sequencing and radar vectoring for 27L and 27R arrivals.'
  },
  {
    id: 'tokyo-control',
    name: 'Tokyo Control (Kanto Sector North)',
    category: 'atc',
    frequency: '124.100 MHz',
    location: 'Tokyo ACC, Tokorozawa, Japan',
    streamUrl: 'https://s1-fmt2.broadcastify.com/live/tokyo_acc',
    description: 'Enroute upper-airway high-altitude radar control over Honshu.'
  },
  {
    id: 'military-guard',
    name: 'International Emergency / Military Guard',
    category: 'military',
    frequency: '243.000 MHz (UHF) / 121.500 MHz (VHF)',
    location: 'Global Distress & Intercept Frequency',
    streamUrl: 'https://s1-fmt2.broadcastify.com/live/global_guard',
    description: 'Tactical emergency guard channel monitored continuously by military interceptors and NORAD.'
  }
];

// Bundled 3D glTF/GLB Models with Tactical Calibrations
export const TACTICAL_3D_MODELS: Tactical3DModel[] = [
  {
    id: 'b789',
    name: 'Boeing 787-9 Dreamliner',
    fileName: 'b789.glb',
    path: '/gods-eye/models/b789.glb',
    fileSize: '470 KB',
    category: 'airliner',
    creator: 'Nobilis 2',
    license: 'CC BY 4.0',
    description: 'Long-range wide-body commercial airliner. Geometry & materials optimized with baked meter scale (Y-up, nose -X).',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'airplane',
    name: 'Boeing 747-400 Jumbo',
    fileName: 'airplane.glb',
    path: '/gods-eye/models/airplane.glb',
    fileSize: '88 KB',
    category: 'airliner',
    creator: 'zairiq-123',
    license: 'CC BY 4.0',
    description: 'Iconic wide-body commercial jetliner with 24x runtime calibration baked directly into uncompressed mesh.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'mq9',
    name: 'MQ-9 Reaper Tactical Drone',
    fileName: 'mq9.glb',
    path: '/gods-eye/models/mq9.glb',
    fileSize: '542 KB',
    category: 'drone',
    creator: 'IProZenoN',
    license: 'CC BY 4.0',
    description: 'Medium-altitude, long-endurance remotely piloted unmanned aerial reconnaissance vehicle (UAV).',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'jet',
    name: 'Military Interceptor / Jet',
    fileName: 'jet.glb',
    path: '/gods-eye/models/jet.glb',
    fileSize: '271 KB',
    category: 'jet',
    creator: 'Nick the Name',
    license: 'CC BY 4.0',
    description: 'High-speed tactical jet aircraft repackaged as glTF binary for military air corridor tracking.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'citation2',
    name: 'Cessna Citation II Executive Jet',
    fileName: 'citation2.glb',
    path: '/gods-eye/models/citation2.glb',
    fileSize: '562 KB',
    category: 'jet',
    creator: 'BlenderCommunityHead',
    license: 'CC BY 4.0',
    description: 'Light corporate executive business jet with 256px WebP texture optimizations and real-world meter scaling.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'atr72',
    name: 'ATR 72-600 Turboprop',
    fileName: 'atr72.glb',
    path: '/gods-eye/models/atr72.glb',
    fileSize: '264 KB',
    category: 'turboprop',
    creator: 'Oyan3D',
    license: 'CC BY 4.0',
    description: 'Twin-engine regional turboprop airliner with flat abstracted PBR styling and origin centered.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'bell206',
    name: 'Bell 206 JetRanger Helicopter',
    fileName: 'bell206.glb',
    path: '/gods-eye/models/bell206.glb',
    fileSize: '321 KB',
    category: 'helicopter',
    creator: 'terran4627',
    license: 'CC BY 4.0',
    description: 'Two-bladed multi-mission tactical light utility helicopter optimized for low-altitude urban recon sweeps.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'c172',
    name: 'Cessna 172 Skyhawk',
    fileName: 'c172.glb',
    path: '/gods-eye/models/c172.glb',
    fileSize: '526 KB',
    category: 'trainer',
    creator: 'e737',
    license: 'CC BY 4.0',
    description: 'Single-engine, four-seat, high-wing light general aviation aircraft.',
    orientationConvention: 'glTF +Y-up, nose toward -X'
  },
  {
    id: 'ship',
    name: 'Maritime Cargo / Container Vessel',
    fileName: 'ship.glb',
    path: '/gods-eye/models/ship.glb',
    fileSize: '230 KB',
    category: 'vessel',
    creator: 'Javier Fernandez',
    license: 'CC BY 4.0',
    description: 'Low-poly merchant container ship with water displacement calibration for AIS maritime layer.',
    orientationConvention: 'glTF +Y-up, bow toward -X'
  }
];

// Active Thermal Hotspots from NASA FIRMS VIIRS (NOAA-20 Satellite Detection)
export const INITIAL_THERMAL_HOTSPOTS: ThermalHotspot[] = [
  { id: 'firms-1', coordinates: [38.99488, -121.67046], brightTi4: 303.6, brightTi5: 290.73, frp: 0.53, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:06 UTC', dayNight: 'Night' },
  { id: 'firms-2', coordinates: [39.49126, -119.61848], brightTi4: 303.73, brightTi5: 290.12, frp: 0.64, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:06 UTC', dayNight: 'Night' },
  { id: 'firms-3', coordinates: [32.44483, -116.96709], brightTi4: 301.45, brightTi5: 289.55, frp: 0.40, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:09 UTC', dayNight: 'Night' },
  { id: 'firms-4', coordinates: [32.63403, -115.22340], brightTi4: 305.87, brightTi5: 281.35, frp: 3.60, confidence: 'high', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:09 UTC', dayNight: 'Night' },
  { id: 'firms-5', coordinates: [32.85691, -117.14871], brightTi4: 305.10, brightTi5: 290.02, frp: 0.41, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:09 UTC', dayNight: 'Night' },
  { id: 'firms-6', coordinates: [33.49317, -117.61848], brightTi4: 301.55, brightTi5: 290.17, frp: 0.74, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:09 UTC', dayNight: 'Night' },
  { id: 'firms-7', coordinates: [34.02105, -118.25411], brightTi4: 312.40, brightTi5: 295.10, frp: 4.80, confidence: 'high', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:11 UTC', dayNight: 'Night' },
  { id: 'firms-8', coordinates: [37.77490, -122.41940], brightTi4: 308.20, brightTi5: 292.30, frp: 1.95, confidence: 'nominal', satellite: 'NOAA-20', instrument: 'VIIRS', acqDate: '2026-07-16', acqTime: '10:12 UTC', dayNight: 'Night' }
];
