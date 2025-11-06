// src/components/Profile.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import '../styles/profile.css';
import { deleteCourse } from '../api/fitness'; // Добавим для удаления

export default function Profile() {
  const { user, login, logout, loading } = useAuth(); // Убрали token
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error: any) {
      alert('Ошибка входа: ' + (error.message || 'Неверные данные'));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Предположим, что register — отдельная функция
      // Если нет — используем login (регистрация через вход)
      await login(email, password);
    } catch (error: any) {
      alert('Ошибка регистрации: ' + (error.message || 'Попробуйте снова'));
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      alert('Курс удалён');
      // Обновить user.selectedCourses — можно через getProfile()
    } catch (error: any) {
      alert('Ошибка: ' + error.message);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="main">
          <div className="container">
            <h1 className="page-title">Вход / Регистрация</h1>
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
              <button type="submit" className="btn btn--cta">
                Войти
              </button>
              <button type="button" onClick={handleRegister} className="btn btn--cta">
                Регистрация
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

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
              <h1 className="profile-name">{user.email}</h1>
              <p className="profile-login">Логин: {user.email}</p>
              <button className="btn btn-logout" onClick={logout}>
                Выйти
              </button>
              <button className="btn btn--logout-mobile" onClick={logout}>
                Выйти
              </button>
            </div>
          </section>

          <section className="my-courses">
            <h2 className="section-title">Мои курсы</h2>
            <div className="courses-grid" id="courses-container">
              {user.selectedCourses && user.selectedCourses.length > 0 ? (
                user.selectedCourses.map((courseId) => (
                  <div key={courseId} className="course-card">
                    <p>Курс ID: {courseId}</p>
                    <button
                      onClick={() => handleDeleteCourse(courseId)}
                      className="btn btn--cta"
                    >
                      Удалить
                    </button>
                  </div>
                ))
              ) : (
                <div className="courses-empty">У вас пока нет добавленных курсов</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}