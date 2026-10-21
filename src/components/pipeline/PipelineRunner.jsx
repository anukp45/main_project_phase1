import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  Workflow, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Satellite, 
  Cpu, 
  Sliders, 
  Eye, 
  Flame, 
  BarChart, 
  Database, 
  Server, 
  ShieldCheck, 
  UploadCloud,
  FileCode,
  Terminal,
  ArrowRight
} from 'lucide-react';

export const PipelineRunner = () => {
  const { 
    pipelineStages, 
    isPipelineRunning, 
    pipelineProgress, 
    pipelineLogs, 
    runPipelineSimulation,
    setActiveTab
  } = useDisaster();

  const [activeStageId, setActiveStageId] = useState(pipelineStages[0].id);
  const selectedStage = pipelineStages.find(s => s.id === activeStageId) || pipelineStages[0];

  const getStageIcon = (stageNum) => {
    switch (stageNum) {
      case 1: return Satellite;
      case 2: return Sliders;
      case 3: return Cpu;
      case 4: return Eye;
      case 5: return Flame;
      default: return BarChart;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
              <Workflow className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Complete Pipeline Architecture Engine</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                  End-to-End Deep Learning
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Visualizing data flow from satellite ingestion to automated rescue dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Run Pipeline Button */}
        <button
          onClick={runPipelineSimulation}
          disabled={isPipelineRunning}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg ${
            isPipelineRunning
              ? 'bg-blue-600/40 text-blue-300 border border-blue-500/50 cursor-wait'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
          }`}
        >
          {isPipelineRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Pipeline Ingestion Active ({pipelineProgress}%)...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Execute End-to-End Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Live Pipeline Progress Bar */}
      {isPipelineRunning && (
        <div className="bg-slate-900 border border-blue-500/50 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-blue-300 flex items-center">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-blue-400" />
              Real-time Ingestion & Neural Inference in Progress
            </span>
            <span className="font-mono font-bold text-blue-400">{pipelineProgress}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${pipelineProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Visual Pipeline Interactive Architecture Grid (Boxes 1-6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pipelineStages.map((stage) => {
          const Icon = getStageIcon(stage.stageNumber);
          const isSelected = activeStageId === stage.id;
          return (
            <div
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-800/90 border-blue-500 shadow-xl shadow-blue-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${
                  isSelected ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  stage.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  stage.status === 'ACTIVE' ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse' :
                  'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {stage.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition">
                {stage.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {stage.subtitle}
              </p>

              {/* Technical Details Preview */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                {stage.details.slice(0, 2).map((d, i) => (
                  <div key={i} className="flex justify-between items-center truncate">
                    <span className="text-slate-500 truncate mr-2">{d.name}:</span>
                    <span className="font-mono text-slate-300 truncate">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Deep-Dive Specification Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase bg-slate-800 text-blue-400 px-2 py-0.5 rounded">
              Selected Architecture Module
            </span>
            <h2 className="text-base font-bold text-white mt-1">
              {selectedStage.title} – Technical Specifications
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" />
            Verified Pipeline State
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            {selectedStage.details.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                  {item.name}
                </div>
                <div className="text-slate-100 font-mono mt-1 text-xs">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Quick jump to interactive module */}
          <div className="bg-gradient-to-br from-slate-950 to-blue-950/30 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-white mb-2">Module Direct Access</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                This architecture module directly feeds data into the active GIS Map, Explainable AI suite, and automated rescue dispatch system.
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => setActiveTab('map')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-2"
              >
                <span>Inspect in GIS Map Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('xai')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-2"
              >
                <span>Inspect Explainable AI (XAI)</span>
                <Eye className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Services & Infrastructure (Box 7 of Architecture) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-800">
          <Database className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            7. Supporting Services & Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 flex items-center mb-1">
              <Database className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              Spatial Database
            </div>
            <p className="text-slate-400 text-[11px]">PostgreSQL 16 + PostGIS</p>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">1,420 polygons stored</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 flex items-center mb-1">
              <Server className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              Inference Cluster
            </div>
            <p className="text-slate-400 text-[11px]">NVIDIA TensorRT GPU Server</p>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">Latency: ~42ms/tile</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 flex items-center mb-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              RBAC Authentication
            </div>
            <p className="text-slate-400 text-[11px]">JWT Role-Based Authorization</p>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Admin, Analyst, Rescuer</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 flex items-center mb-1">
              <UploadCloud className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Orbital Storage
            </div>
            <p className="text-slate-400 text-[11px]">VHR Optical & SAR GeoTIFFs</p>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">GeoTIFF 0.3m Cloud-Ready</div>
          </div>
        </div>
      </div>

      {/* Live System Diagnostics Console Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center text-slate-300 font-semibold">
            <Terminal className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            ResQVision Ingestion Pipeline Log
          </span>
          <span className="text-[10px]">Real-Time Diagnostics</span>
        </div>
        <div className="space-y-1 max-h-36 overflow-y-auto text-[11px]">
          {pipelineLogs.map((log, idx) => (
            <div key={idx} className="text-slate-400">
              <span className="text-blue-400">{log.split(' ')[0]}</span>{' '}
              <span className="text-slate-300">{log.substring(log.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
