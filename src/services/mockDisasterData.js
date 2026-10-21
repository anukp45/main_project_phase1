// Comprehensive Earthquake Disaster Dataset for ResQVision Pipeline
// Center coordinates: Antakya / Hatay epicenter sector (36.2023, 36.1604)

export const INCIDENT_METADATA = {
  id: "EQ-2026-SECTOR-7",
  name: "Antakya Sector 4 Seismic Response",
  type: "Earthquake - Magnitude 7.8 Mw",
  depth: "10.0 km",
  time: "2026-09-23T04:17:34Z",
  status: "ACTIVE EMERGENCY RESPONSE",
  opticalSource: "WorldView-3 VHR 0.3m (Post-Event)",
  sarSource: "Sentinel-1 C-Band SAR Interf. (Pre/Post Coherence)",
  osmCoverage: "OpenStreetMap Building Footprints (v2026.2)",
  totalBuildingsSurveyed: 1420,
  damagedCount: 412,
  partiallyDamagedCount: 388,
  undamagedCount: 620,
  estimatedTrapped: 184,
  teamsDeployed: 12,
  criticalStructuresDamaged: 14
};

export const RESCUE_TEAMS = [
  {
    id: "TEAM-ALPHA",
    name: "USAR Unit Alpha (Heavy)",
    lead: "Capt. M. Demir",
    members: 14,
    status: "On Scene",
    specialty: "Heavy Extrication & Acoustic Sensors",
    coordinates: [36.2045, 36.1585],
    assignedTo: "BLDG-001",
    battery: "84%",
    radioChannel: "TAC-1"
  },
  {
    id: "TEAM-BRAVO",
    name: "SAR Team Bravo (K9)",
    lead: "Lt. S. Kaya",
    members: 8,
    status: "Dispatched",
    specialty: "Canine Search & Fiberoptic Cameras",
    coordinates: [36.2010, 36.1620],
    assignedTo: "BLDG-002",
    battery: "92%",
    radioChannel: "TAC-2"
  },
  {
    id: "TEAM-CHARLIE",
    name: "Medical Triage Delta",
    lead: "Dr. E. Yilmaz",
    members: 10,
    status: "En Route",
    specialty: "Field Trauma & Critical Resuscitation",
    coordinates: [36.1980, 36.1550],
    assignedTo: "BLDG-001",
    battery: "98%",
    radioChannel: "TAC-3"
  },
  {
    id: "TEAM-ECHO",
    name: "Drone Recon Flight 3",
    lead: "Tech O. Aydin",
    members: 3,
    status: "Airborne",
    specialty: "Thermal IR & LiDAR Point Cloud",
    coordinates: [36.2030, 36.1610],
    assignedTo: "ZONE-NORTH",
    battery: "67%",
    radioChannel: "AIR-1"
  }
];

