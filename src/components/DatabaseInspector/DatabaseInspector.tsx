import React, { useState, useEffect } from 'react';
import { expenseEngine } from '../../services/expenseEngine';
import { SqlQueryLog, TransactionItem, CategoryItem, BudgetItem } from '../../types/expense';
import {
  Database,
  Table,
  Terminal,
  Activity,
  Code,
  CheckCircle2,
  HardDrive,
  RefreshCw,
} from 'lucide-react';

export const DatabaseInspector: React.FC = () => {
  const [activeTable, setActiveTable] = useState<'transactions' | 'categories' | 'budgets' | 'logs'>('transactions');
  const [transactions, setTransactions] = useState<TransactionItem[]>(expenseEngine.getTransactions());
  const [categories, setCategories] = useState<CategoryItem[]>(expenseEngine.getCategories());
  const [budgets, setBudgets] = useState<BudgetItem[]>(expenseEngine.getBudgets());
  const [logs, setLogs] = useState<SqlQueryLog[]>(expenseEngine.getSqlLogs());

  useEffect(() => {
    const unsub = expenseEngine.subscribe(() => {
      setTransactions(expenseEngine.getTransactions());
      setCategories(expenseEngine.getCategories());
      setBudgets(expenseEngine.getBudgets());
      setLogs(expenseEngine.getSqlLogs());
    });
    return unsub;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>SQLite Database Inspector & Live JDBC Query Stream</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inspection of relational tables, SQLite DDL schema, and executed SQL statements
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>expense_tracker.db (Active)</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTable('transactions')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTable === 'transactions'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Table: transactions ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTable('categories')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTable === 'categories'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Table: categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTable('budgets')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTable === 'budgets'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Table: budgets ({budgets.length})</span>
        </button>

        <button
          onClick={() => setActiveTable('logs')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTable === 'logs'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Live SQL Query Log ({logs.length})</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {activeTable === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono text-[11px] border-b border-slate-800">
                  <th className="py-2.5 px-3">id (PK)</th>
                  <th className="py-2.5 px-3">title (TEXT)</th>
                  <th className="py-2.5 px-3">amount (DECIMAL)</th>
                  <th className="py-2.5 px-3">type (TEXT)</th>
                  <th className="py-2.5 px-3">category (TEXT)</th>
                  <th className="py-2.5 px-3">date (TEXT)</th>
                  <th className="py-2.5 px-3">payment_method</th>
                  <th className="py-2.5 px-3">notes (TEXT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 text-slate-500 font-bold">{t.id}</td>
                    <td className="py-2.5 px-3 text-slate-200">{t.title}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{t.amount.toFixed(2)}</td>
                    <td className="py-2.5 px-3">
                      <span className={t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{t.category}</td>
                    <td className="py-2.5 px-3 text-slate-400">{t.date}</td>
                    <td className="py-2.5 px-3 text-slate-400">{t.paymentMethod}</td>
                    <td className="py-2.5 px-3 text-slate-500 max-w-xs truncate">{t.notes || 'NULL'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'categories' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono text-[11px]">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-2.5 px-4">id (PK)</th>
                  <th className="py-2.5 px-4">name (TEXT UNIQUE)</th>
                  <th className="py-2.5 px-4">type (CHECK INCOME/EXPENSE)</th>
                  <th className="py-2.5 px-4">color (TEXT)</th>
                  <th className="py-2.5 px-4">is_custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-slate-500">{c.id}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">{c.name}</td>
                    <td className="py-2.5 px-4">
                      <span className={c.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}>
                        {c.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.color}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">{c.isCustom ? 'TRUE' : 'FALSE'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'budgets' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono text-[11px]">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-2.5 px-4">id (PK)</th>
                  <th className="py-2.5 px-4">category (TEXT UNIQUE)</th>
                  <th className="py-2.5 px-4">month_year (TEXT)</th>
                  <th className="py-2.5 px-4">monthly_limit (DECIMAL)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {budgets.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-slate-500">{b.id}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-200">{b.category}</td>
                    <td className="py-2.5 px-4 text-slate-400">{b.monthYear}</td>
                    <td className="py-2.5 px-4 text-amber-400 font-bold">{b.monthlyLimit.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === 'logs' && (
          <div className="p-4 space-y-2 bg-slate-950 font-mono text-xs max-h-[500px] overflow-y-auto">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
              <span>Real-Time PreparedStatement Query Log (Simulated SQLite Driver)</span>
              <span>Showing last {logs.length} queries</span>
            </div>

            {logs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded ${
                      log.type === 'INSERT'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : log.type === 'UPDATE'
                        ? 'bg-amber-500/20 text-amber-400'
                        : log.type === 'DELETE'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-sky-500/20 text-sky-400'
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="text-slate-500">{log.timestamp}</span>
                </div>

                <div className="text-emerald-300 text-[11px] whitespace-pre-wrap">{log.query}</div>
                {log.params && <div className="text-slate-400 text-[10px]">Bind Params: {log.params}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
