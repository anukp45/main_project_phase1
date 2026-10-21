# ResQVision – AI-Powered Earthquake Damage Assessment & Rescue Prioritization Frontend

An end-to-end mission-critical disaster response decision platform built from the **ResQVision Complete Pipeline Architecture**.

![ResQVision Architecture](https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Key Modules Built

### 1. Interactive GIS Map Studio (Boxes 6 & 3)
- **High-Resolution Satellite & Dark OSM Basemaps**: Seamlessly switch between ESRI World Imagery (0.3m ground resolution) and CartoDB Dark Matter.
- **Damage Classification Layer**:
  - 🔴 **Damaged (Red)**: Severe structural collapse, high hazard.
  - 🟠 **Partially Damaged (Yellow/Amber)**: Façade shearing, foundation displacement.
  - 🟢 **Undamaged (Green)**: Structural envelope intact.
- **Critical Infrastructure Pins**: Real-time identification of Hospitals (🏥), Schools (🏫), Bridges (🌉), and Emergency Hubs (🚒).
- **Dynamic Rescue Routes**: Dijkstra-calculated clear corridors (Green), impassable rubble road blocks (Red dashed), and weight-restricted bypasses (Yellow).
- **Active USAR Squads**: Real-time GPS markers, radio tac-channels, team battery levels, and mission status.
- **Interactive Building Dossier**: Click any polygon to inspect property metrics, triage levels, and direct dispatch actions.

### 2. Explainable AI (XAI) Diagnostic Suite (Box 4)
- **Grad-CAM Saliency Maps**:
  - Highlights convolutional feature activations (layer `conv5_block3_out`) responsible for classification.
  - Interactive opacity slider (0% to 100%) and Split-Curtain comparison slider.
- **SHAP Feature Importance**:
  - Quantifies feature contributions: **Texture (Rubble Roughness)**, **Height / DSM Drop**, **SAR Coherence Loss**, **Edge Discontinuity**, and **NDVI**.
- **Model Confidence Scorecard**:
  - ResNet-50 dual-stream classification probabilities (`Damaged`, `Partial`, `Undamaged`).
  - SegFormer-B4 building boundary extraction IoU.
  - Synthetic Aperture Radar (SAR) backscatter differential ($\Delta \text{dB}$).
  - Digital Surface Model (DSM) height collapse delta ($\Delta \text{m}$).

### 3. AI Rescue Prioritization Hub (Box 5)
- **Multi-Criteria Severity Scoring**:
  $$\text{Priority Score} = w_1 \cdot \text{Damage} + w_2 \cdot \text{Criticality} + w_3 \cdot \text{Trapped} + w_4 \cdot \text{Access}$$
- **Interactive AHP Weight Tuner**: Allows disaster coordinators to dynamically tweak criteria weights and watch targets re-rank in real time.
- **Ranked Target Ledger**: Detailed list sorted by priority score with live team assignment and status updates.
- **Dynamic Route Guidance**: Visualizes road obstructions and suggested evacuation routes.

### 4. Complete Pipeline Engine (Boxes 1 - 6)
- **Workflow Architecture Visualizer**: Step-by-step interactive inspection of all 6 pipeline stages:
  1. Data Acquisition
  2. Data Preprocessing
  3. Damage Detection & Classification (Deep Learning)
  4. Explainable AI (XAI)
  5. Rescue Prioritization
  6. Output & Web Dashboard
- **Simulation Runner**: Executes staged pipeline processing with progress bars and real-time terminal diagnostic logs.
- **Infrastructure Specs (Box 7)**: PostgreSQL 16 + PostGIS, NVIDIA TensorRT inference cluster, orbital cloud storage.

### 5. Detailed Reports & SITREP Export (Box 6)
- **Damage Statistics Summary**: Total surveyed, damage distribution donut chart, and critical lifelines impact breakdown.
- **CSV Export**: Instant download of the full damage assessment spreadsheet formatted to RFC4180.
- **Printable SITREP Modal**: Formatted emergency Situation Report ready for PDF print/export.

### 6. Role-Based Access Control Switcher (Box 7)
- **Disaster Ops Commander (Admin)**: Full dispatch authority and weight tuning.
- **Geospatial AI Analyst (Analyst)**: XAI diagnostics and manual classification override.
- **Field USAR Team Lead (Rescuer)**: Field-optimized prioritization and route guidance.
- **Civil Protection Observer (Viewer)**: High-level situational metrics and SITREP export.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, Vite 6 |
| **Styling & UI** | Tailwind CSS, Lucide React Icons |
| **Geospatial / GIS** | Leaflet 1.9, React-Leaflet 4, OpenStreetMap, ESRI Satellite |
| **Data Visualization** | Recharts 2.15 (Donut, Horizontal Bar, Stacked Lifelines) |
| **State Management** | React Context API (`DisasterContext`, `AuthContext`) |
| **API Client** | REST Service layer configured for Flask/FastAPI backend |

---

## 💻 Getting Started

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
