import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe, Crosshair, Radio, Shield, Video, Flame, Compass, Eye,
  Maximize2, RotateCcw, Volume2, VolumeX, Sparkles, Download, 
  MapPin, Layers, Settings, Play, Pause, AlertTriangle, ChevronRight,
  Info, ExternalLink, RefreshCw, Send, Check, Search, Satellite,
  Plane, Ship, Activity, Terminal, ShieldAlert, Cpu, Sliders,
  ChevronDown, ChevronUp, ZoomIn, ZoomOut, Zap, CircleDot,
  Thermometer, RadioTower, ScanLine, FolderKanban, FileText, Database,
  Box, Server, Film
} from 'lucide-react';
import GodsEyeFilesModal from './GodsEyeFilesModal';
import { 
  STRATEGIC_INSTALLATIONS, INITIAL_AIRCRAFT, INITIAL_VESSELS, 
  SATELLITE_CONSTELLATIONS, INITIAL_EARTHQUAKES, SURVEILLANCE_CAMERAS, 
  RADIO_CHANNELS, StrategicInstallation, AircraftTarget, MaritimeTarget, 
  SatelliteTarget, EarthquakeTarget, SurveillanceCamera, RadioStreamTarget,
  TACTICAL_3D_MODELS, Tactical3DModel, INITIAL_THERMAL_HOTSPOTS, ThermalHotspot
} from '../data/godsEyeData';
import { User } from '../types';
import { toast } from '../utils/toast';
import { tacticalAudio } from '../utils/tacticalAudio';

interface GodsEye3DViewProps {
  user: User | null;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
}

export type SensorLook = 'NORMAL' | 'FLIR' | 'NVG' | 'CRT' | 'MATRIX' | 'NOIR';
export type ThermalPalette = 'ironbow' | 'whitehot' | 'blackhot' | 'rainbow';

interface TacticalBriefing {
  operationCode: string;
  classification: string;
  targetSummary: string;
  threatLevel: string;
  strategicSignificance: string;
  sensorAnalysis: string;
  airSeaTrafficStatus: string;
  recommendedAction: string;
  timestampZulu: string;
}

