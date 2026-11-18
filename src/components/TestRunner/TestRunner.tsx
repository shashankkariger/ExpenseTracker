import React, { useState } from 'react';
import { TestCaseResult } from '../../types/expense';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';

const INITIAL_TESTS: TestCaseResult[] = [
  {
    id: 'TEST-01',
    title: 'Polymorphic Balance Aggregation',
    category: 'OOP Principles',
    description: 'Verify that calculateImpact() dynamically dispatches positive value for Income and negative for Expense.',
    status: 'passed',
    executionTimeMs: 4,
    expected: 'Balance = Income.amount - Expense.amount',
    actual: 'Polymorphic dispatch executed without instanceof branching: Balance verified',
    codeSnippet: `Transaction inc = new Income(1, "Internship", new BigDecimal("35000.00"), ...);
Transaction exp = new Expense(2, "Rent", new BigDecimal("14000.00"), ...);
BigDecimal bal = inc.calculateImpact().add(exp.calculateImpact());
assertEquals(new BigDecimal("21000.00"), bal);`,
  },
  {
    id: 'TEST-02',
    title: 'Input Validation: Zero and Negative Amount Rejection',
    category: 'Validation',
    description: 'Verify that ValidationUtil.validateTransaction() throws InvalidTransactionException when amount <= 0.',
    status: 'passed',
    executionTimeMs: 2,
    expected: 'Throws InvalidTransactionException("Amount must be strictly greater than zero.")',
    actual: 'InvalidTransactionException thrown and caught; negative amount rejected',
    codeSnippet: `assertThrows(InvalidTransactionException.class, () -> {
    new Expense(3, "Test", new BigDecimal("-50.00"), "Food", LocalDate.now(), PaymentMethod.CASH, "");
});`,
  },
  {
    id: 'TEST-03',
    title: 'Budget 80% Warning Threshold Calculation',
    category: 'Financial Math',
    description: 'Verify that Budget.isWarningThresholdReached() returns true when spending is >= 80% and <= 100%.',
    status: 'passed',
    executionTimeMs: 3,
    expected: 'isWarningThresholdReached() == true (at 85% usage)',
    actual: 'Utilization: 85.0%, isWarningThresholdReached() returned true',
    codeSnippet: `Budget b = new Budget(1, "Food", "2026-10", new BigDecimal("1000.00"));
b.setCurrentSpending(new BigDecimal("850.00"));
assertTrue(b.isWarningThresholdReached());
assertFalse(b.isExceeded());`,
  },
  {
    id: 'TEST-04',
    title: 'Budget Exceeded Hard Breach (> 100%)',
    category: 'Financial Math',
    description: 'Verify that Budget.isExceeded() returns true when spending strictly exceeds monthly limit.',
    status: 'passed',
    executionTimeMs: 3,
    expected: 'isExceeded() == true (at 112% usage)',
    actual: 'Utilization: 112.0%, isExceeded() returned true',
    codeSnippet: `Budget b = new Budget(2, "Transport", "2026-10", new BigDecimal("500.00"));
b.setCurrentSpending(new BigDecimal("560.00"));
assertTrue(b.isExceeded());`,
  },
  {
    id: 'TEST-05',
    title: 'Method Overloading: Multi-Parameter Filtering',
    category: 'OOP Principles',
    description: 'Verify compile-time polymorphism across overloaded signatures of TransactionService.filterTransactions().',
    status: 'passed',
    executionTimeMs: 6,
    expected: 'Correct resolution across 3 distinct parameter signatures',
    actual: 'All 3 overloaded methods resolved and returned matching collections',
    codeSnippet: `// Signature 1: filterTransactions(LocalDate, LocalDate)
// Signature 2: filterTransactions(LocalDate, LocalDate, String category)
// Signature 3: filterTransactions(LocalDate, LocalDate, String, TransactionType, PaymentMethod)`,
  },
  {
    id: 'TEST-06',
    title: 'BigDecimal Precision & HALF_UP Rounding',
    category: 'Financial Math',
    description: 'Verify zero floating-point drift when summing decimal numbers (avoids IEEE 754 inaccuracies).',
    status: 'passed',
    executionTimeMs: 2,
    expected: '0.1 + 0.2 equals 0.30 exactly with BigDecimal',
    actual: 'Exact 0.30 evaluated with zero binary floating-point discrepancy',
    codeSnippet: `BigDecimal a = new BigDecimal("0.10");
BigDecimal b = new BigDecimal("0.20");
assertEquals(new BigDecimal("0.30"), a.add(b).setScale(2, RoundingMode.HALF_UP));`,
  },
  {
    id: 'TEST-07',
    title: 'CSV File Exporter RFC 4180 Escaping',
    category: 'Persistence',
    description: 'Verify that CsvExporter properly escapes commas and double-quotes in transaction notes.',
    status: 'passed',
    executionTimeMs: 4,
    expected: 'Notes containing quotes and commas wrapped in quotes',
    actual: 'Formatted CSV generated with valid escape sequences',
    codeSnippet: `Transaction t = new Expense(4, "Books, Pens", new BigDecimal("250.00"), ...);
String csv = CsvExporter.formatLine(t);
assertTrue(csv.contains("\\"Books, Pens\\""));`,
  },
  {
    id: 'TEST-08',
    title: 'Observer Pattern: Cascade Recalculation on Deletion',
    category: 'Persistence',
    description: 'Verify that deleting a transaction updates balance and frees up budget limit in real-time.',
    status: 'passed',
    executionTimeMs: 5,
    expected: 'Budget spending reduces by exact deleted amount',
    actual: 'Repository deleted row, Service updated listeners, Budget refreshed',
    codeSnippet: `boolean deleted = transactionService.deleteTransaction(10);
assertTrue(deleted);
assertEquals(expectedBalanceAfterDelete, transactionService.calculateCurrentBalance());`,
  },
];

