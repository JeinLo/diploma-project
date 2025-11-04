// === ВЫХОД ИЗ ПРОФИЛЯ ===
document.getElementById('logout-btn-desktop')?.addEventListener('click', () => {
  if (confirm('Выйти из профиля?')) {
    alert('Вы вышли из аккаунта');
  }
});
document.getElementById('logout-mobile')?.addEventListener('click', () => {
  if (confirm('Выйти из профиля?')) {
    alert('Вы вышли из аккаунта');
  }
});

// === ДОБАВЛЕНИЕ КАРТОЧЕК КУРСОВ ===
const coursesContainer = document.getElementById('courses-container');

const sampleCourses = [
  {
    title: "Йога",
    days: "25 дней",
    time: "20-50 мин/день",
    difficulty: "Сложность",
    progress: 40,
    image: "./images/image_1.svg",
    bgColor: "#FFC700",
    btnText: "Продолжить"
  },
  {
    title: "Стретчинг",
    days: "25 дней",
    time: "20-50 мин/день",
    difficulty: "Сложность",
    progress: 0,
    image: "./images/image_2.svg",
    bgColor: "#4A90E2",
    btnText: "Начать тренировки"
  },
  {
    title: "Фитнес",
    days: "25 дней",
    time: "20-50 мин/день",
    difficulty: "Сложность",
    progress: 100,
    image: "./images/image_3.svg",
    bgColor: "#FF6B6B",
    btnText: "Начать заново"
  }
];

coursesContainer.innerHTML = sampleCourses.map(course => `
  <article class="course-card">
    <div class="course-image-wrapper" style="background-color: ${course.bgColor};">
      <img src="${course.image}" alt="${course.title}" class="course-image">
      <!-- КНОПКА УДАЛЕНИЯ -->
      <button class="card__play-btn course-delete">
        <img src="./images/minus.svg" alt="Удалить">
      </button>
    </div>
    <div class="course-content">
      <h3 class="course-title">${course.title}</h3>
      <div class="course-meta">
        <div class="course-meta-item">
          <img src="./images/icon_calendar.svg" alt=""> ${course.days}
        </div>
        <div class="course-meta-item">
          <img src="./images/icon_time.svg" alt=""> ${course.time}
        </div>
      </div>
      <a href="#" class="course-link">
        <img src="./images/progress.svg" alt=""> ${course.difficulty}
      </a>
      <div class="course-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${course.progress}%"></div>
        </div>
        <div class="progress-text">Прогресс ${course.progress}%</div>
      </div>
      <button class="course-btn">${course.btnText}</button>
    </div>
  </article>
`).join('');

// === УДАЛЕНИЕ КАРТОЧКИ ПО КНОПКЕ МИНУС ===
document.querySelectorAll('.course-delete').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = button.closest('.course-card');
    if (card && confirm('Удалить курс из профиля?')) {
      card.remove();
      // Опционально: проверка на пустоту
      if (!coursesContainer.hasChildNodes()) {
        coursesContainer.innerHTML = `<div class="courses-empty">У вас пока нет курсов.</div>`;
      }
    }
  });
});