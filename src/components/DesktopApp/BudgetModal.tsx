import React, { useState } from 'react';
import { CategoryItem, CurrencyConfig } from '../../types/expense';
import { X, Target } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, limit: number) => void;
  categories: CategoryItem[];
  currency: CurrencyConfig;
  initialCategory?: string;
  initialLimit?: number;
}

export const BudgetModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  currency,
  initialCategory,
  initialLimit,
}) => {
  const expenseCategories = categories.filter((c) => c.type === 'EXPENSE');
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || (expenseCategories.length > 0 ? expenseCategories[0].name : 'Food')
  );
  const [limit, setLimit] = useState(initialLimit ? initialLimit.toString() : '');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(limit);
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid monthly limit greater than 0.');
      return;
    }
    onSave(selectedCategory, val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold text-slate-100 text-lg">Set Category Budget</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-lg">{error}</div>}

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">
              Expense Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
            >
              {expenseCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">
              Monthly Spending Limit ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 text-sm font-medium">{currency.symbol}</span>
              <input
                type="number"
                step="50"
                min="1"
                placeholder="e.g. 5000"
                required
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3.5 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm font-medium"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              You will receive an amber warning at 80% and a red alert if spending breaches 100%.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-950/40"
            >
              Save Budget Limit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
