// src/components/Profile.tsx
import { useEffect } from 'react';
import Header from './Header';
import '../styles/profile.css';

const Profile = () => {
  useEffect(() => {
    const logoutBtn = document.getElementById('logout-btn-desktop');
    const logoutMobile = document.getElementById('logout-mobile');

    const handleLogout = () => {
      alert('Выход из аккаунта');
      // Здесь будет реальный логаут
    };

    logoutBtn?.addEventListener('click', handleLogout);
    logoutMobile?.addEventListener('click', handleLogout);

    return () => {
      logoutBtn?.removeEventListener('click', handleLogout);
      logoutMobile?.removeEventListener('click', handleLogout);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <h1 className="page-title">Профиль</h1>

          <section className="profile-card">
            <div className="profile-avatar">
              <img src="/images/avatar.svg" alt="Аватар" className="avatar-img" />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Сергей</h1>
              <p className="profile-login">Логин: sergey.petrov96</p>
              <button className="btn btn-logout" id="logout-btn-desktop">
                Выйти
              </button>
              <button className="btn btn--logout-mobile" id="logout-mobile">
                Выйти
              </button>
            </div>
          </section>

          <section className="my-courses">
            <h2 className="section-title">Мои курсы</h2>
            <div className="courses-grid" id="courses-container">
              {/* Курсы будут добавлены через API */}
              <div className="courses-empty">У вас пока нет добавленных курсов</div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;