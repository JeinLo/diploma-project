import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, addCourse } from '../api/fitness';
import '../styles/home.css';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

interface CourseType {
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
}

const fallbackCourses: CourseType[] = [
  {
    _id: 'ab1c3f',
    nameRU: 'Йога',
    nameEN: 'Yoga',
    image: '/images/image_1.svg',
    durationInDays: 20,
    dailyDurationInMinutes: { from: 10, to: 30 },
    description: 'Философия здорового образа жизни',
    directions: ['Йога для новичков'],
    fitting: ['Давно хотел попробовать'],
    difficulty: 'начальный',
    workouts: ['3yvozj', 'hfgxlo'],
    __v: 0,
    order: 1
  },
  {
    _id: 'kfpq8e',
    nameRU: 'Стретчинг',
    nameEN: 'Stretching',
    image: '/images/image_2.svg',
    durationInDays: 40,
    dailyDurationInMinutes: { from: 30, to: 45 },
    description: 'Растяжка и гибкость',
    directions: ['статический', 'динамический'],
    fitting: ['Улучшить осанку'],
    difficulty: 'начальный',
    workouts: ['9mefwq'],
    __v: 0,
    order: 2
  },
  {
    _id: 'ypox9r',
    nameRU: 'Фитнес',
    nameEN: 'Fitness',
    image: '/images/image_3.svg',
    durationInDays: 20,
    dailyDurationInMinutes: { from: 45, to: 60 },
    description: 'Танцевальный фитнес',
    directions: ['Зумба'],
    fitting: ['Любите танцы'],
    difficulty: 'сложный',
    workouts: ['gh7bd5'],
    __v: 0,
    order: 3
  },
  {
    _id: '6i67sm',
    nameRU: 'Степ-аэробика',
    nameEN: 'StepAirobic',
    image: '/images/image_4.svg',
    durationInDays: 25,
    dailyDurationInMinutes: { from: 20, to: 50 },
    description: 'Аэробика с платформой',
    directions: ['Для начинающих'],
    fitting: ['Быстро сбросить вес'],
    difficulty: 'средний',
    workouts: ['e9ghsb'],
    __v: 0,
    order: 4
  },
  {
    _id: 'q02a6i',
    nameRU: 'Бодифлекс',
    nameEN: 'BodyFlex',
    image: '/images/image_5.svg',
    durationInDays: 15,
    dailyDurationInMinutes: { from: 50, to: 70 },
    description: 'Дыхательная гимнастика',
    directions: ['базовый'],
    fitting: ['Укрепить легкие'],
    difficulty: 'сложный',
    workouts: ['xlpkqy'],
    __v: 0,
    order: 5
  }
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
          const sorted = [...data].sort((a: CourseType, b: CourseType) => {
            const aOrder = a.order ?? 999;
            const bOrder = b.order ?? 999;
            return aOrder - bOrder;
          });
          setCourses(sorted);
        } else {
          throw new Error('Нет данных');
        }
      } catch (err: any) {
        console.warn('API недоступен:', err.message);
        setError('Сервер недоступен. Показываем заглушку.');
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handlePlusClick = async (e: React.MouseEvent<HTMLButtonElement>, courseId: string) => {
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
              const imageSrc = course.image || `/images/image_${course.order}.svg` || '/images/image_1.svg';
              return (
                <article
                  key={course._id}
                  className="card"
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
                      <img src="/images/plus.svg" alt="Добавить" className="plus-icon" />
                    </button>
                  </div>

                  <div className="card__content">
                    <h3 className="card__title">{course.nameRU}</h3>
                    <div className="card__meta">
                      <div className="card__meta-badge card__meta-badge--calendar">
                        <img src="/images/icon_calendar.svg" alt="" />
                        {course.durationInDays} дней
                      </div>
                      <div className="card__meta-badge card__meta-badge--time">
                        <img src="/images/icon_time.svg" alt="" />
                        {course.dailyDurationInMinutes.from}-{course.dailyDurationInMinutes.to} мин/день
                      </div>
                    </div>
                    <div className="card__meta-badge card__meta-badge--difficulty">
                      <img src="/images/progress.svg" alt="" />
                      Сложность
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