import React, { useState } from 'react';
import {
  PROJECT_ABSTRACT,
  PROBLEM_STATEMENT,
  PROJECT_OBJECTIVES,
  OOP_PILLARS_EXPLANATION,
  TEST_CASES_DATA,
  VIVA_QUESTIONS,
  VivaQuestion,
} from '../../data/reportDocumentation';
import {
  FileText,
  Printer,
  BookOpen,
  Award,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Search,
} from 'lucide-react';

export const ProjectReport: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'report' | 'viva' | 'tests'>('report');
  const [vivaFilter, setVivaFilter] = useState<string>('ALL');
  const [vivaSearch, setVivaSearch] = useState<string>('');
  const [expandedViva, setExpandedViva] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  const toggleViva = (index: number) => {
    setExpandedViva((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredViva = VIVA_QUESTIONS.filter((q) => {
    const matchesCat = vivaFilter === 'ALL' || q.category === vivaFilter;
    const matchesSearch =
      q.question.toLowerCase().includes(vivaSearch.toLowerCase()) ||
      q.answer.toLowerCase().includes(vivaSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Academic Mini-Project Documentation & Report Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete engineering college project report: Abstract, Objectives, SRS, OOP Mapping, Test Matrix & 20 Viva Voce Q&As
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'report'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Full Project Report
          </button>
          <button
            onClick={() => setActiveSection('viva')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'viva'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Viva Voce (20 Q&As)
          </button>
          <button
            onClick={() => setActiveSection('tests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'tests'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Cases & Matrix
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* SECTION 1: Full College Mini-Project Report */}
      {activeSection === 'report' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8 text-slate-200 leading-relaxed text-sm select-text">
          {/* Project Title Cover Header */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
              Department of Computer Science & Engineering
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              PERSONAL EXPENSE TRACKER USING JAVA OOP
            </h1>
            <p className="text-xs text-slate-400">
              Mini-Project Report Submitted for Object-Oriented Programming (Java) Laboratory Evaluation
            </p>
          </div>

          {/* 1. Abstract */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              1. Project Abstract
            </h2>
            <p className="text-slate-300 text-xs text-justify leading-normal whitespace-pre-line">
              {PROJECT_ABSTRACT}
            </p>
          </section>

          {/* 2. Problem Statement */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              2. Problem Statement
            </h2>
            <p className="text-slate-300 text-xs text-justify leading-normal whitespace-pre-line">
              {PROBLEM_STATEMENT}
            </p>
          </section>

          {/* 3. Objectives */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              3. Project Objectives
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              {PROJECT_OBJECTIVES.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Software Requirements Specification (SRS) */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              4. System Requirements Specification (SRS)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-slate-100 block">Software Environment</span>
                <ul className="space-y-1 text-slate-400">
                  <li>• Operating System: Cross-platform (Windows, Linux, macOS)</li>
                  <li>• Runtime: Java SE Development Kit (JDK 17 LTS or higher)</li>
                  <li>• GUI Toolkit: Java Swing + FlatLaf Modern Look & Feel</li>
                  <li>• Database: Embedded SQLite 3.45 via SQLite JDBC Driver</li>
                  <li>• Charting Engine: JFreeChart 1.5.4</li>
                  <li>• Build Tool: Apache Maven 3.8+</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-slate-100 block">Hardware Minimum Requirements</span>
                <ul className="space-y-1 text-slate-400">
                  <li>• Processor: 1.6 GHz Dual-Core x86/x64 or ARM</li>
                  <li>• RAM: 2.0 GB Minimum (512 MB dedicated to JVM heap)</li>
                  <li>• Storage: 50 MB free disk space for SQLite database & JRE</li>
                  <li>• Display: 1280 × 720 resolution or higher</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. OOP Principles Implementation */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              5. Comprehensive OOP Principles Demonstration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OOP_PILLARS_EXPLANATION.map((p) => (
                <div key={p.pillar} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-300">{p.pillar}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{p.javaClass}</span>
                  </div>
                  <p className="text-xs text-slate-400">{p.description}</p>
                  <div className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                    {p.implementationDetails}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Conclusion */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white border-l-4 border-indigo-500 pl-3">
              6. Conclusion & Future Enhancements
            </h2>
            <p className="text-slate-300 text-xs text-justify leading-normal">
              The Personal Expense Tracker successfully bridges core theoretical Object-Oriented Programming (OOP) paradigms with real-world application design. By leveraging encapsulation with BigDecimal precision, polymorphic inheritance hierarchies, and interface abstraction with SQLite persistence, the application guarantees exact calculations and seamless offline operation. Future enhancements may include multi-user authentication, cloud synchronization over REST APIs, and automated recurring bill subscriptions.
            </p>
          </section>
        </div>
      )}

      {/* SECTION 2: Viva Voce Questions & Answers */}
      {activeSection === 'viva' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search viva questions..."
                value={vivaSearch}
                onChange={(e) => setVivaSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {['ALL', 'OOP', 'Java Core', 'Database', 'Architecture'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVivaFilter(cat)}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    vivaFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {filteredViva.map((q, idx) => {
              const isExpanded = expandedViva[idx];
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleViva(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-800/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        Q
                      </span>
                      <span className="font-semibold text-slate-100 text-xs sm:text-sm">
                        {q.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {q.category}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">Examiner Expected Answer:</strong>
                      {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: Test Cases & Matrix */}
      {activeSection === 'tests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Formal Mini-Project Test Case Matrix</span>
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-semibold">
              All 8 Test Cases Verified: PASS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-3">Test ID</th>
                  <th className="py-2.5 px-3">Test Scenario</th>
                  <th className="py-2.5 px-3">Input Data</th>
                  <th className="py-2.5 px-3">Expected Result</th>
                  <th className="py-2.5 px-3">OOP Concept Tested</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {TEST_CASES_DATA.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-300">{tc.id}</td>
                    <td className="py-3 px-3 font-semibold text-slate-100">{tc.testScenario}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{tc.inputData}</td>
                    <td className="py-3 px-3 text-slate-300">{tc.expectedResult}</td>
                    <td className="py-3 px-3 text-amber-300/90 font-mono text-[11px]">{tc.oopConceptTested}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
