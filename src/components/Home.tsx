// src/components/Home.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, addCourse } from '../api/fitness';
import '../styles/home.css';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

type CourseType = {
  _id: string;
  nameRU: string;
  nameEN: string;
  image?: string;
  durationInDays: number;
  dailyDurationInMinutes: { from: number; to: number };
  description: string;
  directions: string[];
  fitting: string[];
  order?: number;
  difficulty: string;
  workouts: string[];
  __v: number;
};

const FIXED_ORDER = ['yoga', 'stretching', 'fitness', 'step', 'bodyflex'];

const fallbackImages: Record<string, string> = {
  Yoga: '/images/image_1.svg',
  Stretching: '/images/image_2.svg',
  Fitness: '/images/image_3.svg',
  StepAirobic: '/images/image_4.svg',
  Bodyflex: '/images/image_5.svg',
};

/* Запасная заглушка — если API недоступен */
const fallbackCourses: CourseType[] = [
  {
    _id: 'yoga',
    nameRU: 'Йога',
    nameEN: 'Yoga',
    durationInDays: 30,
    dailyDurationInMinutes: { from: 20, to: 40 },
    description: 'Йога для начинающих',
    directions: ['Йога для новичков', 'Классическая йога'],
    fitting: ['Для всех'],
    difficulty: 'Лёгкая',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'stretching',
    nameRU: 'Стретчинг',
    nameEN: 'Stretching',
    durationInDays: 30,
    dailyDurationInMinutes: { from: 15, to: 30 },
    description: 'Растяжка для гибкости',
    directions: ['Растяжка спины', 'Растяжка ног'],
    fitting: ['Для всех'],
    difficulty: 'Лёгкая',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'fitness',
    nameRU: 'Фитнес',
    nameEN: 'Fitness',
    durationInDays: 30,
    dailyDurationInMinutes: { from: 30, to: 60 },
    description: 'Силовые и кардио тренировки',
    directions: ['HIIT', 'Силовые'],
    fitting: ['Для среднего уровня'],
    difficulty: 'Средняя',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'step',
    nameRU: 'Степ-аэробика',
    nameEN: 'StepAirobic',
    durationInDays: 30,
    dailyDurationInMinutes: { from: 30, to: 45 },
    description: 'Энергичные тренировки на степе',
    directions: ['Базовый степ', 'Степ + сила'],
    fitting: ['Для всех'],
    difficulty: 'Средняя',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'bodyflex',
    nameRU: 'Бодифлекс',
    nameEN: 'Bodyflex',
    durationInDays: 30,
    dailyDurationInMinutes: { from: 15, to: 30 },
    description: 'Дыхательная гимнастика',
    directions: ['Пресс', 'Ягодицы'],
    fitting: ['Для всех'],
    difficulty: 'Лёгкая',
    workouts: [],
    __v: 0,
  },
];

export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.sort((a: CourseType, b: CourseType) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order;
            }
            const aIndex = FIXED_ORDER.indexOf(a._id);
            const bIndex = FIXED_ORDER.indexOf(b._id);
            return aIndex - bIndex;
          });
          setCourses(sorted);
        } else {
          setCourses(fallbackCourses);
        }
      } catch (err: any) {
        console.warn('API недоступен:', err.message);
        setError('Сервер недоступен. Показываем заглушку.');
        setCourses(fallbackCourses); // ← Запасная заглушка
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handlePlusClick = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (!token) {
      setIsAuthOpen(true);
      return;
    }
    try {
      await addCourse(courseId);
      alert('Курс добавлен в профиль!');
      window.location.reload();
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div className="loading">Загрузка курсов...</div>;
  }

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
          <button className="btn btn--login" onClick={() => setIsAuthOpen(true)}>
            Войти
          </button>
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

          {error && <div className="error-banner">{error}</div>}

          <div className="cards">
            {courses.map((course) => (
              <article
                key={course._id}
                className="card"
                onClick={() => handleCardClick(course._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card__image-wrapper">
                  <img
                    src={course.image || fallbackImages[course.nameEN] || '/images/image_5.svg'}
                    alt={course.nameRU}
                    className="card__image"
                  />
                  <button
                    className="card__play-btn"
                    onClick={(e) => handlePlusClick(e, course._id)}
                  >
                    <img src="/images/plus.svg" alt="Добавить" className="plus-icon" />
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
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cta">
            <button
              className="btn btn--cta btn--cta-scroll"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Наверх ↑
            </button>
          </div>
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}