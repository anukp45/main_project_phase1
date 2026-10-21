import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { useAuth } from '../../context/AuthContext';
import { RouteOptimizer } from './RouteOptimizer';
import { 
  Flame, 
  Sliders, 
  Users, 
  MapPin, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';

export const RescuePrioritizationView = () => {
  const { 
    buildings, 
    setSelectedBuildingId, 
    setActiveTab, 
    updateBuildingStatus, 
    rescueTeams 
  } = useDisaster();
  const { currentRole } = useAuth();

  // Multi-criteria weights (AHP / Decision Support)
  const [weights, setWeights] = useState({
    damage: 40,
    criticality: 30,
    trapped: 20,
    access: 10
  });

  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate dynamic priority score using weights
  const scoredBuildings = buildings.map((bldg) => {
    const normDamage = bldg.damageScore; // 0-100
    const normCriticality = bldg.criticalityWeight * 10; // 0-100
    const normTrapped = Math.min((bldg.estimatedTrapped / 50) * 100, 100); // capped at 50
    const normAccess = bldg.accessibilityRisk.includes('High') ? 85 : bldg.accessibilityRisk.includes('Moderate') ? 50 : 15;

    const dynamicScore = (
      (normDamage * weights.damage +
       normCriticality * weights.criticality +
       normTrapped * weights.trapped +
       normAccess * weights.access) / 100
    ).toFixed(1);

    return {
      ...bldg,
      calculatedScore: parseFloat(dynamicScore)
    };
  });

  // Sort descending by calculated score
  const sortedBuildings = [...scoredBuildings]
    .sort((a, b) => b.calculatedScore - a.calculatedScore)
    .filter((b) => {
      if (filterLevel !== 'ALL' && b.priorityLevel !== filterLevel) return false;
      if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase()) && !b.type.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

  const handleInspectOnMap = (bldgId) => {
    setSelectedBuildingId(bldgId);
    setActiveTab('map');
  };

  const getPriorityBadgeClass = (level) => {
    switch (level) {
      case 'P1': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'P2': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'P3': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>AI Rescue Prioritization Hub</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-700">
                  Box 5 Architecture
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Multi-criteria severity ranking, cluster synthesis, and real-time USAR dispatch routing.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <span className="text-slate-400">Active Operational Role:</span>
          <span className={`font-semibold px-2 py-0.5 rounded border ${currentRole.badge}`}>
            {currentRole.name}
          </span>
        </div>
      </div>

      {/* Decision Support Weights Tuning Drawer (Box 5: Combine damage score, building criticality, accessibility) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm text-white">Multi-Criteria Decision Analysis (AHP Weights)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Total Weight: {weights.damage + weights.criticality + weights.trapped + weights.access}%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Damage Score Weight</span>
              <span className="font-mono font-bold text-red-400">{weights.damage}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.damage}
              onChange={(e) => setWeights({ ...weights, damage: Number(e.target.value) })}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-0.5">SegFormer + ResNet Severity</div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Building Criticality Weight</span>
              <span className="font-mono font-bold text-blue-400">{weights.criticality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.criticality}
              onChange={(e) => setWeights({ ...weights, criticality: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-0.5">Hospitals, Schools, Bridges, Lifelines</div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Trapped Occupants Weight</span>
              <span className="font-mono font-bold text-amber-400">{weights.trapped}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.trapped}
              onChange={(e) => setWeights({ ...weights, trapped: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-0.5">Estimated Victims Density</div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Accessibility Risk Weight</span>
              <span className="font-mono font-bold text-purple-400">{weights.access}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.access}
              onChange={(e) => setWeights({ ...weights, access: Number(e.target.value) })}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-0.5">Road Debris & Hazmat Risk</div>
          </div>
        </div>
      </div>

      {/* Priority Ranked Structures Ledger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-white">Ranked Rescue Targets</h2>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              {sortedBuildings.length} Structures
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search building..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter by Tier */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Tiers</option>
              <option value="P1">P1 Critical</option>
              <option value="P2">P2 High</option>
              <option value="P4">P4 Low/Safe</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank / ID</th>
                <th className="py-3 px-4">Building Name & Type</th>
                <th className="py-3 px-4 text-center">Damage %</th>
                <th className="py-3 px-4 text-center">Criticality</th>
                <th className="py-3 px-4 text-center">Trapped Est.</th>
                <th className="py-3 px-4 text-center">AI Priority Score</th>
                <th className="py-3 px-4">Assigned Team</th>
                <th className="py-3 px-4">Rescue Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {sortedBuildings.map((bldg, idx) => (
                <tr key={bldg.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold">
                    <span className="text-slate-400 mr-2">#{idx + 1}</span>
                    <span className="text-white">{bldg.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{bldg.name}</div>
                    <div className="text-[11px] text-slate-400">{bldg.type}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-mono font-bold ${
                      bldg.damageClass === 'severe' ? 'text-red-400' :
                      bldg.damageClass === 'partial' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {bldg.damageScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-blue-300">
                    {bldg.criticalityWeight}/10
                  </td>
                  <td className="py-3 px-4 text-center">
                    {bldg.estimatedTrapped > 0 ? (
                      <span className="font-bold text-red-400 font-mono">
                        {bldg.estimatedTrapped}
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono">0</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityBadgeClass(bldg.priorityLevel)}`}>
                        {bldg.priorityLevel} ({bldg.calculatedScore})
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={bldg.assignedTeam || 'Pending Assignment'}
                      onChange={(e) => updateBuildingStatus(bldg.id, bldg.rescueStatus, e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
                    >
                      <option value="Pending Assignment">Pending Assignment</option>
                      {rescueTeams.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      bldg.rescueStatus.includes('Extrication') ? 'bg-red-950 text-red-300 border border-red-800' :
                      bldg.rescueStatus.includes('Dispatched') ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      bldg.rescueStatus.includes('Safe') ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {bldg.rescueStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleInspectOnMap(bldg.id)}
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition inline-flex items-center space-x-1"
                      title="Inspect on GIS Map"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px] font-semibold">GIS</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Route Guidance Component */}
      <RouteOptimizer />

      {/* Active USAR Squads Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white flex items-center mb-3">
          <Truck className="w-5 h-5 mr-2 text-blue-400" />
          Field Rescue Squads Real-Time Telemetry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {rescueTeams.map(team => (
            <div key={team.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">{team.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">
                  {team.radioChannel}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Lead: {team.lead} • {team.members} Personnel</div>
              <div className="text-[10px] text-slate-500 mt-1">{team.specialty}</div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-medium">{team.status}</span>
                <span className="font-mono text-slate-400 text-[10px]">Battery: {team.battery}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
