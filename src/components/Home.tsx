import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses } from '../api/fitness';
import '../styles/home.css';
import AuthModal from './AuthModal';

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navigate = useNavigate();

  // Заглушка
  const mockCourses = [
    { _id: 'yoga', nameRU: 'Йога', image: '/images/image_1.svg', durationInDays: 25, dailyDurationInMinutes: { from: 20, to: 50 } },
    { _id: 'stretching', nameRU: 'Стретчинг', image: '/images/image_2.svg', durationInDays: 25, dailyDurationInMinutes: { from: 20, to: 50 } },
    { _id: 'fitness', nameRU: 'Фитнес', image: '/images/image_3.svg', durationInDays: 25, dailyDurationInMinutes: { from: 20, to: 50 } },
    { _id: 'step', nameRU: 'Степ-аэробика', image: '/images/image_4.svg', durationInDays: 25, dailyDurationInMinutes: { from: 20, to: 50 } },
    { _id: 'bodyflex', nameRU: 'Бодифлекс', image: '/images/image_5.svg', durationInDays: 25, dailyDurationInMinutes: { from: 20, to: 50 } },
  ];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        if (data && Array.isArray(data) && data.length > 0 && data[0]._id) {
          setCourses(data);
        } else {
          throw new Error('Некорректный ответ');
        }
      } catch (err: any) {
        console.warn('API недоступен → заглушки:', err.message);
        setError('Сервер недоступен. Показаны демо-курсы.');
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Клик по кнопке "+" — всегда переход
  const handlePlusClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div className="loading">Загрузка курсов...</div>;
  }

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header__container">
          <div className="logo-wrapper">
            <a href="/" className="logo">
              <img src="/images/Logo.svg" alt="SkyFitnessPro Logo" className="logo__img" />
              <span className="logo__text">SkyFitnessPro</span>
            </a>
            <p className="header__tagline">Онлайн-тренировки для занятий дома</p>
          </div>
          <button className="btn btn--login" onClick={() => setIsAuthOpen(true)}>
            Войти
          </button>
        </div>
      </header>

      {/* MAIN */}
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

          {error && <div className="error-banner">{error}</div>}

          {/* Cards */}
          <div className="cards">
            {courses.map((course) => (
              <article key={course._id} className="card">
                <div className="card__image-wrapper">
                  <img src={course.image || '/images/default.jpg'} alt={course.nameRU} className="card__image" />
                  {/* КНОПКА "+" — ТОЛЬКО ПЕРЕХОД */}
                  <button
                    className="card__play-btn"
                    onClick={(e) => handlePlusClick(e, course._id)}
                  >
                    <img src="/images/plus.svg" alt="Подробнее" className="plus-icon" />
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
                  <Link to={`/course/${course._id}`} className="card__link">
                    <div className="card__meta-badge card__meta-badge--difficulty">
                      <img src="/images/progress.svg" alt="" /> Сложность
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="cta">
            <button
              className="btn btn--cta"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Наверх
            </button>
          </div>
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}