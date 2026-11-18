import React, { useState } from 'react';
import { OOP_PILLARS_EXPLANATION } from '../../data/reportDocumentation';
import {
  Layers,
  GitBranch,
  ShieldCheck,
  Cpu,
  Boxes,
  Code2,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const UmlDiagram: React.FC = () => {
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>('Transaction');

  const selectedPillar = OOP_PILLARS_EXPLANATION[selectedPillarIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Java OOP Architecture & UML Class Diagram</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing object-oriented relationships: Inheritance hierarchies, Polymorphic contracts, Encapsulation, and Repository Abstraction
        </p>
      </div>

      {/* Visual UML Diagram Representation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Boxes className="w-4 h-4 text-indigo-400" />
            <span>Interactive UML Class Hierarchy</span>
          </div>
          <span className="text-[11px] text-slate-500">Click any class box to view OOP details</span>
        </div>

        {/* Diagram Canvas */}
        <div className="min-w-[780px] p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-8">
          {/* Layer 1: Abstract Base Class */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedNode('Transaction')}
              className={`w-72 bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Transaction'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-950'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-amber-400 font-mono italic block">&laquo;abstract&raquo;</span>
                <span className="font-bold text-sm text-slate-100 font-mono">Transaction</span>
              </div>
              <div className="py-2 text-[11px] font-mono text-slate-300 border-b border-slate-800 space-y-0.5">
                <div>- id: int</div>
                <div>- title: String</div>
                <div>- amount: BigDecimal</div>
                <div>- category: String</div>
                <div>- date: LocalDate</div>
                <div>- paymentMethod: PaymentMethod</div>
              </div>
              <div className="pt-2 text-[11px] font-mono text-indigo-300 space-y-0.5">
                <div>+ abstract calculateImpact(): BigDecimal</div>
                <div>+ abstract getTransactionType(): TransactionType</div>
                <div>+ getAmount(): BigDecimal</div>
                <div>+ setAmount(BigDecimal): void</div>
              </div>
            </div>
          </div>

          {/* Inheritance Arrow Indicator */}
          <div className="flex justify-center -my-4">
            <div className="flex items-center gap-16 text-slate-500 text-xs font-mono">
              <span className="flex items-center gap-1">▲ extends</span>
              <span className="flex items-center gap-1">▲ extends</span>
            </div>
          </div>

          {/* Layer 2: Concrete Subclasses (Inheritance & Polymorphism) */}
          <div className="flex justify-center gap-12">
            {/* Income Subclass */}
            <div
              onClick={() => setSelectedNode('Income')}
              className={`w-64 bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Income'
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-950'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-emerald-400 font-mono block">Subclass (Inheritance)</span>
                <span className="font-bold text-sm text-slate-100 font-mono">Income</span>
              </div>
              <div className="py-2 text-[11px] font-mono text-slate-400 border-b border-slate-800">
                <span>(Inherits all Transaction fields)</span>
              </div>
              <div className="pt-2 text-[11px] font-mono text-emerald-300 space-y-0.5">
                <div>@Override</div>
                <div>+ calculateImpact(): BigDecimal (+amount)</div>
                <div>@Override</div>
                <div>+ getTransactionType(): INCOME</div>
              </div>
            </div>

            {/* Expense Subclass */}
            <div
              onClick={() => setSelectedNode('Expense')}
              className={`w-64 bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Expense'
                  ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-lg shadow-rose-950'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-rose-400 font-mono block">Subclass (Inheritance)</span>
                <span className="font-bold text-sm text-slate-100 font-mono">Expense</span>
              </div>
              <div className="py-2 text-[11px] font-mono text-slate-400 border-b border-slate-800">
                <span>(Inherits all Transaction fields)</span>
              </div>
              <div className="pt-2 text-[11px] font-mono text-rose-300 space-y-0.5">
                <div>@Override</div>
                <div>+ calculateImpact(): BigDecimal (-amount)</div>
                <div>@Override</div>
                <div>+ getTransactionType(): EXPENSE</div>
              </div>
            </div>
          </div>

          {/* Layer 3: Abstraction (Repository Pattern) & Service Layer */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-6">
            {/* Repository Interface */}
            <div
              onClick={() => setSelectedNode('Repository')}
              className={`bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Repository'
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-lg'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-sky-400 font-mono italic block">&laquo;interface&raquo;</span>
                <span className="font-bold text-xs text-slate-100 font-mono">TransactionRepository</span>
              </div>
              <div className="pt-2 text-[10px] font-mono text-sky-300 space-y-0.5">
                <div>+ save(Transaction): int</div>
                <div>+ update(Transaction): boolean</div>
                <div>+ deleteById(int): boolean</div>
                <div>+ findAll(): List&lt;Transaction&gt;</div>
                <div>+ findByDateRange(...): List</div>
              </div>
            </div>

            {/* Service Layer */}
            <div
              onClick={() => setSelectedNode('Service')}
              className={`bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Service'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-indigo-400 font-mono block">Service (Business Logic)</span>
                <span className="font-bold text-xs text-slate-100 font-mono">TransactionService</span>
              </div>
              <div className="pt-2 text-[10px] font-mono text-slate-300 space-y-0.5">
                <div>- repository: TransactionRepository</div>
                <div>+ calculateCurrentBalance(): BigDecimal</div>
                <div className="text-amber-300">+ filterTransactions(Date, Date) [Overload 1]</div>
                <div className="text-amber-300">+ filterTransactions(..., Cat) [Overload 2]</div>
                <div className="text-amber-300">+ filterTransactions(..., Type, Method) [Overload 3]</div>
              </div>
            </div>

            {/* Budget Entity */}
            <div
              onClick={() => setSelectedNode('Budget')}
              className={`bg-slate-900 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                selectedNode === 'Budget'
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-center pb-2 border-b border-slate-800">
                <span className="text-[10px] text-amber-400 font-mono block">Model (Encapsulation)</span>
                <span className="font-bold text-xs text-slate-100 font-mono">Budget</span>
              </div>
              <div className="pt-2 text-[10px] font-mono text-slate-300 space-y-0.5">
                <div>- category: String</div>
                <div>- monthlyLimit: BigDecimal</div>
                <div>- currentSpending: BigDecimal</div>
                <div>+ getUtilizationPercentage(): double</div>
                <div className="text-emerald-300">+ isWarningThresholdReached(): bool (80%)</div>
                <div className="text-rose-300">+ isExceeded(): bool (&gt;100%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of OOP Interactive Deep-Dive Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">The 4 Pillars of OOP in this Project</h3>
          </div>

          <div className="flex items-center gap-2">
            {OOP_PILLARS_EXPLANATION.map((p, index) => (
              <button
                key={p.pillar}
                onClick={() => setSelectedPillarIndex(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedPillarIndex === index
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.pillar}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pillar Card Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">Concept Focus</span>
              <h4 className="text-xl font-bold text-white mt-0.5">{selectedPillar.pillar}</h4>
              <p className="text-xs text-slate-400 mt-1">{selectedPillar.description}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Primary Java Implementation
              </span>
              <span className="font-mono text-indigo-300 font-semibold">{selectedPillar.javaClass}</span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">Engineering Rationale & College Viva Defense:</span>
              {selectedPillar.implementationDetails}
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Exact Java Code Snippet</span>
            </div>

            <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed select-text">
              {selectedPillar.snippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
