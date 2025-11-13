import type { Course } from '../api/types';

export const fallbackImages: Record<string, string> = {
  ab1c3f: '/images/image_1.svg',
  kfpq8e: '/images/image_2.svg',
  ypox9r: '/images/image_3.svg',
  '6i67sm': '/images/image_4.svg',
  q02a6i: '/images/image_5.svg',
};

export const fallbackCourses: Record<string, Partial<Course>> = {
  ab1c3f: {
    nameRU: 'Йога',
    directions: [
      'Йога для новичков',
      'Классическая йога',
      'Кундалини-йога',
      'Йогатерапия',
      'Хатха-йога',
      'Аштанга-йога',
    ],
  },
  kfpq8e: {
    nameRU: 'Стретчинг',
    directions: [
      'Растяжка для новичков',
      'Гибкость спины',
      'Растяжка ног',
      'Растяжка плеч',
      'Утренняя растяжка',
      'Вечерняя растяжка',
    ],
  },
  ypox9r: {
    nameRU: 'Фитнес',
    directions: [
      'Силовые тренировки',
      'Кардио',
      'Функциональный тренинг',
      'HIIT',
      'Тренировка на выносливость',
      'Тренировка на силу',
    ],
  },
  '6i67sm': {
    nameRU: 'Степ-аэробика',
    directions: [
      'Базовый степ',
      'Степ + силовые',
      'Степ-кардио',
      'Степ для новичков',
      'Степ с гантелями',
      'Степ-танцы',
    ],
  },
  q02a6i: {
    nameRU: 'Бодифлекс',
    directions: [
      'Дыхательная гимнастика',
      'Укрепление пресса',
      'Укрепление ягодиц',
      'Бодифлекс для лица',
      'Бодифлекс для рук',
      'Бодифлекс для ног',
    ],
  },
};