import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/passing.css';
import { getWorkoutById, getUserProgress, saveProgress } from '../api/fitness';
import { useAuth } from '../context/AuthContext';

export default function Passing() {
  const { courseId, workoutId } = useParams<{ courseId: string; workoutId: string }>();
  const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [workoutName, setWorkoutName] = useState('Тренировка');
  const [exercises, setExercises] = useState<string[][]>([['', '', ''], ['', '', ''], ['', '', '']]);
  const [progress, setProgress] = useState<number[]>(Array(9).fill(0));
  const [showModal, setShowModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const loadWorkout = async () => {
      if (!courseId || !workoutId) return;

      try {
        const workout = await getWorkoutById(courseId, workoutId);
        setWorkoutName(workout.name || 'Тренировка');

        const youtubeMatch = workout.video?.match(/embed\/([a-zA-Z0-9_-]+)/);
        const youtubeId = youtubeMatch ? youtubeMatch[1] : null;
        setVideoUrl(youtubeId);

        const exNames = workout.exercises?.map((e: any) => e.name) || [
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног',
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног',
          'Наклоны вперед', 'Наклоны назад', 'Поднятие ног'
        ];

        const cols: string[][] = [[], [], []];
        exNames.forEach((name: string, i: number) => {
          cols[i % 3].push(name);
        });
        setExercises(cols);
        setProgress(Array(exNames.length).fill(0));

        const userProgress = await getUserProgress(courseId);
        const saved = userProgress.find((p: any) => p.workoutId === workoutId);
        if (saved?.progressData) {
          setProgress(saved.progressData);
        }
      } catch (err) {
        console.warn('Не удалось загрузить тренировку:', err);
      }
    };

    loadWorkout();
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
    if (!courseId || !workoutId) return;

    const allDone = progress.every(p => p > 0);
    if (!allDone) {
      alert('Заполните прогресс по всем упражнениям');
      return;
    }

    try {
      await saveProgress(courseId, workoutId, progress);
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
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">{workoutName}</h1>
          
          <section className="video-section">
            <div className="video-wrapper">
              {videoUrl ? (
                <iframe
                  ref={iframeRef}
                  className="youtube-player"
                  src={`https://www.youtube.com/embed/${videoUrl}?enablejsapi=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="video-placeholder">
                  Видео недоступно
                </div>
              )}
            </div>
          </section>

          <section className="exercises-section">
            <h2 className="exercises-title">Упражнения</h2>
            <div className="exercises-grid">
              {[0, 1, 2].map(col => (
                <div key={col} className="exercise-column">
                  {exercises[col]?.map((exercise, row) => {
                    const index = col + row * 3;
                    const value = getProgressForIndex(col, row);
                    return (
                      <div key={index} className="exercise-item-wrapper">
                        <div className="exercise-item">
                          {exercise || 'Упражнение'}
                          <span className="progress-value">{value}</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(value / 100) * 100}%` }}
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