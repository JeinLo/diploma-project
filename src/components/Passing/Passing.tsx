import { useAuth } from '../../context/AuthContext';
import { usePassingWorkout } from './usePassingWorkout';
import { VideoPlayer } from './VideoPlayer';
import { ExercisesSection } from './ExercisesSection';
import { useEffect } from 'react';
import '../../styles/passing.css';

export default function Passing() {
  const { user } = useAuth();
  const {
    workout,
    progress,
    loading,
    error,
    updateProgress,
    handleComplete,
    showModal,
  } = usePassingWorkout();

  // Защита: если пользователь не авторизован — уйдём на главную
  useEffect(() => {
    if (!user) {
      alert('Войдите в аккаунт');
      window.location.href = '/';
    }
  }, [user]);

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading">Загрузка тренировки...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <div className="container">
          <div className="error-banner">{error}</div>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="main">
        <div className="container">
          <div className="error-banner">Тренировка не найдена</div>
        </div>
      </main>
    );
  }

  // Делим упражнения на 3 колонки
  const exercisesByColumn = [[], [], []] as string[][];
  workout.exercises.forEach((ex, i) => {
    exercisesByColumn[i % 3].push(ex.name);
  });

  const videoId = workout.video?.match(/embed\/([a-zA-Z0-9_-]+)/)?.[1] || null;

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workout.name}</h1>
          <VideoPlayer videoUrl={videoId} />
          <ExercisesSection
            exercises={exercisesByColumn}
            progress={progress}
            updateProgress={updateProgress}
            onComplete={handleComplete}
          />
        </div>
      </main>
      {showModal && (
        <div className="congrats-modal">
          <div className="congrats-content">
            <img src="/images/congrats.svg" alt="Поздравляем" className="congrats-icon" />
            <h3>Молодец!</h3>
            <p>Ты завершил(а) тренировку!</p>
          </div>
        </div>
      )}
    </>
  );
}