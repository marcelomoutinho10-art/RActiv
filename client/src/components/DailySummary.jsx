export default function DailySummary({ totals }) {
  const dates = Object.keys(totals).sort();
  if (dates.length === 0) return null;

  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white border-t border-border px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-wide">Totais diários</h3>
        <span className="ml-auto text-xs font-bold text-primary">{grandTotal.toFixed(2)}h total</span>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {dates.map(d => (
          <div key={d} className="flex-shrink-0 text-center bg-surface rounded-lg px-3 py-2 min-w-[64px]">
            <div className="text-xs text-textSecondary">
              {new Date(d + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
            </div>
            <div className="text-sm font-bold text-primary">{totals[d].toFixed(2)}h</div>
          </div>
        ))}
      </div>
    </div>
  );
}
