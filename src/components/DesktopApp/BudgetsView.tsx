import React, { useState } from 'react';
import { BudgetItem, CategoryItem, CurrencyConfig } from '../../types/expense';
import {
  Target,
  PlusCircle,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  TrendingUp,
} from 'lucide-react';
import { BudgetModal } from './BudgetModal';

interface Props {
  budgets: (BudgetItem & {
    currentSpending: number;
    utilization: number;
    isWarning: boolean;
    isExceeded: boolean;
  })[];
  categories: CategoryItem[];
  currency: CurrencyConfig;
  onSetBudget: (category: string, limit: number) => void;
  onDeleteBudget: (category: string) => void;
}

export const BudgetsView: React.FC<Props> = ({
  budgets,
  categories,
  currency,
  onSetBudget,
  onDeleteBudget,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<{ category: string; limit: number } | null>(null);

  const formatCurrency = (val: number) => {
    return `${currency.symbol}${val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const exceededCount = budgets.filter((b) => b.isExceeded).length;
  const warningCount = budgets.filter((b) => b.isWarning).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Budget Governance & Alerts</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
              Java Budget.java Model
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enforces spending thresholds: 80% caution alert and 100% hard overage breach detection
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBudget(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-indigo-950/40 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          + Set Category Budget
        </button>
      </div>

      {/* Threshold Status Summary Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Configured Budgets</div>
            <div className="text-xl font-bold text-white">{budgets.length} Categories</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">80% Threshold Warnings</div>
            <div className="text-xl font-bold text-amber-400">{warningCount} Categories</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Exceeded Over-Budget</div>
            <div className="text-xl font-bold text-rose-400">{exceededCount} Categories</div>
          </div>
        </div>
      </div>

      {/* Exceeded Warning Notice if any */}
      {exceededCount > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-start gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-rose-200">Budget Limit Exceeded Warning!</span>
            <p className="mt-0.5 text-rose-300/90">
              One or more categories have exceeded 100% of the assigned monthly limit. Please review your recent expenditures to maintain financial discipline.
            </p>
          </div>
        </div>
      )}

      {/* Category Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((b) => {
          const remaining = b.monthlyLimit - b.currentSpending;
          return (
            <div
              key={b.id}
              className={`bg-slate-900 border rounded-xl p-5 transition-all shadow-xs space-y-4 ${
                b.isExceeded
                  ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/10 to-slate-900'
                  : b.isWarning
                  ? 'border-amber-500/40 bg-gradient-to-b from-amber-950/10 to-slate-900'
                  : 'border-slate-800'
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                    {b.category}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Monthly Target: {formatCurrency(b.monthlyLimit)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingBudget({ category: b.category, limit: b.monthlyLimit });
                      setIsModalOpen(true);
                    }}
                    title="Edit limit"
                    className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteBudget(b.category)}
                    title="Remove budget"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Numbers */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Actual Spending</div>
                  <div
                    className={`text-xl font-bold ${
                      b.isExceeded ? 'text-rose-400' : b.isWarning ? 'text-amber-400' : 'text-slate-100'
                    }`}
                  >
                    {formatCurrency(b.currentSpending)}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      b.isExceeded
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : b.isWarning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {b.utilization.toFixed(1)}% Used
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      b.isExceeded
                        ? 'bg-rose-500'
                        : b.isWarning
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(b.utilization, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>0%</span>
                  <span>
                    {remaining >= 0 ? (
                      <span className="text-slate-300">
                        Remaining: <strong>{formatCurrency(remaining)}</strong>
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold">
                        Over by: {formatCurrency(Math.abs(remaining))}
                      </span>
                    )}
                  </span>
                  <span>100% Limit</span>
                </div>
              </div>

              {/* Status Alert Badge */}
              <div className="pt-2 border-t border-slate-800/80">
                {b.isExceeded ? (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>⚠️ Budget Exceeded! Spending exceeds limit by {formatCurrency(Math.abs(remaining))}.</span>
                  </div>
                ) : b.isWarning ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>⚡ 80% Caution Threshold: Approaching monthly limit.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>✓ Spending is comfortably within allocated limit.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400 space-y-3">
          <Target className="w-10 h-10 mx-auto opacity-40 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">No Budgets Defined Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Establish spending caps for categories like Food, Transport, and Shopping to receive automated threshold warnings.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow cursor-pointer"
          >
            + Set First Budget Limit
          </button>
        </div>
      )}

      {/* Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        onSave={(cat, limit) => {
          onSetBudget(cat, limit);
          setEditingBudget(null);
        }}
        categories={categories}
        currency={currency}
        initialCategory={editingBudget?.category}
        initialLimit={editingBudget?.limit}
      />
    </div>
  );
};
