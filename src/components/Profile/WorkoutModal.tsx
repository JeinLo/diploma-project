// src/components/Profile/WorkoutModal.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourseWorkouts } from '../../api/workouts';
import type { Workout } from '../../api/types';
import '../../styles/workout-modal.css';

interface WorkoutModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
  completedWorkouts: string[];
  onRefetch?: () => void;
  courseName: string; 
}

function extractLessonNumber(name: string): number {
  const match = name.match(/^Урок\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : 9999;
}

export default function WorkoutModal({
  courseId,
  isOpen,
  onClose,
  completedWorkouts,
  onRefetch,
  courseName, 
}: WorkoutModalProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getCourseWorkouts(courseId);
        const sorted = [...data].sort((a, b) =>
          extractLessonNumber(a.name) - extractLessonNumber(b.name)
        );
        setWorkouts(sorted);
        setSelectedId(null);
      } catch (err) {
        console.error('Ошибка загрузки тренировок:', err);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, isOpen]);

  const handleWorkoutClick = (workoutId: string) => {
    if (completedWorkouts.includes(workoutId)) return;
    setSelectedId(workoutId);
  };

  const handleStartClick = () => {
    const workoutIdToStart = selectedId ||
      workouts.find(w => !completedWorkouts.includes(w._id))?._id ||
      workouts[0]?._id;

    if (workoutIdToStart) {
      onClose();
      navigate(`/course/${courseId}/workout/${workoutIdToStart}`);
      if (onRefetch) onRefetch();
    }
  };

  const isStartDisabled = !workouts.length ||
    (!selectedId && !workouts.some(w => !completedWorkouts.includes(w._id)));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Выберите тренировку</h3>

        <ul className="workout-list">
          {loading ? (
            <li className="workout-item loading">Загрузка...</li>
          ) : workouts.length === 0 ? (
            <li className="workout-item empty">Тренировки не найдены</li>
          ) : (
            workouts.map((w, index) => {
              const isCompleted = completedWorkouts.includes(w._id);
              const isSelected = selectedId === w._id;

              return (
                <li
                  key={w._id}
                  className={`workout-item ${isCompleted ? 'done' : ''}`}
                  onMouseEnter={() => !isCompleted && setHoveredId(w._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => !isCompleted && handleWorkoutClick(w._id)}
                  style={{ cursor: isCompleted ? 'default' : 'pointer' }}
                >
                  <div className="workout-check">
                    {isCompleted ? (
                      <div className="check-done">✓</div>
                    ) : isSelected ? (
                      <img src="/images/mini-galka.svg" alt="Выбрано" />
                    ) : hoveredId === w._id ? (
                      <img src="/images/mini-galka.svg" alt="Наведено" />
                    ) : (
                      <div className="workout-circle" />
                    )}
                  </div>
                  <div className="workout-info">
                    <div className="workout-name">{w.name}</div>
                    <div className="workout-desc">
                      {/* Динамическое название курса */}
                      {courseName} на каждый день / {index + 1} день
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>

        <button
          className="modal-btn"
          onClick={handleStartClick}
          disabled={isStartDisabled}
        >
          Начать
        </button>
      </div>
    </div>
  );
}