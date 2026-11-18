import React, { useState } from 'react';
import { JAVA_SOURCE_FILES, JavaFile } from '../../data/javaSourceFiles';
import { downloadProjectZip } from '../../util/zipGenerator';
import {
  FileCode,
  Folder,
  FolderOpen,
  Copy,
  Check,
  Download,
  Terminal,
  Layers,
  ChevronRight,
  ChevronDown,
  Info,
  ExternalLink,
} from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(JAVA_SOURCE_FILES[2]); // Default Main.java
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'ideGuide'>('code');

  const categories = [
    { key: 'root', label: 'Root & Entry', icon: 'Folder' },
    { key: 'model', label: 'model (OOP Entities)', icon: 'Folder' },
    { key: 'service', label: 'service (Business Logic)', icon: 'Folder' },
    { key: 'repository', label: 'repository (Persistence & Abstraction)', icon: 'Folder' },
    { key: 'ui', label: 'ui (Java Swing Desktop)', icon: 'Folder' },
    { key: 'util', label: 'util (Database & Utilities)', icon: 'Folder' },
    { key: 'exception', label: 'exception (Custom Exceptions)', icon: 'Folder' },
    { key: 'resources', label: 'resources (SQL Schema)', icon: 'Folder' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadProjectZip();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Simple syntax colorizer for Java code lines
  const renderHighlightedCode = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let styledLine = line;
      // Keywords
      const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');

      return (
        <div key={idx} className="table-row font-mono text-xs leading-5">
          <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-[11px] w-12 border-r border-slate-800/80">
            {idx + 1}
          </span>
          <span className={`table-cell pl-4 whitespace-pre ${isComment ? 'text-slate-500 italic' : 'text-slate-200'}`}>
            {line}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span>Complete Java OOP Source Code Repository</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            100% genuine Java 17 + Swing + SQLite code organized into clean architectural packages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'code' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Source Browser
          </button>
          <button
            onClick={() => setActiveTab('ideGuide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'ideGuide' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            IDE Setup Guide
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Packaging...' : 'Download Full Java Project (.zip)'}
          </button>
        </div>
      </div>

      {activeTab === 'ideGuide' ? (
        /* IDE Setup Instructions Panel */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-100">Step-by-Step IDE Execution Instructions</h3>
            <p className="text-xs text-slate-400 mt-1">
              Follow these standard setup steps to import and run the project in IntelliJ IDEA, Eclipse, or VS Code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* IntelliJ */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-xs">IJ</span>
                <span>IntelliJ IDEA</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Download and extract the <code className="text-indigo-300">personal-expense-tracker.zip</code>.</li>
                <li>Launch IntelliJ IDEA and click <strong>Open</strong>.</li>
                <li>Select the root folder containing <code className="text-indigo-300">pom.xml</code>.</li>
                <li>Wait for Maven to download dependencies (<code className="text-emerald-400">sqlite-jdbc</code>, <code className="text-emerald-400">flatlaf</code>).</li>
                <li>Navigate to <code className="text-indigo-300">src/main/java/.../Main.java</code>.</li>
                <li>Right-click and select <strong>Run &apos;Main.main()&apos;</strong>.</li>
              </ol>
            </div>

            {/* Eclipse */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-md bg-sky-500/10 flex items-center justify-center text-xs">EC</span>
                <span>Eclipse IDE</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Extract the downloaded zip archive.</li>
                <li>Open Eclipse and navigate to <strong>File &gt; Import...</strong></li>
                <li>Choose <strong>Maven &gt; Existing Maven Projects</strong> and click Next.</li>
                <li>Browse to the extracted folder and click <strong>Finish</strong>.</li>
                <li>Locate <code className="text-sky-300">Main.java</code> in the Project Explorer.</li>
                <li>Right-click &gt; <strong>Run As &gt; Java Application</strong>.</li>
              </ol>
            </div>

            {/* VS Code */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs">VS</span>
                <span>Visual Studio Code</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Install the <strong>Extension Pack for Java</strong> in VS Code.</li>
                <li>Open the extracted project folder via <strong>File &gt; Open Folder</strong>.</li>
                <li>VS Code will recognize Maven and configure classpaths.</li>
                <li>Open <code className="text-blue-300">src/.../Main.java</code>.</li>
                <li>Click the <strong>Run</strong> button above <code className="text-blue-300">public static void main</code>.</li>
              </ol>
            </div>
          </div>

          {/* Command Line Terminal Execution */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>Direct Maven CLI Command Line Execution</span>
            </div>
            <p className="text-xs text-slate-400">
              You can also build and run the application directly from the bash or command prompt terminal using Apache Maven:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-300 space-y-1">
              <div># 1. Compile the complete Java source tree</div>
              <div className="text-slate-100">mvn clean compile</div>
              <div className="pt-2"># 2. Launch the Java Swing Desktop Application</div>
              <div className="text-slate-100">mvn exec:java -Dexec.mainClass=&quot;com.expensetracker.Main&quot;</div>
              <div className="pt-2"># 3. Package an executable Fat JAR with all bundled dependencies</div>
              <div className="text-slate-100">mvn clean package</div>
            </div>
          </div>
        </div>
      ) : (
        /* Source Code Split Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* File Tree (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-3 max-h-[680px] overflow-y-auto space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Project Package Explorer
            </div>

            {categories.map((cat) => {
              const filesInCat = JAVA_SOURCE_FILES.filter((f) => f.category === cat.key);
              if (filesInCat.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-1">
                  <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-300 bg-slate-800/40 rounded">
                    <Folder className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{cat.label}</span>
                  </div>

                  <div className="pl-3 space-y-0.5 border-l border-slate-800 ml-2">
                    {filesInCat.map((file) => {
                      const isSelected = selectedFile.path === file.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-medium'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="truncate">{file.filename}</span>
                          <span
                            className={`text-[10px] px-1 rounded font-mono ${
                              isSelected ? 'text-indigo-200' : 'text-slate-500'
                            }`}
                          >
                            {file.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Code Viewer Panel (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col max-h-[680px]">
            {/* Header */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-mono text-xs font-bold text-indigo-300">{selectedFile.path}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs select-text">
              <div className="table w-full">{renderHighlightedCode(selectedFile.content)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
