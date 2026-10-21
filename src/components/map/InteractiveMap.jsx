import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Marker, 
  Popup, 
  Polyline, 
  Circle, 
  Tooltip 
} from 'react-leaflet';
import L from 'leaflet';
import { useDisaster } from '../../context/DisasterContext';
import { LayerControl } from './LayerControl';
import { BuildingModal } from './BuildingModal';
import { 
  Building2, 
  AlertCircle, 
  Flame, 
  HeartHandshake, 
  ShieldCheck, 
  Radio, 
  Navigation 
} from 'lucide-react';

// Custom Leaflet DivIcons to ensure crisp rendering and no 404 image errors
const createCustomIcon = (bgColor, iconChar, isPulsing = false) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center">
        ${isPulsing ? '<span class="absolute inline-flex h-8 w-8 rounded-full bg-red-500 opacity-60 animate-ping"></span>' : ''}
        <div style="background-color: ${bgColor}" class="relative w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold font-mono">
          ${iconChar}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

const createTeamIcon = (teamName) => {
  return L.divIcon({
    className: 'custom-team-icon',
    html: `
      <div class="flex items-center space-x-1.5 bg-blue-900/90 text-blue-200 border border-blue-400/80 rounded-full px-2.5 py-1 shadow-xl backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        <span class="text-[10px] font-bold font-mono whitespace-nowrap text-white">${teamName}</span>
      </div>
    `,
    iconSize: [120, 24],
    iconAnchor: [60, 12]
  });
};

