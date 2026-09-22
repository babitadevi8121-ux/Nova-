import React, { useState, useEffect } from 'react';
import { 
  FileText, Database, Upload, Download, Copy, Check, Search, 
  Layers, Globe, Shield, Terminal, BookOpen, ExternalLink,
  Code, Eye, CheckCircle2, AlertCircle, FileCode2, MapPin,
  Box, Film, Flame, Server, Video, Play, Compass, Cpu
} from 'lucide-react';
import { toast } from '../utils/toast';
import { TACTICAL_3D_MODELS, Tactical3DModel } from '../data/godsEyeData';

interface GodsEyeFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleCablesLayer?: () => void;
  onToggleDamsLayer?: () => void;
  onToggleLandingPointsLayer?: () => void;
  onToggleThermalLayer?: () => void;
  onToggleDatacentersLayer?: () => void;
  onToggle3dModels?: () => void;
  isCablesLayerActive?: boolean;
  isDamsLayerActive?: boolean;
  isLandingPointsActive?: boolean;
  isThermalLayerActive?: boolean;
  isDatacentersLayerActive?: boolean;
  is3dModelsActive?: boolean;
  onLoadCustomGeoJson?: (data: any, fileName: string) => void;
  onSpawn3DModel?: (model: Tactical3DModel) => void;
}

interface DocFile {
  name: string;
  path: string;
  title: string;
  category: 'Operational Docs' | 'Security & Testing' | 'Technical Config';
  description: string;
}

const DOC_FILES: DocFile[] = [
  {
    name: 'README.md',
    path: '/gods-eye/docs/README.md',
    title: "God's Eye View Master Manual",
    category: 'Operational Docs',
    description: 'Complete operational guide, architecture overview, first 5 minutes mission guide, and capabilities.'
  },
  {
    name: 'DATA_SOURCES.md',
    path: '/gods-eye/docs/DATA_SOURCES.md',
    title: 'Data Sources & Attribution Matrix',
    category: 'Operational Docs',
    description: 'Exhaustive breakdown of all live feeds (OpenSky, adsb.lol, AISStream, CelesTrak, USGS, TomTom) and bundled datasets.'
  },
  {
    name: 'CHANGELOG.md',
    path: '/gods-eye/docs/CHANGELOG.md',
    title: 'Tactical Changelog & Updates',
    category: 'Operational Docs',
    description: 'Changelog of public product releases, sensor calibration fixes, and live data telemetry enhancements.'
  },
  {
    name: 'SECURITY.md',
    path: '/gods-eye/docs/SECURITY.md',
    title: 'Operator Security & Threat Model',
    category: 'Security & Testing',
    description: 'Security architecture, server-side secret management, proxy hardening, and LAN operator guidelines.'
  },
  {
    name: 'TESTING.md',
    path: '/gods-eye/docs/TESTING.md',
    title: 'Field Testing & Tracking Verification',
    category: 'Security & Testing',
    description: 'Adversarial test scenarios, aircraft tracking invariants, flight camera smoothing, and test commands.'
  },
  {
    name: 'CONTRIBUTING.md',
    path: '/gods-eye/docs/CONTRIBUTING.md',
    title: 'Contributor & Architecture Guide',
    category: 'Security & Testing',
    description: 'How to add new sensor styles, CCTV source packs, and custom geospatial data layers.'
  },
  {
    name: 'LICENSE',
    path: '/gods-eye/docs/LICENSE',
    title: 'MIT License & Third-Party Boundaries',
    category: 'Technical Config',
    description: 'MIT open-source license grant with clear third-party data boundaries and non-commercial carve-outs.'
  },
  {
    name: 'package.json',
    path: '/gods-eye/docs/package.json',
    title: 'Package Manifest & Layer Exports',
    category: 'Technical Config',
    description: 'Node.js dependency tree, module exports for Cesium, EGM96, SGP4, and vector tile parsers.'
  }
];

interface GeoDataset {
  name: string;
  path: string;
  title: string;
  count: string;
  format: string;
  license: string;
  description: string;
  layerKey?: 'cables' | 'dams' | 'landing_points' | 'thermal' | 'datacenters';
}

