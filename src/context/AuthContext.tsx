// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth/login';
import { register } from '../api/auth/register';
import { apiRequest } from '../api/fitness'; // ← ИМПОРТИРУЕМ apiRequest!

interface AuthContextType {
  user: { email: string; selectedCourses?: string[] } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const email = localStorage.getItem('userEmail') || 'user@example.com';
      // Восстанавливаем курсы при загрузке
      const loadUser = async () => {
        try {
          const userData = await apiRequest<any>('/users/me');
          setUser({
            email,
            selectedCourses: userData.courses || []
          });
        } catch (err) {
          console.warn('Не удалось загрузить данные пользователя');
          setUser({ email, selectedCourses: [] });
        }
      };
      loadUser();
    }
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password) as { token: string };
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);

      // Используем apiRequest вместо сырого fetch
      const userData = await apiRequest<any>('/users/me');

      setToken(data.token);
      setUser({
        email,
        selectedCourses: userData.courses || []
      });

      navigate('/profile');
    } catch (err: any) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      await handleLogin(email, password);
    } catch (err: any) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login: handleLogin, register: handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};