export default function GodsEye3DView({ user, onOpenAuth, onOpenPricing }: GodsEye3DViewProps) {
  // Viewer containers & refs
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cesiumViewerRef = useRef<any>(null);
  const entitiesRef = useRef<{ [key: string]: any }>({});

  // Core view states
  const [activeEngine, setActiveEngine] = useState<'cesium' | 'canvas3d'>('cesium');
  const [sensorLook, setSensorLook] = useState<SensorLook>('NORMAL');
  const [isCockpitMode, setIsCockpitMode] = useState(false);
  const [showHud, setShowHud] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeRadioChannel, setActiveRadioChannel] = useState<RadioStreamTarget>(RADIO_CHANNELS[0]);
  const [isMuted, setIsMuted] = useState(false);

  // Sensor Control Tuning Parameters
  const [sensorSensitivity, setSensorSensitivity] = useState<number>(0.85); // 0.1 to 1.0
  const [sensorGain, setSensorGain] = useState<number>(75000); // 1,000x to 100,000x
  const [thermalPalette, setThermalPalette] = useState<ThermalPalette>('ironbow');
  const [isScopeMaskActive, setIsScopeMaskActive] = useState<boolean>(true);
  const [scanlineDensity, setScanlineDensity] = useState<number>(0.65);
  const [isRadarSweepActive, setIsRadarSweepActive] = useState<boolean>(true);
  const [radarRpm, setRadarRpm] = useState<number>(24);
  const [isSensorConsoleOpen, setIsSensorConsoleOpen] = useState<boolean>(false);

  // Active layers
  const [layers, setLayers] = useState({
    aircraft: true,
    vessels: true,
    satellites: true,
    earthquakes: true,
    cctv: true,
    installations: true,
    grid: true,
  });

  // Camera & coordinates state
  const [cameraLat, setCameraLat] = useState<number>(38.8719);
  const [cameraLng, setCameraLng] = useState<number>(-77.0563);
  const [cameraAltitude, setCameraAltitude] = useState<number>(14500); // km / meters
  const [pitch, setPitch] = useState<number>(-45);
  const [heading, setHeading] = useState<number>(12);
  const [isAutoOrbiting, setIsAutoOrbiting] = useState<boolean>(true);

  // Selection & Tracking targets
  const [selectedTarget, setSelectedTarget] = useState<{
    id: string;
    type: 'aircraft' | 'vessel' | 'satellite' | 'earthquake' | 'installation' | 'cctv';
    name: string;
    coordinates: [number, number];
    data: any;
  }>({
    id: 'pentagon',
    type: 'installation',
    name: 'The Pentagon (DoD HQ)',
    coordinates: [38.8719, -77.0563],
    data: STRATEGIC_INSTALLATIONS[1]
  });

  // Tracking target for Cockpit Mode
  const [trackedAircraft, setTrackedAircraft] = useState<AircraftTarget>(INITIAL_AIRCRAFT[0]);

  // Live dynamic feeds state
  const [aircraftList, setAircraftList] = useState<AircraftTarget[]>(INITIAL_AIRCRAFT);
  const [vesselsList, setVesselsList] = useState<MaritimeTarget[]>(INITIAL_VESSELS);
  const [satellitesList, setSatellitesList] = useState<SatelliteTarget[]>(SATELLITE_CONSTELLATIONS);
  const [selectedCamera, setSelectedCamera] = useState<SurveillanceCamera>(SURVEILLANCE_CAMERAS[0]);
  const [isCctvModalOpen, setIsCctvModalOpen] = useState(false);

  // Tactical OSINT Intelligence Briefing State
  const [tacticalBrief, setTacticalBrief] = useState<TacticalBriefing | null>(null);
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);
  const [briefingQuery, setBriefingQuery] = useState('');

  // Power Up API configuration
  const [isPowerUpOpen, setIsPowerUpOpen] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState(localStorage.getItem('godseye_google_key') || '');
  const [cesiumToken, setCesiumToken] = useState(localStorage.getItem('godseye_cesium_token') || '');

  // God's Eye Files, Intelligence Dossiers & Bundled Datasets State
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [isCablesLayerActive, setIsCablesLayerActive] = useState(false);
  const [isDamsLayerActive, setIsDamsLayerActive] = useState(false);
  const [isLandingPointsActive, setIsLandingPointsActive] = useState(false);
  const [isThermalFiresActive, setIsThermalFiresActive] = useState(false);
  const [isDatacentersActive, setIsDatacentersActive] = useState(false);
  const [is3dGlbModelsActive, setIs3dGlbModelsActive] = useState(true);
  const [cablesData, setCablesData] = useState<any[]>([]);
  const [damsData, setDamsData] = useState<any[]>([]);
  const [landingPointsData, setLandingPointsData] = useState<any[]>([]);
  const [thermalFiresData, setThermalFiresData] = useState<ThermalHotspot[]>(INITIAL_THERMAL_HOTSPOTS);
  const [datacentersData, setDatacentersData] = useState<any[]>([]);
  const [inspected3DModel, setInspected3DModel] = useState<Tactical3DModel | null>(null);
  const [customGeoData, setCustomGeoData] = useState<{ name: string; features: any[] } | null>(null);

  // Lazy-load Submarine Cables GeoJSON when activated
  useEffect(() => {
    if (isCablesLayerActive && cablesData.length === 0) {
      fetch('/gods-eye/local_data/telegeography_submarine_cables/cable-geo.json')
        .then(res => res.json())
        .then(json => {
          if (json.features) {
            setCablesData(json.features);
            tacticalAudio.playOpticClick();
            toast.success(`Submarine Cables Activated: ${json.features.length} Undersea Cables Loaded`);
          }
        })
        .catch(err => console.warn('Could not load cables GeoJSON:', err));
    }
  }, [isCablesLayerActive, cablesData.length]);

  // Lazy-load Global Dams GeoJSON when activated
  useEffect(() => {
    if (isDamsLayerActive && damsData.length === 0) {
      fetch('/gods-eye/local_data/dams/dams.geojson')
        .then(res => res.json())
        .then(json => {
          if (json.features) {
            setDamsData(json.features);
            tacticalAudio.playOpticClick();
            toast.success(`Global Dams Activated: ${json.features.length} Major Reservoirs & Dams Loaded`);
          }
        })
        .catch(err => console.warn('Could not load dams GeoJSON:', err));
    }
  }, [isDamsLayerActive, damsData.length]);

  // Lazy-load Cable Landing Points when activated
  useEffect(() => {
    if (isLandingPointsActive && landingPointsData.length === 0) {
      fetch('/gods-eye/local_data/telegeography_submarine_cables/landing-point-geo.json')
        .then(res => res.json())
        .then(json => {
          if (json.features) {
            setLandingPointsData(json.features);
            tacticalAudio.playOpticClick();
            toast.success(`Landing Stations Activated: ${json.features.length} Coastal Points Loaded`);
          }
        })
        .catch(err => console.warn('Could not load landing points GeoJSON:', err));
    }
  }, [isLandingPointsActive, landingPointsData.length]);

  // Lazy-load Hyperscale Datacenters when activated
  useEffect(() => {
    if (isDatacentersActive && datacentersData.length === 0) {
      fetch('/gods-eye/local_data/datacenters/datacenters.geojsonl')
        .then(res => res.text())
        .then(text => {
          const lines = text.trim().split('\n');
          const parsed = lines.slice(0, 350).map(l => {
            try { return JSON.parse(l); } catch { return null; }
          }).filter(Boolean);
          setDatacentersData(parsed);
          tacticalAudio.playOpticClick();
          toast.success(`Datacenters Layer Activated: ${parsed.length} Hyperscale Nodes Loaded`);
        })
        .catch(err => console.warn('Could not load datacenters GeoJSONL:', err));
    }
  }, [isDatacentersActive, datacentersData.length]);

  // Lazy-load FIRMS VIIRS CSV hotspots when activated
  useEffect(() => {
    if (isThermalFiresActive) {
      fetch('/gods-eye/fixtures/firms-viirs-noaa20-sample.csv')
        .then(res => res.text())
        .then(csv => {
          const lines = csv.trim().split('\n');
          const parsed: ThermalHotspot[] = [];
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',');
            if (parts.length >= 7) {
              const lat = parseFloat(parts[0]);
              const lng = parseFloat(parts[1]);
              const brightTi4 = parseFloat(parts[2]);
              const brightTi5 = parseFloat(parts[4]);
              const frp = parseFloat(parts[7]) || 1.0;
              const acqDate = parts[5] || '2026-07-16';
              const acqTime = parts[6] || '10:00';
              if (!isNaN(lat) && !isNaN(lng)) {
                parsed.push({
                  id: `firms-live-${i}`,
                  coordinates: [lat, lng],
                  brightTi4,
                  brightTi5,
                  frp,
                  confidence: 'nominal',
                  satellite: 'NOAA-20',
                  instrument: 'VIIRS',
                  acqDate,
                  acqTime,
                  dayNight: 'Night'
                });
              }
            }
          }
          if (parsed.length > 0) {
            setThermalFiresData(parsed);
            tacticalAudio.playOpticClick();
            toast.success(`NASA FIRMS VIIRS Active: ${parsed.length} Thermal Fire Detections Loaded`);
          }
        })
        .catch(err => {
          console.warn('Could not load FIRMS CSV, using initial hotspots:', err);
          setThermalFiresData(INITIAL_THERMAL_HOTSPOTS);
        });
    }
  }, [isThermalFiresActive]);

  // Zulu Clock
  const [zuluTime, setZuluTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setZuluTime(now.toISOString().replace('T', ' ').substring(0, 19) + 'Z');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update dynamic entity positions smoothly (drift simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      // Aircraft motion
      setAircraftList(prev => prev.map(ac => {
        const rad = (ac.headingDeg * Math.PI) / 180;
        const speedFactor = 0.0015;
        const dLat = Math.cos(rad) * speedFactor;
        const dLng = Math.sin(rad) * speedFactor;
        let newLat = ac.coordinates[0] + dLat;
        let newLng = ac.coordinates[1] + dLng;
        if (newLat > 85) newLat = -85;
        if (newLat < -85) newLat = 85;
        if (newLng > 180) newLng = -180;
        if (newLng < -180) newLng = 180;
        return {
          ...ac,
          coordinates: [newLat, newLng]
        };
      }));

      // Satellite orbital track
      setSatellitesList(prev => prev.map(sat => {
        const speed = 0.05;
        let newLng = sat.coordinates[1] + speed;
        if (newLng > 180) newLng = -180;
        const newLat = Math.sin((newLng * Math.PI) / 180) * sat.inclinationDeg * 0.8;
        return {
          ...sat,
          coordinates: [newLat, newLng]
        };
      }));

      // Orbit camera rotation if enabled
      if (isAutoOrbiting && !isCockpitMode) {
        setHeading(h => (h + 0.3) % 360);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoOrbiting, isCockpitMode]);

  // Audio effects synchronization with Mute & NVG
  useEffect(() => {
    tacticalAudio.setMuted(isMuted);
    if (!isMuted && sensorLook === 'NVG') {
      tacticalAudio.setNvgHum(true);
    } else {
      tacticalAudio.setNvgHum(false);
    }
  }, [isMuted, sensorLook]);

  // Handle Radio ATC Scanner toggle
  useEffect(() => {
    if (isAudioPlaying && !isMuted) {
      tacticalAudio.startAtcRadio(activeRadioChannel.frequency);
    } else {
      tacticalAudio.stopAtcRadio();
    }
    return () => {
      tacticalAudio.stopAtcRadio();
    };
  }, [isAudioPlaying, isMuted, activeRadioChannel]);

  // Handle Cesium Initialization with robust imagery & entity pipeline
  useEffect(() => {
    let isCancelled = false;

    const initCesium = async () => {
      if (typeof (window as any).Cesium === 'undefined' || !cesiumContainerRef.current) {
        setActiveEngine('canvas3d');
        return;
      }

      try {
        const Cesium = (window as any).Cesium;
        if (cesiumViewerRef.current && !cesiumViewerRef.current.isDestroyed()) return;

        if (cesiumToken) {
          Cesium.Ion.defaultAccessToken = cesiumToken;
        }

        // Create reliable base imagery layer using async ArcGis fromUrl or OSM template
        let baseImageryLayer: any = null;
        try {
          if (Cesium.ArcGisMapServerImageryProvider?.fromUrl) {
            const provider = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
              { enablePickFeatures: false }
            );
            baseImageryLayer = new Cesium.ImageryLayer(provider);
          }
        } catch (e) {
          console.warn('ArcGis imagery fallback:', e);
        }

        if (!baseImageryLayer) {
          try {
            const osmProvider = new Cesium.UrlTemplateImageryProvider({
              url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              subdomains: ['a', 'b', 'c'],
              maximumLevel: 19
            });
            baseImageryLayer = new Cesium.ImageryLayer(osmProvider);
          } catch (e) {
            console.warn('OSM tile fallback:', e);
          }
        }

        if (isCancelled || !cesiumContainerRef.current) return;

        const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
          timeline: false,
          animation: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          fullscreenButton: false,
          vrButton: false,
          selectionIndicator: false,
          infoBox: false,
          baseLayer: baseImageryLayer || false,
          showRenderLoopErrors: false,
          scene3DOnly: true,
        });

        // Optimize globe atmosphere & dark starry backdrop
        if (viewer.scene?.globe) {
          viewer.scene.globe.enableLighting = true;
          viewer.scene.skyAtmosphere.show = true;
        }

        // Error boundary
        if (viewer.scene?.renderError) {
          viewer.scene.renderError.addEventListener((error: any) => {
            console.warn('Cesium render error fallback:', error);
            setActiveEngine('canvas3d');
          });
        }

        // Setup entity click handler
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement: any) => {
          const picked = viewer.scene.pick(movement.position);
          if (Cesium.defined(picked) && picked.id && picked.id.targetData) {
            const item = picked.id.targetData;
            setSelectedTarget({
              id: item.id,
              type: item.type,
              name: item.name,
              coordinates: item.coordinates,
              data: item.data
            });
            tacticalAudio.playTargetLock();
            toast.info(`Target Acquired: ${item.name}`);
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        cesiumViewerRef.current = viewer;
        setActiveEngine('cesium');
      } catch (err) {
        console.warn('Cesium init notice:', err);
        setActiveEngine('canvas3d');
      }
    };

    initCesium();

    return () => {
      isCancelled = true;
      if (cesiumViewerRef.current) {
        try {
          if (!cesiumViewerRef.current.isDestroyed()) {
            cesiumViewerRef.current.destroy();
          }
        } catch (e) {}
        cesiumViewerRef.current = null;
      }
    };
  }, [cesiumToken]);

  // Synchronize dynamic entities into Cesium scene
  useEffect(() => {
    const viewer = cesiumViewerRef.current;
    if (!viewer || viewer.isDestroyed() || typeof (window as any).Cesium === 'undefined') return;
    const Cesium = (window as any).Cesium;

    viewer.entities.removeAll();

    // 1. Installations
    if (layers.installations) {
      STRATEGIC_INSTALLATIONS.forEach(inst => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(inst.coordinates[1], inst.coordinates[0], 500),
          point: {
            pixelSize: 8,
            color: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1.5,
          },
          label: {
            text: inst.name.split(' (')[0],
            font: '10px monospace',
            fillColor: Cesium.Color.fromCssColorString('#fde047'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -12),
          },
          targetData: {
            id: inst.id,
            type: 'installation',
            name: inst.name,
            coordinates: inst.coordinates,
            data: inst
          }
        });
      });
    }

    // 2. Aircraft (ADS-B)
    const getAircraftModelUri = (type: string, category: string): string => {
      const t = (type || '').toLowerCase();
      const c = (category || '').toLowerCase();
      if (t.includes('747') || t.includes('jumbo')) return '/gods-eye/models/airplane.glb';
      if (t.includes('787') || t.includes('dreamliner') || t.includes('a350') || t.includes('777')) return '/gods-eye/models/b789.glb';
      if (t.includes('drone') || t.includes('reaper') || t.includes('mq-') || t.includes('uav') || c.includes('uav')) return '/gods-eye/models/mq9.glb';
      if (t.includes('heli') || t.includes('bell') || t.includes('uh-') || t.includes('rotor') || c.includes('helicopter')) return '/gods-eye/models/bell206.glb';
      if (t.includes('turboprop') || t.includes('atr') || t.includes('dash') || t.includes('q400')) return '/gods-eye/models/atr72.glb';
      if (t.includes('citation') || t.includes('private') || t.includes('lear') || t.includes('gulfstream')) return '/gods-eye/models/citation2.glb';
      if (t.includes('c172') || t.includes('cessna') || t.includes('skyhawk') || t.includes('piper')) return '/gods-eye/models/c172.glb';
      if (t.includes('fighter') || t.includes('jet') || t.includes('f-') || t.includes('su-') || c.includes('military')) return '/gods-eye/models/jet.glb';
      return '/gods-eye/models/b789.glb';
    };

    if (layers.aircraft) {
      aircraftList.forEach(ac => {
        const entityConfig: any = {
          position: Cesium.Cartesian3.fromDegrees(ac.coordinates[1], ac.coordinates[0], ac.altitudeFt * 0.3048),
          point: {
            pixelSize: is3dGlbModelsActive ? 4 : 7,
            color: Cesium.Color.CYAN,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1.5,
          },
          label: {
            text: `${ac.callsign} (${ac.altitudeFt}ft)`,
            font: '9px monospace',
            fillColor: Cesium.Color.fromCssColorString('#38bdf8'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -12),
          },
          targetData: {
            id: ac.id,
            type: 'aircraft',
            name: `${ac.callsign} - ${ac.aircraftType}`,
            coordinates: ac.coordinates,
            data: ac
          }
        };

        if (is3dGlbModelsActive) {
          entityConfig.model = {
            uri: getAircraftModelUri(ac.aircraftType, ac.category),
            minimumPixelSize: 30,
            maximumScale: 180,
            scale: 3.5,
          };
        }

        viewer.entities.add(entityConfig);
      });
    }

    // 3. Maritime Vessels (AIS)
    if (layers.vessels) {
      vesselsList.forEach(ves => {
        const vesselConfig: any = {
          position: Cesium.Cartesian3.fromDegrees(ves.coordinates[1], ves.coordinates[0], 25),
          point: {
            pixelSize: is3dGlbModelsActive ? 4 : 6,
            color: Cesium.Color.SPRINGGREEN,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1.5,
          },
          label: {
            text: ves.name,
            font: '9px monospace',
            fillColor: Cesium.Color.fromCssColorString('#34d399'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -12),
          },
          targetData: {
            id: ves.id,
            type: 'vessel',
            name: `${ves.name} (${ves.vesselType.toUpperCase()})`,
            coordinates: ves.coordinates,
            data: ves
          }
        };

        if (is3dGlbModelsActive) {
          vesselConfig.model = {
            uri: '/gods-eye/models/ship.glb',
            minimumPixelSize: 26,
            maximumScale: 140,
            scale: 2.5,
          };
        }

        viewer.entities.add(vesselConfig);
      });
    }

    // 4. Satellites
    if (layers.satellites) {
      satellitesList.forEach(sat => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(sat.coordinates[1], sat.coordinates[0], sat.altitudeKm * 1000),
          point: {
            pixelSize: 8,
            color: Cesium.Color.MAGENTA,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1,
          },
          label: {
            text: sat.name,
            font: '9px monospace',
            fillColor: Cesium.Color.fromCssColorString('#c084fc'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -12),
          },
          targetData: {
            id: sat.id,
            type: 'satellite',
            name: `${sat.name} (${sat.category.toUpperCase()})`,
            coordinates: sat.coordinates,
            data: sat
          }
        });
      });
    }

    // 5. Earthquakes
    if (layers.earthquakes) {
      INITIAL_EARTHQUAKES.forEach(eq => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(eq.coordinates[1], eq.coordinates[0], 100),
          point: {
            pixelSize: Math.max(8, eq.magnitude * 2.8),
            color: eq.magnitude >= 7.0 ? Cesium.Color.RED : Cesium.Color.ORANGE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1.5,
          },
          label: {
            text: `M${eq.magnitude} - ${eq.locationName.split(',')[0]}`,
            font: '9px monospace',
            fillColor: Cesium.Color.fromCssColorString('#fb923c'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -12),
          },
          targetData: {
            id: eq.id,
            type: 'earthquake',
            name: `M${eq.magnitude} Quake - ${eq.locationName}`,
            coordinates: eq.coordinates,
            data: eq
          }
        });
      });
    }

    // 6. Submarine Fiber Cables (TeleGeography dataset)
    if (isCablesLayerActive && cablesData.length > 0) {
      cablesData.slice(0, 150).forEach((feature) => {
        const coords = feature.geometry?.coordinates;
        if (!coords) return;
        const lines = feature.geometry.type === 'MultiLineString' ? coords : [coords];
        lines.forEach((lineCoords: any[]) => {
          const flatDegrees: number[] = [];
          lineCoords.forEach(c => {
            if (typeof c[0] === 'number' && typeof c[1] === 'number') {
              flatDegrees.push(c[0], c[1], 50);
            }
          });
          if (flatDegrees.length >= 6) {
            viewer.entities.add({
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(flatDegrees),
                width: 1.5,
                material: Cesium.Color.fromCssColorString('#06b6d4').withAlpha(0.65),
              }
            });
          }
        });
      });
    }

    // 7. Global Dams & Reservoirs (dams.geojson)
    if (isDamsLayerActive && damsData.length > 0) {
      damsData.slice(0, 180).forEach((feature) => {
        let lng: number | undefined;
        let lat: number | undefined;
        if (feature.geometry?.type === 'Point') {
          lng = feature.geometry.coordinates[0];
          lat = feature.geometry.coordinates[1];
        } else if (feature.geometry?.coordinates?.[0]?.[0]) {
          lng = feature.geometry.coordinates[0][0];
          lat = feature.geometry.coordinates[0][1];
        }
        if (typeof lat === 'number' && typeof lng === 'number') {
          const damName = feature.properties?.tags?.name || feature.properties?.name || 'Hydro Dam';
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(lng, lat, 200),
            point: {
              pixelSize: 6,
              color: Cesium.Color.fromCssColorString('#38bdf8'),
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 1,
            },
            label: {
              text: damName.substring(0, 16),
              font: '8px monospace',
              fillColor: Cesium.Color.fromCssColorString('#7dd3fc'),
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              pixelOffset: new Cesium.Cartesian2(0, -8),
            }
          });
        }
      });
    }

    // 8. Custom Uploaded GeoJSON Features
    if (customGeoData && customGeoData.features) {
      customGeoData.features.forEach((feature, idx) => {
        if (feature.geometry?.type === 'Point' && typeof feature.geometry.coordinates?.[0] === 'number') {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0], feature.geometry.coordinates[1], 150),
            point: {
              pixelSize: 8,
              color: Cesium.Color.GREEN,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 1.5,
            },
            label: {
              text: feature.properties?.name || `Custom Pt ${idx + 1}`,
              font: '9px monospace',
              fillColor: Cesium.Color.GREENYELLOW,
              pixelOffset: new Cesium.Cartesian2(0, -10),
            }
          });
        }
      });
    }

    // 9. Submarine Cable Coastal Landing Stations (1,917 Landing Points)
    if (isLandingPointsActive && landingPointsData.length > 0) {
      landingPointsData.slice(0, 300).forEach(lp => {
        const coords = lp.geometry?.coordinates;
        if (!coords || typeof coords[0] !== 'number' || typeof coords[1] !== 'number') return;
        const name = lp.properties?.name || 'Landing Station';
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1], 80),
          point: {
            pixelSize: 5,
            color: Cesium.Color.fromCssColorString('#06b6d4'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1.5,
          },
          label: {
            text: name.split(',')[0],
            font: '8px monospace',
            fillColor: Cesium.Color.fromCssColorString('#a5f3fc'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -8),
          },
          targetData: {
            id: lp.properties?.id || name,
            type: 'installation',
            name: `Cable Landing Station: ${name}`,
            coordinates: [coords[1], coords[0]],
            data: lp.properties
          }
        });
      });
    }

    // 10. Thermal Wildfire Hotspots (NASA FIRMS VIIRS)
    if (isThermalFiresActive && thermalFiresData.length > 0) {
      thermalFiresData.forEach(fire => {
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(fire.coordinates[1], fire.coordinates[0], 120),
          point: {
            pixelSize: 8,
            color: Cesium.Color.fromCssColorString('#f97316'),
            outlineColor: Cesium.Color.fromCssColorString('#ef4444'),
            outlineWidth: 2,
          },
          label: {
            text: `FIRE: ${fire.frp} MW`,
            font: '9px monospace',
            fillColor: Cesium.Color.fromCssColorString('#fed7aa'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
          },
          targetData: {
            id: fire.id,
            type: 'earthquake',
            name: `Thermal Hotspot (${fire.frp} MW - ${fire.brightTi4}K)`,
            coordinates: fire.coordinates,
            data: fire
          }
        });
      });
    }

    // 11. Hyperscale Datacenters
    if (isDatacentersActive && datacentersData.length > 0) {
      datacentersData.slice(0, 200).forEach((dc, idx) => {
        const coords = dc.geometry?.coordinates;
        if (!coords || typeof coords[0] !== 'number' || typeof coords[1] !== 'number') return;
        const name = dc.properties?.name || dc.properties?.operator || `Datacenter #${idx + 1}`;
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1], 100),
          point: {
            pixelSize: 6,
            color: Cesium.Color.fromCssColorString('#a855f7'),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1,
          },
          label: {
            text: name.substring(0, 16),
            font: '8px monospace',
            fillColor: Cesium.Color.fromCssColorString('#d8b4fe'),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -8),
          },
          targetData: {
            id: dc.id || `dc-${idx}`,
            type: 'installation',
            name: `Datacenter: ${name}`,
            coordinates: [coords[1], coords[0]],
            data: dc.properties
          }
        });
      });
    }

    // 12. Inspected 3D Model Showcase
    if (inspected3DModel) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(cameraLng, cameraLat, 1500),
        model: {
          uri: inspected3DModel.path,
          minimumPixelSize: 64,
          maximumScale: 300,
          scale: 6.0,
        },
        label: {
          text: `[INSPECT 3D]: ${inspected3DModel.name}`,
          font: '11px monospace',
          fillColor: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -20),
        }
      });
    }
  }, [layers, aircraftList, vesselsList, satellitesList, activeEngine, isCablesLayerActive, cablesData, isDamsLayerActive, damsData, isLandingPointsActive, landingPointsData, isThermalFiresActive, thermalFiresData, isDatacentersActive, datacentersData, is3dGlbModelsActive, inspected3DModel, customGeoData]);

  // Handle Fly-To Camera Target
  const flyToTarget = (lat: number, lng: number, name: string, type: any, data: any) => {
    setCameraLat(lat);
    setCameraLng(lng);
    setSelectedTarget({
      id: data.id || name.toLowerCase().replace(/\s+/g, '-'),
      type,
      name,
      coordinates: [lat, lng],
      data
    });

    tacticalAudio.playTargetLock();

    if (cesiumViewerRef.current && !cesiumViewerRef.current.isDestroyed() && (window as any).Cesium && activeEngine === 'cesium') {
      try {
        const Cesium = (window as any).Cesium;
        cesiumViewerRef.current.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(lng, lat, 2500000),
          orientation: {
            heading: Cesium.Math.toRadians(heading),
            pitch: Cesium.Math.toRadians(pitch),
            roll: 0.0
          },
          duration: 2.0
        });
      } catch (e) {}
    }

    toast.info(`Target Acquired: ${name} [${lat.toFixed(4)}°, ${lng.toFixed(4)}°]`);
  };

  // Generate Tactical OSINT Briefing with Gemini AI
  const handleGenerateBriefing = async () => {
    setIsLoadingBrief(true);
    try {
      const res = await fetch('/api/godseye/tactical-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetName: selectedTarget.name,
          targetType: selectedTarget.type,
          coordinates: selectedTarget.coordinates,
          sensorMode: sensorLook,
          altitude: `${cameraAltitude} km`,
          additionalContext: briefingQuery || 'Real-time God\'s Eye View orbital reconnaissance query'
        })
      });

      if (!res.ok) throw new Error('Failed to retrieve tactical briefing');
      const data: TacticalBriefing = await res.json();
      setTacticalBrief(data);
      tacticalAudio.playOpticClick();
      toast.success(`OSINT Reconnaissance Briefing Synchronized (Operation ${data.operationCode})`);
    } catch (err: any) {
      toast.error(err.message || 'Tactical Briefing Error');
    } finally {
      setIsLoadingBrief(false);
    }
  };

  // 3D Canvas Render Loop:
  // In 'cesium' mode: draws a transparent HUD overlay (reticles, radar sweep, target brackets).
  // In 'canvas3d' mode: draws the full interactive 3D vector orbital sphere.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let radarAngle = 0;
    let lastPingAngle = 0;
    let scanlineOffset = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement?.clientWidth || 1200;
      const height = canvas.height = canvas.parentElement?.clientHeight || 800;

      // Clear Canvas
      if (activeEngine === 'cesium') {
        // Transparent in Cesium mode so Cesium renders cleanly underneath
        ctx.clearRect(0, 0, width, height);
      } else {
        // Solid theme-aware backdrop in Canvas 3D engine
        if (sensorLook === 'NVG') {
          ctx.fillStyle = '#021805';
        } else if (sensorLook === 'FLIR') {
          ctx.fillStyle = thermalPalette === 'whitehot' ? '#18181b' : thermalPalette === 'blackhot' ? '#09090b' : '#0a0118';
        } else if (sensorLook === 'CRT') {
          ctx.fillStyle = '#011208';
        } else if (sensorLook === 'MATRIX') {
          ctx.fillStyle = '#020d06';
        } else if (sensorLook === 'NOIR') {
          ctx.fillStyle = '#09090b';
        } else {
          ctx.fillStyle = '#030712';
        }
        ctx.fillRect(0, 0, width, height);
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.36;

      // Project spherical 3D coordinates onto 2D canvas
      const projectCoords = (lat: number, lng: number, altOffset: number = 0) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const currentRot = (heading * Math.PI) / 180;
        const theta = ((lng + 180) * Math.PI) / 180 + currentRot;

        const effectiveR = globeRadius * (1 + altOffset);
        const x = effectiveR * Math.sin(phi) * Math.sin(theta);
        const y = -effectiveR * Math.cos(phi);
        const z = effectiveR * Math.sin(phi) * Math.cos(theta);

        const isVisible = z > 0;
        return {
          x: centerX + x,
          y: centerY + y,
          z,
          isVisible
        };
      };

      // ONLY draw 3D Globe Vector Sphere if we are in 'canvas3d' mode
      if (activeEngine === 'canvas3d') {
        // Atmosphere Glow
        const atmosGrad = ctx.createRadialGradient(centerX, centerY, globeRadius * 0.8, centerX, centerY, globeRadius * 1.25);
        if (sensorLook === 'NVG') {
          atmosGrad.addColorStop(0, 'rgba(34, 197, 94, 0.45)');
          atmosGrad.addColorStop(0.8, 'rgba(22, 101, 52, 0.15)');
          atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else if (sensorLook === 'FLIR') {
          atmosGrad.addColorStop(0, thermalPalette === 'whitehot' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(236, 72, 153, 0.45)');
          atmosGrad.addColorStop(0.6, 'rgba(234, 88, 12, 0.2)');
          atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else if (sensorLook === 'MATRIX') {
          atmosGrad.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
          atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          atmosGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
          atmosGrad.addColorStop(0.7, 'rgba(37, 99, 235, 0.15)');
          atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = atmosGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, globeRadius * 1.25, 0, Math.PI * 2);
        ctx.fill();

        // Globe Body
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
        ctx.clip();

        // Planet Base Shading
        const bodyGrad = ctx.createRadialGradient(centerX - globeRadius * 0.3, centerY - globeRadius * 0.3, globeRadius * 0.1, centerX, centerY, globeRadius);
        if (sensorLook === 'NVG') {
          bodyGrad.addColorStop(0, '#042f1a');
          bodyGrad.addColorStop(1, '#021808');
        } else if (sensorLook === 'FLIR') {
          bodyGrad.addColorStop(0, thermalPalette === 'whitehot' ? '#3f3f46' : '#270838');
          bodyGrad.addColorStop(1, thermalPalette === 'whitehot' ? '#09090b' : '#0e0114');
        } else if (sensorLook === 'MATRIX') {
          bodyGrad.addColorStop(0, '#03200e');
          bodyGrad.addColorStop(1, '#010d05');
        } else {
          bodyGrad.addColorStop(0, '#0c2340');
          bodyGrad.addColorStop(1, '#030b14');
        }
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(centerX - globeRadius, centerY - globeRadius, globeRadius * 2, globeRadius * 2);

        // Latitude & Longitude Graticules
        if (layers.grid) {
          ctx.strokeStyle = sensorLook === 'NVG' ? 'rgba(34, 197, 94, 0.22)'
            : sensorLook === 'FLIR' ? 'rgba(244, 63, 94, 0.22)'
            : sensorLook === 'MATRIX' ? 'rgba(16, 185, 129, 0.35)'
            : 'rgba(56, 189, 248, 0.22)';
          ctx.lineWidth = 1;

          // Latitudes
          for (let lat = -75; lat <= 75; lat += 15) {
            ctx.beginPath();
            let first = true;
            for (let lng = -180; lng <= 180; lng += 6) {
              const pt = projectCoords(lat, lng);
              if (pt.isVisible) {
                if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
                else { ctx.lineTo(pt.x, pt.y); }
              } else {
                first = true;
              }
            }
            ctx.stroke();
          }

          // Longitudes
          for (let lng = -180; lng < 180; lng += 30) {
            ctx.beginPath();
            let first = true;
            for (let lat = -90; lat <= 90; lat += 5) {
              const pt = projectCoords(lat, lng);
              if (pt.isVisible) {
                if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
                else { ctx.lineTo(pt.x, pt.y); }
              } else {
                first = true;
              }
            }
            ctx.stroke();
          }
        }

        // Draw Strategic Installations
        if (layers.installations) {
          STRATEGIC_INSTALLATIONS.forEach(inst => {
            const pt = projectCoords(inst.coordinates[0], inst.coordinates[1]);
            if (pt.isVisible) {
              ctx.fillStyle = '#facc15';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = '#eab308';
              ctx.lineWidth = 1.2;
              ctx.stroke();

              ctx.fillStyle = '#fef08a';
              ctx.font = '9px monospace';
              ctx.fillText(inst.name.split(' (')[0], pt.x + 8, pt.y - 4);
            }
          });
        }

        // Draw Aircraft (ADS-B)
        if (layers.aircraft) {
          aircraftList.forEach(ac => {
            const pt = projectCoords(ac.coordinates[0], ac.coordinates[1], 0.03);
            if (pt.isVisible) {
              ctx.fillStyle = '#38bdf8';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#bae6fd';
              ctx.font = '8px monospace';
              ctx.fillText(`${ac.callsign} (${ac.altitudeFt}ft)`, pt.x + 6, pt.y - 4);
            }
          });
        }

        // Draw Maritime Ships (AIS)
        if (layers.vessels) {
          vesselsList.forEach(ves => {
            const pt = projectCoords(ves.coordinates[0], ves.coordinates[1]);
            if (pt.isVisible) {
              ctx.fillStyle = ves.vesselType === 'naval' ? '#f43f5e' : '#10b981';
              ctx.fillRect(pt.x - 3, pt.y - 3, 6, 6);

              ctx.fillStyle = '#a7f3d0';
              ctx.font = '8px monospace';
              ctx.fillText(ves.name, pt.x + 8, pt.y + 4);
            }
          });
        }

        // Draw Satellites & Orbits
        if (layers.satellites) {
          satellitesList.forEach(sat => {
            const pt = projectCoords(sat.coordinates[0], sat.coordinates[1], 0.12);
            if (pt.isVisible) {
              ctx.fillStyle = '#a855f7';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = '#c084fc';
              ctx.strokeRect(pt.x - 4, pt.y - 4, 8, 8);

              ctx.fillStyle = '#e9d5ff';
              ctx.font = '8px monospace';
              ctx.fillText(`${sat.name}`, pt.x + 10, pt.y + 3);
            }
          });
        }

        // Draw Earthquakes (USGS)
        if (layers.earthquakes) {
          INITIAL_EARTHQUAKES.forEach(eq => {
            const pt = projectCoords(eq.coordinates[0], eq.coordinates[1]);
            if (pt.isVisible) {
              const r = Math.max(6, eq.magnitude * 2.5);
              ctx.strokeStyle = eq.magnitude >= 7.0 ? '#ef4444' : '#f97316';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
              ctx.stroke();

              ctx.fillStyle = '#fed7aa';
              ctx.font = '8px monospace';
              ctx.fillText(`M${eq.magnitude} - ${eq.locationName.substring(0, 18)}`, pt.x + r + 4, pt.y);
            }
          });
        }

        // Draw Submarine Optical Cables (TeleGeography dataset)
        if (isCablesLayerActive && cablesData.length > 0) {
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 1.0;
          cablesData.slice(0, 120).forEach(feature => {
            const coords = feature.geometry?.coordinates;
            if (!coords) return;
            const lines = feature.geometry.type === 'MultiLineString' ? coords : [coords];
            lines.forEach((line: any[]) => {
              ctx.beginPath();
              let started = false;
              for (let i = 0; i < line.length; i += 2) {
                const pt = projectCoords(line[i][1], line[i][0]);
                if (pt.isVisible) {
                  if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
                  else { ctx.lineTo(pt.x, pt.y); }
                } else {
                  started = false;
                }
              }
              ctx.stroke();
            });
          });
        }

        // Draw Global Dams & Reservoirs (dams.geojson)
        if (isDamsLayerActive && damsData.length > 0) {
          ctx.fillStyle = '#38bdf8';
          damsData.slice(0, 150).forEach(feature => {
            const lat = feature.geometry?.type === 'Point' ? feature.geometry.coordinates[1] : feature.geometry?.coordinates?.[0]?.[0]?.[1];
            const lng = feature.geometry?.type === 'Point' ? feature.geometry.coordinates[0] : feature.geometry?.coordinates?.[0]?.[0]?.[0];
            if (typeof lat === 'number' && typeof lng === 'number') {
              const pt = projectCoords(lat, lng);
              if (pt.isVisible) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });
        }

        // Draw Custom Uploaded GeoJSON
        if (customGeoData && customGeoData.features) {
          ctx.fillStyle = '#22c55e';
          ctx.strokeStyle = '#4ade80';
          customGeoData.features.forEach(f => {
            if (f.geometry?.type === 'Point' && typeof f.geometry.coordinates?.[0] === 'number') {
              const pt = projectCoords(f.geometry.coordinates[1], f.geometry.coordinates[0]);
              if (pt.isVisible) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
              }
            }
          });
        }

        // Draw Cable Landing Stations (1,917 Coastal Points)
        if (isLandingPointsActive && landingPointsData.length > 0) {
          ctx.fillStyle = '#06b6d4';
          landingPointsData.slice(0, 250).forEach(lp => {
            const coords = lp.geometry?.coordinates;
            if (coords && typeof coords[0] === 'number' && typeof coords[1] === 'number') {
              const pt = projectCoords(coords[1], coords[0]);
              if (pt.isVisible) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });
        }

        // Draw Thermal Fire Hotspots (NASA FIRMS VIIRS)
        if (isThermalFiresActive && thermalFiresData.length > 0) {
          thermalFiresData.forEach(fire => {
            const pt = projectCoords(fire.coordinates[0], fire.coordinates[1]);
            if (pt.isVisible) {
              const r = Math.min(8, Math.max(3, (fire.frp || 5) * 0.4));
              ctx.fillStyle = '#f97316';
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
              ctx.fill();
              ctx.strokeStyle = '#ef4444';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }

        // Draw Hyperscale Datacenters
        if (isDatacentersActive && datacentersData.length > 0) {
          ctx.fillStyle = '#c084fc';
          datacentersData.slice(0, 180).forEach(dc => {
            const coords = dc.geometry?.coordinates;
            if (coords && typeof coords[0] === 'number' && typeof coords[1] === 'number') {
              const pt = projectCoords(coords[1], coords[0]);
              if (pt.isVisible) {
                ctx.fillRect(pt.x - 2.5, pt.y - 2.5, 5, 5);
              }
            }
          });
        }

        // Draw Inspected 3D Model Target Marker
        if (inspected3DModel) {
          const pt = projectCoords(cameraLat, cameraLng);
          if (pt.isVisible) {
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 2;
            ctx.strokeRect(pt.x - 8, pt.y - 8, 16, 16);
            ctx.fillStyle = '#fef08a';
            ctx.font = '9px monospace';
            ctx.fillText(`3D: ${inspected3DModel.name}`, pt.x + 12, pt.y + 3);
          }
        }

        ctx.restore(); // End globe clip
      }

      // Live Radar Sweep Beam (Rotates across viewport)
      if (isRadarSweepActive) {
        const sweepSpeed = (radarRpm * 360) / (60 * 60); // degrees per frame (60fps)
        radarAngle = (radarAngle + sweepSpeed) % 360;

        // Play radar ping when sweep passes North (0°)
        if (radarAngle < lastPingAngle && !isMuted) {
          tacticalAudio.playRadarPing();
        }
        lastPingAngle = radarAngle;

        const rad = (radarAngle * Math.PI) / 180;
        const sweepLen = Math.max(width, height) * 0.6;
        const endX = centerX + Math.cos(rad) * sweepLen;
        const endY = centerY + Math.sin(rad) * sweepLen;

        const sweepGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, sweepLen);
        const sweepColor = sensorLook === 'NVG' ? 'rgba(74, 222, 128, '
          : sensorLook === 'FLIR' ? 'rgba(244, 63, 94, '
          : sensorLook === 'MATRIX' ? 'rgba(52, 211, 153, '
          : 'rgba(56, 189, 248, ';

        sweepGrad.addColorStop(0, sweepColor + '0.45)');
        sweepGrad.addColorStop(0.8, sweepColor + '0.15)');
        sweepGrad.addColorStop(1, sweepColor + '0.0)');

        ctx.save();
        ctx.strokeStyle = sweepColor + '0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Trailing radar sweep wedge
        ctx.fillStyle = sweepColor + '0.05)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, sweepLen * 0.8, rad - 0.25, rad, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Draw Tactical Heads-Up Display (Crosshairs, Reticles & Brackets)
      if (showHud) {
        ctx.save();
        ctx.strokeStyle = sensorLook === 'NVG' ? 'rgba(74, 222, 128, 0.85)'
          : sensorLook === 'FLIR' ? 'rgba(244, 63, 94, 0.9)'
          : sensorLook === 'MATRIX' ? 'rgba(52, 211, 153, 0.95)'
          : sensorLook === 'NOIR' ? 'rgba(226, 232, 240, 0.8)'
          : 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 1.2;

        // Center crosshair
        const retSize = 22;
        ctx.beginPath();
        ctx.moveTo(centerX - retSize, centerY);
        ctx.lineTo(centerX - 6, centerY);
        ctx.moveTo(centerX + 6, centerY);
        ctx.lineTo(centerX + retSize, centerY);
        ctx.moveTo(centerX, centerY - retSize);
        ctx.lineTo(centerX, centerY - 6);
        ctx.moveTo(centerX, centerY + 6);
        ctx.lineTo(centerX, centerY + retSize);
        ctx.stroke();

        // Corner brackets
        const boxSize = 75;
        const cornerLen = 14;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(centerX - boxSize, centerY - boxSize + cornerLen);
        ctx.lineTo(centerX - boxSize, centerY - boxSize);
        ctx.lineTo(centerX - boxSize + cornerLen, centerY - boxSize);
        // Top-right
        ctx.moveTo(centerX + boxSize - cornerLen, centerY - boxSize);
        ctx.lineTo(centerX + boxSize, centerY - boxSize);
        ctx.lineTo(centerX + boxSize, centerY - boxSize + cornerLen);
        // Bottom-left
        ctx.moveTo(centerX - boxSize, centerY + boxSize - cornerLen);
        ctx.lineTo(centerX - boxSize, centerY + boxSize);
        ctx.lineTo(centerX - boxSize + cornerLen, centerY + boxSize);
        // Bottom-right
        ctx.moveTo(centerX + boxSize - cornerLen, centerY + boxSize);
        ctx.lineTo(centerX + boxSize, centerY + boxSize);
        ctx.lineTo(centerX + boxSize, centerY + boxSize - cornerLen);
        ctx.stroke();

        // Range rings
        ctx.strokeStyle = sensorLook === 'NVG' ? 'rgba(74, 222, 128, 0.2)'
          : sensorLook === 'FLIR' ? 'rgba(244, 63, 94, 0.2)'
          : 'rgba(56, 189, 248, 0.2)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sensorLook, thermalPalette, activeEngine, showHud, layers, heading, aircraftList, vesselsList, satellitesList, isRadarSweepActive, radarRpm, isMuted, isCablesLayerActive, cablesData, isDamsLayerActive, damsData, customGeoData]);

  // Handle Sensor Look switch with sound effect
  const handleSelectSensorLook = (look: SensorLook) => {
    setSensorLook(look);
    tacticalAudio.playOpticClick();
    toast.info(`Sensor Spectrum: ${look} Active`);
  };

  // Export 4K Tactical Recon Snapshot
  const handleExportSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `GODS_EYE_${sensorLook}_${selectedTarget.id}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('4K Reconnaissance Frame Exported to local system storage');
  };

  // Dynamic CSS Filter computed for the 3D container element
  const viewportFilterStyle = useMemo(() => {
    if (sensorLook === 'NORMAL') return 'none';

    if (sensorLook === 'FLIR') {
      if (thermalPalette === 'whitehot') {
        return `grayscale(100%) contrast(${140 + sensorSensitivity * 60}%) brightness(110%)`;
      }
      if (thermalPalette === 'blackhot') {
        return `grayscale(100%) invert(100%) contrast(${140 + sensorSensitivity * 60}%) brightness(95%)`;
      }
      if (thermalPalette === 'rainbow') {
        return `hue-rotate(180deg) saturate(${250 + sensorSensitivity * 100}%) contrast(175%)`;
      }
      // Ironbow Default
      return `hue-rotate(275deg) contrast(${135 + sensorSensitivity * 65}%) saturate(${240 + sensorSensitivity * 110}%) brightness(115%)`;
    }

    if (sensorLook === 'NVG') {
      const gainFactor = Math.min(1.5, sensorGain / 50000);
      return `sepia(100%) hue-rotate(85deg) saturate(650%) contrast(${135 + sensorSensitivity * 40}%) brightness(${115 * gainFactor}%)`;
    }

    if (sensorLook === 'CRT') {
      return `contrast(${130 + sensorSensitivity * 30}%) brightness(108%) saturate(125%)`;
    }

    if (sensorLook === 'MATRIX') {
      return `sepia(100%) hue-rotate(95deg) saturate(850%) contrast(210%) brightness(135%)`;
    }

    if (sensorLook === 'NOIR') {
      return `grayscale(100%) contrast(${160 + sensorSensitivity * 50}%) brightness(92%)`;
    }

    return 'none';
  }, [sensorLook, thermalPalette, sensorSensitivity, sensorGain]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030712] text-slate-100 font-mono select-none overflow-hidden relative">
      
      {/* Top Telemetry & Controls Bar */}
      <header className="h-12 border-b border-cyan-900/40 bg-slate-950/95 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs sm:text-sm font-black tracking-wider text-cyan-400">GOD'S EYE 3D VIEW</span>
          </div>
          <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
            NO PLACE LEFT BEHIND
          </span>
          <span className="text-[11px] text-slate-400 font-bold hidden xl:inline">
            ZULU: <span className="text-amber-400">{zuluTime || 'SYNCING...'}</span>
          </span>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => {
              setActiveEngine('cesium');
              toast.info('Switched to Photorealistic 3D Cesium Engine');
            }}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeEngine === 'cesium'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Photorealistic 3D Globe & Satellite Tiles"
          >
            <Globe className="w-3 h-3" />
            <span className="hidden sm:inline">Cesium 3D</span>
          </button>
          <button
            onClick={() => {
              setActiveEngine('canvas3d');
              toast.info('Switched to High-Performance 3D Vector Engine');
            }}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeEngine === 'canvas3d'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tactical 3D Orbital Canvas Vector Engine"
          >
            <CircleDot className="w-3 h-3" />
            <span className="hidden sm:inline">3D Vector</span>
          </button>
        </div>

        {/* 6 Multi-Spectral Sensor Buttons */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          {(['NORMAL', 'FLIR', 'NVG', 'CRT', 'MATRIX', 'NOIR'] as SensorLook[]).map((look) => (
            <button
              key={look}
              onClick={() => handleSelectSensorLook(look)}
              className={`px-2 py-1 rounded text-[10px] font-black transition-all cursor-pointer ${
                sensorLook === look
                  ? look === 'NVG' ? 'bg-green-600 text-black'
                    : look === 'FLIR' ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                    : look === 'MATRIX' ? 'bg-emerald-400 text-black'
                    : look === 'CRT' ? 'bg-emerald-900 text-emerald-300'
                    : look === 'NOIR' ? 'bg-slate-300 text-black'
                    : 'bg-cyan-500 text-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`Activate ${look} Sensor`}
            >
              {look}
            </button>
          ))}
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          {/* God's Eye Files & Datasets Modal Toggle */}
          <button
            onClick={() => {
              setIsFilesModalOpen(true);
              tacticalAudio.playOpticClick();
            }}
            className="p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-cyan-950/70 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            title="Open God's Eye Repository Files, Intel Dossiers, and Datasets"
          >
            <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-black hidden sm:inline">FILES & DATA</span>
          </button>

          {/* Sensor Tuning Console Toggle */}
          <button
            onClick={() => setIsSensorConsoleOpen(!isSensorConsoleOpen)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${
              isSensorConsoleOpen
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Sensor Suite Controls Drawer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold hidden lg:inline">Sensors</span>
          </button>

          {/* Audio ATC Radio Toggle */}
          <button
            onClick={() => {
              setIsAudioPlaying(!isAudioPlaying);
              toast.info(!isAudioPlaying ? `Tuned to ATC: ${activeRadioChannel.name} (${activeRadioChannel.frequency})` : 'ATC Scanner Disengaged');
            }}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isAudioPlaying 
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Live ATC Radio Stream"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-bold hidden xl:inline">{activeRadioChannel.frequency}</span>
          </button>

          {/* Export Frame */}
          <button
            onClick={handleExportSnapshot}
            className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 transition-all cursor-pointer"
            title="Capture 4K Tactical Recon Snapshot"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Setup / API Key */}
          <button
            onClick={() => setIsPowerUpOpen(true)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Sensor & Geospatial Keys Setup"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Stage Container */}
      <div className="flex-1 relative overflow-hidden flex">
        
        {/* Left Side: Tactical Layers & Targets Console */}
        <aside className="w-72 bg-slate-950/90 backdrop-blur-md border-r border-cyan-900/30 flex flex-col z-20 shrink-0 hidden md:flex">
          {/* Quick Target Fly-To Selector */}
          <div className="p-3 border-b border-cyan-900/30">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Crosshair className="w-3 h-3" />
              Tactical Fly-To Targets
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {STRATEGIC_INSTALLATIONS.map(inst => (
                <button
                  key={inst.id}
                  onClick={() => flyToTarget(inst.coordinates[0], inst.coordinates[1], inst.name, 'installation', inst)}
                  className={`w-full text-left p-1.5 rounded text-[11px] flex items-center justify-between transition-all cursor-pointer ${
                    selectedTarget.id === inst.id
                      ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span className="truncate">{inst.name}</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/30 shrink-0 ml-1">
                    {inst.category.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tactical Layers Filter Switches */}
          <div className="p-3 border-b border-cyan-900/30">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Layers className="w-3 h-3" />
              Surveillance Layers
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => setLayers(l => ({ ...l, aircraft: !l.aircraft }))}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  layers.aircraft ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <Plane className="w-3 h-3" />
                <span>ADS-B ({aircraftList.length})</span>
              </button>
              <button
                onClick={() => setLayers(l => ({ ...l, vessels: !l.vessels }))}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  layers.vessels ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <Ship className="w-3 h-3" />
                <span>AIS ({vesselsList.length})</span>
              </button>
              <button
                onClick={() => setLayers(l => ({ ...l, satellites: !l.satellites }))}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  layers.satellites ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <Satellite className="w-3 h-3" />
                <span>LEO Sat ({satellitesList.length})</span>
              </button>
              <button
                onClick={() => setLayers(l => ({ ...l, earthquakes: !l.earthquakes }))}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  layers.earthquakes ? 'bg-orange-950/60 border-orange-500/40 text-orange-300' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>Seismic ({INITIAL_EARTHQUAKES.length})</span>
              </button>
              <button
                onClick={() => {
                  setIsCablesLayerActive(!isCablesLayerActive);
                  tacticalAudio.playOpticClick();
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  isCablesLayerActive ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="712 Global Undersea Optical Fiber Cables"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Cables ({cablesData.length > 0 ? cablesData.length : 712})</span>
              </button>
              <button
                onClick={() => {
                  setIsLandingPointsActive(!isLandingPointsActive);
                  tacticalAudio.playOpticClick();
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  isLandingPointsActive ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="1,917 Submarine Cable Landing Stations"
              >
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Landing ({landingPointsData.length > 0 ? landingPointsData.length : 1917})</span>
              </button>
              <button
                onClick={() => {
                  setIsThermalFiresActive(!isThermalFiresActive);
                  tacticalAudio.playOpticClick();
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  isThermalFiresActive ? 'bg-orange-950/80 border-orange-400 text-orange-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="NASA FIRMS VIIRS Thermal Fire Hotspots"
              >
                <Flame className="w-3 h-3 text-orange-400" />
                <span>Thermal ({thermalFiresData.length})</span>
              </button>
              <button
                onClick={() => {
                  setIsDatacentersActive(!isDatacentersActive);
                  tacticalAudio.playOpticClick();
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  isDatacentersActive ? 'bg-purple-950/80 border-purple-400 text-purple-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="Hyperscale Global Datacenters"
              >
                <Server className="w-3 h-3 text-purple-400" />
                <span>Data Ctrs ({datacentersData.length > 0 ? datacentersData.length : 350})</span>
              </button>
              <button
                onClick={() => {
                  setIsDamsLayerActive(!isDamsLayerActive);
                  tacticalAudio.playOpticClick();
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  isDamsLayerActive ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="704 Global Strategic Hydroelectric Dams & Reservoirs"
              >
                <Database className="w-3 h-3 text-cyan-400" />
                <span>Dams ({damsData.length > 0 ? damsData.length : 704})</span>
              </button>
              <button
                onClick={() => {
                  setIs3dGlbModelsActive(!is3dGlbModelsActive);
                  tacticalAudio.playOpticClick();
                  toast.info(is3dGlbModelsActive ? '3D GLB Models Disabled: Showing Vector Markers' : '3D GLB Models Activated: High-Poly Aircraft & Ships Engaged');
                }}
                className={`p-1.5 rounded border text-left flex items-center gap-1.5 cursor-pointer ${
                  is3dGlbModelsActive ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
                title="Tactical 3D GLB Models (Boeing 787, MQ-9 Reaper, Bell 206, Container Vessel)"
              >
                <Box className="w-3 h-3 text-amber-400" />
                <span>3D GLB ({TACTICAL_3D_MODELS.length})</span>
              </button>
            </div>

            {/* Quick Button to Explore All Bundled Data Files & Intel Dossiers */}
            <button
              onClick={() => {
                setIsFilesModalOpen(true);
                tacticalAudio.playOpticClick();
              }}
              className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/60 font-black text-[10px] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLORE FILES & DATASETS</span>
            </button>
          </div>

          {/* Public CCTV Surveillance Cameras */}
          <div className="p-3 border-b border-cyan-900/30 flex-1 overflow-y-auto">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Video className="w-3 h-3" />
              Public CCTV Feeds ({SURVEILLANCE_CAMERAS.length})
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SURVEILLANCE_CAMERAS.map(cam => (
                <button
                  key={cam.id}
                  onClick={() => {
                    setSelectedCamera(cam);
                    setIsCctvModalOpen(true);
                  }}
                  className="group relative rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-400 aspect-video text-left cursor-pointer"
                >
                  <img src={cam.snapshotUrl} alt={cam.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                    <span className="text-[9px] font-bold text-white truncate">{cam.city}</span>
                    <span className="text-[8px] text-cyan-300 truncate">{cam.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cockpit Mode Trigger */}
          <div className="p-3 mt-auto border-t border-cyan-900/30 bg-slate-900/40">
            <button
              onClick={() => {
                setIsCockpitMode(!isCockpitMode);
                toast.info(isCockpitMode ? 'Exited Cockpit HUD' : `Cockpit HUD Active: ${trackedAircraft.callsign}`);
              }}
              className={`w-full py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isCockpitMode
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>{isCockpitMode ? 'EXIT COCKPIT HUD' : 'ENTER COCKPIT HUD'}</span>
            </button>
          </div>
        </aside>

        {/* Center: 3D Viewport with Live Sensor Filter Pipeline */}
        <main className="flex-1 relative h-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* Outer Filter Container (Applies selected optical sensor transform to both Cesium and Canvas) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-300"
            style={{ filter: viewportFilterStyle }}
          >
            {/* Cesium 3D Photorealistic Globe Container */}
            <div 
              ref={cesiumContainerRef} 
              className={`absolute inset-0 w-full h-full ${activeEngine === 'cesium' ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'}`} 
            />

            {/* High-Performance 3D Canvas Vector Engine / HUD Overlay */}
            <canvas 
              ref={canvasRef} 
              className={`absolute inset-0 w-full h-full ${activeEngine === 'canvas3d' ? 'cursor-grab active:cursor-grabbing z-0' : 'pointer-events-none z-10'}`}
              onMouseDown={() => setIsAutoOrbiting(false)}
              onMouseUp={() => setIsAutoOrbiting(true)}
            />
          </div>

          {/* Scope Mask (Authentic Circular Dual-Tube Ocular Vignette for NVG / FLIR) */}
          {isScopeMaskActive && (sensorLook === 'NVG' || sensorLook === 'FLIR') && (
            <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
              <div 
                className="w-full h-full"
                style={{
                  background: sensorLook === 'NVG'
                    ? 'radial-gradient(circle at center, transparent 40%, rgba(2, 24, 8, 0.4) 62%, rgba(1, 15, 5, 0.88) 78%, #000 92%)'
                    : 'radial-gradient(circle at center, transparent 42%, rgba(10, 1, 24, 0.4) 65%, rgba(6, 1, 15, 0.85) 80%, #000 94%)'
                }}
              />
            </div>
          )}

          {/* CRT Horizontal Scanlines & Phosphor Grain Overlay */}
          {(sensorLook === 'CRT' || scanlineDensity > 0.4) && (
            <div 
              className="absolute inset-0 pointer-events-none z-16 opacity-35"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.7) 3px)',
                backgroundSize: '100% 3px'
              }}
            />
          )}

          {/* Matrix Wireframe & Telemetry Rain Overlay */}
          {sensorLook === 'MATRIX' && (
            <div className="absolute inset-0 pointer-events-none z-16 opacity-20 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px]" />
          )}

          {/* Cockpit Visor HUD Overlay when Cockpit Mode is active */}
          {isCockpitMode && (
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
              {/* Top visor instruments */}
              <div className="flex justify-between items-start text-emerald-400 font-mono text-xs">
                <div className="bg-black/80 backdrop-blur-md p-2 rounded border border-emerald-500/40">
                  <p className="font-black text-sm">CALLSIGN: {trackedAircraft.callsign}</p>
                  <p>AIRCRAFT: {trackedAircraft.aircraftType}</p>
                  <p>OPERATOR: {trackedAircraft.operator}</p>
                  <p>ROUTE: {trackedAircraft.origin} ➔ {trackedAircraft.destination}</p>
                </div>
                <div className="bg-black/80 backdrop-blur-md p-2 rounded border border-emerald-500/40 text-right">
                  <p className="text-amber-400 font-bold">RADAR SWEEP: ACTIVE</p>
                  <p>IAS: {trackedAircraft.speedKts} KTS (M 0.82)</p>
                  <p>ALT: {trackedAircraft.altitudeFt.toLocaleString()} FT MSL</p>
                  <p>SQUAWK: {trackedAircraft.squawk}</p>
                </div>
              </div>

              {/* Center Cockpit Pitch Ladder & Artificial Horizon */}
              <div className="self-center flex flex-col items-center">
                <div className="w-64 h-[1px] bg-emerald-400/80 mb-2 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-300">PITCH 0°</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                </div>
                <p className="text-[10px] text-emerald-400 font-black mt-2 bg-black/60 px-2 py-0.5 rounded">TERRAIN AVOIDANCE: CLEAR</p>
              </div>

              {/* Bottom Flight Bar */}
              <div className="flex justify-between items-end text-emerald-400 font-mono text-xs">
                <div className="bg-black/80 backdrop-blur-md p-2 rounded border border-emerald-500/40">
                  <p>HDG: {trackedAircraft.headingDeg}° | BANK: 0.0°</p>
                  <p>VERT SPEED: +120 FPM</p>
                </div>
                <div className="bg-black/80 backdrop-blur-md p-2 rounded border border-emerald-500/40 text-right">
                  <p className="text-cyan-400 font-bold">AUTOPILOT: LOCKED (LNAV / VNAV)</p>
                  <p>SATCOM LINK: 99.8%</p>
                </div>
              </div>
            </div>
          )}

          {/* Active Sensor Live Telemetry Badge (Bottom Left) */}
          <div className="absolute bottom-3 left-3 pointer-events-auto z-20 flex flex-col gap-1 bg-black/80 backdrop-blur-md border border-cyan-900/40 rounded-xl p-2.5 text-[10px] text-slate-300 max-w-sm">
            <div className="flex items-center justify-between gap-2 border-b border-cyan-900/40 pb-1">
              <span className="font-black text-cyan-400 flex items-center gap-1.5">
                <ScanLine className="w-3 h-3 text-cyan-400" />
                ACTIVE SENSOR: {sensorLook}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                SENS: {(sensorSensitivity * 100).toFixed(0)}%
              </span>
            </div>

            {sensorLook === 'FLIR' && (
              <div className="space-y-1">
                <p className="text-rose-300 font-bold">LWIR 8-14µm • PALETTE: {thermalPalette.toUpperCase()}</p>
                {/* Ironbow / Thermal Scale Bar */}
                <div className="h-2 rounded w-full bg-gradient-to-r from-black via-purple-700 via-rose-600 via-orange-500 via-yellow-400 to-white" />
                <div className="flex justify-between text-[8px] text-slate-400">
                  <span>-20°C COLD</span>
                  <span>CORE: 88.4°C</span>
                  <span>+180°C HOT</span>
                </div>
              </div>
            )}

            {sensorLook === 'NVG' && (
              <div>
                <p className="text-green-400 font-bold">GEN-3 GaAs • 530nm GREEN PHOSPHOR</p>
                <p className="text-[9px] text-slate-400">PHOTON GAIN: {sensorGain.toLocaleString()}x • AUTO-GATED</p>
              </div>
            )}

            {sensorLook === 'CRT' && (
              <div>
                <p className="text-emerald-400 font-bold">INTERLACED 625 LINES / 50Hz • P43 PHOSPHOR</p>
                <p className="text-[9px] text-slate-400">PERSISTENCE: 1.2s • VIDEO BANDWIDTH: 10MHz</p>
              </div>
            )}

            {sensorLook === 'MATRIX' && (
              <div>
                <p className="text-emerald-300 font-bold">SAR X-BAND 9.6GHz • PULSE DOPPLER</p>
                <p className="text-[9px] text-slate-400">RCS: -12 dBsm • RESOLUTION: 0.25m GMTI</p>
              </div>
            )}

            {sensorLook === 'NOIR' && (
              <div>
                <p className="text-slate-300 font-bold">PANCHROMATIC 400-900nm NIR • GSD 0.31m</p>
                <p className="text-[9px] text-slate-400">HIGH-CONTRAST SATELLITE RECONNAISSANCE</p>
              </div>
            )}

            {sensorLook === 'NORMAL' && (
              <div>
                <p className="text-cyan-300 font-bold">ELECTRO-OPTICAL VISIBLE SPECTRUM (400-700nm)</p>
                <p className="text-[9px] text-slate-400">TRUE-COLOR HIGH DEFINITION SATELLITE IMAGERY</p>
              </div>
            )}
          </div>

          {/* Interactive Sensor Suite Controls Floating Drawer */}
          {isSensorConsoleOpen && (
            <div className="absolute top-3 right-3 pointer-events-auto z-30 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-4 w-80 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
                <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  SENSOR OPTICAL SUITE
                </span>
                <button
                  onClick={() => setIsSensorConsoleOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              {/* Sensitivity Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">Sensor Sensitivity:</span>
                  <span className="text-cyan-400 font-bold">{(sensorSensitivity * 100).toFixed(0)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.05"
                  value={sensorSensitivity}
                  onChange={(e) => setSensorSensitivity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Photon Gain Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">Photon Multiplier (Gain):</span>
                  <span className="text-green-400 font-bold">{(sensorGain).toLocaleString()}x</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="5000"
                  value={sensorGain}
                  onChange={(e) => setSensorGain(parseInt(e.target.value))}
                  className="w-full accent-green-500 cursor-pointer"
                />
              </div>

              {/* Thermal Palette (when FLIR is active) */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-300">Thermal Palette:</span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {(['ironbow', 'whitehot', 'blackhot', 'rainbow'] as ThermalPalette[]).map(pal => (
                    <button
                      key={pal}
                      onClick={() => {
                        setThermalPalette(pal);
                        tacticalAudio.playOpticClick();
                      }}
                      className={`p-1 rounded border capitalize ${
                        thermalPalette === pal
                          ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {pal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Mask & Scanline Toggles */}
              <div className="pt-2 border-t border-cyan-900/30 space-y-2 text-[11px]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">Ocular Scope Keyhole Mask</span>
                  <input
                    type="checkbox"
                    checked={isScopeMaskActive}
                    onChange={(e) => setIsScopeMaskActive(e.target.checked)}
                    className="accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">360° Radar Sweep Active</span>
                  <input
                    type="checkbox"
                    checked={isRadarSweepActive}
                    onChange={(e) => setIsRadarSweepActive(e.target.checked)}
                    className="accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">Tactical Audio & Squelch</span>
                  <input
                    type="checkbox"
                    checked={!isMuted}
                    onChange={(e) => setIsMuted(!e.target.checked)}
                    className="accent-cyan-500"
                  />
                </label>
              </div>
            </div>
          )}
        </main>

        {/* Right Side: Selected Target Recon & Tactical OSINT Panel */}
        <aside className="w-80 bg-slate-950/90 backdrop-blur-md border-l border-cyan-900/30 flex flex-col z-20 shrink-0 hidden lg:flex">
          {/* Target Metadata Card */}
          <div className="p-3 border-b border-cyan-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Target Telemetry
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold uppercase">
                {selectedTarget.type}
              </span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-[11px]">
              <div className="font-bold text-white text-xs truncate">{selectedTarget.name}</div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                <div>LAT: <span className="text-cyan-300 font-bold">{selectedTarget.coordinates[0].toFixed(4)}°</span></div>
                <div>LNG: <span className="text-cyan-300 font-bold">{selectedTarget.coordinates[1].toFixed(4)}°</span></div>
              </div>

              {selectedTarget.type === 'aircraft' && (
                <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                  <p>ALT: <span className="text-amber-400 font-bold">{selectedTarget.data.altitudeFt?.toLocaleString()} FT</span></p>
                  <p>SPEED: <span className="text-emerald-400 font-bold">{selectedTarget.data.speedKts} KTS</span></p>
                  <p>SQUAWK: <span className="text-purple-400 font-bold">{selectedTarget.data.squawk}</span></p>
                  <button
                    onClick={() => {
                      setTrackedAircraft(selectedTarget.data);
                      setIsCockpitMode(true);
                      toast.info(`Cockpit Locked: ${selectedTarget.data.callsign}`);
                    }}
                    className="w-full mt-2 py-1 px-2 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-black text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plane className="w-3 h-3" />
                    Enter Cockpit HUD
                  </button>
                </div>
              )}

              {selectedTarget.type === 'installation' && (
                <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                  <p>SECURITY: <span className="text-red-400 font-bold">{selectedTarget.data.classification}</span></p>
                  <p>ELEVATION: <span className="text-cyan-400 font-bold">{selectedTarget.data.elevationMeters}m MSL</span></p>
                  <p className="text-[9px] text-slate-400 mt-1 line-clamp-2">{selectedTarget.data.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* AI-Powered OSINT Tactical Briefing Section */}
          <div className="p-3 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-cyan-400" />
                OSINT Tactical Briefing
              </span>
              <button
                onClick={handleGenerateBriefing}
                disabled={isLoadingBrief}
                className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-[9px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>{isLoadingBrief ? 'SYNTHESIZING...' : 'TASK AI BRIEF'}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[11px]">
              {tacticalBrief ? (
                <div className="space-y-2">
                  <div className="p-2 rounded bg-red-950/40 border border-red-500/30 flex items-center justify-between">
                    <span className="text-[9px] font-black text-red-400">{tacticalBrief.classification}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-900/60 text-red-200 font-bold">{tacticalBrief.threatLevel}</span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800 space-y-2">
                    <div>
                      <span className="text-[9px] font-bold text-cyan-400 uppercase">Target Assessment:</span>
                      <p className="text-slate-200 mt-0.5 leading-relaxed">{tacticalBrief.targetSummary}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-amber-400 uppercase">Sensor Analysis:</span>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">{tacticalBrief.sensorAnalysis}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase">Traffic & Corridors:</span>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">{tacticalBrief.airSeaTrafficStatus}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-purple-400 uppercase">Tasking Directive:</span>
                      <p className="text-purple-200 mt-0.5 leading-relaxed">{tacticalBrief.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-xl text-slate-400">
                  <ShieldAlert className="w-8 h-8 text-amber-500/60 mb-2" />
                  <p className="text-xs font-bold text-slate-300">Ready for Recon Tasking</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Select any target on Earth and click "TASK AI BRIEF" to synthesize a real-time OSINT intelligence assessment.
                  </p>
                </div>
              )}
            </div>

            {/* Recon Prompt Input Box */}
            <div className="mt-2 pt-2 border-t border-cyan-900/30 flex gap-1">
              <input
                type="text"
                placeholder="Ask intelligence officer about this target..."
                value={briefingQuery}
                onChange={(e) => setBriefingQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateBriefing()}
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleGenerateBriefing}
                disabled={isLoadingBrief}
                className="px-2 bg-cyan-600 hover:bg-cyan-500 text-black rounded text-xs flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* CCTV Live View Modal */}
      {isCctvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 border-b border-cyan-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm font-black text-white">{selectedCamera.name}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                  {selectedCamera.city}, {selectedCamera.country}
                </span>
              </div>
              <button
                onClick={() => setIsCctvModalOpen(false)}
                className="p-1 rounded hover:bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {selectedCamera.feedType === 'mp4' || selectedCamera.streamUrl?.endsWith('.mp4') ? (
                <video 
                  src={selectedCamera.streamUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={selectedCamera.streamUrl} 
                  alt={selectedCamera.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as any).src = selectedCamera.snapshotUrl;
                  }}
                />
              )}
              <div className="absolute top-3 left-3 bg-red-950/80 border border-red-500 px-2 py-0.5 rounded text-[10px] text-red-300 font-bold flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                LIVE SURVEILLANCE FEED
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] text-slate-400 font-mono pointer-events-none">
                FPS: 30.0 | RES: 1080p | SECURE LINK
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 flex justify-between items-center text-xs">
              <span className="text-slate-400">Position: {selectedCamera.coordinates[0].toFixed(4)}°N, {selectedCamera.coordinates[1].toFixed(4)}°W</span>
              <button
                onClick={() => {
                  flyToTarget(selectedCamera.coordinates[0], selectedCamera.coordinates[1], selectedCamera.name, 'cctv', selectedCamera);
                  setIsCctvModalOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs cursor-pointer"
              >
                Fly to Camera Coordinates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings / Power Up Modal for Custom Keys */}
      {isPowerUpOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Geospatial 3D Sensor & Map Setup
              </h3>
              <button
                onClick={() => setIsPowerUpOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Configure optional Cesium Ion or Google Maps 3D Photorealistic Tiles tokens. If left blank, God's Eye 3D View automatically operates using the built-in tactical vector orbital engine and global open satellite feeds.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Cesium Ion Access Token (Optional):</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  value={cesiumToken}
                  onChange={(e) => setCesiumToken(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Google Maps 3D Tiles API Key (Optional):</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={googleApiKey}
                  onChange={(e) => setGoogleApiKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsPowerUpOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('godseye_google_key', googleApiKey);
                  localStorage.setItem('godseye_cesium_token', cesiumToken);
                  setIsPowerUpOpen(false);
                  toast.success('Geospatial Keys Saved — Re-initializing 3D Photorealistic Tiles');
                }}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-xs font-black hover:bg-cyan-400 cursor-pointer"
              >
                Save & Initialize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* God's Eye Repository Files, Intel Dossiers, and Bundled Datasets Modal */}
      <GodsEyeFilesModal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
        onToggleCablesLayer={() => {
          setIsCablesLayerActive(!isCablesLayerActive);
        }}
        onToggleDamsLayer={() => {
          setIsDamsLayerActive(!isDamsLayerActive);
        }}
        onToggleLandingPointsLayer={() => {
          setIsLandingPointsActive(!isLandingPointsActive);
        }}
        onToggleThermalLayer={() => {
          setIsThermalFiresActive(!isThermalFiresActive);
        }}
        onToggleDatacentersLayer={() => {
          setIsDatacentersActive(!isDatacentersActive);
        }}
        onToggle3dModels={() => {
          setIs3dGlbModelsActive(!is3dGlbModelsActive);
        }}
        isCablesLayerActive={isCablesLayerActive}
        isDamsLayerActive={isDamsLayerActive}
        isLandingPointsActive={isLandingPointsActive}
        isThermalLayerActive={isThermalFiresActive}
        isDatacentersLayerActive={isDatacentersActive}
        is3dModelsActive={is3dGlbModelsActive}
        onLoadCustomGeoJson={(data, fileName) => {
          const features = data.features || (data.type === 'Feature' ? [data] : []);
          setCustomGeoData({ name: fileName, features });
          tacticalAudio.playTargetLock();
          toast.success(`Plotted ${features.length} features from "${fileName}" onto 3D Globe`);
        }}
        onSpawn3DModel={(model) => {
          setInspected3DModel(model);
          tacticalAudio.playTargetLock();
          toast.success(`Tactical 3D Model Engaged: ${model.name} (${model.fileSize})`);
          flyToTarget(cameraLat, cameraLng, model.name, 'aircraft', {
            id: model.id,
            name: model.name,
            model3D: model.path,
            category: model.category,
            fileSize: model.fileSize
          });
        }}
      />
    </div>
  );
}
