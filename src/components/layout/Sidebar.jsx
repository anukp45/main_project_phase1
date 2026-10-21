import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Map, 
  Eye, 
  Flame, 
  Workflow, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  AlertOctagon,
  Users
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, buildings, rescueTeams } = useDisaster();

  const totalBuildings = buildings.length;
  const severeCount = buildings.filter(b => b.damageClass === 'severe').length;
  const partialCount = buildings.filter(b => b.damageClass === 'partial').length;
  const intactCount = buildings.filter(b => b.damageClass === 'undamaged').length;

  const navItems = [
    {
      id: 'map',
      label: 'GIS Map Studio',
      badge: 'Live',
      icon: Map,
      description: 'Satellite & Damage Layers'
    },
    {
      id: 'xai',
      label: 'Explainable AI',
      badge: 'Grad-CAM',
      icon: Eye,
      description: 'Saliency & SHAP Insights'
    },
    {
      id: 'rescue',
      label: 'Rescue Priority',
      badge: 'P1-P3',
      icon: Flame,
      description: 'Decision Support & Routes'
    },
    {
      id: 'pipeline',
      label: 'Pipeline Engine',
      badge: '6 Stages',
      icon: Workflow,
      description: 'End-to-End Deep Learning'
    },
    {
      id: 'reports',
      label: 'Reports & SITREP',
      badge: 'CSV/PDF',
      icon: BarChart3,
      description: 'Incident Analytics Ledger'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] z-20">
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
          Command Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                <div>
                  <div className="leading-tight">{item.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold ${
                  isActive
                    ? 'bg-blue-700/80 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary KPI Panel at Bottom of Sidebar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Sector 4 Triage
          </span>
          <span className="flex items-center text-[10px] text-emerald-400 font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center mb-2.5">
          <div className="bg-red-950/40 border border-red-900/50 rounded-lg p-1.5">
            <div className="text-red-400 font-bold text-sm font-mono">{severeCount}</div>
            <div className="text-[9px] text-red-300/80 uppercase font-medium">Damaged</div>
          </div>
          <div className="bg-amber-950/40 border border-amber-900/50 rounded-lg p-1.5">
            <div className="text-amber-400 font-bold text-sm font-mono">{partialCount}</div>
            <div className="text-[9px] text-amber-300/80 uppercase font-medium">Partial</div>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-lg p-1.5">
            <div className="text-emerald-400 font-bold text-sm font-mono">{intactCount}</div>
            <div className="text-[9px] text-emerald-300/80 uppercase font-medium">Intact</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
          <span className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            USAR Teams Deployed
          </span>
          <span className="font-bold text-slate-200 font-mono">{rescueTeams.length}</span>
        </div>
      </div>
    </aside>
  );
};