const GEO_DATASETS: GeoDataset[] = [
  {
    name: 'cable-geo.json',
    path: '/gods-eye/local_data/telegeography_submarine_cables/cable-geo.json',
    title: 'Global Undersea Submarine Fiber Cables',
    count: '712 submarine cables',
    format: 'GeoJSON MultiLineString',
    license: 'CC BY-NC-SA 3.0 (TeleGeography)',
    description: 'Trans-oceanic submarine optical fiber routes carrying 99% of global international internet traffic.',
    layerKey: 'cables'
  },
  {
    name: 'landing-point-geo.json',
    path: '/gods-eye/local_data/telegeography_submarine_cables/landing-point-geo.json',
    title: 'Submarine Cable Landing Stations',
    count: '1,917 coastal landing points',
    format: 'GeoJSON Point Collection',
    license: 'CC BY-NC-SA 3.0 (TeleGeography)',
    description: 'Global coastal cable landing facilities and marine terminal stations linking oceanic cables to terrestrial backbones.',
    layerKey: 'landing_points'
  },
  {
    name: 'dams.geojson',
    path: '/gods-eye/local_data/dams/dams.geojson',
    title: 'Global Major Hydroelectric Dams',
    count: '704 major dams & reservoirs',
    format: 'GeoJSON Point & Polygon',
    license: 'ODbL 1.0 (OpenStreetMap / OpenInfraMap)',
    description: 'Worldwide strategic dams, reservoir capacities, and hydroelectric power generation facilities.',
    layerKey: 'dams'
  },
  {
    name: 'datacenters.geojsonl',
    path: '/gods-eye/local_data/datacenters/datacenters.geojsonl',
    title: 'Enterprise Datacenters & Cloud Nodes',
    count: '4,351 global datacenters',
    format: 'GeoJSON Line-Delimited',
    license: 'ODbL 1.0 (OpenStreetMap)',
    description: 'Global cloud hyperscaler facilities, colocation hubs, and enterprise internet exchange facilities.',
    layerKey: 'datacenters'
  },
  {
    name: 'firms-viirs-noaa20-sample.csv',
    path: '/gods-eye/fixtures/firms-viirs-noaa20-sample.csv',
    title: 'NASA FIRMS VIIRS Active Wildfires & Thermal Detections',
    count: '45 satellite detections',
    format: 'CSV Satellite Telemetry',
    license: 'NASA EOSDIS Public Domain',
    description: 'NOAA-20 VIIRS 375m active fire detections with brightness temperature and fire radiative power (MW).',
    layerKey: 'thermal'
  },
  {
    name: 'cctv_sources.shinjuku.json',
    path: '/gods-eye/cctv/cctv_sources.shinjuku.json',
    title: 'Tokyo Shinjuku & Shibuya CCTV Camera Feeds',
    count: '3 high-def sample streams',
    format: 'JSON Sensor Configuration',
    license: 'Pilot Feed Pack Demo Streams',
    description: 'Real-time PTZ coordinate calibrations, lens field-of-view, mount heights, and streaming MP4 channels.'
  },
  {
    name: 'cctv_sources.austin.json',
    path: '/gods-eye/cctv/cctv_sources.austin.json',
    title: 'Austin Texas Traffic Monitoring Cameras',
    count: 'Municipal traffic pack',
    format: 'JSON Sensor Configuration',
    license: 'City of Austin Open Data',
    description: 'Urban intersection camera sensor coordinates and heading vectors for traffic projection.'
  },
  {
    name: 'san-francisco.json',
    path: '/gods-eye/local_data/neighborhoods/san-francisco.json',
    title: 'San Francisco Analysis Neighborhoods',
    count: '41 neighborhood boundaries',
    format: 'GeoJSON Polygon Collection',
    license: 'PDDL 1.0 (City & County of San Francisco / DataSF)',
    description: 'High-precision municipal neighborhood boundaries for voice-grounded surveillance and offline urban framing.'
  },
  {
    name: 'regions.json',
    path: '/gods-eye/local_data/natural_earth/regions.json',
    title: 'Natural Earth Physical Land Formations',
    count: '1,046 physical land regions',
    format: 'GeoJSON Polygon FeatureCollection',
    license: 'Public Domain (Natural Earth)',
    description: 'Global mountain ranges, plateaus, deserts, peninsulas, and geological features for natural language orientation.'
  },
  {
    name: 'marine.json',
    path: '/gods-eye/local_data/natural_earth/marine.json',
    title: 'Natural Earth Marine & Oceanic Polygons',
    count: '292 named seas, gulfs & straits',
    format: 'GeoJSON Polygon FeatureCollection',
    license: 'Public Domain (Natural Earth)',
    description: 'Geospatial maritime boundaries, straits, gulfs, and oceanic zones for naval and maritime track filtering.'
  },
  {
    name: 'tomtom-flow-austin-12-935-1686.pbf',
    path: '/gods-eye/fixtures/tomtom-flow-austin-12-935-1686.pbf',
    title: 'TomTom Vector Traffic Flow Tile',
    count: 'Vector PBF Tile',
    format: 'Mapbox Vector Tile (PBF)',
    license: 'TomTom Evaluation License',
    description: 'Binary vector tile containing real-time traffic speeds, road congestion ratios, and flow segments.'
  }
];

