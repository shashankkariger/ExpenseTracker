import React, { useState } from 'react';
import { CurrencyConfig, CategoryItem } from '../../types/expense';
import { DEFAULT_CURRENCIES } from '../../data/initialData';
import {
  Settings,
  Database,
  Coins,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  PlusCircle,
  Tag,
  Palette,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  currency: CurrencyConfig;
  onSelectCurrency: (code: string) => void;
  categories: CategoryItem[];
  onAddCategory: (name: string, type: 'INCOME' | 'EXPENSE', color?: string) => void;
  onClearAllData: () => void;
  onResetSampleData: () => void;
  transactionCount: number;
}

export const SettingsView: React.FC<Props> = ({
  currency,
  onSelectCurrency,
  categories,
  onAddCategory,
  onClearAllData,
  onResetSampleData,
  transactionCount,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [newCatColor, setNewCatColor] = useState('#8b5cf6');
  const [catSuccessMsg, setCatSuccessMsg] = useState<string | null>(null);
  const [catErrorMsg, setCatErrorMsg] = useState<string | null>(null);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCatErrorMsg(null);
    setCatSuccessMsg(null);
    try {
      onAddCategory(newCatName, newCatType, newCatColor);
      setCatSuccessMsg(`Category "${newCatName}" successfully registered!`);
      setNewCatName('');
    } catch (err: any) {
      setCatErrorMsg(err.message || 'Failed to create category');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <span>System Settings & Database Preferences</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure monetary symbols, custom category taxonomy, and persistence maintenance
        </p>
      </div>

      {/* Currency Selection */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
          <Coins className="w-4 h-4 text-amber-400" />
          <span>Primary Currency Representation</span>
        </div>
        <p className="text-xs text-slate-400">
          Select the active currency symbol. The default specified for the engineering project is INR (₹).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {DEFAULT_CURRENCIES.map((cur) => (
            <button
              key={cur.code}
              onClick={() => onSelectCurrency(cur.code)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                currency.code === cur.code
                  ? 'border-indigo-500 bg-indigo-500/10 text-white ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="text-lg font-bold">{cur.symbol}</div>
              <div className="text-xs font-semibold">{cur.code}</div>
              <div className="text-[11px] text-slate-400 truncate">{cur.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Categories Creator */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
          <Tag className="w-4 h-4 text-indigo-400" />
          <span>Add Custom Category</span>
        </div>
        <p className="text-xs text-slate-400">
          Extend default categories with your own custom income or expense heads.
        </p>

        {catSuccessMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{catSuccessMsg}</span>
          </div>
        )}
        {catErrorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{catErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleCreateCategory} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Category Name (e.g. Gym, Books)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newCatType}
            onChange={(e) => setNewCatType(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="EXPENSE">Expense Category</option>
            <option value="INCOME">Income Category</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Create Category
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {categories.map((c) => (
            <span
              key={c.id}
              className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
              <span className="text-[10px] text-slate-400">({c.type.substring(0, 3)})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Database & Persistence Info */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Embedded Database Specification</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Database Engine</span>
            <span className="font-semibold text-slate-200">SQLite 3.45 / JDBC Driver</span>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Database File</span>
            <span className="font-semibold text-slate-200">expense_tracker.db</span>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Active Transactions</span>
            <span className="font-semibold text-emerald-400">{transactionCount} Records</span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-slate-900 border border-rose-500/30 p-5 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
          <ShieldAlert className="w-4 h-4" />
          <span>Danger Zone: Data Maintenance</span>
        </div>
        <p className="text-xs text-slate-400">
          Resetting data permanently purges all transactions from storage. You can also re-seed the default sample data for mini-project testing and viva demonstration.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Clear All Transactions Data
          </button>

          <button
            onClick={onResetSampleData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            Restore Standard Sample Data
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Confirm Data Erasure</h3>
                <p className="text-xs text-slate-400">This action will clear all records from the database.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to proceed? All balances and budget calculations will reset to zero.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAllData();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-sm cursor-pointer"
              >
                Yes, Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