export const BUILDINGS_DATA = [
  {
    id: "BLDG-001",
    name: "Hatay Central Maternity & Children's Hospital",
    type: "Hospital",
    category: "Critical Infrastructure",
    criticalityWeight: 10,
    damageStatus: "Damaged",
    damageScore: 94, // %
    damageClass: "severe",
    priorityLevel: "P1", // Critical
    priorityScore: 96.8,
    estimatedOccupancy: 85,
    estimatedTrapped: 42,
    accessibilityRisk: "High (Main Access Road Blocked by Debris)",
    coordinates: [36.2038, 36.1582],
    polygon: [
      [36.2043, 36.1576],
      [36.2043, 36.1588],
      [36.2033, 36.1588],
      [36.2033, 36.1576]
    ],
    assignedTeam: "USAR Unit Alpha (Heavy)",
    rescueStatus: "Extrication in Progress",
    aiMetrics: {
      segformerConfidence: 0.97,
      classificationConfidence: 0.94,
      resnetProbs: { damaged: 0.94, partial: 0.05, undamaged: 0.01 },
      yoloDetections: ["Major Roof Collapse", "Pancake Slab Failure", "Extensive Rubble Field"]
    },
    xai: {
      gradCamSummary: "Intense convolutional focus on collapsed structural columns and disintegrated roof slabs.",
      shapValues: [
        { feature: "Texture (Rubble Roughness)", value: 0.42, importance: "Critical Positive" },
        { feature: "Height / DSM Drop", value: 0.35, importance: "High Positive" },
        { feature: "SAR Coherence Loss", value: 0.28, importance: "High Positive" },
        { feature: "Edge Discontinuity", value: 0.22, importance: "Moderate Positive" },
        { feature: "NDVI Change", value: -0.04, importance: "Neutral" }
      ],
      radarBackscatterDiff: "-7.4 dB",
      heightDeltaMeters: "-11.8 m (from 16.2m pre-event to 4.4m post-event)"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_hospital"
    }
  },
  {
    id: "BLDG-002",
    name: "Atatürk Secondary School & Youth Gymnasium",
    type: "School",
    category: "High Occupancy Assembly",
    criticalityWeight: 9,
    damageStatus: "Damaged",
    damageScore: 89,
    damageClass: "severe",
    priorityLevel: "P1",
    priorityScore: 92.4,
    estimatedOccupancy: 60,
    estimatedTrapped: 28,
    accessibilityRisk: "Moderate (Secondary Alleyway Accessible)",
    coordinates: [36.2014, 36.1616],
    polygon: [
      [36.2019, 36.1610],
      [36.2019, 36.1622],
      [36.2009, 36.1622],
      [36.2009, 36.1610]
    ],
    assignedTeam: "SAR Team Bravo (K9)",
    rescueStatus: "Dispatched",
    aiMetrics: {
      segformerConfidence: 0.95,
      classificationConfidence: 0.89,
      resnetProbs: { damaged: 0.89, partial: 0.09, undamaged: 0.02 },
      yoloDetections: ["Upper Floor Shearing", "Façade Detachment"]
    },
    xai: {
      gradCamSummary: "High saliency across sheared structural masonry and buckled load-bearing corners.",
      shapValues: [
        { feature: "Texture (Rubble Roughness)", value: 0.38, importance: "Critical Positive" },
        { feature: "Height / DSM Drop", value: 0.31, importance: "High Positive" },
        { feature: "SAR Coherence Loss", value: 0.25, importance: "Moderate Positive" },
        { feature: "Edge Discontinuity", value: 0.29, importance: "High Positive" },
        { feature: "NDVI Change", value: -0.02, importance: "Neutral" }
      ],
      radarBackscatterDiff: "-5.9 dB",
      heightDeltaMeters: "-7.2 m"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_school"
    }
  },
  {
    id: "BLDG-003",
    name: "Akdeniz Resident Towers (Block B)",
    type: "Residential Multi-Story",
    category: "High Density Housing",
    criticalityWeight: 7,
    damageStatus: "Partially Damaged",
    damageScore: 68,
    damageClass: "partial",
    priorityLevel: "P2", // High
    priorityScore: 78.5,
    estimatedOccupancy: 45,
    estimatedTrapped: 14,
    accessibilityRisk: "Moderate (Hazardous Overhead Debris)",
    coordinates: [36.2052, 36.1635],
    polygon: [
      [36.2057, 36.1630],
      [36.2057, 36.1640],
      [36.2047, 36.1640],
      [36.2047, 36.1630]
    ],
    assignedTeam: "Pending Assignment",
    rescueStatus: "Pending Dispatch",
    aiMetrics: {
      segformerConfidence: 0.93,
      classificationConfidence: 0.74,
      resnetProbs: { damaged: 0.22, partial: 0.74, undamaged: 0.04 },
      yoloDetections: ["First Floor Soft-Storey Distortion", "Exterior Cladding Loss"]
    },
    xai: {
      gradCamSummary: "Model detected severe foundation tilt and shear crack patterns on ground-floor pillars.",
      shapValues: [
        { feature: "Edge Discontinuity", value: 0.41, importance: "Critical Positive" },
        { feature: "SAR Coherence Loss", value: 0.22, importance: "Moderate Positive" },
        { feature: "Height / DSM Drop", value: 0.18, importance: "Moderate Positive" },
        { feature: "Texture (Rubble Roughness)", value: 0.16, importance: "Moderate" },
        { feature: "NDVI Change", value: 0.01, importance: "Neutral" }
      ],
      radarBackscatterDiff: "-3.1 dB",
      heightDeltaMeters: "-1.8 m (tilt settlement)"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_residential"
    }
  },
  {
    id: "BLDG-004",
    name: "Özgürlük Commercial Plaza & Market",
    type: "Commercial / Retail",
    category: "Commercial Center",
    criticalityWeight: 5,
    damageStatus: "Partially Damaged",
    damageScore: 52,
    damageClass: "partial",
    priorityLevel: "P2",
    priorityScore: 61.2,
    estimatedOccupancy: 20,
    estimatedTrapped: 3,
    accessibilityRisk: "Low (Clear access from South Avenue)",
    coordinates: [36.2001, 36.1570],
    polygon: [
      [36.2006, 36.1565],
      [36.2006, 36.1575],
      [36.1996, 36.1575],
      [36.1996, 36.1565]
    ],
    assignedTeam: "Pending Assignment",
    rescueStatus: "Triage Queued",
    aiMetrics: {
      segformerConfidence: 0.91,
      classificationConfidence: 0.69,
      resnetProbs: { damaged: 0.15, partial: 0.69, undamaged: 0.16 },
      yoloDetections: ["Glazing Fracture", "Canopy Collapse"]
    },
    xai: {
      gradCamSummary: "Activations concentrated around glass façade shatter zones and collapsed metal canopy.",
      shapValues: [
        { feature: "Edge Discontinuity", value: 0.33, importance: "High Positive" },
        { feature: "Texture (Rubble Roughness)", value: 0.21, importance: "Moderate" },
        { feature: "SAR Coherence Loss", value: 0.14, importance: "Low Positive" },
        { feature: "Height / DSM Drop", value: 0.05, importance: "Negligible" },
        { feature: "NDVI Change", value: -0.01, importance: "Neutral" }
      ],
      radarBackscatterDiff: "-1.8 dB",
      heightDeltaMeters: "-0.4 m"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_commercial"
    }
  },
  {
    id: "BLDG-005",
    name: "District Municipal Fire & Rescue Station 3",
    type: "Emergency Services",
    category: "Critical Infrastructure",
    criticalityWeight: 10,
    damageStatus: "Undamaged",
    damageScore: 8,
    damageClass: "undamaged",
    priorityLevel: "P4", // Low / Intact Base
    priorityScore: 12.0,
    estimatedOccupancy: 30,
    estimatedTrapped: 0,
    accessibilityRisk: "None (Fully Operational Staging Ground)",
    coordinates: [36.2065, 36.1595],
    polygon: [
      [36.2070, 36.1590],
      [36.2070, 36.1600],
      [36.2060, 36.1600],
      [36.2060, 36.1590]
    ],
    assignedTeam: "Operational Hub",
    rescueStatus: "Safe / Active Command Post",
    aiMetrics: {
      segformerConfidence: 0.98,
      classificationConfidence: 0.96,
      resnetProbs: { damaged: 0.01, partial: 0.03, undamaged: 0.96 },
      yoloDetections: ["No Significant Structural Anomalies"]
    },
    xai: {
      gradCamSummary: "Model confirmed intact rectilinear roof geometry and consistent texture envelope.",
      shapValues: [
        { feature: "Edge Discontinuity", value: -0.45, importance: "Strong Negative (Intact)" },
        { feature: "Height / DSM Drop", value: -0.38, importance: "Strong Negative" },
        { feature: "Texture (Rubble Roughness)", value: -0.31, importance: "Negative" },
        { feature: "SAR Coherence Loss", value: -0.22, importance: "Negative" },
        { feature: "NDVI Change", value: 0.02, importance: "Neutral" }
      ],
      radarBackscatterDiff: "+0.2 dB",
      heightDeltaMeters: "0.0 m (nominal elevation intact)"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_safe"
    }
  },
  {
    id: "BLDG-006",
    name: "Asi River North Vehicular Bridge",
    type: "Bridge / Lifeline",
    category: "Transportation Lifeline",
    criticalityWeight: 10,
    damageStatus: "Partially Damaged",
    damageScore: 48,
    damageClass: "partial",
    priorityLevel: "P1", // Critical lifeline
    priorityScore: 84.0,
    estimatedOccupancy: 0,
    estimatedTrapped: 0,
    accessibilityRisk: "Weight Restricted (Heavy Vehicles Prohibited)",
    coordinates: [36.2028, 36.1648],
    polygon: [
      [36.2033, 36.1643],
      [36.2033, 36.1653],
      [36.2023, 36.1653],
      [36.2023, 36.1643]
    ],
    assignedTeam: "Corps of Engineers Unit 2",
    rescueStatus: "Under Structural Reinforcement",
    aiMetrics: {
      segformerConfidence: 0.94,
      classificationConfidence: 0.72,
      resnetProbs: { damaged: 0.18, partial: 0.72, undamaged: 0.10 },
      yoloDetections: ["Abutment Hairline Fracture", "Expansion Joint Gap"]
    },
    xai: {
      gradCamSummary: "Convolutional focus concentrated at bridge approach abutments and eastern pier expansion joint.",
      shapValues: [
        { feature: "Edge Discontinuity", value: 0.36, importance: "High Positive" },
        { feature: "SAR Coherence Loss", value: 0.29, importance: "High Positive" },
        { feature: "Texture (Rubble Roughness)", value: 0.12, importance: "Low" },
        { feature: "Height / DSM Drop", value: 0.08, importance: "Low" },
        { feature: "NDVI Change", value: -0.01, importance: "Neutral" }
      ],
      radarBackscatterDiff: "-4.2 dB",
      heightDeltaMeters: "-0.3 m"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_bridge"
    }
  },
  {
    id: "BLDG-007",
    name: "Gazi Elementary School East Wing",
    type: "School",
    category: "High Occupancy Assembly",
    criticalityWeight: 9,
    damageStatus: "Undamaged",
    damageScore: 11,
    damageClass: "undamaged",
    priorityLevel: "P4",
    priorityScore: 14.5,
    estimatedOccupancy: 0,
    estimatedTrapped: 0,
    accessibilityRisk: "None (Selected as Designated Civilian Relief Shelter)",
    coordinates: [36.1985, 36.1630],
    polygon: [
      [36.1990, 36.1625],
      [36.1990, 36.1635],
      [36.1980, 36.1635],
      [36.1980, 36.1625]
    ],
    assignedTeam: "Disaster Relief Volunteer Corps",
    rescueStatus: "Active Evacuation Shelter",
    aiMetrics: {
      segformerConfidence: 0.96,
      classificationConfidence: 0.92,
      resnetProbs: { damaged: 0.02, partial: 0.06, undamaged: 0.92 },
      yoloDetections: ["Structure Stable", "Open Courtyard Available"]
    },
    xai: {
      gradCamSummary: "Uniform activations confirming roof integrity and intact courtyard perimeter wall.",
      shapValues: [
        { feature: "Edge Discontinuity", value: -0.42, importance: "Strong Negative" },
        { feature: "Height / DSM Drop", value: -0.34, importance: "Strong Negative" },
        { feature: "Texture (Rubble Roughness)", value: -0.28, importance: "Negative" },
        { feature: "SAR Coherence Loss", value: -0.19, importance: "Negative" },
        { feature: "NDVI Change", value: 0.01, importance: "Neutral" }
      ],
      radarBackscatterDiff: "+0.1 dB",
      heightDeltaMeters: "0.0 m"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_shelter"
    }
  },
  {
    id: "BLDG-008",
    name: "Yıldız 8-Storey Residential Complex",
    type: "Residential Multi-Story",
    category: "High Density Housing",
    criticalityWeight: 8,
    damageStatus: "Damaged",
    damageScore: 98,
    damageClass: "severe",
    priorityLevel: "P1",
    priorityScore: 97.5,
    estimatedOccupancy: 70,
    estimatedTrapped: 35,
    accessibilityRisk: "Extremely High (Fallen Power Cables + Gas Leak Alert)",
    coordinates: [36.2058, 36.1565],
    polygon: [
      [36.2063, 36.1560],
      [36.2063, 36.1570],
      [36.2053, 36.1570],
      [36.2053, 36.1560]
    ],
    assignedTeam: "Pending Heavy Equipment",
    rescueStatus: "Awaiting Crane Deployment",
    aiMetrics: {
      segformerConfidence: 0.98,
      classificationConfidence: 0.98,
      resnetProbs: { damaged: 0.98, partial: 0.02, undamaged: 0.00 },
      yoloDetections: ["Total Pancake Collapse", "Rubble Cone Inundation"]
    },
    xai: {
      gradCamSummary: "Extreme saliency saturation across the entire rubble cone with total loss of building boundaries.",
      shapValues: [
        { feature: "Texture (Rubble Roughness)", value: 0.48, importance: "Critical Positive" },
        { feature: "Height / DSM Drop", value: 0.44, importance: "Critical Positive" },
        { feature: "SAR Coherence Loss", value: 0.38, importance: "High Positive" },
        { feature: "Edge Discontinuity", value: 0.35, importance: "High Positive" },
        { feature: "NDVI Change", value: -0.06, importance: "Low Positive" }
      ],
      radarBackscatterDiff: "-9.1 dB",
      heightDeltaMeters: "-19.5 m (full collapse)"
    },
    images: {
      preEvent: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      postEvent: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80",
      gradCam: "gradcam_pancake"
    }
  }
];

