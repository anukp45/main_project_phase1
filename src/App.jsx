import React from 'react';
import { useDisaster } from './context/DisasterContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { InteractiveMap } from './components/map/InteractiveMap';
import { XAIViewer } from './components/xai/XAIViewer';
import { RescuePrioritizationView } from './components/rescue/RescuePrioritizationView';
import { PipelineRunner } from './components/pipeline/PipelineRunner';
import { ReportsView } from './components/reports/ReportsView';

export function App() {
  const { activeTab } = useDisaster();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Command Navigation */}
        <Sidebar />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 overflow-hidden relative bg-slate-950">
          {activeTab === 'map' && <InteractiveMap />}
          {activeTab === 'xai' && <XAIViewer />}
          {activeTab === 'rescue' && <RescuePrioritizationView />}
          {activeTab === 'pipeline' && <PipelineRunner />}
          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>
    </div>
  );
}

export default App;