export const InteractiveMap = () => {
  const { 
    buildings, 
    selectedBuilding, 
    selectedBuildingId, 
    setSelectedBuildingId, 
    rescueTeams, 
    rescueClusters, 
    rescueRoutes, 
    visibleLayers, 
    filterDamage, 
    filterPriority 
  } = useDisaster();

  const [baseLayer, setBaseLayer] = useState('satellite'); // 'satellite' or 'osm'
  const [showModal, setShowModal] = useState(true);

  // Center coordinate of sector
  const defaultCenter = [36.2025, 36.1605];

  // Filtering buildings according to active filters
  const filteredBuildings = buildings.filter(bldg => {
    if (filterDamage !== 'ALL' && bldg.damageStatus !== filterDamage) return false;
    if (filterPriority !== 'ALL' && bldg.priorityLevel !== filterPriority) return false;
    return true;
  });

  const getPolygonStyle = (bldg) => {
    const isSelected = bldg.id === selectedBuildingId;
    let color = '#10b981';
    let fillColor = '#10b981';

    if (bldg.damageClass === 'severe') {
      color = '#ef4444';
      fillColor = '#ef4444';
    } else if (bldg.damageClass === 'partial') {
      color = '#f59e0b';
      fillColor = '#f59e0b';
    }

    return {
      color: isSelected ? '#38bdf8' : color,
      weight: isSelected ? 3.5 : 2,
      opacity: 0.9,
      fillColor: fillColor,
      fillOpacity: isSelected ? 0.75 : 0.45,
      dashArray: isSelected ? '4, 4' : null
    };
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      {/* Map Layer Controls floating top-left */}
      <LayerControl baseLayer={baseLayer} setBaseLayer={setBaseLayer} />

      {/* Floating Building Dossier Modal top-right */}
      {showModal && selectedBuilding && (
        <BuildingModal 
          building={selectedBuilding} 
          onClose={() => setShowModal(false)} 
        />
      )}

      {/* Quick Map Legend bottom-left */}
      <div className="absolute bottom-6 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3.5 py-2.5 shadow-xl text-xs text-slate-300 flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded bg-red-500 shadow-sm shadow-red-500/50" />
          <span className="text-[11px] font-medium text-slate-200">Damaged (High Risk)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded bg-amber-500 shadow-sm shadow-amber-500/50" />
          <span className="text-[11px] font-medium text-slate-200">Partially Damaged</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span className="text-[11px] font-medium text-slate-200">Undamaged / Safe</span>
        </div>
        <div className="h-3 w-px bg-slate-700" />
        <div className="flex items-center space-x-1.5 text-blue-400">
          <Radio className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono">GPS Ground Units</span>
        </div>
      </div>

      {/* Open/Reopen Modal Button if dismissed */}
      {!showModal && selectedBuilding && (
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-4 right-4 z-[1000] bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl transition flex items-center space-x-2"
        >
          <Building2 className="w-4 h-4" />
          <span>View {selectedBuilding.name} Dossier</span>
        </button>
      )}

      {/* Leaflet Map */}
      <MapContainer
        center={defaultCenter}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Base Tile Layer */}
        {baseLayer === 'satellite' ? (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; World Imagery 0.3m'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &mdash; Dark Matter'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
        )}

        {/* Rescue Clusters (P1 & P2 Heat Perimeters) */}
        {visibleLayers.rescueClusters && rescueClusters.map(cluster => (
          <Circle
            key={cluster.clusterId}
            center={cluster.center}
            radius={cluster.radiusMeters}
            pathOptions={{
              color: cluster.priority.includes('P1') ? '#ef4444' : '#f59e0b',
              fillColor: cluster.priority.includes('P1') ? '#ef4444' : '#f59e0b',
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: '6, 6'
            }}
          >
            <Tooltip direction="top" opacity={0.9} sticky>
              <div className="font-semibold text-xs text-white">{cluster.name}</div>
              <div className="text-[10px] text-red-300">{cluster.priority} • Est. {cluster.trappedEstimated} Trapped</div>
            </Tooltip>
          </Circle>
        ))}

        {/* Rescue Routes & Road Blockages */}
        {visibleLayers.rescueRoutes && rescueRoutes.map(route => (
          <Polyline
            key={route.id}
            positions={route.points}
            pathOptions={{
              color: route.color,
              weight: route.status === 'CLEAR' ? 4 : 3,
              dashArray: route.dashArray || null,
              opacity: 0.85
            }}
          >
            <Tooltip direction="center" opacity={0.9} sticky>
              <div className="text-xs font-bold text-white">{route.name}</div>
              <div className="text-[10px] text-slate-200">
                Status: <span className="font-semibold">{route.status}</span> ({route.distanceKm})
              </div>
              <div className="text-[10px] text-slate-300">{route.notes}</div>
            </Tooltip>
          </Polyline>
        ))}

        {/* Evaluated Building Footprint Polygons */}
        {visibleLayers.damagePolygons && filteredBuildings.map(bldg => (
          <Polygon
            key={bldg.id}
            positions={bldg.polygon}
            pathOptions={getPolygonStyle(bldg)}
            eventHandlers={{
              click: () => {
                setSelectedBuildingId(bldg.id);
                setShowModal(true);
              }
            }}
          >
            <Tooltip direction="top" opacity={0.95}>
              <div className="p-1">
                <div className="font-bold text-xs text-white">{bldg.name}</div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  <span className={`font-semibold ${
                    bldg.damageClass === 'severe' ? 'text-red-400' :
                    bldg.damageClass === 'partial' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {bldg.damageStatus} ({bldg.damageScore}%)
                  </span>
                  {' • '}{bldg.priorityLevel} Priority
                </div>
                {bldg.estimatedTrapped > 0 && (
                  <div className="text-[10px] text-red-400 font-semibold mt-0.5">
                    🚨 Est. {bldg.estimatedTrapped} Trapped Occupants
                  </div>
                )}
              </div>
            </Tooltip>
          </Polygon>
        ))}

        {/* Critical Facilities Markers */}
        {visibleLayers.criticalIcons && filteredBuildings
          .filter(b => b.criticalityWeight >= 8)
          .map(bldg => {
            const isSevere = bldg.damageClass === 'severe';
            const iconChar = bldg.type === 'Hospital' ? '🏥' : bldg.type === 'School' ? '🏫' : bldg.type === 'Emergency Services' ? '🚒' : '🌉';
            const iconColor = isSevere ? '#dc2626' : bldg.damageClass === 'partial' ? '#d97706' : '#059669';

            return (
              <Marker
                key={`marker-${bldg.id}`}
                position={bldg.coordinates}
                icon={createCustomIcon(iconColor, iconChar, isSevere)}
                eventHandlers={{
                  click: () => {
                    setSelectedBuildingId(bldg.id);
                    setShowModal(true);
                  }
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <div className="font-bold text-white">{bldg.name}</div>
                    <div className="text-slate-300 text-[11px] mt-1">{bldg.category}</div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="font-mono text-red-400 font-bold">{bldg.damageScore}% Damage</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-amber-300 font-semibold">{bldg.priorityLevel} Tier</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* Live Rescue Team Markers */}
        {visibleLayers.teamMarkers && rescueTeams.map(team => (
          <Marker
            key={team.id}
            position={team.coordinates}
            icon={createTeamIcon(team.name)}
          >
            <Popup>
              <div className="p-1.5 text-xs text-slate-100">
                <div className="font-bold text-blue-400">{team.name}</div>
                <div className="text-slate-300 text-[11px] mt-0.5">Leader: {team.lead} ({team.members} members)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Specialty: {team.specialty}</div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] bg-slate-800 px-2 py-1 rounded">
                  <span className="text-emerald-400 font-medium">Status: {team.status}</span>
                  <span className="font-mono text-slate-300">Bat: {team.battery}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
