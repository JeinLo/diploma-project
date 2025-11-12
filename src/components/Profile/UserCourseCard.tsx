import { useState } from 'react';
import WorkoutModal from './WorkoutModal';
import type { CourseWithProgress } from '../../api/types';

const bgColors: Record<string, string> = {
  ab1c3f: '#FFC700',
  kfpq8e: '#2491D2',
  ypox9r: '#F7A012',
  '6i67sm': '#FF7E65',
  q02a6i: '#7D458C',
};

interface UserCourseCardProps {
  course: CourseWithProgress;
  onDelete: (id: string) => void;
  getButtonText: (progress: number) => string;
}

export function UserCourseCard({ course, onDelete, getButtonText }: UserCourseCardProps) {
  const [showModal, setShowModal] = useState(false);

  // Симуляция завершённых тренировок на основе мок-прогресса
  const workoutIds = course.workouts || [];
  const completedWorkouts = course.progress === 100
    ? workoutIds
    : course.progress > 0
    ? workoutIds.slice(0, 1)
    : [];

  return (
    <>
      <article className="course-card">
        <div
          className="course-image-wrapper"
          style={{ backgroundColor: bgColors[course._id] || '#BCEC30' }}
        >
          <img
            src={course.image || `/images/image_${course.order || 1}.svg`}
            alt={course.nameRU}
            className="card__image"
          />
          <button className="card__play-btn course-delete" onClick={() => onDelete(course._id)}>
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
              {course.dailyDurationInMinutes.from}–
              {course.dailyDurationInMinutes.to} мин/день
            </div>
          </div>

          <div className="course-link">
            <img src="/images/progress.svg" alt="" /> Сложность
          </div>

          <div className="course-progress">
            <div className="progress-text">Прогресс {course.progress}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${course.progress}%` }} />
            </div>
          </div>

          <button onClick={() => setShowModal(true)} className="course-btn">
            {getButtonText(course.progress)}
          </button>
        </div>
      </article>

      <WorkoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseId={course._id}
        completedWorkouts={completedWorkouts}
      />
    </>
  );
}