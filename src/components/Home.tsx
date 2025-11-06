import { useEffect, useState } from 'react';
import { getAllCourses, addCourse } from '../api/fitness';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    getAllCourses().then(setCourses).catch(console.error);
  }, []);

  const handleAddCourse = async (courseId: string) => {
    if (!token) {
      alert('Войдите в аккаунт');
      return;
    }
    try {
      await addCourse(courseId);
      alert('Курс добавлен!');
    } catch (error) {
      alert('Ошибка: ' + error);
    }
  };

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
          <button className="btn btn--login">Войти</button>
        </div>
      </header>

      <main className="main">
        <div className="container main__container">
          <div className="hero">
            <h1 className="hero__title">
              Начните заниматься спортом и улучшите качество жизни
            </h1>
            <div className="bubble-wrapper">
              <div className="speech-bubble">
                Измени своё тело за полгода!
              </div>
              <img src="/images/str.svg" alt="Стрелка вниз" className="bubble-arrow-separate" />
            </div>
          </div>

          <div className="cards">
            {courses.map((course) => (
              <article key={course._id} className="card">
                <div className="card__image-wrapper">
                  <img src={course.image || '/images/default.jpg'} alt={course.nameRU} className="card__image" />
                  <button className="card__play-btn">
                    <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                  </button>
                </div>
                <div className="card__content">
                  <h3 className="card__title">{course.nameRU}</h3>
                  <div className="card__meta">
                    <div className="card__meta-badge card__meta-badge--calendar">
                      <img src="/images/icon_calendar.svg" alt="" /> {course.durationInDays} дней
                    </div>
                    <div className="card__meta-badge card__meta-badge--time">
                      <img src="/images/icon_time.svg" alt="" /> {course.dailyDurationInMinutes.from}-{course.dailyDurationInMinutes.to} мин/день
                    </div>
                  </div>
                  <a href={`/course/${course._id}`} className="card__link">
                    <div className="card__meta-badge card__meta-badge--difficulty">
                      <img src="/images/progress.svg" alt="" /> {course.difficulty}
                    </div>
                  </a>
                  <button onClick={() => handleAddCourse(course._id)} className="btn btn--cta">Добавить</button>
                </div>
              </article>
            ))}
          </div>

          <div className="cta">
            <button className="btn btn--cta" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Наверх ↑
            </button>
          </div>
        </div>
      </main>
    </>
  );
}