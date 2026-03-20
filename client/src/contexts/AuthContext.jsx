import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('raciv_token');
    const username = localStorage.getItem('raciv_user');
    if (token && username) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ username, token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password });
    const { token, username: u } = res.data;
    localStorage.setItem('raciv_token', token);
    localStorage.setItem('raciv_user', u);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser({ username: u, token });
  };

  const logout = () => {
    localStorage.removeItem('raciv_token');
    localStorage.removeItem('raciv_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
