import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INCIDENT_METADATA,
  BUILDINGS_DATA,
  RESCUE_TEAMS,
  RESCUE_CLUSTERS,
  RESCUE_ROUTES,
  PIPELINE_STAGES
} from '../services/mockDisasterData';

const DisasterContext = createContext();

export const DisasterProvider = ({ children }) => {
  const [incident, setIncident] = useState(INCIDENT_METADATA);
  const [buildings, setBuildings] = useState(BUILDINGS_DATA);
  const [selectedBuildingId, setSelectedBuildingId] = useState("BLDG-001");
  const [rescueTeams, setRescueTeams] = useState(RESCUE_TEAMS);
  const [rescueClusters] = useState(RESCUE_CLUSTERS);
  const [rescueRoutes, setRescueRoutes] = useState(RESCUE_ROUTES);
  const [pipelineStages, setPipelineStages] = useState(PIPELINE_STAGES);

  // Active view tab: 'map', 'xai', 'rescue', 'pipeline', 'reports'
  const [activeTab, setActiveTab] = useState('map');

  // Filters for Map and Tables
  const [filterDamage, setFilterDamage] = useState('ALL'); // 'ALL', 'Damaged', 'Partially Damaged', 'Undamaged'
  const [filterPriority, setFilterPriority] = useState('ALL'); // 'ALL', 'P1', 'P2', 'P4'
  const [searchQuery, setSearchQuery] = useState('');

  // Map Layer Toggles
  const [visibleLayers, setVisibleLayers] = useState({
    damagePolygons: true,
    criticalIcons: true,
    rescueRoutes: true,
    rescueClusters: true,
    teamMarkers: true,
    sarOverlay: false,
    osmBase: true
  });

  // Pipeline execution simulation state
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(100);
  const [pipelineLogs, setPipelineLogs] = useState([
    "[SYSTEM] ResQVision pipeline initialization complete.",
    "[DATA] VHR Optical WorldView-3 imagery (0.3m) ingested.",
    "[DATA] Sentinel-1 SAR interferometric coherence map synchronized.",
    "[PREPROCESS] Geometric correction & building vector alignment OK.",
    "[DL] SegFormer-B4 segmented 1,420 building boundaries.",
    "[DL] Dual-stream ResNet-50 classified structural damage severity.",
    "[XAI] Grad-CAM heatmaps & SHAP attributions generated for high-risk zones.",
    "[RESCUE] Multi-criteria prioritization ranked P1/P2/P3 dispatch clusters."
  ]);

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId) || buildings[0];

  const toggleLayer = (layerKey) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const updateBuildingStatus = (buildingId, newStatus, assignedTeam) => {
    setBuildings(prev =>
      prev.map(bldg => {
        if (bldg.id === buildingId) {
          return {
            ...bldg,
            rescueStatus: newStatus || bldg.rescueStatus,
            assignedTeam: assignedTeam !== undefined ? assignedTeam : bldg.assignedTeam
          };
        }
        return bldg;
      })
    );
  };

  const overrideClassification = (buildingId, newClass, newDamageScore) => {
    setBuildings(prev =>
      prev.map(bldg => {
        if (bldg.id === buildingId) {
          const priority = newDamageScore >= 80 ? 'P1' : newDamageScore >= 50 ? 'P2' : 'P4';
          return {
            ...bldg,
            damageStatus: newClass,
            damageScore: newDamageScore,
            damageClass: newClass === 'Damaged' ? 'severe' : newClass === 'Partially Damaged' ? 'partial' : 'undamaged',
            priorityLevel: priority,
            priorityScore: (newDamageScore * 0.5 + bldg.criticalityWeight * 5).toFixed(1)
          };
        }
        return bldg;
      })
    );
  };

  // Run full pipeline simulation
  const runPipelineSimulation = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    setPipelineProgress(5);
    setPipelineLogs(prev => [
      `[USER TRIGGER] Pipeline run initiated at ${new Date().toLocaleTimeString()}...`,
      ...prev
    ]);

    const stepIntervals = [
      { progress: 20, log: "[STEP 1/5] Ingesting VHR Optical and Sentinel-1 SAR tiles from orbital storage..." },
      { progress: 40, log: "[STEP 2/5] Running Lee filtering, CLAHE contrast, and sub-pixel geo-referencing..." },
      { progress: 65, log: "[STEP 3/5] Inferring SegFormer masks and dual-stream ResNet damage classifications..." },
      { progress: 85, log: "[STEP 4/5] Computing Grad-CAM layer activations and SHAP Shapley values..." },
      { progress: 100, log: "[STEP 5/5] Synthesizing AHP priority tiers and routing obstructions. Ready!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < stepIntervals.length) {
        const step = stepIntervals[currentStep];
        setPipelineProgress(step.progress);
        setPipelineLogs(prev => [step.log, ...prev]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsPipelineRunning(false);
      }
    }, 1200);
  };

  return (
    <DisasterContext.Provider
      value={{
        incident,
        buildings,
        selectedBuilding,
        selectedBuildingId,
        setSelectedBuildingId,
        rescueTeams,
        rescueClusters,
        rescueRoutes,
        pipelineStages,
        activeTab,
        setActiveTab,
        filterDamage,
        setFilterDamage,
        filterPriority,
        setFilterPriority,
        searchQuery,
        setSearchQuery,
        visibleLayers,
        toggleLayer,
        updateBuildingStatus,
        overrideClassification,
        isPipelineRunning,
        pipelineProgress,
        pipelineLogs,
        runPipelineSimulation
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => useContext(DisasterContext);
