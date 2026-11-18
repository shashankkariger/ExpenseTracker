import React, { useState } from 'react';
import { TransactionItem, CategoryItem, CurrencyConfig } from '../../types/expense';
import {
  FileText,
  FileDown,
  TrendingUp,
  Award,
  Calendar,
  PieChart as PieIcon,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
} from 'lucide-react';

interface Props {
  transactions: TransactionItem[];
  categories: CategoryItem[];
  currency: CurrencyConfig;
  monthlySavings: number;
  highestSpendingCategory: { category: string; amount: number } | null;
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[];
  monthlyTrends: { monthYear: string; label: string; income: number; expense: number; savings: number }[];
  onExportCsv: () => void;
}

export const ReportsView: React.FC<Props> = ({
  transactions,
  categories,
  currency,
  monthlySavings,
  highestSpendingCategory,
  categoryBreakdown,
  monthlyTrends,
  onExportCsv,
}) => {
  const [period, setPeriod] = useState<'ALL' | 'THIS_MONTH' | 'LAST_30' | 'THIS_YEAR'>('THIS_MONTH');

  const formatCurrency = (val: number) => {
    return `${currency.symbol}${val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const totalPeriodIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((a, b) => a + b.amount, 0);

  const totalPeriodExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((a, b) => a + b.amount, 0);

  const savingsRate = totalPeriodIncome > 0 ? ((totalPeriodIncome - totalPeriodExpense) / totalPeriodIncome) * 100 : 0;

  // Max value for scaling trend bars
  const maxTrendVal = Math.max(
    ...monthlyTrends.map((m) => Math.max(m.income, m.expense)),
    1000
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Financial Analytics & Reports</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Java ReportService.java
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Period summaries, category breakdown, spending velocity, and CSV data export
          </p>
        </div>

        <button
          onClick={onExportCsv}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
        >
          <FileDown className="w-4 h-4" />
          Export Complete CSV
        </button>
      </div>

      {/* KPI Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Month Savings</span>
            <PiggyBank className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400">{formatCurrency(monthlySavings)}</div>
          <p className="text-[11px] text-slate-500 mt-1">Income − Expenses for active calendar month</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Spending Category</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-slate-100 truncate">
            {highestSpendingCategory ? highestSpendingCategory.category : 'None'}
          </div>
          <p className="text-[11px] text-amber-400/90 mt-1">
            {highestSpendingCategory ? formatCurrency(highestSpendingCategory.amount) : '₹0.00'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Savings Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {savingsRate.toFixed(1)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Fraction of earnings retained as savings</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Recorded Operations</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">{transactions.length} Records</div>
          <p className="text-[11px] text-slate-500 mt-1">Managed persistently via SQLite JDBC</p>
        </div>
      </div>

      {/* Monthly Spending Trend Chart */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Monthly Income vs Expense Trend (Last 6 Months)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical spending patterns generated dynamically from transaction records
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-xs bg-emerald-500" /> Income
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-xs bg-rose-500" /> Expense
            </span>
          </div>
        </div>

        {/* Graphical Bar Representation */}
        <div className="h-56 pt-6 flex items-end justify-between gap-3 border-b border-slate-800 pb-2">
          {monthlyTrends.map((trend) => {
            const incomeHeight = maxTrendVal > 0 ? (trend.income / maxTrendVal) * 100 : 0;
            const expenseHeight = maxTrendVal > 0 ? (trend.expense / maxTrendVal) * 100 : 0;

            return (
              <div key={trend.monthYear} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Income bar */}
                  <div
                    style={{ height: `${Math.max(incomeHeight, 4)}%` }}
                    className="w-1/2 max-w-[28px] bg-emerald-500 hover:bg-emerald-400 rounded-t transition-all relative group"
                    title={`Income: ${formatCurrency(trend.income)}`}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap z-10 font-mono">
                      {formatCurrency(trend.income)}
                    </div>
                  </div>

                  {/* Expense bar */}
                  <div
                    style={{ height: `${Math.max(expenseHeight, 4)}%` }}
                    className="w-1/2 max-w-[28px] bg-rose-500 hover:bg-rose-400 rounded-t transition-all relative group"
                    title={`Expense: ${formatCurrency(trend.expense)}`}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950 text-rose-400 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/30 whitespace-nowrap z-10 font-mono">
                      {formatCurrency(trend.expense)}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-slate-400">{trend.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            Detailed Category Expenditure Table
          </h3>
          <span className="text-xs text-slate-400">{categoryBreakdown.length} active spending heads</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-right">Total Spent</th>
                <th className="py-2.5 px-4 text-right">Percentage Share</th>
                <th className="py-2.5 px-4">Visual Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {categoryBreakdown.map((cat) => (
                <tr key={cat.category} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-medium text-slate-200">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.category}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-100">
                    {formatCurrency(cat.amount)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono">
                    {cat.percentage.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 w-48">
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
