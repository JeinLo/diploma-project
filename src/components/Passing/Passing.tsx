// src/components/Passing/Passing.tsx
import { useState } from 'react';
import { usePassingWorkout } from './usePassingWorkout';
import { VideoPlayer } from './VideoPlayer';
import { ExercisesSection } from './ExercisesSection';
import { useNavigate } from 'react-router-dom';
import '../../styles/passing.css';
import '../../styles/workout-modal.css';

export default function Passing() {
  const navigate = useNavigate();
  const {
    workout,
    progress,
    loading,
    error,
    updateProgress,
    handleComplete,
    showModal,
    setShowModal,
  } = usePassingWorkout();

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [tempProgress, setTempProgress] = useState<number[]>([]);

  const openProgressModal = () => {
    setTempProgress([...progress]);
    setShowProgressModal(true);
  };

  const saveTempProgress = () => {
    tempProgress.forEach((value, index) => updateProgress(index, value));
    setShowProgressModal(false);
  };

  const allFilled = progress.length > 0 && progress.every(p => p > 0);
  const hasAnyProgress = progress.some(p => p > 0);

  const buttonText = allFilled
    ? 'Завершить тренировку'
    : hasAnyProgress
      ? 'Обновить свой прогресс'
      : 'Заполнить свой прогресс';

  const handleMainButton = async () => {
    if (allFilled) {
      await handleComplete(); // Внутри handleComplete — setShowModal(true)
    } else {
      openProgressModal();
    }
  };

  const handleCongratsClose = () => {
    setShowModal(false);
    navigate('/profile');
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error || !workout) return <div className="error-banner">Ошибка</div>;

  const exercisesByColumn = [[], [], []] as string[][];
  workout.exercises.forEach((ex, i) => {
    const displayName = `${ex.name} (${ex.quantity} повторений)`;
    exercisesByColumn[i % 3].push(displayName);
  });

  const videoUrl = 'https://www.youtube.com/embed/gJPs7b8SpVw';

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workout.name}</h1>

          <div className="video-section">
            <div className="video-wrapper">
              <VideoPlayer videoUrl={videoUrl} />
            </div>
          </div>

          <ExercisesSection
            exercises={exercisesByColumn}
            progress={progress}
            updateProgress={updateProgress}
            onComplete={() => {}}
          />

          <button className="btn btn--cta" onClick={handleMainButton}>
            {buttonText}
          </button>
        </div>
      </main>

      {/* === ВОССТАНОВЛЕНА МОДАЛКА УСПЕХА === */}
      {showModal && (
        <div className="congrats-modal" onClick={handleCongratsClose}>
          <div className="congrats-content" onClick={e => e.stopPropagation()}>
            <img src="/images/congrats.svg" alt="Успех" className="congrats-icon" />
            <h3>Молодец!</h3>
            <p>Ты завершил(а) тренировку!</p>
          </div>
        </div>
      )}

      {/* === МОДАЛКА ПРОГРЕССА === */}
      {showProgressModal && (
        <div className="modal-overlay" onClick={() => setShowProgressModal(false)}>
          <div className="modal progress-modal-custom" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title-custom">Ваш прогресс</h3>
            <div className="progress-form-custom">
              {workout.exercises.map((ex, i) => (
                <div key={i} className="progress-input-group-custom">
                  <label className="progress-label-custom">
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
                    className="progress-input-custom"
                  />
                </div>
              ))}
            </div>
            <button className="modal-btn" onClick={saveTempProgress}>
              Сохранить
            </button>
          </div>
        </div>
      )}
    </>
  );
}