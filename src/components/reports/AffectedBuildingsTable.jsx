import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Download, 
  Printer, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  MapPin, 
  Eye, 
  ExternalLink,
  ShieldAlert,
  FileText
} from 'lucide-react';

export const AffectedBuildingsTable = () => {
  const { buildings, setSelectedBuildingId, setActiveTab } = useDisaster();

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [showSitrepModal, setShowSitrepModal] = useState(false);

  const filtered = buildings.filter((b) => {
    if (filterClass !== 'ALL' && b.damageStatus !== filterClass) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.type.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = [
      "Building_ID",
      "Building_Name",
      "Type",
      "Category",
      "Damage_Status",
      "Damage_Score_Pct",
      "Priority_Level",
      "Criticality_Weight",
      "Estimated_Trapped",
      "Estimated_Occupancy",
      "Accessibility_Risk",
      "Assigned_Team",
      "Rescue_Status",
      "Latitude",
      "Longitude"
    ];

    const rows = filtered.map((b) => [
      b.id,
      `"${b.name.replace(/"/g, '""')}"`,
      b.type,
      `"${b.category}"`,
      b.damageStatus,
      b.damageScore,
      b.priorityLevel,
      b.criticalityWeight,
      b.estimatedTrapped,
      b.estimatedOccupancy,
      `"${b.accessibilityRisk.replace(/"/g, '""')}"`,
      `"${b.assignedTeam || 'None'}"`,
      `"${b.rescueStatus}"`,
      b.coordinates[0],
      b.coordinates[1]
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ResQVision_Damage_Assessment_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInspectMap = (id) => {
    setSelectedBuildingId(id);
    setActiveTab('map');
  };

  const handleInspectXAI = (id) => {
    setSelectedBuildingId(id);
    setActiveTab('xai');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* Table Header and Export Action Bar */}
      <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center">
            <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-400" />
            Affected Structures Master Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed inspection records, geospatial coordinates, and triage priority.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Damage States</option>
            <option value="Damaged">Damaged (Red)</option>
            <option value="Partially Damaged">Partially Damaged (Yellow)</option>
            <option value="Undamaged">Undamaged (Green)</option>
          </select>

          {/* CSV Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* SITREP Preview Modal Trigger */}
          <button
            onClick={() => setShowSitrepModal(true)}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>SITREP Report</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-center">Damage Class</th>
              <th className="py-3 px-4 text-center">Severity %</th>
              <th className="py-3 px-4 text-center">Priority</th>
              <th className="py-3 px-4 text-center">Trapped</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((bldg) => (
              <tr key={bldg.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono font-bold text-white">{bldg.id}</td>
                <td className="py-3 px-4 font-medium text-white">{bldg.name}</td>
                <td className="py-3 px-4 text-slate-400">{bldg.type}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                    bldg.damageClass === 'severe' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                    bldg.damageClass === 'partial' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {bldg.damageStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold">
                  {bldg.damageScore}%
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold text-amber-300">
                  {bldg.priorityLevel}
                </td>
                <td className="py-3 px-4 text-center font-mono">
                  {bldg.estimatedTrapped > 0 ? (
                    <span className="text-red-400 font-bold">{bldg.estimatedTrapped}</span>
                  ) : (
                    <span className="text-slate-500">0</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-[11px] text-slate-300">{bldg.rescueStatus}</span>
                </td>
                <td className="py-3 px-4 text-right space-x-1.5">
                  <button
                    onClick={() => handleInspectMap(bldg.id)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
                    title="View on Map"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleInspectXAI(bldg.id)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-400 transition"
                    title="View XAI Heatmap"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SITREP Printable Report Modal */}
      {showSitrepModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base text-white">
                  ResQVision Emergency Situation Report (SITREP)
                </h3>
              </div>
              <button
                onClick={() => setShowSitrepModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="font-mono text-[11px] text-slate-400 uppercase">Incident Title</div>
                <div className="font-bold text-sm text-white">Antakya Sector 4 Seismic Response (M7.8 Mw)</div>
                <div className="text-slate-400 mt-0.5">Report Generated: {new Date().toUTCString()}</div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase text-[11px] mb-1">Executive Summary</h4>
                <p className="text-slate-300">
                  AI-driven deep learning models (SegFormer-B4 and ResNet-50) evaluated 1,420 building structures via high-resolution satellite imagery (WorldView-3 0.3m) and Sentinel-1 SAR coherence. A total of 412 structures exhibit catastrophic collapse (Red), 388 have severe partial failure (Yellow), and 620 are structurally intact (Green).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase text-[11px] mb-1">Critical Lifelines at Risk</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>BLDG-001 (Hatay Maternity Hospital):</strong> 94% damage, 42 estimated trapped. P1 Critical.</li>
                  <li><strong>BLDG-002 (Atatürk Secondary School):</strong> 89% damage, 28 estimated trapped. P1 Critical.</li>
                  <li><strong>BLDG-006 (Asi River Bridge):</strong> Abutment fracture, closed for heavy trucks.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase text-[11px] mb-1">Field Search & Rescue Deployments</h4>
                <p className="text-slate-300">
                  4 specialized USAR squads deployed under Dijkstra optimal routing corridors. Route A (via Inonu Blvd) cleared by bulldozers. Main arterial blocked by 12-storey collapse.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF</span>
              </button>
              <button
                onClick={() => setShowSitrepModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
