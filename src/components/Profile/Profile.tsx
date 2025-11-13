// src/components/Profile/Profile.tsx
import { useAuth } from '../../context/AuthContext';
import { useProfileData } from './useProfileData';
import { UserCourseCard } from './UserCourseCard';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';

export default function Profile() {
  const { logout } = useAuth();
  const { user, courses, loading, handleDelete, getButtonText, refetchCourses } = useProfileData();

  if (!user) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading">Загрузка...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <h1 className="page-title">Профиль</h1>
        <section className="profile-card">
          <div className="profile-avatar">
            <img src="/images/avatar.svg" alt="Аватар" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.email}</h2>
            <p className="profile-login">Логин: {user.email}</p>
            <button className="btn-logout" onClick={logout}>
              Выйти
            </button>
          </div>
        </section>
        <section className="my-courses">
          <h2 className="section-title">Мои курсы</h2>
          {loading ? (
            <div className="loading">Загрузка курсов...</div>
          ) : courses.length === 0 ? (
            <p className="courses-empty">
              У вас пока нет курсов. Перейдите на <Link to="/">главную</Link> и выберите курс!
            </p>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <UserCourseCard
                  key={course._id}
                  course={course}
                  onDelete={handleDelete}
                  getButtonText={getButtonText}
                  onRefetch={refetchCourses} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}