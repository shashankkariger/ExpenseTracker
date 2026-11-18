import React from 'react';
import { TransactionItem, CurrencyConfig, CategoryItem } from '../../types/expense';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  PieChart as PieIcon,
  PlusCircle,
  TrendingUp,
  Receipt,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  transactions: TransactionItem[];
  currency: CurrencyConfig;
  categories: CategoryItem[];
  onOpenAddModal: (type: 'INCOME' | 'EXPENSE') => void;
  onNavigate: (tab: string) => void;
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  monthlySavings: number;
  budgetUtilization: { totalLimit: number; totalSpent: number; percentage: number };
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[];
}

export const DashboardView: React.FC<Props> = ({
  transactions,
  currency,
  onOpenAddModal,
  onNavigate,
  currentBalance,
  totalIncome,
  totalExpenses,
  monthlySavings,
  budgetUtilization,
  categoryBreakdown,
}) => {
  const recentTransactions = transactions.slice(0, 6);

  const formatCurrency = (val: number) => {
    return `${currency.symbol}${val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Executive Financial Dashboard</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Java OOP Model
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time balance computation using Polymorphic calculateImpact() & BigDecimal precision
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAddModal('INCOME')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-emerald-950/40 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            + Add Income
          </button>
          <button
            onClick={() => onOpenAddModal('EXPENSE')}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-rose-950/40 cursor-pointer"
          >
            <ArrowDownRight className="w-4 h-4" />
            - Add Expense
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Balance */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Balance</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-white' : 'text-rose-400'}`}>
            {formatCurrency(currentBalance)}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span>Formula: Total Income − Total Expenses</span>
          </div>
          <div className="absolute top-0 right-0 h-1 w-full bg-indigo-500" />
        </div>

        {/* Total Income */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Income</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</div>
          <div className="text-xs text-slate-400 mt-1">Aggregated positive cash inflows</div>
          <div className="absolute top-0 right-0 h-1 w-full bg-emerald-500" />
        </div>

        {/* Total Expenses */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-400">{formatCurrency(totalExpenses)}</div>
          <div className="text-xs text-slate-400 mt-1">Total recorded expenditures</div>
          <div className="absolute top-0 right-0 h-1 w-full bg-rose-500" />
        </div>

        {/* Monthly Savings */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Savings</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${monthlySavings >= 0 ? 'text-sky-400' : 'text-rose-400'}`}>
            {formatCurrency(monthlySavings)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Monthly Income − Monthly Expenses</div>
          <div className="absolute top-0 right-0 h-1 w-full bg-sky-500" />
        </div>
      </div>

      {/* Budget Utilization Progress Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Monthly Budget Utilization</h3>
              <p className="text-xs text-slate-400">
                Formula: (Actual Expenses ÷ Budget Limit) × 100
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-100 text-base">
              {formatCurrency(budgetUtilization.totalSpent)}
            </span>
            <span className="text-slate-400 text-xs ml-1">/ {formatCurrency(budgetUtilization.totalLimit)}</span>
            <span
              className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                budgetUtilization.percentage > 100
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : budgetUtilization.percentage >= 80
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {budgetUtilization.percentage.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Progress meter */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              budgetUtilization.percentage > 100
                ? 'bg-rose-500'
                : budgetUtilization.percentage >= 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(budgetUtilization.percentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
          <span>0%</span>
          <span className="text-amber-400/90 font-medium flex items-center gap-1">
            ▲ 80% Caution Threshold
          </span>
          <span className="text-rose-400/90 font-medium">100% Max Limit</span>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown (5 columns) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-400" />
              Category-wise Expense Breakdown
            </h3>
            <button
              onClick={() => onNavigate('reports')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              Detailed Analytics →
            </button>
          </div>

          {categoryBreakdown.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500 text-xs">
              <Receipt className="w-8 h-8 mb-2 opacity-50" />
              <span>No expense records to analyze</span>
            </div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-1">
              {categoryBreakdown.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.category}
                    </span>
                    <span className="text-slate-400">
                      <strong className="text-slate-200">{formatCurrency(cat.amount)}</strong> ({cat.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions (7 columns) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              Recent Transactions
            </h3>
            <button
              onClick={() => onNavigate('transactions')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              View All ({transactions.length}) →
            </button>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500 text-xs">
              <Receipt className="w-8 h-8 mb-2 opacity-50" />
              <span>No transactions yet. Click Quick Add above to record one.</span>
            </div>
          ) : (
            <div className="space-y-2 flex-1">
              {recentTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800/80 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        t.type === 'INCOME'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {t.type === 'INCOME' ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">{t.title}</div>
                      <div className="text-slate-400 text-[11px]">
                        {t.category} • {t.date} • {t.paymentMethod}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-bold text-sm ${
                        t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
