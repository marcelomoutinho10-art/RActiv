import { useState } from 'react';

export default function FilterBar({ filter, setFilter, dateRange, setDateRange, groupBy, setGroupBy }) {
  const [showCustom, setShowCustom] = useState(false);

  const handleCustom = () => {
    setShowCustom(!showCustom);
    if (!showCustom) setFilter('custom');
  };

  return (
    <div className="bg-white border-b border-border px-4 py-2 flex flex-wrap items-center gap-2">
      {/* Group by */}
      <div className="flex items-center gap-2 text-xs text-textSecondary">
        <span className="font-medium">Agrupar:</span>
        {['date', 'category', 'project'].map(g => (
          <button
            key={g}
            onClick={() => setGroupBy(g)}
            className={`px-2 py-1 rounded transition-all ${
              groupBy === g ? 'text-primary font-semibold' : 'hover:text-textPrimary'
            }`}>
            {g === 'date' ? 'Data' : g === 'category' ? 'Categoria' : 'Projeto'}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Custom date range */}
      <button
        onClick={handleCustom}
        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
          filter === 'custom' ? 'border-primary text-primary' : 'border-border text-textSecondary hover:border-primary'
        }`}>
        Intervalo personalizado
      </button>

      {showCustom && (
        <div className="flex items-center gap-2 text-xs">
          <input
            type="date"
            value={dateRange.from || ''}
            onChange={e => setDateRange(p => ({ ...p, from: e.target.value }))}
            className="border border-border rounded px-2 py-1 text-xs focus:outline-none focus:border-primary"
          />
          <span className="text-textSecondary">–</span>
          <input
            type="date"
            value={dateRange.to || ''}
            onChange={e => setDateRange(p => ({ ...p, to: e.target.value }))}
            className="border border-border rounded px-2 py-1 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      )}
    </div>
  );
}
