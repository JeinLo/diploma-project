// src/components/Passing.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../styles/passing.css';
import { getWorkoutById, getUserProgress, saveProgress } from '../api/fitness';
import { useAuth } from '../context/AuthContext';

export default function Passing() {
  const { courseId, workoutId } = useParams<{ courseId: string; workoutId: string }>();
  const { user } = useAuth();

  const [videoUrl, setVideoUrl] = useState('/videos/yoga-lesson-2.mp4');
  const [workoutName, setWorkoutName] = useState('Тренировка');
  const [exercises, setExercises] = useState<string[][]>([['', '', ''], ['', '', ''], ['', '', '']]);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const video = document.querySelector('.video-player') as HTMLVideoElement;
    const overlay = document.querySelector('.play-overlay') as HTMLElement;

    const handlePlay = () => {
      overlay.style.display = 'none';
    };

    const handleClickOverlay = () => {
      video?.play();
    };

    video?.addEventListener('play', handlePlay);
    overlay?.addEventListener('click', handleClickOverlay);

    // Загрузка данных с API
    const loadWorkout = async () => {
      if (!courseId || !workoutId) return;

      try {
        const workout = await getWorkoutById(courseId, workoutId);
        setVideoUrl(workout.video || '/videos/yoga-lesson-2.mp4');
        setWorkoutName(workout.name || 'Тренировка');

        const ex = workout.exercises?.map((e: any) => e.name) || [
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног',
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног',
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног'
        ];

        const cols: string[][] = [[], [], []];
        ex.forEach((name: string, i: number) => {
          cols[i % 3].push(name);
        });
        setExercises(cols);

        // Загрузка прогресса
        const userProgress = await getUserProgress(courseId);
        const saved = userProgress.find((p: any) => p.workoutId === workoutId);
        if (saved?.progressData) {
          setProgress(saved.progressData);
        }
      } catch (err) {
        console.error('Ошибка загрузки тренировки:', err);
      }
    };

    loadWorkout();

    return () => {
      video?.removeEventListener('play', handlePlay);
      overlay?.removeEventListener('click', handleClickOverlay);
    };
  }, [courseId, workoutId]);

  const updateProgress = (index: number, value: number) => {
    setProgress(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleComplete = async () => {
    if (!user) {
      alert('Войдите в аккаунт');
      return;
    }

    const allDone = progress.every(p => p === 100);
    if (!allDone) {
      alert('Доведите все упражнения до 100%');
      return;
    }

    try {
      await saveProgress(courseId!, workoutId!, progress);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 4000);
    } catch (err: any) {
      alert('Ошибка сохранения: ' + err.message);
    }
  };

  const getProgressForIndex = (col: number, row: number) => {
    const index = col + row * 3;
    return progress[index] || 0;
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workoutName}</h1>

          <section className="video-section">
            <div className="video-wrapper">
              <video controls className="video-player" key={videoUrl}>
                <source src={videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
              <div className="play-overlay">
                <img src="/images/play.svg" alt="Play" className="play-icon" />
              </div>
            </div>
          </section>

          <section className="exercises-section">
            <h2 className="exercises-title">Упражнения</h2>
            <div className="exercises-grid">
              {[0, 1, 2].map(col => (
                <div key={col} className="exercise-column">
                  {exercises[col].map((exercise, row) => {
                    const index = col + row * 3;
                    const value = getProgressForIndex(col, row);
                    return (
                      <div key={index} className="exercise-item-wrapper">
                        <div className="exercise-item">
                          {exercise || 'Упражнение'}
                          <span className="progress-value">{value}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => updateProgress(index, Number(e.target.value))}
                          className="progress-slider"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <button className="btn btn--cta" onClick={handleComplete}>
              Завершить тренировку
            </button>
          </section>
        </div>
      </main>

      {/* Модальное окно */}
      {showModal && (
        <div className="congrats-modal">
          <div className="congrats-content">
            <img src="/images/congrats.svg" alt="Поздравляем" className="congrats-icon" />
            <h3>Молодец!</h3>
            <p>Ты завершил(а) тренировку на 100%</p>
          </div>
        </div>
      )}
    </>
  );
}