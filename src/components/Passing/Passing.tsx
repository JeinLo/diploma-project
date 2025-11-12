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
    showModal,
  } = usePassingWorkout();

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

  const exercisesByColumn = [[], [], []] as string[][];
  workout.exercises.forEach((ex, i) => {
    exercisesByColumn[i % 3].push(ex.name);
  });

  const videoId = workout.video?.match(/embed\/([a-zA-Z0-9*-]+)/)?.[1] || null;

  // После завершения — редирект в профиль
  const handleCompleteAndRedirect = async () => {
    await handleComplete();
    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  };

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workout.name}</h1>
          <div className="video-section">
            <div className="video-wrapper">
              <VideoPlayer videoUrl={videoId} />
            </div>
          </div>
          <ExercisesSection
            exercises={exercisesByColumn}
            progress={progress}
            updateProgress={updateProgress}
            onComplete={handleCompleteAndRedirect}
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