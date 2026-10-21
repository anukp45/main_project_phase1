import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Building2, 
  AlertTriangle, 
  Flame, 
  Users, 
  CheckCircle2, 
  ShieldAlert, 
  Activity,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Legend 
} from 'recharts';

export const DamageStatsSummary = () => {
  const { incident, buildings, rescueTeams } = useDisaster();

  const total = incident.totalBuildingsSurveyed;
  const severe = incident.damagedCount;
  const partial = incident.partiallyDamagedCount;
  const undamaged = incident.undamagedCount;
  const trapped = incident.estimatedTrapped;

  // Donut chart data for Damage Classification Split
  const pieData = [
    { name: 'Damaged (Red)', value: severe, color: '#ef4444' },
    { name: 'Partially Damaged (Amber)', value: partial, color: '#f59e0b' },
    { name: 'Undamaged (Green)', value: undamaged, color: '#10b981' }
  ];

  // Bar chart data for Criticality by Category
  const categoryData = [
    { category: 'Hospitals', severe: 3, partial: 2, safe: 1 },
    { category: 'Schools', severe: 8, partial: 6, safe: 5 },
    { category: 'Bridges', severe: 1, partial: 3, safe: 4 },
    { category: 'Residential', severe: 310, partial: 290, safe: 450 },
    { category: 'Commercial', severe: 90, partial: 87, safe: 160 }
  ];

  return (
    <div className="space-y-4">
      {/* 4 Primary KPI metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase">Total Surveyed</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{total.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">OpenStreetMap + VHR Tiled</div>
        </div>

        <div className="bg-slate-900 border border-red-900/40 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase text-red-400">Severe Damage</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-red-400">{severe}</div>
          <div className="text-[11px] text-red-300/70 mt-1">
            {((severe / total) * 100).toFixed(1)}% of total evaluated area
          </div>
        </div>

        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase text-amber-400">Partial Failure</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{partial}</div>
          <div className="text-[11px] text-amber-300/70 mt-1">
            {((partial / total) * 100).toFixed(1)}% structural damage
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase text-amber-400">Trapped Estimate</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{trapped}</div>
          <div className="text-[11px] text-slate-500 mt-1">Estimated victim density</div>
        </div>
      </div>

      {/* Visual Analytics Charts: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Damage Split Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Damage Classification Distribution</span>
            <span className="text-[10px] font-mono text-slate-400">ResNet-50</span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-800">
            <div>
              <div className="font-bold text-red-400 font-mono">{severe}</div>
              <div className="text-[10px] text-slate-400">Damaged</div>
            </div>
            <div>
              <div className="font-bold text-amber-400 font-mono">{partial}</div>
              <div className="text-[10px] text-slate-400">Partial</div>
            </div>
            <div>
              <div className="font-bold text-emerald-400 font-mono">{undamaged}</div>
              <div className="text-[10px] text-slate-400">Undamaged</div>
            </div>
          </div>
        </div>

        {/* Structural Criticality Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Impact on Critical Lifelines & Categories</span>
            <span className="text-[10px] font-mono text-slate-400">GEM / OSM Attributes</span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="severe" name="Damaged" fill="#ef4444" radius={[3, 3, 0, 0]} />
                <Bar dataKey="partial" name="Partial" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="safe" name="Undamaged" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
            <span>Special Priority: 3 hospitals damaged or partially disrupted</span>
            <span className="text-red-400 font-semibold">Immediate evacuation mandated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
