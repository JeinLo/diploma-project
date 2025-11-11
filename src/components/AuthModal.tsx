import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth-modal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
    general?: string;
  }>({});

  const { login, register } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: any = {};
    if (!email) newErrors.email = 'Заполните поле';
    else if (!isLogin && !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Введите корректный Email';

    if (!password) newErrors.password = 'Заполните поле';
    else if (password.length < 6)
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    else if (!isLogin) {
      const hasUppercase = /[A-Z]/.test(password);
      const specialCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
      if (!hasUppercase)
        newErrors.password = 'Пароль должен содержать как минимум одну заглавную букву';
      else if (specialCount < 2)
        newErrors.password = 'Пароль должен содержать не менее 2 спецсимволов';
    }

    if (!isLogin && password !== confirmPassword)
      newErrors.confirm = 'Пароли не совпадают';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err: any) {
      setErrors({ general: err.message || 'Ошибка сервера. Попробуйте позже.' });
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal" ref={modalRef}>
        <form onSubmit={handleSubmit} className="auth-form" onClick={(e) => e.stopPropagation()}>
          <div className="auth-modal__logo-center">
            <a href="/" className="logo" onClick={(e) => e.preventDefault()}>
              <img src="/images/Logo.svg" alt="SkyFitnessPro Logo" className="logo__img" />
              <span className="logo__text">SkyFitnessPro</span>
            </a>
          </div>

          <div className="auth-form__group">
            <input
              type="text"
              placeholder={isLogin ? 'Логин' : 'Эл. почта'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`auth-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <div className="auth-error">{errors.email}</div>}
          </div>

          <div className="auth-form__group">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`auth-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <div className="auth-error">{errors.password}</div>}
          </div>

          {errors.general && (
            <div className="auth-form__group">
              <div className="auth-error general-error">{errors.general}</div>
            </div>
          )}

          {!isLogin && (
            <div className="auth-form__group">
              <input
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`auth-input ${errors.confirm ? 'error' : ''}`}
              />
              {errors.confirm && <div className="auth-error">{errors.confirm}</div>}
            </div>
          )}

          <button type="submit" className="btn btn--auth-submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>

          <button type="button" className="btn btn--auth-secondary" onClick={switchMode}>
            {isLogin ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;