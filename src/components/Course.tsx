// src/components/Course.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/course.css';
import { useAuth } from '../context/AuthContext';
import { addCourse } from '../api/fitness';

const Course = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    const courses: Record<string, any> = {
      yoga: {
        title: 'Йога',
        image: '/images/image_1.svg',
        bgColor: '#FFC700',
        directions: [
          'Йога для новичков',
          'Классическая йога',
          'Кундалини-йога',
          'Йогатерапия',
          'Хатха-йога',
          'Аштанга-йога',
        ],
      },
      stretching: {
        title: 'Стретчинг',
        image: '/images/image_2.svg',
        bgColor: '#FF6B6B',
        directions: [
          'Растяжка для новичков',
          'Гибкость спины',
          'Растяжка ног',
          'Растяжка плеч',
          'Утренняя растяжка',
          'Вечерняя растяжка',
        ],
      },
      fitness: {
        title: 'Фитнес',
        image: '/images/image_3.svg',
        bgColor: '#4ECDC4',
        directions: [
          'Силовые тренировки',
          'Кардио',
          'Функциональный тренинг',
          'HIIT',
          'Тренировка на выносливость',
          'Тренировка на силу',
        ],
      },
      step: {
        title: 'Степ-аэробика',
        image: '/images/image_4.svg',
        bgColor: '#45B7D1',
        directions: [
          'Базовый степ',
          'Степ + силовые',
          'Степ-кардио',
          'Степ для новичков',
          'Степ с гантелями',
          'Степ-танцы',
        ],
      },
      bodyflex: {
        title: 'Бодифлекс',
        image: '/images/image_5.svg',
        bgColor: '#96CEB4',
        directions: [
          'Дыхательная гимнастика',
          'Укрепление пресса',
          'Укрепление ягодиц',
          'Бодифлекс для лица',
          'Бодифлекс для рук',
          'Бодифлекс для ног',
        ],
      },
    };

    const course = courses[courseId || 'yoga'] || courses.yoga;

    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = `${course.title} | SkyFitnessPro`;

    const heroTitleEl = document.getElementById('hero-title');
    if (heroTitleEl) heroTitleEl.textContent = course.title;

    const heroImageEl = document.getElementById('hero-image') as HTMLImageElement;
    if (heroImageEl) heroImageEl.src = course.image;

    const heroBgEl = document.getElementById('hero-bg');
    if (heroBgEl) heroBgEl.style.backgroundColor = course.bgColor;

    const directionsListEl = document.getElementById('directions-list');
    if (directionsListEl) {
      directionsListEl.innerHTML = course.directions
        .map(
          (dir: string) => `
        <div class="direction-item">
          <img src="/images/Sparcle.svg" alt="" class="sparkle-icon" />
          <span>${dir}</span>
        </div>
      `
        )
        .join('');
    }
  }, [courseId]);

  const handleStartWorkout = () => {
    if (!token) {
      alert('Войдите, чтобы добавить курс');
      navigate('/profile');
      return;
    }
    navigate(`/course/${courseId}/workout/1`);
  };

  const handleAddCourse = async () => {
    if (!token) {
      alert('Войдите в аккаунт');
      navigate('/profile');
      return;
    }

    try {
      await addCourse(courseId!);
      alert('Курс успешно добавлен в ваш профиль!');
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const isCourseAdded = user?.selectedCourses?.includes(courseId!);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <section className="course-hero">
            <div className="course-hero__bg" id="hero-bg">
              <h1 className="course-hero__title" id="hero-title">Йога</h1>
              <img id="hero-image" src="/images/image_1.svg" alt="" className="course-hero__image" />
            </div>

            <div className="course-hero__content">
              <div className="course-hero__benefits">
                <h2 className="section-title">Подойдет для вас, если:</h2>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-number">1</span>
                    <p>Давно хотели попробовать йогу, но не решались начать</p>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-number">2</span>
                    <p>Хотите укрепить позвоночник, избавиться от болей в спине и суставах</p>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-number">3</span>
                    <p>Ищете активность, полезную для тела и души</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="directions">
            <h2 className="section-title">Направления</h2>
            <div className="directions-block" id="directions-list"></div>
          </section>

          <section className="cta-section">
            <div className="cta-card">
              <img src="/images/Vector.svg" alt="" className="cta-card__bg" />
              <div className="cta-card__content">
                <h2 className="cta-card__title">Начните путь к новому телу</h2>
                <ul className="cta-card__list">
                  <li>проработка всех групп мышц</li>
                  <li>тренировка суставов</li>
                  <li>улучшение циркуляции крови</li>
                  <li>упражнения заряжают бодростью</li>
                  <li>помогают противостоять стрессам</li>
                </ul>

                {/* Кнопка "Начать тренировку" */}
                <button onClick={handleStartWorkout} className="btn btn--cta">
                  Начать тренировку
                </button>

                {/* Кнопка "Добавить курс" — если ещё не добавлен */}
                {!isCourseAdded && (
                  <button onClick={handleAddCourse} className="btn btn--cta" style={{ marginTop: '16px', background: '#4ECDC4' }}>
                    Добавить курс в профиль
                  </button>
                )}

                {isCourseAdded && (
                  <p style={{ color: '#BCEC30', fontWeight: 'bold', marginTop: '16px' }}>
                    Курс уже в вашем профиле
                  </p>
                )}
              </div>
              <img src="/images/img_0.svg" alt="Бегун" className="cta-card__image" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Course;