// src/components/Profile.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/profile.css';
import { deleteCourse, getAllCourses } from '../api/fitness';

const bgColors: Record<string, string> = {
  yoga: '#FFC700',
  stretching: '#2491D2',
  fitness: '#F7A012',
  step: '#FF7E65',
  bodyflex: '#7D458C',
};

const progressMap: Record<string, number> = {
  yoga: 40,
  stretching: 0,
  fitness: 100,
  step: 0,
  bodyflex: 0,
};

export default function Profile() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const loadUserCourses = async () => {
      try {
        // Получаем ВСЕ курсы
        const allCourses = await getAllCourses();

        // Получаем курсы пользователя с сервера
        const userResponse = await fetch('https://wedev-api.sky.pro/api/fitness/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();

        const userCourseIds = userData.courses || [];

        // Фильтруем и добавляем прогресс
        const userCourses = allCourses
          .filter((c: any) => userCourseIds.includes(c._id))
          .map((c: any) => ({ ...c, progress: progressMap[c._id] || 0 }));

        setCourses(userCourses);
      } catch (err) {
        console.error('Ошибка загрузки курсов:', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserCourses();
  }, [token, navigate]);

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Удалить курс из профиля?')) return;
    try {
      await deleteCourse(courseId);
      setCourses(prev => prev.filter(c => c._id !== courseId));
      alert('Курс удалён');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const getButtonText = (progress: number) => {
    if (progress === 0) return 'Начать тренировки';
    if (progress === 100) return 'Начать заново';
    return 'Продолжить';
  };

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
              {courses.map((course) => {
                const progress = course.progress;
                return (
                  <article key={course._id} className="course-card">
                    <div
                      className="course-image-wrapper"
                      style={{ backgroundColor: bgColors[course._id] || '#BCEC30' }}
                    >
                      <img
                        src={
                          course.image ||
                          `/images/image_${course._id === 'step' ? '4' : course._id === 'bodyflex' ? '5' : '1'}.svg`
                        }
                        alt={course.nameRU}
                        className="card__image"
                      />
                      <button
                        className="card__play-btn course-delete"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        <img src="/images/minus.svg" alt="Удалить" />
                      </button>
                    </div>
                    <div className="course-content">
                      <h3 className="course-title">{course.nameRU}</h3>
                      <div className="course-meta">
                        <div className="course-meta-item">
                          <img src="/images/icon_calendar.svg" alt="" />
                          {course.durationInDays} дней
                        </div>
                        <div className="course-meta-item">
                          <img src="/images/icon_time.svg" alt="" />
                          {course.dailyDurationInMinutes.from}-{course.dailyDurationInMinutes.to} мин/день
                        </div>
                      </div>
                      <div className="course-link">
                        <img src="/images/progress.svg" alt="" /> Сложность
                      </div>
                      <div className="course-progress">
                        <div className="progress-text">Прогресс {progress}%</div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <Link
                        to={`/course/${course._id}/workout/1`}
                        className="course-btn"
                      >
                        {getButtonText(progress)}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}