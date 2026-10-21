import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  ADMIN: {
    id: 'Admin',
    name: 'Disaster Ops Commander',
    badge: 'bg-purple-900/60 text-purple-300 border-purple-600',
    description: 'Full system control, weight tuning, dispatch authority, data ingestion'
  },
  ANALYST: {
    id: 'Analyst',
    name: 'Geospatial AI Analyst',
    badge: 'bg-blue-900/60 text-blue-300 border-blue-600',
    description: 'Deep XAI diagnostics, model confidence inspector, manual classification override'
  },
  RESCUER: {
    id: 'Rescuer',
    name: 'Field USAR Team Lead',
    badge: 'bg-amber-900/60 text-amber-300 border-amber-600',
    description: 'Tactical field prioritization, triage checklists, route navigation'
  },
  VIEWER: {
    id: 'Viewer',
    name: 'Civil Protection Observer',
    badge: 'bg-slate-800 text-slate-300 border-slate-600',
    description: 'High-level situational awareness, aggregate metrics, SITREP PDF export'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.ADMIN);
  const [currentUser, setCurrentUser] = useState({
    name: 'Major K. Vance',
    callsign: 'COMMAND-1',
    agency: 'National Disaster Response Agency (NDRA)'
  });

  const setRole = (roleKey) => {
    if (ROLES[roleKey]) {
      setCurrentRole(ROLES[roleKey]);
    }
  };

  return (
    <AuthContext.Provider value={{ currentRole, currentUser, setRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
