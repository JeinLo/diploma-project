// src/components/Passing.tsx
import { useEffect } from 'react';
import Header from './Header';
import '../styles/passing.css';

const Passing = () => {
  useEffect(() => {
    const video = document.querySelector('.video-player') as HTMLVideoElement;
    const overlay = document.querySelector('.play-overlay') as HTMLElement;

    const handlePlay = () => {
      overlay.style.display = 'none';
    };

    video?.addEventListener('play', handlePlay);

    overlay?.addEventListener('click', () => {
      video?.play();
    });

    const completeBtn = document.getElementById('complete-lesson');
    completeBtn?.addEventListener('click', () => {
      alert('Прогресс сохранён!');
    });

    return () => {
      video?.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <h1 className="lesson-title">Йога — Тренировка 2</h1>

          <section className="video-section">
            <div className="video-wrapper">
              <video controls className="video-player">
                <source src="/videos/yoga-lesson-2.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
              <div className="play-overlay">
                <img src="/images/play.svg" alt="Play" className="play-icon" />
              </div>
            </div>
          </section>

          <section className="exercises-section">
            <h2 className="exercises-title">Упражнения тренировки 2</h2>
            <div className="exercises-grid">
              {['', '', ''].map((_, colIndex) => (
                <div key={colIndex} className="exercise-column">
                  {['Наклоны вперед', 'Наклоны назад', 'Поднятие ног, согнутых в коленях'].map((exercise) => (
                    <div key={exercise}>
                      <div className="exercise-item">
                        {exercise} <span className="progress-value">0%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="btn btn--cta" id="complete-lesson">
              Заполнить свой прогресс
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Passing;