// src/components/Course.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/course.css';
import { useAuth } from '../context/AuthContext';
import { addCourse } from '../api/fitness';
import AuthModal from './AuthModal';

const bgColors: Record<string, string> = {
  ab1c3f: '#FFC700',
  kfpq8e: '#2491D2',
  ypox9r: '#F7A012',
  '6i67sm': '#FF7E65',
  q02a6i: '#7D458C',
};

const fallbackImages: Record<string, string> = {
  ab1c3f: '/images/image_1.svg',
  kfpq8e: '/images/image_2.svg',
  ypox9r: '/images/image_3.svg',
  '6i67sm': '/images/image_4.svg',
  q02a6i: '/images/image_5.svg',
};

const fallbackCourses: Record<string, any> = {
  ab1c3f: { title: 'Йога', directions: ['Йога для новичков', 'Классическая йога', 'Кундалини-йога', 'Йогатерапия', 'Хатха-йога', 'Аштанга-йога'] },
  kfpq8e: { title: 'Стретчинг', directions: ['Растяжка для новичков', 'Гибкость спины', 'Растяжка ног', 'Растяжка плеч', 'Утренняя растяжка', 'Вечерняя растяжка'] },
  ypox9r: { title: 'Фитнес', directions: ['Силовые тренировки', 'Кардио', 'Функциональный тренинг', 'HIIT', 'Тренировка на выносливость', 'Тренировка на силу'] },
  '6i67sm': { title: 'Степ-аэробика', directions: ['Базовый степ', 'Степ + силовые', 'Степ-кардио', 'Степ для новичков', 'Степ с гантелями', 'Степ-танцы'] },
  q02a6i: { title: 'Бодифлекс', directions: ['Дыхательная гимнастика', 'Укрепление пресса', 'Укрепление ягодиц', 'Бодифлекс для лица', 'Бодифлекс для рук', 'Бодифлекс для ног'] },
};

const Course = () => {
  const { id: courseId = 'ab1c3f' } = useParams<{ id?: string }>(); // Алиас: id → courseId
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://wedev-api.sky.pro/api/fitness/courses/${courseId}`);
        if (!response.ok) throw new Error('Курс не найден');
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        console.error('Ошибка:', err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const course = courseData || fallbackCourses[courseId] || fallbackCourses.ab1c3f;
  const bgColor = bgColors[courseId] || '#BCEC30';
  const imageSrc = courseData?.image || fallbackImages[courseId] || '/images/image_1.svg';

  useEffect(() => {
    const heroTitleEl = document.getElementById('hero-title');
    const heroImageEl = document.getElementById('hero-image') as HTMLImageElement;
    const heroBgEl = document.getElementById('hero-bg');
    const directionsListEl = document.getElementById('directions-list');

    if (heroTitleEl) heroTitleEl.textContent = course.title || course.nameRU || 'Курс';
    if (heroImageEl) heroImageEl.src = imageSrc;
    if (heroBgEl) heroBgEl.style.backgroundColor = bgColor;
    if (directionsListEl && course.directions) {
      directionsListEl.innerHTML = course.directions
        .map((dir: string) => `
          <div class="direction-item">
            <img src="/images/Sparcle.svg" alt="" class="sparkle-icon" />
            <span>${dir}</span>
          </div>
        `)
        .join('');
    }
  }, [course, imageSrc, bgColor]);

  const handleCtaClick = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    if (user?.selectedCourses?.includes(courseId)) {
      navigate('/profile');
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

  const isCourseAdded = user?.selectedCourses?.includes(courseId);

  return (
    <>
      <main className="main">
        <div className="container">
          <section className="course-hero">
            <div className="course-hero__bg" id="hero-bg">
              <h1 className="course-hero__title" id="hero-title">Йога</h1>
              <img id="hero-image" src={imageSrc} alt="" className="course-hero__image" />
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
            <div className="mobile-cta-images">
              <img src="/images/Vector.svg" alt="" className="cta-card__bg-mobile" />
              <img src="/images/img_0.svg" alt="Бегун" className="cta-card__image-mobile" />
            </div>
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
                <button
                  onClick={handleCtaClick}
                  className={` ${
                    !token
                      ? 'btn--cta-login'
                      : isCourseAdded
                      ? 'btn--cta-added'
                      : 'btn--cta-add'
                  }`}
                >
                  {!token
                    ? 'Войдите, чтобы добавить курс'
                    : isCourseAdded
                    ? 'Курс уже в вашем профиле'
                    : 'Добавить курс'}
                </button>
              </div>
              <img src="/images/img_0.svg" alt="Бегун" className="cta-card__image" />
            </div>
          </section>
        </div>
      </main>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Course;