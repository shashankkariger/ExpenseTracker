import React, { useState } from 'react';
import { DesktopApp } from './components/DesktopApp/DesktopApp';
import { CodeExplorer } from './components/CodeExplorer/CodeExplorer';
import { UmlDiagram } from './components/UmlDiagram/UmlDiagram';
import { TestRunner } from './components/TestRunner/TestRunner';
import { DatabaseInspector } from './components/DatabaseInspector/DatabaseInspector';
import { ProjectReport } from './components/ProjectReport/ProjectReport';
import { downloadProjectZip } from './util/zipGenerator';
import { JAVA_SOURCE_FILES } from './data/javaSourceFiles';
import {
  Monitor,
  Code2,
  Layers,
  FlaskConical,
  Database,
  GraduationCap,
  Download,
  Github,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<
    'desktop' | 'code' | 'uml' | 'tests' | 'database' | 'report'
  >('desktop');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadProjectZip();
    } catch (err) {
      console.error('Error downloading zip', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Application Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center font-black text-white text-lg shadow-md shadow-indigo-950">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 text-base leading-tight">
                  Personal Expense Tracker
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Java OOP Project
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Engineering College Mini-Project • Java 17 • Swing • FlatLaf • SQLite JDBC
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Packaging ZIP...' : 'Download Full Java Project (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 border-t border-slate-800/80 pt-2 min-w-max">
            <button
              onClick={() => setActiveMainTab('desktop')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>🖥️ Java Swing Live App</span>
            </button>

            <button
              onClick={() => setActiveMainTab('code')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>☕ Java Source Code ({JAVA_SOURCE_FILES.length} Files)</span>
            </button>

            <button
              onClick={() => setActiveMainTab('uml')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'uml'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>🏛️ UML & OOP Architecture</span>
            </button>

            <button
              onClick={() => setActiveMainTab('tests')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'tests'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>🧪 JUnit 5 Test Runner</span>
            </button>

            <button
              onClick={() => setActiveMainTab('database')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'database'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>🗄️ SQLite Database & SQL Logs</span>
            </button>

            <button
              onClick={() => setActiveMainTab('report')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMainTab === 'report'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>📑 College Report & Viva Voce</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {activeMainTab === 'desktop' && <DesktopApp />}
        {activeMainTab === 'code' && <CodeExplorer />}
        {activeMainTab === 'uml' && <UmlDiagram />}
        {activeMainTab === 'tests' && <TestRunner />}
        {activeMainTab === 'database' && <DatabaseInspector />}
        {activeMainTab === 'report' && <ProjectReport />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 lg:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Personal Expense Tracker</span>
            <span>•</span>
            <span>Java OOP Engineering Mini-Project</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">SQLite Persistent Storage</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Encapsulation • Inheritance • Polymorphism • Abstraction</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
