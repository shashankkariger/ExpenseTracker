import React, { useState, useEffect } from 'react';
import { expenseEngine } from '../../services/expenseEngine';
import {
  TransactionItem,
  TransactionType,
  CategoryItem,
  BudgetItem,
  CurrencyConfig,
} from '../../types/expense';
import {
  LayoutDashboard,
  Receipt,
  Target,
  BarChart3,
  Settings,
  Sparkles,
  Maximize2,
  Minimize2,
  X,
  Minus,
  CheckCircle2,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { DashboardView } from './DashboardView';
import { TransactionsView } from './TransactionsView';
import { BudgetsView } from './BudgetsView';
import { ReportsView } from './ReportsView';
import { SettingsView } from './SettingsView';
import { TransactionModal } from './TransactionModal';

export const DesktopApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'budgets' | 'reports' | 'settings'>('dashboard');
  const [transactions, setTransactions] = useState<TransactionItem[]>(expenseEngine.getTransactions());
  const [categories, setCategories] = useState<CategoryItem[]>(expenseEngine.getCategories());
  const [budgets, setBudgets] = useState<any[]>(expenseEngine.getBudgetsWithComputedSpending());
  const [currency, setCurrency] = useState<CurrencyConfig>(expenseEngine.getCurrency());

  // Modal states
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<TransactionItem | null>(null);
  const [defaultTxType, setDefaultTxType] = useState<TransactionType>('EXPENSE');

  // Sync state on change
  useEffect(() => {
    const unsubscribe = expenseEngine.subscribe(() => {
      setTransactions(expenseEngine.getTransactions());
      setCategories(expenseEngine.getCategories());
      setBudgets(expenseEngine.getBudgetsWithComputedSpending());
      setCurrency(expenseEngine.getCurrency());
    });
    return unsubscribe;
  }, []);

  // Handlers
  const handleOpenAddTx = (type: TransactionType) => {
    setEditingTx(null);
    setDefaultTxType(type);
    setIsTxModalOpen(true);
  };

  const handleEditTx = (item: TransactionItem) => {
    setEditingTx(item);
    setDefaultTxType(item.type);
    setIsTxModalOpen(true);
  };

  const handleSaveTx = (data: Omit<TransactionItem, 'id'>) => {
    if (editingTx) {
      expenseEngine.updateTransaction({ ...data, id: editingTx.id });
    } else {
      expenseEngine.addTransaction(data);
    }
  };

  const handleDeleteTx = (id: number) => {
    expenseEngine.deleteTransaction(id);
  };

  const handleSetBudget = (cat: string, limit: number) => {
    expenseEngine.setBudget(cat, limit);
  };

  const handleDeleteBudget = (cat: string) => {
    expenseEngine.deleteBudget(cat);
  };

  const handleExportCsv = () => {
    const csvContent = expenseEngine.exportToCsvString();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense_tracker_export_${new Date().toISOString().substring(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddCategory = (name: string, type: 'INCOME' | 'EXPENSE', color?: string) => {
    expenseEngine.addCategory(name, type, 'Tag', color);
  };

  // Calculations
  const currentBalance = expenseEngine.calculateCurrentBalance();
  const totalIncome = expenseEngine.calculateTotalIncome();
  const totalExpenses = expenseEngine.calculateTotalExpenses();
  const monthlySavings = expenseEngine.calculateMonthlySavings();
  const budgetUtilization = expenseEngine.getOverallBudgetUtilization();
  const categoryBreakdown = expenseEngine.getCategoryBreakdown();
  const highestSpending = expenseEngine.getHighestSpendingCategory();
  const monthlyTrends = expenseEngine.getMonthlyTrends(6);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[750px]">
      {/* Authentic Desktop Window Title Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* Mac/Modern window controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-slate-200">
              Personal Expense Tracker (Java OOP)
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              com.expensetracker.ui.DashboardFrame [Swing EDT]
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> SQLite Connected
          </span>
          <div className="flex items-center gap-2 text-slate-500">
            <Minus className="w-3.5 h-3.5 hover:text-slate-300 cursor-pointer" />
            <Maximize2 className="w-3 h-3 hover:text-slate-300 cursor-pointer" />
            <X className="w-3.5 h-3.5 hover:text-slate-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Content Cards) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-56 bg-slate-900/90 border-r border-slate-800 p-3 flex flex-col shrink-0">
          {/* Brand Logo */}
          <div className="px-3 py-3 mb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-950">
              ₹
            </div>
            <div>
              <div className="font-bold text-sm text-slate-100">ExpenseTracker</div>
              <div className="text-[10px] text-slate-400">Java 17 Mini-Project</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 flex-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'transactions'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4" />
                <span>Transactions</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                {transactions.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('budgets')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'budgets'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4" />
                <span>Budgets & Alerts</span>
              </div>
              {budgets.some((b) => b.isExceeded) && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & DB</span>
            </button>
          </nav>

          {/* Quick Balance Preview Widget */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs space-y-1.5 mt-auto">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Net Stored Balance
            </span>
            <div className={`font-bold text-sm ${currentBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currency.symbol}{currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-400">
              Savings: {currency.symbol}{monthlySavings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 bg-slate-950 p-6 overflow-y-auto max-h-[750px]">
          {activeTab === 'dashboard' && (
            <DashboardView
              transactions={transactions}
              currency={currency}
              categories={categories}
              onOpenAddModal={handleOpenAddTx}
              onNavigate={(tab) => setActiveTab(tab as any)}
              currentBalance={currentBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              monthlySavings={monthlySavings}
              budgetUtilization={budgetUtilization}
              categoryBreakdown={categoryBreakdown}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              transactions={transactions}
              categories={categories}
              currency={currency}
              onAddTransaction={handleOpenAddTx}
              onEditTransaction={handleEditTx}
              onDeleteTransaction={handleDeleteTx}
              onExportCsv={handleExportCsv}
            />
          )}

          {activeTab === 'budgets' && (
            <BudgetsView
              budgets={budgets}
              categories={categories}
              currency={currency}
              onSetBudget={handleSetBudget}
              onDeleteBudget={handleDeleteBudget}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              transactions={transactions}
              categories={categories}
              currency={currency}
              monthlySavings={monthlySavings}
              highestSpendingCategory={highestSpending}
              categoryBreakdown={categoryBreakdown}
              monthlyTrends={monthlyTrends}
              onExportCsv={handleExportCsv}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              currency={currency}
              onSelectCurrency={(code) => expenseEngine.setCurrency(code)}
              categories={categories}
              onAddCategory={handleAddCategory}
              onClearAllData={() => expenseEngine.clearAllData()}
              onResetSampleData={() => expenseEngine.resetToSampleData()}
              transactionCount={transactions.length}
            />
          )}
        </main>
      </div>

      {/* Authenticated Java Swing Status Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3 h-3 text-indigo-400" />
            <span>SQLite 3.45: expense_tracker.db</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-emerald-400" />
            <span>Thread: Java Swing EDT</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span>Currency: {currency.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono">JDK 17 • FlatLaf 3.4 • BigDecimal Precision</span>
        </div>
      </footer>

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        isOpen={isTxModalOpen}
        onClose={() => {
          setIsTxModalOpen(false);
          setEditingTx(null);
        }}
        onSave={handleSaveTx}
        editingTransaction={editingTx}
        defaultType={defaultTxType}
        categories={categories}
        currency={currency}
      />
    </div>
  );
};
