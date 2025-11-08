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

// === КЛЮЧЕВОЙ МАССИВ ПОРЯДКА ===
const FIXED_ORDER: string[] = ['yoga', 'stretching', 'fitness', 'step', 'bodyflex'];

// === ЗАГЛУШКИ ДЛЯ ИЗОБРАЖЕНИЙ ===
const fallbackImages: Record<string, string> = {
  Yoga: '/images/image_1.svg',
  Stretching: '/images/image_2.svg',
  Fitness: '/images/image_3.svg',
  StepAirobic: '/images/image_4.svg',
  Bodyflex: '/images/image_5.svg',
};

// === ЗАГЛУШКИ ДЛЯ КУРСОВ (если API недоступен) ===
const fallbackCourses: CourseType[] = [
  {
    _id: 'yoga',
    nameRU: 'Йога',
    nameEN: 'Yoga',
    durationInDays: 20,
    dailyDurationInMinutes: { from: 10, to: 30 },
    description: '',
    directions: [],
    fitting: [],
    difficulty: 'Легко',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'stretching',
    nameRU: 'Стретчинг',
    nameEN: 'Stretching',
    durationInDays: 40,
    dailyDurationInMinutes: { from: 30, to: 45 },
    description: '',
    directions: [],
    fitting: [],
    difficulty: 'Средне',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'fitness',
    nameRU: 'Фитнес',
    nameEN: 'Fitness',
    durationInDays: 20,
    dailyDurationInMinutes: { from: 45, to: 60 },
    description: '',
    directions: [],
    fitting: [],
    difficulty: 'Средне',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'step',
    nameRU: 'Степ-аэробика',
    nameEN: 'StepAirobic',
    durationInDays: 25,
    dailyDurationInMinutes: { from: 20, to: 50 },
    description: '',
    directions: [],
    fitting: [],
    difficulty: 'Сложно',
    workouts: [],
    __v: 0,
  },
  {
    _id: 'bodyflex',
    nameRU: 'Бодифлекс',
    nameEN: 'Bodyflex',
    durationInDays: 15,
    dailyDurationInMinutes: { from: 50, to: 70 },
    description: '',
    directions: [],
    fitting: [],
    difficulty: 'Сложно',
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
          // === БЕЗОПАСНАЯ СОРТИРОВКА: КОПИЯ + ЗАЩИТА ОТ -1 ===
          const sorted = [...data].sort((a, b) => {
            const aIndex = FIXED_ORDER.indexOf(a._id);
            const bIndex = FIXED_ORDER.indexOf(b._id);

            // Если ID нет в FIXED_ORDER — отправляем в конец
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;

            return aIndex - bIndex;
          });

          setCourses(sorted);
        } else {
          // Если API пустой — используем заглушки (уже в правильном порядке)
          setCourses(fallbackCourses);
        }
      } catch (err: any) {
        console.warn('API недоступен:', err.message);
        setError('Сервер недоступен. Показываем заглушку.');
        setCourses(fallbackCourses); // ← заглушки в правильном порядке
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
      navigate('/profile');
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
              <img
                src="/images/str.svg"
                alt="Стрелка вниз"
                className="bubble-arrow-separate"
              />
            </div>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="cards">
            {courses.map((course) => {
              const imageSrc =
                course.image ||
                fallbackImages[course.nameEN] ||
                '/images/image_5.svg';

              return (
                <article
                  key={course._id}
                  className="card"
                  data-id={course._id}
                  onClick={() => handleCardClick(course._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card__image-wrapper">
                    <img
                      src={imageSrc}
                      alt={course.nameRU}
                      className="card__image"
                    />
                    <button
                      className="card__play-btn"
                      onClick={(e) => handlePlusClick(e, course._id)}
                    >
                      <img
                        src="/images/plus.svg"
                        alt="Добавить"
                        className="plus-icon"
                      />
                    </button>
                  </div>

                  <div className="card__content">
                    <h3 className="card__title">{course.nameRU}</h3>

                    <div className="card__meta">
                      <div className="card__meta-badge card__meta-badge--calendar">
                        <img src="/images/icon_calendar.svg" alt="" />{' '}
                        {course.durationInDays} дней
                      </div>
                      <div className="card__meta-badge card__meta-badge--time">
                        <img src="/images/icon_time.svg" alt="" />{' '}
                        {course.dailyDurationInMinutes.from}-
                        {course.dailyDurationInMinutes.to} мин/день
                      </div>
                    </div>

                    <div className="card__meta-badge card__meta-badge--difficulty">
                      <img src="/images/progress.svg" alt="" /> Сложность
                    </div>
                  </div>
                </article>
              );
            })}
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