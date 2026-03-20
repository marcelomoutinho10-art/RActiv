export default function LayoutSettings({ visible, columns, setColumns, onClose }) {
  if (!visible) return null;

  const cols = [
    { key: 'date', label: 'Data' },
    { key: 'category', label: 'Categoria' },
    { key: 'project', label: 'Projeto' },
    { key: 'activity', label: 'Atividade' },
    { key: 'hours', label: 'Horas' },
    { key: 'location', label: 'Local' },
    { key: 'notes', label: 'Notas' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 w-full max-w-sm"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-textPrimary">Colunas visíveis</h2>
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {cols.map(col => (
            <label key={col.key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-surface">
              <input
                type="checkbox"
                checked={columns[col.key] !== false}
                onChange={e => setColumns(prev => ({ ...prev, [col.key]: e.target.checked }))}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-textPrimary">{col.label}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-textSecondary">
          <div className="w-4 h-4 rounded" style={{ background: '#FDE8C8' }}></div> Fora de casa &nbsp;
          <div className="w-4 h-4 rounded" style={{ background: '#DAEDF9' }}></div> Reunião online &nbsp;
          <div className="w-4 h-4 rounded border border-border" style={{ background: '#FFF' }}></div> Casa
        </div>
      </div>
    </div>
  );
}
