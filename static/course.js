// ДАННЫЕ КУРСОВ
const courses = {
  yoga: {
    title: "Йога",
    image: "./images/image_1.svg",
    bgColor: "#FFC700",
    directions: [
      "Йога для новичков", "Классическая йога", "Кундалини-йога",
      "Йогатерапия", "Хатха-йога", "Аштанга-йога"
    ]
  },
  stretching: {
    title: "Стретчинг",
    image: "./images/image_2.svg",
    bgColor: "#FF6B6B",
    directions: [
      "Растяжка спины", "Гибкость ног", "Растяжка плеч",
      "Утренняя растяжка", "Вечерняя растяжка", "Растяжка для сна"
    ]
  },
  fitness: {
    title: "Фитнес",
    image: "./images/image_3.svg",
    bgColor: "#4ECDC4",
    directions: [
      "Силовые тренировки", "Кардио", "HIIT",
      "Функциональный тренинг", "Табата", "Кроссфит"
    ]
  },
  step: {
    title: "Степ-аэробика",
    image: "./images/image_4.svg",
    bgColor: "#45B7D1",
    directions: [
      "Базовый степ", "Продвинутый степ", "Степ + сила",
      "Степ для похудения", "Степ с гантелями", "Танцевальный степ"
    ]
  },
  bodyflex: {
    title: "Бодифлекс",
    image: "./images/image_5.svg",
    bgColor: "#96CEB4",
    directions: [
      "Дыхательная гимнастика", "Упражнения на пресс", "Бодифлекс для лица",
      "Утренняя зарядка", "Вечернее расслабление", "Антистресс"
    ]
  }
};

// Читаем параметр из URL
const urlParams = new URLSearchParams(window.location.search);
const courseKey = urlParams.get('course') || 'yoga';
const course = courses[courseKey] || courses.yoga;

// Применяем
document.getElementById('page-title').textContent = `${course.title} | SkyFitnessPro`;
document.getElementById('hero-title').textContent = course.title;
document.getElementById('hero-image').src = course.image;
document.getElementById('hero-bg').style.backgroundColor = course.bgColor;

// Заполняем направления
document.getElementById('directions-list').innerHTML = course.directions.map(dir => `
  <div class="direction-item">
    <img src="./images/Sparcle.svg" alt="" class="sparkle-icon">
    ${dir}
  </div>
`).join('');