interface MediaDemo {
  fileName: string;
  title: string;
  category: string;
  description: string;
}

const MEDIA_DEMOS: MediaDemo[] = [
  {
    fileName: 'hero-open-source-reveal.gif',
    title: "Global Intelligence Architecture & Orbital Grid",
    category: 'Mission Overview',
    description: 'Panoramic orbital view of the global reconnaissance grid, featuring synchronized ADS-B aircraft, maritime AIS, and Low-Earth orbit satellites.'
  },
  {
    fileName: '09-undersea-cables.gif',
    title: "Trans-Oceanic Submarine Fiber Cable Routes",
    category: 'Infrastructure',
    description: 'Visualizing TeleGeography oceanic optical cables spanning the Atlantic and Pacific oceans with landing terminal nodes.'
  },
  {
    fileName: '06-cockpit-ar.gif',
    title: "Cockpit Augmented Reality Instrument Overlay",
    category: 'Aviation',
    description: 'First-person aircraft HUD tracking heading, pitch, artificial horizon, radar altimeter, and traffic proximity alert vectors.'
  },
  {
    fileName: '03-austin-cctv.gif',
    title: "Live Multi-Feed Municipal CCTV Camera Projections",
    category: 'Optical Surveillance',
    description: 'Simultaneous optical feed aggregation with real-time field-of-view frustums cast into the 3D terrain.'
  },
  {
    fileName: '05-traffic-to-cctv.gif',
    title: "Vector Traffic Flow correlated to Optical Feeds",
    category: 'Urban Analytics',
    description: 'Mapping vehicular highway congestion directly into line-of-sight CCTV surveillance optics.'
  },
  {
    fileName: '14-iss-over-ukraine.gif',
    title: "International Space Station Telemetry & Ground Track",
    category: 'Orbital Recon',
    description: 'High-velocity satellite trajectory propagation using SGP4 orbit equations across geopolitical airspace.'
  },
  {
    fileName: '08-falcon9-replay.gif',
    title: "SpaceX Falcon 9 Launch Trajectory & Booster Replay",
    category: 'Space Operations',
    description: 'Telemetry trajectory tracking of rocket ascent, stage separation, and landing burn coordinates.'
  },
  {
    fileName: '07-helicopter-loops.gif',
    title: "Low-Altitude Tactical Helicopter Reconnaissance",
    category: 'Rotary Flight',
    description: 'Low-altitude urban surveillance loops utilizing the Bell 206 JetRanger 3D flight physics model.'
  },
  {
    fileName: '12-switch-aircraft-cockpit.gif',
    title: "Real-Time Aircraft Target Lock & Cockpit Jump",
    category: 'Target Intercept',
    description: 'Instantly snapping observer camera perspective from orbital God View directly into any commercial or military cockpit.'
  },
  {
    fileName: '04-airport-distance.gif',
    title: "Runway Proximity & Air Corridor Vectoring",
    category: 'Aviation',
    description: 'Measuring precise approach radials, glide slopes, and nautical mile ranges to primary international runways.'
  },
  {
    fileName: '10-walking-route-flythrough.gif',
    title: "Urban Street-Level 3D Infiltration & Pathing",
    category: 'Ground Recon',
    description: 'Continuous low-altitude street flythrough utilizing photorealistic 3D building tiles and terrain geometry.'
  },
  {
    fileName: '08-boneyard.gif',
    title: "Davis-Monthan AFB Aircraft Boneyard Photogrammetry",
    category: 'Strategic Military',
    description: 'High-resolution satellite imagery inspection over the 309th AMARG military aircraft storage reservation in Arizona.'
  },
  {
    fileName: '15-global-radio-layer.gif',
    title: "ATC & Emergency Radio Scanner Intercepts",
    category: 'SIGINT',
    description: 'Live audio stream playback from air traffic control tower towers, radar approach, and international emergency guard.'
  },
  {
    fileName: '01-style-sweep.gif',
    title: "Spectral Sensor Sweep: Thermal, FLIR, CRT & NVG",
    category: 'Optics & Sensors',
    description: 'Switching dynamic shader post-processing between Night Vision (Phosphor), FLIR Thermal, CRT Raster, and Natural daylight.'
  },
  {
    fileName: '01-voice-annotate-zilker.gif',
    title: "Voice-Driven Coordinate Pinning & Geo-Grounding",
    category: 'Voice Command',
    description: 'Hands-free voice recognition translating natural language tactical callouts into instantaneous 3D map annotations.'
  }
];

