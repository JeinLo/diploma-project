# Онлайн-платформа для фитнес-тренировок

Дипломный проект по созданию веб-приложения для занятий фитнесом дома. Пользователи могут выбирать курсы, проходить тренировки, отслеживать прогресс и смотреть видеоуроки.

## 🚀 Основные возможности

- ✅ Авторизация (вход/регистрация)
- 🏠 Главная страница с каталогом курсов
- 👤 Профиль с прогрессом по курсам
- 🎥 Видеоуроки (YouTube)
- 📝 Заполнение результатов упражнений
- 📊 Автоматический подсчёт прогресса
- 📱 Полная мобильная адаптация

## 🛠️ Технологии

- **Frontend**: React 18, TypeScript, React Router v6
- **Сборка**: Vite
- **Стили**: Чистый CSS (без Bootstrap/Tailwind)
- **API**: REST (https://wedev-api.sky.pro/api/fitness)
- **Типизация**: TypeScript строгая (`"verbatimModuleSyntax": true`)
- **Тестирование**: Jest + React Testing Library

## 📦 Установка и запуск

### Требования
- Node.js ≥ 18.x
- npm или yarn

### Шаги
1. Клонируйте репозиторий:

   git clone <ваш-репозиторий>
   cd diploma-project

2. Установите зависимости:

      npm install

3. Запустите dev-сервер:

      npm run devэ
      
4. Откройте в браузере: http://localhost:5173

### 📁 Структура проекта

src/
├── api/                # Запросы к API
├── components/         # Компоненты
│   ├── Home/           # Главная
│   ├── Profile/        # Профиль
│   ├── Course/         # Страница курса
│   ├── Passing/        # Тренировка
│   └── ...
├── context/            # Контекст авторизации
├── styles/             # Глобальные стили
├── types/              # TypeScript-типы
└── App.tsx             # Корневой компонент

### 🧪 Тестирование

  1. Запуск всех тестов:

        npm test

  2. Запуск в режиме наблюдения:

      npm run test:watch

### 🌐 API

  Эндпоинты:

  - **GET /api/fitness/courses** — все курсы
  - **POST /api/fitness/users/me/courses** — добавить курс
  - **GET /api/fitness/users/me/progress?courseId=...** — прогресс
  - **PATCH /api/fitness/courses/:id/workouts/:id** — сохранить результат
  - Базовый URL: **https://wedev-api.sky.pro/api/fitness**
