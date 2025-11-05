// src/components/Header.tsx
export default function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <a href="/" className="logo">
          <img src="/images/Logo.svg" alt="SkyFitnessPro Logo" className="logo__img" />
          <span className="logo__text">SkyFitnessPro</span>
        </a>
        <div className="user-menu">
          <div className="user-avatar">
            <img src="/images/avatar.svg" alt="Аватар" className="user-avatar-img" />
          </div>
          <span className="user-name">Сергей</span>
          <span className="user-arrow-wrapper">
            <img src="/images/strelka.svg" alt="Стрелка" className="user-arrow" />
          </span>
        </div>
      </div>
    </header>
  );
}