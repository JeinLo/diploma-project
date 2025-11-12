import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../api/users/index';
import AuthModal from '../AuthModal';
import { useState } from 'react';
import type { Course } from '../../api/types';

interface CourseCardListProps {
  courses: Course[];
}

export function CourseCardList({ courses }: CourseCardListProps) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handlePlusClick = async (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (!token) {
      setIsAuthOpen(true);
      return;
    }
    try {
      await addCourse(courseId);
      alert('Курс добавлен в профиль!');

      const course = courses.find(c => c._id === courseId);
      const firstWorkoutId = course?.workouts?.[0] || '1';

      navigate(`/course/${courseId}/workout/${firstWorkoutId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      alert('Ошибка: ' + message);
    }
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <div className="cards">
        {courses.map((course) => {
          const imageSrc = course.image || `/images/image_${course.order || 1}.svg`;
          return (
            <article
              key={course._id}
              className="card"
              onClick={() => handleCardClick(course._id)}
            >
              <div className="card__image-wrapper">
                <img src={imageSrc} alt={course.nameRU} className="card__image" />
                <button
                  className="card__play-btn"
                  onClick={(e) => handlePlusClick(e, course._id)}
                >
                  <img src="/images/plus.svg" alt="Начать" className="plus-icon" />
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
                    {course.dailyDurationInMinutes.from}–
                    {course.dailyDurationInMinutes.to} мин/день
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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}