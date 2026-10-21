import React from 'react';
import { DamageStatsSummary } from './DamageStatsSummary';
import { AffectedBuildingsTable } from './AffectedBuildingsTable';
import { BarChart3, FileText, Download, CheckCircle2 } from 'lucide-react';

export const ReportsView = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Detailed Reports & Analytics Dashboard</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                  Box 6 Architecture
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Damage statistics, casualty estimates, affected structures registry, and SITREP reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Damage Metrics & Charts */}
      <DamageStatsSummary />

      {/* Filterable Table with CSV & SITREP export */}
      <AffectedBuildingsTable />
    </div>
  );
};
