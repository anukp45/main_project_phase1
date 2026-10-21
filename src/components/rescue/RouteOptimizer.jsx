import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  CornerDownRight 
} from 'lucide-react';

export const RouteOptimizer = () => {
  const { rescueRoutes, setActiveTab } = useDisaster();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-emerald-400" />
            AI Dynamic Route Guidance & Corridor Clearance
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dijkstra-based shortest safe route calculation avoiding 14 identified building debris blockages.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('map')}
          className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
        >
          <span>View on GIS Map</span>
          <CornerDownRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {rescueRoutes.map((route) => {
          const isClear = route.status === 'CLEAR';
          const isBlocked = route.status === 'BLOCKED';
          const isRestricted = route.status === 'RESTRICTED';

          return (
            <div
              key={route.id}
              className={`p-4 rounded-xl border transition-all ${
                isClear
                  ? 'bg-emerald-950/20 border-emerald-800/60'
                  : isBlocked
                  ? 'bg-red-950/20 border-red-800/60'
                  : 'bg-amber-950/20 border-amber-800/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{route.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        isClear
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : isBlocked
                          ? 'bg-red-500/20 text-red-400 border-red-500/40'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{route.notes}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-white">{route.distanceKm}</div>
                  {route.estTimeMinutes && (
                    <div className="text-[11px] text-slate-400 flex items-center justify-end mt-0.5">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      ~{route.estTimeMinutes} mins
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {route.points.length} Waypoints evaluated
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {isClear ? '✅ Bulldozer Verified' : isBlocked ? '❌ Impassable Rubble' : '⚠️ Heavy Truck Restricted'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
