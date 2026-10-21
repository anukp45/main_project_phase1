import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { GradCamOverlay } from './GradCamOverlay';
import { ShapBarPlot } from './ShapBarPlot';
import { 
  Eye, 
  HelpCircle, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Building2, 
  BarChart, 
  Radio, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const XAIViewer = () => {
  const { 
    buildings, 
    selectedBuilding, 
    selectedBuildingId, 
    setSelectedBuildingId,
    setActiveTab
  } = useDisaster();

  const current = selectedBuilding || buildings[0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header and Structure Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Explainable AI (XAI) Diagnostic Suite</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                  Box 4 Architecture
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Auditing deep learning activations with Grad-CAM and SHAP Shapley feature attributions.
              </p>
            </div>
          </div>
        </div>

        {/* Structure Selector Dropdown */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2 rounded-xl">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Inspect Structure:</span>
          <select
            value={selectedBuildingId}
            onChange={(e) => setSelectedBuildingId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-semibold"
          >
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.damageStatus} - {b.priorityLevel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left side Grad-CAM, Right side SHAP & Model Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Grad-CAM Saliency Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <GradCamOverlay building={current} />

          {/* Pre vs Post Image Comparison Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Pre-Event Reference</span>
                <span className="text-[10px] font-mono text-emerald-400">Baseline Archive</span>
              </div>
              <div className="h-36 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={current.images.preEvent}
                  alt="Pre-Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Post-Event Optical VHR</span>
                <span className="text-[10px] font-mono text-red-400">Post-Disaster (0.3m)</span>
              </div>
              <div className="h-36 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={current.images.postEvent}
                  alt="Post-Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SHAP Bar Plot & Neural Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Decision Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
                AI Inference Decision Summary
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                current.damageClass === 'severe'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : current.damageClass === 'partial'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {current.damageStatus}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {current.xai.gradCamSummary}
            </p>

            {/* Neural Probabilities */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>ResNet-50 Damaged Probability:</span>
                <span className="font-mono font-bold text-red-400">
                  {(current.aiMetrics.resnetProbs.damaged * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${current.aiMetrics.resnetProbs.damaged * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-slate-400 pt-1">
                <span>Partially Damaged Probability:</span>
                <span className="font-mono font-bold text-amber-400">
                  {(current.aiMetrics.resnetProbs.partial * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${current.aiMetrics.resnetProbs.partial * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-slate-400 pt-1">
                <span>Undamaged Probability:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {(current.aiMetrics.resnetProbs.undamaged * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${current.aiMetrics.resnetProbs.undamaged * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive SHAP Feature Contributions Chart */}
          <ShapBarPlot shapData={current.xai.shapValues} />

          {/* Auxiliary Sensor Metrics (SAR & Elevation DSM) */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">SAR Interferometric Drop</div>
              <div className="text-base font-bold font-mono text-blue-400 mt-1">
                {current.xai.radarBackscatterDiff}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Sentinel-1 C-Band Coherence</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">DEM / DSM Elevation Delta</div>
              <div className="text-base font-bold font-mono text-purple-400 mt-1 truncate">
                {current.xai.heightDeltaMeters.split(' ')[0]}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{current.xai.heightDeltaMeters}</div>
            </div>
          </div>

          {/* Action: Jump to Rescue Operations */}
          <button
            onClick={() => setActiveTab('rescue')}
            className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold py-2.5 rounded-xl transition"
          >
            <span>Proceed to Rescue Prioritization for this Sector</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
