// src/components/UserDropdown.tsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/user-dropdown.css';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.email?.split('@')[0] || 'Пользователь';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className={`user-menu-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-avatar">
          <img src="/images/avatar.svg" alt="Аватар" className="user-avatar-img" />
        </div>
        <span className="user-name">{displayName}</span>
        <img src="/images/strelka.svg" alt="Стрелка" className="user-arrow" />
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-dropdown__inner">
            <div className="user-dropdown__header">
              <span className="user-dropdown__name">{displayName}</span>
              <span className="user-dropdown__email">{user?.email}</span>
            </div>
            <div className="user-dropdown__buttons">
              <button onClick={handleProfileClick} className="btn btn--profile">
                Мой профиль
              </button>
              <button onClick={handleLogout} className="btn btn--logout">
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}