// src/components/Course/CtaSection.tsx

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../api/users';
import AuthModal from '../AuthModal'; // ← прямой импорт

interface CtaSectionProps {
  courseId: string;
  isCourseAdded: boolean;
}

export function CtaSection({ courseId, isCourseAdded }: CtaSectionProps) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCtaClick = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    if (isCourseAdded) {
      navigate('/profile');
      return;
    }
    try {
      await addCourse(courseId);
      alert('Курс добавлен в профиль!');
      navigate('/profile');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      alert('Ошибка: ' + message);
    }
  };

  return (
    <>
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
              className={`btn ${
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
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}