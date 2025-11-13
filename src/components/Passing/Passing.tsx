// src/components/Passing/Passing.tsx
import { useState } from 'react';
import { usePassingWorkout } from './usePassingWorkout';
import { VideoPlayer } from './VideoPlayer';
import { ExercisesSection } from './ExercisesSection';
import { useNavigate } from 'react-router-dom';
import '../../styles/passing.css';

export default function Passing() {
  const navigate = useNavigate();
  const {
    workout,
    progress,
    loading,
    error,
    updateProgress,
    handleComplete,
    showSuccessModal,
    setShowSuccessModal,
  } = usePassingWorkout();

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [tempProgress, setTempProgress] = useState<number[]>([...progress]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error || !workout) return <div className="error-banner">Ошибка</div>;

  const exercisesByColumn = [[], [], []] as string[][];
  workout.exercises.forEach((ex, i) => {
    exercisesByColumn[i % 3].push(ex.name);
  });

  const allMetNorm = progress.every((p, i) => p >= (workout.exercises[i]?.quantity || 1));

  const handleFillProgress = () => {
    setTempProgress([...progress]);
    setShowProgressModal(true);
  };

  const handleCompleteTraining = async () => {
    if (!allMetNorm) {
      alert('Выполните все упражнения по нормативу');
      return;
    }
    await handleComplete();
    navigate('/profile');
  };

  const saveTempProgress = async () => {
    tempProgress.forEach((value, index) => updateProgress(index, value));
    await handleComplete();
    setShowProgressModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const closeProgressModal = () => {

    setShowProgressModal(false);
  };

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workout.name}</h1>

          <div className="video-section">
            <VideoPlayer videoUrl={workout.video} />
          </div>

          <ExercisesSection
            exercises={exercisesByColumn}
            progress={progress}
            updateProgress={updateProgress}
          />

          <div className="exercise-buttons">
            <button className="btn btn--cta" onClick={handleFillProgress}>
              Заполнить результат
            </button>
            <button
              className="btn btn--cta"
              onClick={handleCompleteTraining}
              disabled={!allMetNorm}
            >
              Завершить тренировку
            </button>
          </div>
        </div>
      </main>

      {/* === Модалка успеха === */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="success-title">Ваш прогресс засчитан!</h3>
            <img src="/images/mini-galka.svg" alt="Успех" className="success-icon" />
          </div>
        </div>
      )}

      {/* === Модалка ввода прогресса === */}
      {showProgressModal && (
        <div className="modal-overlay" onClick={closeProgressModal}>
          <div className="progress-modal" onClick={e => e.stopPropagation()}>
            <h3 className="progress-modal-title">Ваш прогресс</h3>
            <div className="progress-form">
              {workout.exercises.map((ex, i) => (
                <div key={i} className="progress-input-group">
                  <label>
                    Сколько раз вы сделали <strong>{ex.name}</strong>?
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tempProgress[i] || 0}
                    onChange={e => {
                      const val = Math.max(0, Number(e.target.value));
                      const newTemp = [...tempProgress];
                      newTemp[i] = val;
                      setTempProgress(newTemp);
                    }}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn--cta" onClick={saveTempProgress}>
              Сохранить
            </button>
          </div>
        </div>
      )}
    </>
  );
}