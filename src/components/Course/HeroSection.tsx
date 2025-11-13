import { useEffect } from 'react';
import '../../styles/course.css';

interface HeroSectionProps {
  courseName: string;
  imageSrc: string;
  bgColor: string;
}

export function HeroSection({ courseName, imageSrc, bgColor }: HeroSectionProps) {
  useEffect(() => {
    const titleEl = document.getElementById('hero-title');
    const imageEl = document.getElementById('hero-image') as HTMLImageElement;
    const bgEl = document.getElementById('hero-bg');

    if (titleEl) titleEl.textContent = courseName;
    if (imageEl) imageEl.src = imageSrc;
    if (bgEl) bgEl.style.backgroundColor = bgColor;
  }, [courseName, imageSrc, bgColor]);

  return (
    <section className="course-hero">
      <div className="course-hero__bg" id="hero-bg">
        <h1 className="course-hero__title" id="hero-title">
          {courseName}
        </h1>
        <img id="hero-image" src={imageSrc} alt={courseName} className="course-hero__image" />
      </div>
    </section>
  );
}