export default function GodsEyeFilesModal({
  isOpen,
  onClose,
  onToggleCablesLayer,
  onToggleDamsLayer,
  onToggleLandingPointsLayer,
  onToggleThermalLayer,
  onToggleDatacentersLayer,
  onToggle3dModels,
  isCablesLayerActive,
  isDamsLayerActive,
  isLandingPointsActive,
  isThermalLayerActive,
  isDatacentersLayerActive,
  is3dModelsActive = true,
  onLoadCustomGeoJson,
  onSpawn3DModel
}: GodsEyeFilesModalProps) {
  const [activeTab, setActiveTab] = useState<'docs' | 'datasets' | 'models' | 'media' | 'upload'>('models');
  const [selectedDoc, setSelectedDoc] = useState<DocFile>(DOC_FILES[0]);
  const [docContent, setDocContent] = useState<string>('Loading document...');
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaDemo>(MEDIA_DEMOS[0]);

  // Load document content whenever selectedDoc changes
  useEffect(() => {
    if (!isOpen || activeTab !== 'docs') return;
    setIsLoadingDoc(true);
    fetch(selectedDoc.path)
      .then(res => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then(text => {
        setDocContent(text);
        setIsLoadingDoc(false);
      })
      .catch(() => {
        setDocContent(`### ${selectedDoc.title}\n\n*Document path: ${selectedDoc.path}*\n\n${selectedDoc.description}\n\nThis documentation file is bundled with the God's Eye View geospatial intelligence repository.`);
        setIsLoadingDoc(false);
      });
  }, [selectedDoc, isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(docContent);
    setCopied(true);
    toast.success('Document content copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processCustomFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processCustomFile(files[0]);
    }
  };

  const processCustomFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (onLoadCustomGeoJson) {
          onLoadCustomGeoJson(parsed, file.name);
          toast.success(`Loaded "${file.name}" onto God's Eye 3D View!`);
          onClose();
        }
      } catch (err: any) {
        toast.error(`Failed to parse file: ${err.message}. Please upload valid GeoJSON or JSON.`);
      }
    };
    reader.readAsText(file);
  };

  const filteredDocs = DOC_FILES.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDatasets = GEO_DATASETS.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredModels = TACTICAL_3D_MODELS.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMedia = MEDIA_DEMOS.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 font-mono text-slate-100 select-none animate-fadeIn">
      <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        
        {/* Modal Header */}
        <header className="px-4 py-3 border-b border-cyan-900/40 bg-slate-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white tracking-wider">GOD'S EYE // FILES, 3D MODELS & DATASETS</h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                  INTELLIGENCE ARCHIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Extracted operational assets: 9 calibrated 3D GLB models, 11 geospatial datasets, field recon media, and intelligence dossiers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className="px-3 sm:px-4 py-2 bg-slate-950 border-b border-cyan-900/30 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('models')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'models'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Models (9 GLB)</span>
            </button>

            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'datasets'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Geospatial Datasets ({GEO_DATASETS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'media'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Recon Demos ({MEDIA_DEMOS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'docs'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Intel Dossiers ({DOC_FILES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'upload'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Ingest GeoJSON</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-40 sm:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* TAB 1: 3D Tactical Models */}
        {activeTab === 'models' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2">
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>CALIBRATED 3D GLTF/GLB RECONNAISSANCE ASSETS</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  These 9 models have orientation, scale, and origin calibrations baked directly into their vertex hierarchies (glTF +Y-up, nose toward −X) to prevent Draco decompressor stuttering during high-velocity 3D flight camera pans.
                </p>
              </div>

              {onToggle3dModels && (
                <button
                  onClick={onToggle3dModels}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                    is3dModelsActive
                      ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{is3dModelsActive ? '3D GLB IN SCENE: ACTIVE' : 'ENABLE 3D GLB IN SCENE'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all hover:bg-slate-900/80 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 uppercase font-black tracking-wider">
                          {model.category}
                        </span>
                        <h4 className="text-sm font-black text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                          {model.name}
                        </h4>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {model.fileSize}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {model.description}
                    </p>

                    <div className="space-y-1 text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 mb-3">
                      <div className="flex justify-between">
                        <span>Original Creator:</span>
                        <span className="text-slate-200">{model.creator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>License:</span>
                        <span className="text-amber-300 font-bold">{model.license}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orientation:</span>
                        <span className="text-slate-300 font-mono text-[9px]">{model.orientationConvention}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    {onSpawn3DModel && (
                      <button
                        onClick={() => {
                          onSpawn3DModel(model);
                          toast.success(`Spawned ${model.name} into active 3D camera focal point!`);
                          onClose();
                        }}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-black" />
                        <span>Inspect in 3D</span>
                      </button>
                    )}

                    <a
                      href={model.path}
                      download={model.fileName}
                      className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title={`Download ${model.fileName}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Geospatial Datasets */}
        {activeTab === 'datasets' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDatasets.map((ds) => (
                <div
                  key={ds.name}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all hover:bg-slate-900/80"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                          {ds.layerKey === 'thermal' ? <Flame className="w-4 h-4 text-orange-400" /> :
                           ds.layerKey === 'datacenters' ? <Server className="w-4 h-4 text-purple-400" /> :
                           <Database className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">{ds.title}</h4>
                          <span className="text-[10px] text-cyan-400 font-bold">{ds.count}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {ds.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between text-[9px] text-slate-400">
                      <span>FORMAT: <span className="text-slate-200">{ds.format}</span></span>
                      <span>LICENSE: <span className="text-amber-300 font-bold">{ds.license}</span></span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      {ds.layerKey === 'cables' && onToggleCablesLayer && (
                        <button
                          onClick={onToggleCablesLayer}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCablesLayerActive
                              ? 'bg-emerald-500 text-black shadow-md'
                              : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30'
                          }`}
                        >
                          <Globe className="w-3 h-3" />
                          <span>{isCablesLayerActive ? 'ACTIVE ON GLOBE' : 'PLOT ON 3D GLOBE'}</span>
                        </button>
                      )}

                      {ds.layerKey === 'landing_points' && onToggleLandingPointsLayer && (
                        <button
                          onClick={onToggleLandingPointsLayer}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isLandingPointsActive
                              ? 'bg-emerald-500 text-black shadow-md'
                              : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30'
                          }`}
                        >
                          <MapPin className="w-3 h-3" />
                          <span>{isLandingPointsActive ? 'ACTIVE ON GLOBE' : 'PLOT 1,917 LANDING PTS'}</span>
                        </button>
                      )}

                      {ds.layerKey === 'dams' && onToggleDamsLayer && (
                        <button
                          onClick={onToggleDamsLayer}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isDamsLayerActive
                              ? 'bg-emerald-500 text-black shadow-md'
                              : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30'
                          }`}
                        >
                          <Globe className="w-3 h-3" />
                          <span>{isDamsLayerActive ? 'ACTIVE ON GLOBE' : 'PLOT ON 3D GLOBE'}</span>
                        </button>
                      )}

                      {ds.layerKey === 'thermal' && onToggleThermalLayer && (
                        <button
                          onClick={onToggleThermalLayer}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isThermalLayerActive
                              ? 'bg-orange-500 text-black shadow-md'
                              : 'bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:bg-orange-500/30'
                          }`}
                        >
                          <Flame className="w-3 h-3 text-orange-400" />
                          <span>{isThermalLayerActive ? 'ACTIVE ON GLOBE' : 'PLOT VIIRS THERMAL'}</span>
                        </button>
                      )}

                      {ds.layerKey === 'datacenters' && onToggleDatacentersLayer && (
                        <button
                          onClick={onToggleDatacentersLayer}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isDatacentersLayerActive
                              ? 'bg-purple-500 text-black shadow-md'
                              : 'bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30'
                          }`}
                        >
                          <Server className="w-3 h-3 text-purple-400" />
                          <span>{isDatacentersLayerActive ? 'ACTIVE ON GLOBE' : 'PLOT DATACENTERS'}</span>
                        </button>
                      )}

                      {!ds.layerKey && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                          Ready in repository
                        </span>
                      )}

                      <a
                        href={ds.path}
                        download={ds.name}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Field Recon & Operational Media */}
        {activeTab === 'media' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Media List */}
            <div className="w-full md:w-80 border-r border-slate-800/80 overflow-y-auto p-3 space-y-2 bg-slate-950/60 shrink-0">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 px-1">
                Field Reconnaissance Recordings ({MEDIA_DEMOS.length})
              </div>
              {filteredMedia.map((m) => (
                <button
                  key={m.fileName}
                  onClick={() => setSelectedMedia(m)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedMedia.fileName === m.fileName
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-black">
                      {m.category}
                    </span>
                    <Film className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">{m.title}</span>
                </button>
              ))}
            </div>

            {/* Media Viewer Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-900/30">
              <div className="w-full max-w-2xl bg-slate-950 border border-cyan-900/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden border-b border-cyan-900/40">
                  <img
                    src={`/gods-eye/media/${selectedMedia.fileName}`}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur border border-cyan-500/40 text-[10px] text-cyan-300 font-black flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>RECON PLAYBACK // {selectedMedia.fileName}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-black">
                      {selectedMedia.category}
                    </span>
                    <a
                      href={`/gods-eye/media/${selectedMedia.fileName}`}
                      download={selectedMedia.fileName}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Clip</span>
                    </a>
                  </div>
                  <h3 className="text-base font-black text-white">{selectedMedia.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedMedia.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Intelligence Dossiers (Docs) */}
        {activeTab === 'docs' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left File List */}
            <div className="w-full md:w-72 border-r border-slate-800/80 overflow-y-auto p-3 space-y-1.5 bg-slate-950/60 shrink-0">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 px-1">
                Intelligence Documents ({DOC_FILES.length})
              </div>
              {filteredDocs.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedDoc.name === doc.name
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{doc.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {doc.category.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate">{doc.title}</span>
                </button>
              ))}
            </div>

            {/* Right Markdown Reader */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/30">
              <div className="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60 shrink-0">
                <div>
                  <h3 className="text-sm font-black text-white">{selectedDoc.title}</h3>
                  <span className="text-[10px] text-cyan-400">{selectedDoc.path}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <a
                    href={selectedDoc.path}
                    download={selectedDoc.name}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
                {isLoadingDoc ? (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    Loading intelligence dossier...
                  </div>
                ) : (
                  docContent
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Upload Custom Tactical File */}
        {activeTab === 'upload' && (
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              className={`w-full max-w-xl border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                dragOver
                  ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                  : 'border-slate-800 bg-slate-900/40 hover:border-cyan-500/60'
              }`}
            >
              <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
                <Upload className="w-8 h-8" />
              </div>

              <h3 className="text-base font-black text-white">Drop Tactical GeoJSON or KML File Here</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Directly plot custom reconnaissance flight plans, target polygons, drone orbits, or maritime boundary files onto the God's Eye 3D globe.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <label className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg transition-all">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Browse GeoJSON / JSON File</span>
                  <input
                    type="file"
                    accept=".json,.geojson,.kml"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center gap-4">
                <span>Supported: RFC 7946 GeoJSON</span>
                <span>•</span>
                <span>FeatureCollection</span>
                <span>•</span>
                <span>Coordinates: [Lng, Lat, Alt]</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <footer className="px-4 py-2.5 border-t border-cyan-900/40 bg-slate-900/60 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>God's Eye View open-source geospatial architecture by Bilawal Sidhu & Shelby.ai</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
          >
            Close Viewer
          </button>
        </footer>

      </div>
    </div>
  );
}
