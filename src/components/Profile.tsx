import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import '../styles/profile.css';
import { deleteCourse } from '../api/fitness';

export default function Profile() {
  const { user, logout, token } = useAuth();

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    }
  }, [token]);

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Удалить курс?')) return;
    try {
      await deleteCourse(courseId);
      alert('Курс удалён');
      window.location.reload();
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="main">
          <div className="container">
            <div className="loading">Загрузка профиля...</div>
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
              <h2 className="profile-name">{user.email}</h2>
              <p className="profile-login">Логин: {user.email}</p>
              <button className="btn btn-logout" onClick={logout}>
                Выйти
              </button>
            </div>
          </section>

          <section className="my-courses">
            <h2 className="section-title">Мои курсы</h2>
            <div className="courses-grid">
              {user.selectedCourses && user.selectedCourses.length > 0 ? (
                user.selectedCourses.map((courseId: string) => (
                  <div key={courseId} className="course-card">
                    <p>Курс ID: {courseId}</p>
                    <button
                      onClick={() => handleDeleteCourse(courseId)}
                      className="btn btn--danger"
                    >
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