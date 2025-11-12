// src/components/Home/Home.tsx
import { useHomeData } from './useHomeData';
import { CourseCardList } from './CourseCardList';

export default function Home() {
  const { courses, loading, error } = useHomeData();

  if (loading) {
    return <div className="loading">Загрузка курсов...</div>;
  }

  return (
    <main className="main">
      <div className="container main__container">
        <div className="hero">
          <h1 className="hero__title">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="bubble-wrapper">
            <div className="speech-bubble">Измени своё тело за полгода!</div>
            <img src="/images/str.svg" alt="Стрелка" className="bubble-arrow-separate" />
          </div>
        </div>
        {error && <div className="error-banner">{error}</div>}
        <CourseCardList courses={courses} />
        <div className="cta">
          <button
            className="btn btn--cta btn--cta-scroll"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Наверх ↑
          </button>
        </div>
      </div>
    </main>
  );
}