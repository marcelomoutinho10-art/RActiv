import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

const LOC_BG = { HOME: '#FFFFFF', OUTSIDE: '#FDE8C8', ONLINE: '#DAEDF9' };

export default function WeeklyGrid({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-textSecondary">
        <p className="text-sm">Sem atividades no período selecionado</p>
      </div>
    );
  }

  // Find all unique dates and build week structure
  const dates = [...new Set(entries.map(e => e.date.slice(0, 10)))].sort();
  if (dates.length === 0) return null;

  const firstDate = parseISO(dates[0] + 'T12:00:00');
  const weekStart = startOfWeek(firstDate, { weekStartsOn: 1 }); // Monday

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Build project → category map
  const projectMap = {};
  const categoryMap = {};
  for (const e of entries) {
    if (e.project) {
      projectMap[e.project.id] = e.project;
      categoryMap[e.project.categoryId] = e.project.category;
    }
  }

  // Group entries by project and date
  const byProjectDate = {};
  for (const e of entries) {
    const key = `${e.projectId}_${e.date.slice(0, 10)}`;
    if (!byProjectDate[key]) byProjectDate[key] = [];
    byProjectDate[key].push(e);
  }

  // Sort categories and projects
  const categories = Object.values(categoryMap).sort((a, b) => a.order - b.order);
  const projectsByCategory = {};
  for (const p of Object.values(projectMap)) {
    if (!projectsByCategory[p.categoryId]) projectsByCategory[p.categoryId] = [];
    projectsByCategory[p.categoryId].push(p);
  }

  const dayLabel = (d) => format(d, 'EEE d/M', { locale: pt });

  return (
    <div className="overflow-x-auto px-2 pb-4">
      <table className="text-xs min-w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-surface">
            <th className="px-3 py-2 text-left text-xs font-semibold text-textSecondary w-40 sticky left-0 bg-surface z-10">
              Projeto
            </th>
            {weekDays.map((d, i) => (
              <th key={i} className="px-2 py-2 text-center font-semibold text-textSecondary min-w-[90px]">
                <div className={`capitalize ${format(d, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-primary' : ''}`}>
                  {dayLabel(d)}
                </div>
              </th>
            ))}
            <th className="px-3 py-2 text-right font-semibold text-textSecondary w-16">Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <>
              <tr key={`cat-${cat.id}`} className="bg-blue-50">
                <td colSpan={9} className="px-3 py-1.5 font-bold text-xs" style={{ color: '#4A7AA3' }}>
                  {cat.name}
                </td>
              </tr>
              {(projectsByCategory[cat.id] || []).sort((a, b) => a.order - b.order).map(proj => {
                let rowTotal = 0;
                return (
                  <tr key={`proj-${proj.id}`} className="border-t border-border hover:bg-surface/50">
                    <td className="px-3 py-2 font-medium text-textPrimary sticky left-0 bg-white z-10 max-w-[140px] truncate">
                      {proj.name}
                    </td>
                    {weekDays.map((d, i) => {
                      const dateKey = format(d, 'yyyy-MM-dd');
                      const key = `${proj.id}_${dateKey}`;
                      const dayEntries = byProjectDate[key] || [];
                      const dayHours = dayEntries.reduce((a, e) => a + e.hours, 0);
                      rowTotal += dayHours;
                      const locType = dayEntries[0]?.locationType || 'HOME';
                      return (
                        <td key={i} className="px-2 py-2 text-center"
                          style={{ backgroundColor: dayEntries.length > 0 ? LOC_BG[locType] : undefined }}>
                          {dayHours > 0 ? (
                            <div>
                              <div className="font-bold text-primary">{dayHours.toFixed(2)}h</div>
                              {dayEntries.map((e, ei) => (
                                e.activityName && (
                                  <div key={ei} className="text-textSecondary text-xs mt-0.5 leading-tight">{e.activityName}</div>
                                )
                              ))}
                            </div>
                          ) : (
                            <span className="text-border">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-right font-bold text-primary">
                      {rowTotal > 0 ? `${rowTotal.toFixed(2)}h` : '—'}
                    </td>
                  </tr>
                );
              })}
            </>
          ))}
          {/* Grand total row */}
          <tr className="border-t-2 border-primary/30 bg-surface font-bold">
            <td className="px-3 py-2 text-xs font-semibold text-textSecondary sticky left-0 bg-surface">Total</td>
            {weekDays.map((d, i) => {
              const dateKey = format(d, 'yyyy-MM-dd');
              const dayTotal = entries
                .filter(e => e.date.slice(0, 10) === dateKey)
                .reduce((a, e) => a + e.hours, 0);
              return (
                <td key={i} className="px-2 py-2 text-center font-bold text-primary text-sm">
                  {dayTotal > 0 ? `${dayTotal.toFixed(2)}h` : '—'}
                </td>
              );
            })}
            <td className="px-3 py-2 text-right font-bold text-primary text-sm">
              {entries.reduce((a, e) => a + e.hours, 0).toFixed(2)}h
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
