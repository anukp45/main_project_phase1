import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Filter, 
  MapPin, 
  Route, 
  Truck, 
  CircleDot, 
  Satellite 
} from 'lucide-react';

export const LayerControl = ({ baseLayer, setBaseLayer }) => {
  const { 
    visibleLayers, 
    toggleLayer, 
    filterDamage, 
    setFilterDamage, 
    filterPriority, 
    setFilterPriority 
  } = useDisaster();

  return (
    <div className="absolute top-4 left-4 z-[1000] w-80 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-4 text-slate-100 text-xs">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800">
        <span className="font-bold flex items-center text-sm text-white">
          <Layers className="w-4 h-4 mr-2 text-blue-400" />
          GIS Layer Controls
        </span>
        <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-300">
          OSM / VHR
        </span>
      </div>

      {/* Base Map Switcher */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 flex items-center">
          <Satellite className="w-3 h-3 mr-1 text-slate-400" />
          Basemap Imagery
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setBaseLayer('satellite')}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border text-center transition ${
              baseLayer === 'satellite'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            Satellite (WorldView)
          </button>
          <button
            onClick={() => setBaseLayer('osm')}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border text-center transition ${
              baseLayer === 'osm'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            Dark Vector (OSM)
          </button>
        </div>
      </div>

      {/* Filter by Damage State */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Damage Filter</span>
          <span className="text-[10px] text-slate-400 font-mono">Box 3.2</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {['ALL', 'Damaged', 'Partially Damaged', 'Undamaged'].map((cls) => {
            const isSelected = filterDamage === cls;
            return (
              <button
                key={cls}
                onClick={() => setFilterDamage(cls)}
                className={`py-1 px-1 rounded text-[10px] font-medium border text-center transition truncate ${
                  isSelected
                    ? cls === 'Damaged'
                      ? 'bg-red-600 text-white border-red-500'
                      : cls === 'Partially Damaged'
                      ? 'bg-amber-600 text-white border-amber-500'
                      : cls === 'Undamaged'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title={cls}
              >
                {cls === 'Partially Damaged' ? 'Partial' : cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Priority Tier */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Rescue Priority Tier</span>
          <span className="text-[10px] text-slate-400 font-mono">Box 5</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {['ALL', 'P1', 'P2', 'P4'].map((p) => {
            const isSelected = filterPriority === p;
            return (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`py-1 px-1.5 rounded text-[10px] font-mono font-medium border text-center transition ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {p === 'P4' ? 'P4 (Safe)' : p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Visibility Toggles */}
      <div>
        <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5">
          Map Feature Overlays
        </div>
        <div className="space-y-1">
          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500 mr-2" />
              Building Footprints (Polygons)
            </span>
            <input
              type="checkbox"
              checked={visibleLayers.damagePolygons}
              onChange={() => toggleLayer('damagePolygons')}
              className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition">
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 text-blue-400 mr-2" />
              Critical Facilities (Hospitals, etc.)
            </span>
            <input
              type="checkbox"
              checked={visibleLayers.criticalIcons}
              onChange={() => toggleLayer('criticalIcons')}
              className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition">
            <span className="flex items-center">
              <Route className="w-3.5 h-3.5 text-emerald-400 mr-2" />
              Rescue Routes & Obstructions
            </span>
            <input
              type="checkbox"
              checked={visibleLayers.rescueRoutes}
              onChange={() => toggleLayer('rescueRoutes')}
              className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition">
            <span className="flex items-center">
              <CircleDot className="w-3.5 h-3.5 text-amber-400 mr-2" />
              High-Risk Rescue Clusters
            </span>
            <input
              type="checkbox"
              checked={visibleLayers.rescueClusters}
              onChange={() => toggleLayer('rescueClusters')}
              className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition">
            <span className="flex items-center">
              <Truck className="w-3.5 h-3.5 text-blue-400 mr-2" />
              Live USAR Squads Tracking
            </span>
            <input
              type="checkbox"
              checked={visibleLayers.teamMarkers}
              onChange={() => toggleLayer('teamMarkers')}
              className="rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
