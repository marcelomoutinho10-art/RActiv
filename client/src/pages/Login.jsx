import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #E0F2F1 50%, #EFF6FF 100%)' }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-3 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5B8DB8, #7CB9A8)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="none" viewBox="0 0 32 32">
              <rect x="2" y="5" width="28" height="24" rx="3" fill="white" opacity="0.9"/>
              <rect x="2" y="5" width="28" height="9" rx="3" fill="white" opacity="0.6"/>
              <rect x="9" y="2" width="3.5" height="7" rx="1.75" fill="white"/>
              <rect x="19.5" y="2" width="3.5" height="7" rx="1.75" fill="white"/>
              <rect x="6" y="18" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
              <rect x="13.5" y="18" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
              <rect x="21" y="18" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#2D3748' }}>RActiv</h1>
          <p className="text-sm mt-1" style={{ color: '#718096' }}>Registo de Atividades</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#4A5568' }}>
              Utilizador
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E2E8F0', focusRingColor: '#5B8DB8' }}
              placeholder="Username"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#4A5568' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: '#E2E8F0' }}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-all disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg, #5B8DB8, #7CB9A8)' }}>
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
