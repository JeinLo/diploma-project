// src/components/Profile.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import '../styles/profile.css';
import { deleteCourse } from '../api/fitness';

export default function Profile() {
  const { user: authUser, logout, token } = useAuth();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // ---------- Загрузка выбранных курсов ----------
  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }
    const fetchSelected = async () => {
      try {
        const res = await fetch('https://wedev-api.sky.pro/api/fitness/users/me/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSelectedCourses(data.courses || []);
        }
      } catch (err) {
        console.warn('Не удалось загрузить выбранные курсы');
      }
    };
    fetchSelected();
  }, [token]);

  // ---------- Удаление ----------
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Удалить курс?')) return;
    try {
      await deleteCourse(courseId);
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
      alert('Курс удалён');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (!authUser) {
    return (
      <>
        <Header />
        <main className="main"><div className="container"><div className="loading">Загрузка профиля...</div></div></main>
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
              <h2 className="profile-name">{authUser.email}</h2>
              <p className="profile-login">Логин: {authUser.email}</p>
              <button className="btn btn-logout" onClick={logout}>Выйти</button>
            </div>
          </section>

          <section className="my-courses">
            <h2 className="section-title">Мои курсы</h2>
            <div className="courses-grid">
              {selectedCourses.length > 0 ? (
                selectedCourses.map((courseId: string) => (
                  <div key={courseId} className="course-card">
                    <p>Курс ID: {courseId}</p>
                    <button onClick={() => handleDeleteCourse(courseId)} className="btn btn--danger">
                      Удалить
                    </button>
                  </div>
                ))
              ) : (
                <p className="courses-empty">У вас пока нет курсов</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}