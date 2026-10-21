import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Activity, 
  ShieldAlert, 
  Play, 
  RefreshCw, 
  UserCheck, 
  FileText, 
  AlertTriangle,
  ChevronDown,
  Satellite
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole, setRole, ROLES } = useAuth();
  const { 
    incident, 
    isPipelineRunning, 
    runPipelineSimulation, 
    setActiveTab, 
    buildings 
  } = useDisaster();

  const damagedTotal = buildings.filter(b => b.damageStatus === 'Damaged').length;
  const trappedTotal = buildings.reduce((acc, b) => acc + (b.estimatedTrapped || 0), 0);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 shadow-md">
      {/* Brand & Incident Headline */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 shadow-lg shadow-red-500/20">
          <ShieldAlert className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              ResQ<span className="text-red-500">Vision</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-red-950 text-red-400 border border-red-800/80">
              DISASTER ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden md:block">
            AI-Powered Earthquake Damage Assessment & Rescue Prioritization
          </p>
        </div>
      </div>

      {/* Emergency Ticker / Metrics */}
      <div className="hidden lg:flex items-center space-x-6 text-xs font-mono bg-slate-950/70 py-1.5 px-4 rounded-lg border border-slate-800">
        <div className="flex items-center space-x-2">
          <Satellite className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">VHR Optical / SAR:</span>
          <span className="text-emerald-400 font-semibold">Synced</span>
        </div>
        <div className="h-3 w-px bg-slate-800" />
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span className="text-slate-400">Severe Collapses:</span>
          <span className="text-red-400 font-bold">{damagedTotal}</span>
        </div>
        <div className="h-3 w-px bg-slate-800" />
        <div className="flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Trapped Est:</span>
          <span className="text-amber-400 font-bold">{trappedTotal}</span>
        </div>
      </div>

      {/* Action Controls & Role Switcher */}
      <div className="flex items-center space-x-3">
        {/* Pipeline Trigger */}
        <button
          onClick={runPipelineSimulation}
          disabled={isPipelineRunning}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${
            isPipelineRunning
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
          }`}
          title="Run complete ML/XAI pipeline ingestion"
        >
          {isPipelineRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Run Pipeline</span>
            </>
          )}
        </button>

        {/* Quick SITREP Report */}
        <button
          onClick={() => setActiveTab('reports')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <FileText className="w-3.5 h-3.5 text-slate-300" />
          <span className="hidden sm:inline">SITREP</span>
        </button>

        {/* Role-Based Access Dropdown */}
        <div className="relative group">
          <button className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${currentRole.badge}`}>
            <UserCheck className="w-3.5 h-3.5" />
            <div className="text-left hidden sm:block">
              <span className="font-semibold block leading-tight">{currentRole.id}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Role switcher menu */}
          <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 hidden group-hover:block hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Switch Operational Role
            </div>
            {Object.values(ROLES).map((role) => (
              <button
                key={role.id}
                onClick={() => setRole(role.id)}
                className={`w-full text-left px-3 py-2 text-xs transition flex flex-col hover:bg-slate-800/80 ${
                  currentRole.id === role.id ? 'bg-slate-800 font-semibold text-blue-400' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{role.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${role.badge}`}>
                    {role.id}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {role.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