// Rescue Priority Clusters
export const RESCUE_CLUSTERS = [
  {
    clusterId: "CLUSTER-RED-01",
    name: "Central Medical & High-Rise Collapse Sector",
    priority: "P1 Critical",
    center: [36.2045, 36.1575],
    radiusMeters: 450,
    buildingCount: 18,
    trappedEstimated: 77,
    criticalFacilities: ["BLDG-001 (Hospital)", "BLDG-008 (Yıldız Complex)"],
    status: "Active Search & Rescue Operations",
    recommendedRoute: "Route-A via Inonu Blvd (South Access)"
  },
  {
    clusterId: "CLUSTER-ORANGE-02",
    name: "Eastern Educational & Assembly Sector",
    priority: "P2 High",
    center: [36.2025, 36.1625],
    radiusMeters: 380,
    buildingCount: 12,
    trappedEstimated: 31,
    criticalFacilities: ["BLDG-002 (School)", "BLDG-003 (Residential)"],
    status: "Triage & Canine Perimeter Sweep",
    recommendedRoute: "Route-B via East Ring Bypass"
  }
];

// Suggested Rescue Routes with blockage indicators
export const RESCUE_ROUTES = [
  {
    id: "ROUTE-ALPHA-PRIMARY",
    name: "Safe Rescue Corridor 1 (Hub to Hospital)",
    status: "CLEAR",
    color: "#10b981", // green
    dashArray: null,
    points: [
      [36.2065, 36.1595], // Fire Station Hub
      [36.2060, 36.1585],
      [36.2050, 36.1580],
      [36.2038, 36.1582]  // Hospital
    ],
    distanceKm: "1.2 km",
    estTimeMinutes: 4,
    notes: "Cleared by municipal bulldozers at 06:30Z"
  },
  {
    id: "ROUTE-BLOCKED-CENTRAL",
    name: "Atatürk Boulevard Main Arterial",
    status: "BLOCKED",
    color: "#ef4444", // red
    dashArray: "8, 8",
    points: [
      [36.2065, 36.1595],
      [36.2045, 36.1605],
      [36.2028, 36.1612]
    ],
    distanceKm: "0.8 km",
    estTimeMinutes: null,
    notes: "Impassable due to fallen 12-storey debris & utility poles"
  },
  {
    id: "ROUTE-BRAVO-BYPASS",
    name: "East River Embankment Bypass to School",
    status: "RESTRICTED",
    color: "#f59e0b", // yellow/amber
    dashArray: "4, 4",
    points: [
      [36.2065, 36.1595],
      [36.2055, 36.1625],
      [36.2035, 36.1635],
      [36.2014, 36.1616]
    ],
    distanceKm: "1.9 km",
    estTimeMinutes: 8,
    notes: "Open for 4x4 and light rescue vehicles only. Bridge weight limit: 7.5t."
  }
];

