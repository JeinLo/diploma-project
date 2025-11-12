import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth/login';
import { register as apiRegister } from '../api/auth/register';
import { getUser } from '../api/users/index';
import type { User } from '../api/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const email = localStorage.getItem('userEmail') || 'user@example.com';
      const loadUser = async () => {
        try {
          const userData = await getUser();
          setUser({
            email,
            selectedCourses: userData.user.selectedCourses || [],
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
      const data = await apiLogin({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      const userData = await getUser();
      setToken(data.token);
      setUser({
        email,
        selectedCourses: userData.user.selectedCourses || [],
      });
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('Ошибка входа');
      }
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await apiRegister({ email, password });
      await handleLogin(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('Ошибка регистрации');
      }
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
    <AuthContext.Provider
      value={{ user, token, login: handleLogin, register: handleRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};