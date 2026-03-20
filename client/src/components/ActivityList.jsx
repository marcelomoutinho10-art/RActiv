import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

const LOC_COLORS = {
  HOME: 'loc-home',
  OUTSIDE: 'loc-outside',
  ONLINE: 'loc-online',
};
const LOC_LABELS = { HOME: 'Casa', OUTSIDE: 'Fora', ONLINE: 'Online' };

function formatDate(iso) {
  try {
    return format(parseISO(iso.slice(0, 10) + 'T12:00:00'), "EEE, d 'de' MMM yyyy", { locale: pt });
  } catch { return iso; }
}

function GroupCard({ title, entries, columns, isDateGroup }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 px-4 py-2 sticky top-[57px] bg-surface z-10">
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-wide">
          {title}
        </span>
        {isDateGroup && (
          <span className="ml-auto text-xs font-bold text-primary">
            {entries.reduce((a, e) => a + e.hours, 0).toFixed(2)}h
          </span>
        )}
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden mx-2 shadow-sm">
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="border-b border-border text-xs text-textSecondary">
              {columns.date !== false && !isDateGroup && <th className="px-4 py-2 text-left font-medium">Data</th>}
              {columns.category !== false && <th className="px-4 py-2 text-left font-medium">Categoria</th>}
              {columns.project !== false && <th className="px-4 py-2 text-left font-medium">Projeto</th>}
              {columns.activity !== false && <th className="px-4 py-2 text-left font-medium">Atividade</th>}
              {columns.hours !== false && <th className="px-4 py-2 text-right font-medium w-16">Horas</th>}
              {columns.location !== false && <th className="px-4 py-2 text-left font-medium w-20">Local</th>}
              {columns.notes !== false && <th className="px-4 py-2 text-left font-medium">Notas</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={e.id} className={`border-b border-border last:border-0 ${LOC_COLORS[e.locationType]}`}>
                {columns.date !== false && !isDateGroup && (
                  <td className="px-4 py-2.5 text-xs text-textSecondary whitespace-nowrap">
                    {formatDate(e.date)}
                  </td>
                )}
                {columns.category !== false && (
                  <td className="px-4 py-2.5 text-xs text-textSecondary">{e.project?.category?.name}</td>
                )}
                {columns.project !== false && (
                  <td className="px-4 py-2.5 font-medium text-xs">{e.project?.name}</td>
                )}
                {columns.activity !== false && (
                  <td className="px-4 py-2.5 text-xs">
                    {e.activityName
                      ? <span className="px-2 py-0.5 bg-surface rounded-full">{e.activityName}</span>
                      : <span className="text-textSecondary italic">—</span>}
                  </td>
                )}
                {columns.hours !== false && (
                  <td className="px-4 py-2.5 text-right font-bold text-primary text-sm">{e.hours.toFixed(2)}h</td>
                )}
                {columns.location !== false && (
                  <td className="px-4 py-2.5 text-xs text-textSecondary">{LOC_LABELS[e.locationType]}</td>
                )}
                {columns.notes !== false && (
                  <td className="px-4 py-2.5 text-xs text-textSecondary max-w-xs">
                    <span className="line-clamp-2">{e.notes || '—'}</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ActivityList({ entries, groupBy, columns }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-textSecondary">
        <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm">Sem atividades no período selecionado</p>
      </div>
    );
  }

  // Group entries
  const grouped = {};
  for (const e of entries) {
    let key;
    if (groupBy === 'date') key = e.date.slice(0, 10);
    else if (groupBy === 'category') key = e.project?.category?.name || 'Sem categoria';
    else key = e.project?.name || 'Sem projeto';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  }

  const formatGroupTitle = (key) => {
    if (groupBy === 'date') {
      try {
        return format(parseISO(key + 'T12:00:00'), "EEEE, d 'de' MMMM yyyy", { locale: pt });
      } catch { return key; }
    }
    return key;
  };

  return (
    <div className="overflow-x-auto">
      {Object.entries(grouped).map(([key, ents]) => (
        <GroupCard
          key={key}
          title={formatGroupTitle(key)}
          entries={ents}
          columns={columns}
          isDateGroup={groupBy === 'date'}
        />
      ))}
    </div>
  );
}
