import { Link } from 'react-router-dom';
import type { CourseWithProgress } from '../../api/types';

interface UserCourseCardProps {
  course: CourseWithProgress;
  onDelete: (id: string) => void;
  getButtonText: (progress: number) => string;
}

const bgColors: Record<string, string> = {
  ab1c3f: '#FFC700',
  kfpq8e: '#2491D2',
  ypox9r: '#F7A012',
  '6i67sm': '#FF7E65',
  q02a6i: '#7D458C',
};

export function UserCourseCard({ course, onDelete, getButtonText }: UserCourseCardProps) {
  return (
    <article key={course._id} className="course-card">
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
        <Link to={`/course/${course._id}`} className="course-btn">
          {getButtonText(course.progress)}
        </Link>
      </div>
    </article>
  );
}