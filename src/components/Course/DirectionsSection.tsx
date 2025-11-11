// src/components/Course/DirectionsSection.tsx

import { useEffect } from 'react';

interface DirectionsSectionProps {
  directions: string[];
}

export function DirectionsSection({ directions }: DirectionsSectionProps) {
  useEffect(() => {
    const listEl = document.getElementById('directions-list');
    if (listEl) {
      listEl.innerHTML = directions
        .map((dir) => `
          <div class="direction-item">
            <img src="/images/Sparcle.svg" alt="" class="sparkle-icon" />
            <span>${dir}</span>
          </div>
        `)
        .join('');
    }
  }, [directions]);

  return (
    <section className="directions">
      <h2 className="section-title">Направления</h2>
      <div className="directions-block" id="directions-list"></div>
      <div className="mobile-cta-images">
        <img src="/images/Vector.svg" alt="" className="cta-card__bg-mobile" />
        <img src="/images/img_0.svg" alt="Бегун" className="cta-card__image-mobile" />
      </div>
    </section>
  );
}