// Завершить урок
document.getElementById('complete-lesson')?.addEventListener('click', () => {
  if (confirm('Завершить урок? Прогресс сохранится.')) {
    alert('Урок завершён! Прогресс обновлён.');
    // Опционально: редирект в профиль
    // window.location.href = 'profile.html';
  }
});

// Показать/скрыть play overlay
const video = document.querySelector('.video-player');
const overlay = document.querySelector('.play-overlay');

if (video && overlay) {
  overlay.addEventListener('click', () => {
    video.play();
    overlay.style.display = 'none';
  });

  video.addEventListener('ended', () => {
    overlay.style.display = 'flex';
  });
}