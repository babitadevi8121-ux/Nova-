import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TrackResult } from './NumberTracker';
import { Layers, Crosshair, MapPin, ZoomIn, ZoomOut, ExternalLink, RefreshCw, Compass, Radio, Activity, Signal } from 'lucide-react';

interface InteractiveMapProps {
  result: TrackResult;
}

type MapTheme = 'dark' | 'street' | 'voyager';

const TILE_SERVERS: Record<MapTheme, { url: string; attribution: string; name: string }> = {
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    name: 'Dark Cyber'
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    name: 'OpenStreet'
  },
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    name: 'Voyager'
  }
};

export default function InteractiveMap({ result }: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  const [activeTheme, setActiveTheme] = useState<MapTheme>('dark');
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [isPinging, setIsPinging] = useState<boolean>(true);
  const [pingPos, setPingPos] = useState<{ x: number; y: number } | null>(null);
  const [pingCount, setPingCount] = useState<number>(1);
  const [rssi, setRssi] = useState<number>(-67);

  const { latitude, longitude, formattedNumber, carrier, flag, city, country, formattedFullAddress, ipAddress, accuracyRadiusKm, btsTowerLocation } = result;

  // Real-time ping counter simulation interval
  useEffect(() => {
    if (!isPinging) return;
    const interval = setInterval(() => {
      setPingCount(prev => prev + 1);
      // Slightly fluctuate signal strength for realism
      setRssi(-65 - Math.floor(Math.random() * 8));
    }, 1500);
    return () => clearInterval(interval);
  }, [isPinging]);

  // Sync ping point with Leaflet Map coordinates
  const syncPingPosition = () => {
    if (mapInstanceRef.current) {
      try {
        const point = mapInstanceRef.current.latLngToContainerPoint([latitude, longitude]);
        setPingPos({ x: point.x, y: point.y });
      } catch (err) {
        // Map container may be unmounting
      }
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous map instance if re-initializing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 13,
      zoomControl: false, // We supply clean custom overlay controls
    });

    mapInstanceRef.current = map;

    // Set initial Tile Layer
    const tileConfig = TILE_SERVERS[activeTheme];
    const tileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: 19,
      attribution: tileConfig.attribution
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Create Custom Pulse Pin DivIcon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute w-12 h-12 bg-indigo-500/30 rounded-full animate-ping pointer-events-none"></div>
          <div class="absolute w-8 h-8 bg-indigo-600/60 rounded-full animate-pulse border border-indigo-400"></div>
          <div class="relative z-10 w-5 h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
            <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    // Create Marker
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    markerRef.current = marker;

    // Popup Content
    const popupHtml = `
      <div style="font-family: sans-serif; padding: 4px; color: #0f172a; min-width: 220px;">
        <div style="display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 13px; margin-bottom: 4px;">
          <span>${flag}</span>
          <span>${formattedNumber}</span>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
          <strong>Carrier:</strong> ${carrier}<br/>
          <strong>Gateway IP:</strong> ${ipAddress}
        </div>
        <div style="font-size: 11px; background: #f1f5f9; padding: 6px; border-radius: 6px; border: 1px solid #cbd5e1; margin-bottom: 6px;">
          <strong>Address:</strong><br/>
          ${formattedFullAddress}
        </div>
        <div style="font-size: 10px; color: #64748b; font-family: monospace;">
          LAT: ${latitude.toFixed(4)} | LON: ${longitude.toFixed(4)}
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, {
      className: 'custom-leaflet-popup'
    }).openPopup();

    // Accuracy Circle (~2.5km)
    const circle = L.circle([latitude, longitude], {
      color: '#6366f1',
      fillColor: '#818cf8',
      fillOpacity: 0.15,
      radius: (accuracyRadiusKm || 2.5) * 1000
    }).addTo(map);

    circleRef.current = circle;

    // Track Zoom & Map Move for Ping Ring Synchronization
    const handleMapEvents = () => {
      setZoomLevel(map.getZoom());
      syncPingPosition();
    };

    map.on('zoomend move viewreset resize', handleMapEvents);

    // Initial positioning calculation
    syncPingPosition();

    // Invalidate size shortly after render to guarantee full tile loading without black borders
    const timer = setTimeout(() => {
      map.invalidateSize();
      syncPingPosition();
    }, 250);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  // Update Tile Theme
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const tileConfig = TILE_SERVERS[activeTheme];
    const newLayer = L.tileLayer(tileConfig.url, {
      maxZoom: 19,
      attribution: tileConfig.attribution
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [activeTheme]);

  // Map Navigation Handlers
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([latitude, longitude], 14, {
      duration: 1.2
    });
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
      
      {/* Inline styles for custom radar wave keyframes */}
      <style>{`
        @keyframes wave-pulse-expand {
          0% {
            transform: scale(0.1);
            opacity: 0.9;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }
        @keyframes radar-sweep-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-wave-ring-1 {
          animation: wave-pulse-expand 3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .animate-wave-ring-2 {
          animation: wave-pulse-expand 3s cubic-bezier(0, 0.2, 0.8, 1) infinite 1s;
        }
        .animate-wave-ring-3 {
          animation: wave-pulse-expand 3s cubic-bezier(0, 0.2, 0.8, 1) infinite 2s;
        }
        .animate-radar-sweep {
          animation: radar-sweep-rotate 4s linear infinite;
        }
      `}</style>

      {/* Top Map Control Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left Status Badge + Tower Ping Toggle */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-200 shadow-xl">
          <button
            onClick={() => setIsPinging(!isPinging)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
              isPinging
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isPinging ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>TOWER PING: {isPinging ? 'ACTIVE 📡' : 'PAUSED'}</span>
          </button>
          
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">{city}, {country}</span>
        </div>

        {/* Right Theme Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl">
          {(['dark', 'street', 'voyager'] as MapTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                activeTheme === theme
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {TILE_SERVERS[theme].name}
            </button>
          ))}
        </div>

      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 z-1" />

      {/* Active Tower Ping Pulse SVG Overlay */}
      {isPinging && pingPos && (
        <div className="absolute inset-0 pointer-events-none z-[500] overflow-hidden">
          {/* Target Tower Center Container */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-64 h-64"
            style={{ left: `${pingPos.x}px`, top: `${pingPos.y}px` }}
          >
            {/* Concentric Pulsing Wave Rings */}
            <div className="absolute w-24 h-24 rounded-full border-2 border-emerald-400/80 bg-emerald-500/10 animate-wave-ring-1" />
            <div className="absolute w-24 h-24 rounded-full border-2 border-indigo-400/80 bg-indigo-500/10 animate-wave-ring-2" />
            <div className="absolute w-24 h-24 rounded-full border-2 border-purple-400/70 bg-purple-500/10 animate-wave-ring-3" />

            {/* Rotating Radar Scanner Cone Overlay */}
            <div className="absolute w-52 h-52 rounded-full border border-emerald-500/30 animate-radar-sweep opacity-40 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.3)_360deg)]" />

            {/* Tower Crosshair Orbit HUD Marker */}
            <div className="absolute w-40 h-40 rounded-full border border-dashed border-indigo-400/30 animate-spin opacity-60" style={{ animationDuration: '20s' }} />
          </div>
        </div>
      )}

      {/* Top Banner Ping Telemetry HUD Overlay */}
      {isPinging && (
        <div className="absolute top-14 left-3 z-[1000] pointer-events-none hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-indigo-500/30 text-[10px] font-mono shadow-2xl text-slate-200">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>PING #{pingCount}</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">RSSI: {rssi} dBm</span>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-300">5G NR Band n78</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300">BTS: {btsTowerLocation}</span>
        </div>
      )}

      {/* Right Navigation Control Floating Buttons */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleRecenter}
          title="Recenter Target"
          className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-800 shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Left Coordinate Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] pointer-events-auto hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          <span>LAT: <strong className="text-white">{latitude.toFixed(4)}</strong></span>
          <span>LON: <strong className="text-white">{longitude.toFixed(4)}</strong></span>
        </div>
        <span className="text-slate-600">|</span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(formattedFullAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
        >
          <span>Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