// Pipeline Stages representing the 6 modules in the architecture diagram
export const PIPELINE_STAGES = [
  {
    id: "data-acq",
    stageNumber: 1,
    title: "1. Data Acquisition",
    subtitle: "VHR Optical, SAR & Geospatial Footprints",
    status: "COMPLETED",
    badge: "Synced",
    details: [
      { name: "Post-event Optical", value: "WorldView-3 (0.3m ground resolution) - Ingested" },
      { name: "SAR Constellation", value: "Sentinel-1 Interferometric Wide Swath - Ingested" },
      { name: "OpenStreetMap Data", value: "1,420 building vectors loaded into PostGIS" },
      { name: "DEM / DSM Data", value: "ALOS AW3D30 Height Elevation Model aligned" }
    ]
  },
  {
    id: "preprocessing",
    stageNumber: 2,
    title: "2. Data Preprocessing",
    subtitle: "Enhancement, Tile Slicing & Geospatial Alignment",
    status: "COMPLETED",
    badge: "100% Processed",
    details: [
      { name: "Noise Filtering", value: "Speckle suppression (Lee Filter) on SAR channels" },
      { name: "Histogram & Tiling", value: "CLAHE contrast normalization, 512x512 overlap tiling" },
      { name: "Geospatial Alignment", value: "Sub-pixel vector projection matching (WGS84 / EPSG:4326)" },
      { name: "Data Fusion Tensor", value: "Multi-modal tensor ready: [RGB (3) + SAR (2) + DSM (1)]" }
    ]
  },
  {
    id: "deep-learning",
    stageNumber: 3,
    title: "3. Damage Detection & Classification",
    subtitle: "SegFormer / YOLOv8 / ResNet Neural Pipeline",
    status: "COMPLETED",
    badge: "Inference Done",
    details: [
      { name: "3.1 Segmentation Model", value: "SegFormer-B4 (Building Boundary Extraction - mIoU: 88.4%)" },
      { name: "3.2 Damage Classifier", value: "Dual-Stream ResNet-50 + Multi-head Attention" },
      { name: "Classification Split", value: "412 Damaged (29%), 388 Partial (27%), 620 Undamaged (44%)" },
      { name: "Inference Throughput", value: "142 tiles/sec on NVIDIA TensorRT pipeline" }
    ]
  },
  {
    id: "xai",
    stageNumber: 4,
    title: "4. Explainable AI (XAI)",
    subtitle: "Grad-CAM Saliency Maps & SHAP Feature Attributions",
    status: "COMPLETED",
    badge: "Verified",
    details: [
      { name: "Grad-CAM Engine", value: "Target layer: `conv5_block3_out` gradient backpropagation" },
      { name: "SHAP Kernel Explainer", value: "1,000 background samples across 5 geospatial features" },
      { name: "Primary Driver", value: "Rubble texture roughness (42%) & Height drop (35%)" },
      { name: "Audit Integrity", value: "100% of P1 buildings verified with XAI explanations" }
    ]
  },
  {
    id: "rescue-priority",
    stageNumber: 5,
    title: "5. Rescue Prioritization",
    subtitle: "AHP Multi-Criteria Severity & Dynamic Routing",
    status: "ACTIVE",
    badge: "Real-Time Updates",
    details: [
      { name: "Multi-Factor Scoring", value: "Damage (40%) + Criticality (30%) + Occupancy (20%) + Access (10%)" },
      { name: "Priority Clustering", value: "DBSCAN spatial grouping into 2 critical response sectors" },
      { name: "Dijkstra Routing", value: "Automated routing avoiding 14 road collapse obstacles" },
      { name: "Dispatch Sync", value: "4 rescue squads deployed, 2 queued" }
    ]
  },
  {
    id: "web-dashboard",
    stageNumber: 6,
    title: "6. Output & Web Dashboard",
    subtitle: "GIS Studio, Command Center & SITREP Reports",
    status: "LIVE",
    badge: "Operational",
    details: [
      { name: "Interactive GIS Map", value: "Optical / SAR layers, damage classification polygons" },
      { name: "Field Dispatches", value: "Live GPS team telemetry & casualty status tracking" },
      { name: "Reports & SITREP", value: "Instant PDF / CSV export of affected structures" },
      { name: "RBAC Security", value: "Active roles: Admin, Analyst, Rescuer, Viewer" }
    ]
  }
];