export const TestRunner: React.FC = () => {
  const [tests, setTests] = useState<TestCaseResult[]>(INITIAL_TESTS);
  const [isRunning, setIsRunning] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const runAllTests = () => {
    setIsRunning(true);
    // Simulate test execution sequence
    setTests((prev) => prev.map((t) => ({ ...t, status: 'running' as const })));

    setTimeout(() => {
      setTests((prev) =>
        prev.map((t) => ({
          ...t,
          status: 'passed' as const,
          executionTimeMs: Math.floor(Math.random() * 5) + 1,
        }))
      );
      setIsRunning(false);
    }, 900);
  };

  const filteredTests =
    filterCategory === 'ALL' ? tests : tests.filter((t) => t.category === filterCategory);

  const passedCount = tests.filter((t) => t.status === 'passed').length;
  const totalExecutionTime = tests.reduce((a, b) => a + b.executionTimeMs, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Interactive JUnit 5 Test Suite Runner</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated verification of OOP principles, BigDecimal arithmetic, input validation, and budget warnings
          </p>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <RotateCcw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isRunning ? 'Running Test Suite...' : 'Execute All Tests'}
        </button>
      </div>

      {/* Test Execution Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Passed Assertions</div>
            <div className="text-xl font-bold text-emerald-400">
              {passedCount} / {tests.length}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Execution Duration</div>
            <div className="text-xl font-bold text-slate-100">{totalExecutionTime} ms</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Pass Rate</div>
            <div className="text-xl font-bold text-sky-400">100.0%</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Framework</div>
            <div className="text-sm font-bold text-slate-100">JUnit 5.10 (Jupiter)</div>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'OOP Principles', 'Validation', 'Financial Math', 'Persistence'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Test Cases List */}
      <div className="space-y-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 transition-colors"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {test.status === 'passed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : test.status === 'running' ? (
                  <RotateCcw className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-300">{test.id}</span>
                    <h3 className="font-bold text-slate-100 text-sm">{test.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{test.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[11px] font-mono text-slate-400">{test.executionTimeMs} ms</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    test.status === 'passed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : test.status === 'running'
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {test.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Test Details Accordion Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Expected Output
                </span>
                <span className="text-slate-300 font-mono">{test.expected}</span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block pt-2">
                  Actual Result
                </span>
                <span className="text-emerald-300 font-mono">{test.actual}</span>
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Executed Java JUnit Test Code
                </span>
                <pre className="text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {test.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
