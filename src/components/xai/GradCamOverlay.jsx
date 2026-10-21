import React, { useState } from 'react';
import { Sliders, Eye, Sparkles, Layers, ZoomIn } from 'lucide-react';

export const GradCamOverlay = ({ building }) => {
  const [opacity, setOpacity] = useState(70);
  const [viewMode, setViewMode] = useState('blend'); // 'blend' or 'split'
  const [splitPos, setSplitPos] = useState(50);

  if (!building) return null;

  const isSevere = building.damageClass === 'severe';
  const isPartial = building.damageClass === 'partial';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-full">
      {/* Header and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-blue-400" />
              Grad-CAM Class Activation Saliency Map
            </span>
            <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
              Layer: conv5_block3_out
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Highlights pixel regions providing maximum gradient evidence for the <strong className="text-red-400">"{building.damageStatus}"</strong> classification.
          </p>
        </div>

        {/* View Mode & Opacity Slider */}
        <div className="flex items-center space-x-4 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-300 font-medium">Heatmap Intensity:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className="w-24 accent-blue-500 cursor-pointer"
            />
            <span className="text-xs font-mono text-blue-400 font-semibold w-8">{opacity}%</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setViewMode('blend')}
              className={`px-2 py-1 rounded text-xs font-medium transition ${
                viewMode === 'blend' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Overlay
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-1 rounded text-xs font-medium transition ${
                viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Split-Curtain
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 min-h-[340px] my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center select-none group">
        {/* Base Post-Earthquake Satellite Image */}
        <img
          src={building.images.postEvent}
          alt={building.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Grad-CAM Saliency Thermal Simulation Layer */}
        {viewMode === 'blend' ? (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-150 mix-blend-screen"
            style={{
              opacity: opacity / 100,
              background: isSevere
                ? `radial-gradient(ellipse 65% 55% at 52% 48%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.8) 35%, rgba(59, 130, 246, 0.5) 65%, transparent 85%)`
                : isPartial
                ? `radial-gradient(ellipse 55% 45% at 45% 52%, rgba(245, 158, 11, 0.9) 0%, rgba(16, 185, 129, 0.7) 40%, rgba(59, 130, 246, 0.4) 70%, transparent 90%)`
                : `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.8) 0%, rgba(59, 130, 246, 0.5) 45%, transparent 75%)`
            }}
          />
        ) : (
          /* Split curtain viewer */
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `polygon(${splitPos}% 0, 100% 0, 100% 100%, ${splitPos}% 100%)`
            }}
          >
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{
                opacity: opacity / 100,
                background: isSevere
                  ? `radial-gradient(ellipse 65% 55% at 52% 48%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.8) 35%, rgba(59, 130, 246, 0.5) 65%, transparent 85%)`
                  : `radial-gradient(ellipse 55% 45% at 45% 52%, rgba(245, 158, 11, 0.9) 0%, rgba(16, 185, 129, 0.7) 40%, rgba(59, 130, 246, 0.4) 70%, transparent 90%)`
              }}
            />
            <div className="absolute top-3 right-3 bg-red-950/80 text-red-300 text-[10px] font-mono px-2 py-0.5 rounded border border-red-700">
              Grad-CAM Heatmap
            </div>
          </div>
        )}

        {/* Split slider control line when in split mode */}
        {viewMode === 'split' && (
          <>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg text-[10px] font-bold">
                ↔
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={splitPos}
              onChange={(e) => setSplitPos(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </>
        )}

        {/* Detected Boundary Wireframe Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center space-x-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>SegFormer Mask IoU: {(building.aiMetrics.segformerConfidence * 100).toFixed(1)}%</span>
        </div>

        {/* Building Name Tag */}
        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-semibold text-white pointer-events-none">
          {building.name}
        </div>
      </div>

      {/* Heatmap Spectrum Calibration Bar */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
        <span className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 mr-1.5" />
          Low Saliency (Intact Envelope)
        </span>
        <div className="flex-1 mx-4 h-2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-400 to-red-600 opacity-90" />
        <span className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-600 mr-1.5" />
          High Saliency (Severe Destruction)
        </span>
      </div>
    </div>
  );
};
