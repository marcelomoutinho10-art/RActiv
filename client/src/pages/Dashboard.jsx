import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ActivityList from '../components/ActivityList';
import WeeklyGrid from '../components/WeeklyGrid';
import DailySummary from '../components/DailySummary';
import LayoutSettings from '../components/LayoutSettings';

const DEFAULT_COLUMNS = {
  date: true, category: true, project: true, activity: true,
  hours: true, location: true, notes: true,
};

export default function Dashboard() {
  const [filter, setFilter] = useState('month');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [groupBy, setGroupBy] = useState('date');
  const [viewMode, setViewMode] = useState('list');
  const [showSettings, setShowSettings] = useState(false);
  const [columns, setColumns] = useState(() => {
    try { return JSON.parse(localStorage.getItem('raciv_columns')) || DEFAULT_COLUMNS; }
    catch { return DEFAULT_COLUMNS; }
  });
  const [entries, setEntries] = useState([]);
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const saveColumns = (cols) => {
    setColumns(cols);
    localStorage.setItem('raciv_columns', JSON.stringify(cols));
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { filter };
      if (filter === 'custom') { params.from = dateRange.from; params.to = dateRange.to; }
      const [ents, tots] = await Promise.all([
        api.getEntries(params),
        api.getDailyTotals(params),
      ]);
      setEntries(ents);
      setTotals(tots);
    } catch (e) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [filter, dateRange]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLayoutSettings={() => setShowSettings(true)}
      />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      <main className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 text-sm">{error}</div>
        ) : viewMode === 'list' ? (
          <ActivityList entries={entries} groupBy={groupBy} columns={columns} />
        ) : (
          <WeeklyGrid entries={entries} />
        )}
      </main>

      <DailySummary totals={totals} />

      <LayoutSettings
        visible={showSettings}
        columns={columns}
        setColumns={saveColumns}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
