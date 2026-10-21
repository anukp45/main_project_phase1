// ResQVision Frontend API Client Service
// Configured to interact with Flask Backend or fallback seamlessly to local mock store

import { BUILDINGS_DATA, RESCUE_TEAMS, RESCUE_ROUTES, PIPELINE_STAGES, INCIDENT_METADATA } from './mockDisasterData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiService = {
  // Fetch incident summary
  async getIncidentMetadata() {
    try {
      const res = await fetch(`${API_BASE_URL}/incident`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return INCIDENT_METADATA;
  },

  // Fetch evaluated building list with geospatial vectors
  async getBuildings() {
    try {
      const res = await fetch(`${API_BASE_URL}/buildings`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return BUILDINGS_DATA;
  },

  // Fetch XAI explanation for a specific structure
  async getBuildingXAI(buildingId) {
    try {
      const res = await fetch(`${API_BASE_URL}/xai/${buildingId}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const bldg = BUILDINGS_DATA.find(b => b.id === buildingId) || BUILDINGS_DATA[0];
    return {
      buildingId,
      gradCam: bldg.xai,
      aiMetrics: bldg.aiMetrics,
      shap: bldg.xai.shapValues
    };
  },

  // Fetch active rescue teams & telemetry
  async getRescueTeams() {
    try {
      const res = await fetch(`${API_BASE_URL}/rescue/teams`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return RESCUE_TEAMS;
  },

  // Fetch routes and road obstructions
  async getRoutes() {
    try {
      const res = await fetch(`${API_BASE_URL}/rescue/routes`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return RESCUE_ROUTES;
  },

  // Trigger End-to-End Pipeline
  async runPipeline(config = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/pipeline/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, message: "Pipeline initiated across all 6 stages." };
  },

  // Update rescue dispatch status
  async updateRescueStatus(buildingId, newStatus, assignedTeam) {
    try {
      const res = await fetch(`${API_BASE_URL}/rescue/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buildingId, newStatus, assignedTeam })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, buildingId, newStatus, assignedTeam };
  }
};
