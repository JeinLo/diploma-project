import '../styles/home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header__container">
          <div className="logo-wrapper">
            <a href="/" className="logo">
              <img src="/images/Logo.svg" alt="SkyFitnessPro Logo" className="logo__img" />
              <span className="logo__text">SkyFitnessPro</span>
            </a>
            <p className="header__tagline">Онлайн-тренировки для занятий дома</p>
          </div>
          <button className="btn btn--login">Войти</button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        <div className="container main__container">
          {/* Hero */}
          <div className="hero">
            <h1 className="hero__title">
              Начните заниматься спортом и улучшите качество жизни
            </h1>
            <div className="bubble-wrapper">
              <div className="speech-bubble">
                Измени своё тело за полгода!
              </div>
              <img src="/images/str.svg" alt="Стрелка вниз" className="bubble-arrow-separate" />
            </div>
          </div>

          {/* Cards */}
          <div className="cards">
            {/* Yoga */}
            <article className="card">
              <div className="card__image-wrapper">
                <img src="/images/image_1.svg" alt="Йога" className="card__image" />
                <button className="card__play-btn">
                  <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                </button>
              </div>
              <div className="card__content">
                <h3 className="card__title">Йога</h3>
                <div className="card__meta">
                  <div className="card__meta-badge card__meta-badge--calendar">
                    <img src="/images/icon_calendar.svg" alt="" /> 25 дней
                  </div>
                  <div className="card__meta-badge card__meta-badge--time">
                    <img src="/images/icon_time.svg" alt="" /> 20-50 мин/день
                  </div>
                </div>
                <Link to="/course/yoga" className="card__link">
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </Link>
              </div>
            </article>

            {/* Stretching */}
            <article className="card">
              <div className="card__image-wrapper">
                <img src="/images/image_2.svg" alt="Стретчинг" className="card__image" />
                <button className="card__play-btn">
                  <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                </button>
              </div>
              <div className="card__content">
                <h3 className="card__title">Стретчинг</h3>
                <div className="card__meta">
                  <div className="card__meta-badge card__meta-badge--calendar">
                    <img src="/images/icon_calendar.svg" alt="" /> 25 дней
                  </div>
                  <div className="card__meta-badge card__meta-badge--time">
                    <img src="/images/icon_time.svg" alt="" /> 20-50 мин/день
                  </div>
                </div>
                <Link to="/course/stretching" className="card__link">
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </Link>
              </div>
            </article>

            {/* Fitness */}
            <article className="card">
              <div className="card__image-wrapper">
                <img src="/images/image_3.svg" alt="Фитнес" className="card__image" />
                <button className="card__play-btn">
                  <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                </button>
              </div>
              <div className="card__content">
                <h3 className="card__title">Фитнес</h3>
                <div className="card__meta">
                  <div className="card__meta-badge card__meta-badge--calendar">
                    <img src="/images/icon_calendar.svg" alt="" /> 25 дней
                  </div>
                  <div className="card__meta-badge card__meta-badge--time">
                    <img src="/images/icon_time.svg" alt="" /> 20-50 мин/день
                  </div>
                </div>
                <Link to="/course/fitness" className="card__link">
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </Link>
              </div>
            </article>

            {/* Step Aerobics */}
            <article className="card">
              <div className="card__image-wrapper">
                <img src="/images/image_4.svg" alt="Степ-аэробика" className="card__image" />
                <button className="card__play-btn">
                  <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                </button>
              </div>
              <div className="card__content">
                <h3 className="card__title">Степ-аэробика</h3>
                <div className="card__meta">
                  <div className="card__meta-badge card__meta-badge--calendar">
                    <img src="/images/icon_calendar.svg" alt="" /> 25 дней
                  </div>
                  <div className="card__meta-badge card__meta-badge--time">
                    <img src="/images/icon_time.svg" alt="" /> 20-50 мин/день
                  </div>
                </div>
                <Link to="/course/step" className="card__link">
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </Link>
              </div>
            </article>

            {/* Bodyflex */}
            <article className="card">
              <div className="card__image-wrapper">
                <img src="/images/image_5.svg" alt="Бодифлекс" className="card__image" />
                <button className="card__play-btn">
                  <img src="/images/plus.svg" alt="Play" className="plus-icon" />
                </button>
              </div>
              <div className="card__content">
                <h3 className="card__title">Бодифлекс</h3>
                <div className="card__meta">
                  <div className="card__meta-badge card__meta-badge--calendar">
                    <img src="/images/icon_calendar.svg" alt="" /> 25 дней
                  </div>
                  <div className="card__meta-badge card__meta-badge--time">
                    <img src="/images/icon_time.svg" alt="" /> 20-50 мин/день
                  </div>
                </div>
                <Link to="/course/bodyflex" className="card__link">
                  <div className="card__meta-badge card__meta-badge--difficulty">
                    <img src="/images/progress.svg" alt="" /> Сложность
                  </div>
                </Link>
              </div>
            </article>
          </div>

          {/* CTA */}
          <div className="cta">
            <button
              className="btn btn--cta"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Наверх ↑
            </button>
          </div>
        </div>
      </main>
    </>
  );
}