// src/components/Header.tsx
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import UserDropdown from './UserDropdown';
import { useState } from 'react';

export default function Header() {
  const { token } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <div className="logo-wrapper">
            <a href="/" className="logo">
              <img src="/images/Logo.svg" alt="SkyFitnessPro Logo" className="logo__img" />
              <span className="logo__text">SkyFitnessPro</span>
            </a>
            <p className="header__tagline">Онлайн-тренировки для занятий дома</p>
          </div>

          <div className="auth-section">
            {token ? (
              <UserDropdown />
            ) : (
              <button
                className="btn btn--login"
                onClick={() => setIsAuthOpen(true)}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}