import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  AlertTriangle, 
  Flame, 
  Users, 
  MapPin, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  Truck, 
  Cpu, 
  ChevronRight,
  Edit3
} from 'lucide-react';

export const BuildingModal = ({ building, onClose }) => {
  const { 
    setSelectedBuildingId, 
    setActiveTab, 
    updateBuildingStatus, 
    overrideClassification, 
    rescueTeams 
  } = useDisaster();
  const { currentRole } = useAuth();

  const [selectedTeam, setSelectedTeam] = useState(building.assignedTeam || '');
  const [selectedStatus, setSelectedStatus] = useState(building.rescueStatus || 'Pending');
  const [isEditing, setIsEditing] = useState(false);
  const [editClass, setEditClass] = useState(building.damageStatus);
  const [editScore, setEditScore] = useState(building.damageScore);

  if (!building) return null;

  const handleInspectXAI = () => {
    setSelectedBuildingId(building.id);
    setActiveTab('xai');
    onClose();
  };

  const handleSaveDispatch = () => {
    updateBuildingStatus(building.id, selectedStatus, selectedTeam);
    alert(`Status updated for ${building.name}: ${selectedStatus} (${selectedTeam})`);
  };

  const handleSaveOverride = () => {
    overrideClassification(building.id, editClass, Number(editScore));
    setIsEditing(false);
  };

  const getPriorityBadgeClass = (level) => {
    switch (level) {
      case 'P1': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'P2': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'P3': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  const getDamageBadgeClass = (status) => {
    switch (status) {
      case 'Damaged': return 'bg-red-600/30 text-red-300 border-red-500';
      case 'Partially Damaged': return 'bg-amber-600/30 text-amber-300 border-amber-500';
      default: return 'bg-emerald-600/30 text-emerald-300 border-emerald-500';
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] w-96 max-h-[calc(100vh-6rem)] overflow-y-auto bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-5 text-slate-100 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {building.id}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${getPriorityBadgeClass(building.priorityLevel)}`}>
              {building.priorityLevel} Priority
            </span>
          </div>
          <h3 className="font-bold text-base text-white mt-1 leading-snug">
            {building.name}
          </h3>
          <p className="text-xs text-slate-400 flex items-center mt-0.5">
            <MapPin className="w-3 h-3 mr-1 text-slate-400" />
            {building.coordinates[0].toFixed(4)}°N, {building.coordinates[1].toFixed(4)}°E • {building.type}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Severity Stats */}
      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
          <div className="text-[10px] text-slate-400 uppercase font-medium">Damage Assessment</div>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-xl font-bold font-mono text-white">{building.damageScore}%</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getDamageBadgeClass(building.damageStatus)}`}>
              {building.damageStatus}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            ResNet Conf: {(building.aiMetrics.classificationConfidence * 100).toFixed(0)}%
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
          <div className="text-[10px] text-slate-400 uppercase font-medium">Estimated Trapped</div>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-xl font-bold font-mono text-amber-400">{building.estimatedTrapped}</span>
            <span className="text-xs text-slate-400">/ {building.estimatedOccupancy} total</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Criticality: {building.criticalityWeight}/10
          </div>
        </div>
      </div>

      {/* Accessibility Alert */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-2.5 mb-3 text-xs">
        <div className="text-slate-400 text-[10px] uppercase font-semibold flex items-center mb-1">
          <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" />
          Access & Hazard Risk
        </div>
        <p className="text-slate-200">{building.accessibilityRisk}</p>
      </div>

      {/* AI Deep Learning Detections */}
      <div className="mb-3">
        <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1.5 flex items-center">
          <Cpu className="w-3 h-3 mr-1 text-blue-400" />
          Neural Detections (SegFormer + YOLOv8)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {building.aiMetrics.yoloDetections.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* XAI Quick Peek & Button */}
      <div className="bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-800/50 rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-blue-300 flex items-center">
            <Eye className="w-3.5 h-3.5 mr-1 text-blue-400" />
            Explainable AI (Grad-CAM)
          </span>
          <span className="text-[10px] text-blue-300/70 font-mono">Heatmap Ready</span>
        </div>
        <p className="text-xs text-slate-300 line-clamp-2 mb-2">
          {building.xai.gradCamSummary}
        </p>
        <button
          onClick={handleInspectXAI}
          className="w-full flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-1.5 rounded-lg transition"
        >
          <span>Open Full XAI Inspector</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Rescue Dispatch Control */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center justify-between mb-2">
          <span className="flex items-center">
            <Truck className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Field Rescue Dispatch
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Tactical Ops</span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Assigned Response Team</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Pending Assignment">Pending Assignment</option>
              {rescueTeams.map(team => (
                <option key={team.id} value={team.name}>{team.name} ({team.specialty})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Operation Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Pending Dispatch">Pending Dispatch</option>
              <option value="Dispatched">Dispatched</option>
              <option value="On Scene">On Scene</option>
              <option value="Extrication in Progress">Extrication in Progress</option>
              <option value="Safe / Active Command Post">Safe / Command Post</option>
              <option value="Resolved / Cleared">Resolved / Cleared</option>
            </select>
          </div>

          <button
            onClick={handleSaveDispatch}
            className="w-full mt-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition"
          >
            Update Field Status
          </button>
        </div>
      </div>

      {/* Analyst Role Override Tool */}
      {(currentRole.id === 'Admin' || currentRole.id === 'Analyst') && (
        <div className="mt-3 pt-3 border-t border-slate-800">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full text-slate-400 hover:text-slate-200 text-xs flex items-center justify-center space-x-1.5 py-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Analyst Classification Override</span>
            </button>
          ) : (
            <div className="space-y-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div className="font-semibold text-slate-300 text-[11px]">Override AI Decision</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block">Class</label>
                  <select
                    value={editClass}
                    onChange={(e) => setEditClass(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs"
                  >
                    <option value="Damaged">Damaged (Red)</option>
                    <option value="Partially Damaged">Partially Damaged (Yellow)</option>
                    <option value="Undamaged">Undamaged (Green)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Score %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editScore}
                    onChange={(e) => setEditScore(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs"
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-1">
                <button
                  onClick={handleSaveOverride}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 rounded text-xs"
                >
                  Save Override
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 bg-slate-800 text-slate-300 rounded text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
