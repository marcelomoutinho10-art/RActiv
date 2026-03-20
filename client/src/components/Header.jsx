import { useAuth } from '../contexts/AuthContext';

export default function Header({ filter, setFilter, onLayoutSettings, viewMode, setViewMode }) {
  const { user, logout } = useAuth();

  const filters = [
    { key: 'today', label: 'Hoje' },
    { key: 'week', label: 'Esta Semana' },
    { key: 'month', label: 'Este Mês' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-20 shadow-sm">
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5B8DB8, #7CB9A8)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 32 32">
              <rect x="2" y="5" width="28" height="24" rx="3" fill="white" opacity="0.9"/>
              <rect x="9" y="2" width="3.5" height="7" rx="1.75" fill="white"/>
              <rect x="19.5" y="2" width="3.5" height="7" rx="1.75" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-lg" style={{ color: '#2D3748' }}>RActiv</span>
        </div>

        {/* Filters */}
        <div className="flex gap-1 flex-1 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.key
                  ? 'text-white shadow-sm'
                  : 'text-textSecondary hover:bg-surface'
              }`}
              style={filter === f.key ? { background: 'linear-gradient(135deg, #5B8DB8, #7CB9A8)' } : {}}>
              {f.label}
            </button>
          ))}
        </div>

        {/* View mode */}
        <div className="flex gap-1 bg-surface rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            title="Lista"
            className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            title="Grelha semanal"
            className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18" />
            </svg>
          </button>
        </div>

        {/* Settings */}
        <button
          onClick={onLayoutSettings}
          className="p-2 rounded-lg hover:bg-surface transition-all"
          title="Configurações de layout">
          <svg className="w-4 h-4 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #5B8DB8, #7CB9A8)' }}>
            {user?.username?.charAt(0)}
          </div>
          <button onClick={logout} className="text-xs text-textSecondary hover:text-textPrimary hidden sm:block">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
